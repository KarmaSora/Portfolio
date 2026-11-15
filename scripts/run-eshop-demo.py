#!/usr/bin/env python3
"""Run the original Eshop with an isolated, disposable MariaDB database."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import secrets
import shutil
import signal
import subprocess
import tempfile
import time

ROOT = Path(__file__).resolve().parents[1]
VENDOR = ROOT / 'vendor/eshop'
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--mariadb-base', type=Path, default=os.environ.get('MARIADB_BASE'))
parser.add_argument('--port', type=int, default=1337)
args = parser.parse_args()
base = args.mariadb_base.resolve() if args.mariadb_base else None
env = dict(os.environ)
if base:
    env['LD_LIBRARY_PATH'] = str(base / 'lib/x86_64-linux-gnu') + (':' + env['LD_LIBRARY_PATH'] if env.get('LD_LIBRARY_PATH') else '')
def binary(name):
    paths = [base / 'bin' / name, base / 'sbin' / name] if base else []
    found = next((str(path) for path in paths if path.exists()), shutil.which(name))
    if not found:
        raise SystemExit('Install MariaDB or set MARIADB_BASE to a portable MariaDB usr directory.')
    return found
client, daemon, installer = (binary(name) for name in ['mariadb', 'mariadbd', 'mariadb-install-db'])
if not (VENDOR / 'node_modules/express').exists():
    raise SystemExit('Run npm ci --prefix vendor/eshop --ignore-scripts first.')
manifest = json.loads((VENDOR / 'provenance.json').read_text())
checkout = ROOT / manifest['submodule']
if not (checkout / '.git').exists():
    raise SystemExit('Run git submodule update --init projects/database first. See docs/PROJECT_SUBMODULES.md.')
commit = subprocess.check_output(['git', '-C', str(checkout), 'rev-parse', 'HEAD'], text=True).strip()
if commit != manifest['commit']:
    raise SystemExit('Database submodule revision differs from its provenance. Review the update and run npm run sources:refresh.')
original = checkout / manifest['path']
for file in manifest['files']:
    data = (original / file['path']).read_bytes()
    if hashlib.sha256(data).hexdigest() != file['sha256']:
        raise SystemExit('Original Eshop source changed: ' + file['path'])

db = app = None
def stop(_signal, _frame):
    raise KeyboardInterrupt
signal.signal(signal.SIGTERM, stop)
signal.signal(signal.SIGINT, stop)
with tempfile.TemporaryDirectory(prefix='portfolio-eshop-') as directory:
    work = Path(directory)
    data_dir, socket = work / 'db', work / 'db.sock'
    # Copy only the reviewed application/fixture files, excluding repository config.
    for file in manifest['files']:
        target = work / 'app' / file['path']
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(original / file['path'], target)
    (work / 'app/node_modules').symlink_to(VENDOR / 'node_modules', target_is_directory=True)
    db_log = (work / 'database.log').open('w+')
    app_log = (work / 'application.log').open('w+')
    options = ['--no-defaults', '--datadir=' + str(data_dir)]
    if base:
        options.append('--basedir=' + str(base))
    def sql(text, cwd=None):
        return subprocess.run([client, '--no-defaults', '--socket=' + str(socket), '-uroot', '--local-infile=1'], input=text, text=True, cwd=cwd, env=env, capture_output=True, timeout=30)
    try:
        init = subprocess.run([installer, *options, '--auth-root-authentication-method=normal', '--skip-test-db'], env=env, stdout=db_log, stderr=subprocess.STDOUT)
        if init.returncode:
            raise RuntimeError('MariaDB initialization failed.')
        db = subprocess.Popen([daemon, *options, '--socket=' + str(socket), '--pid-file=' + str(work / 'db.pid'), '--skip-networking', '--local-infile=1', '--innodb-buffer-pool-size=32M'], env=env, stdout=db_log, stderr=subprocess.STDOUT)
        deadline = time.monotonic() + 30
        while not socket.exists() or sql('SELECT 1;').returncode:
            if db.poll() is not None or time.monotonic() > deadline:
                raise RuntimeError('The disposable MariaDB instance did not start.')
            time.sleep(.15)
        password = secrets.token_hex(24)
        bootstrap = sql("SOURCE setup.sql;\nSOURCE functions.sql;\nSOURCE ddl.sql;\nSOURCE insert.sql;\n" +
            "CREATE USER 'portfolio_demo'@'localhost' IDENTIFIED BY '" + password + "';\n" +
            "GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON eshop.* TO 'portfolio_demo'@'localhost';\n", work / 'app/sql/eshop')
        if bootstrap.returncode:
            raise RuntimeError('Original Eshop schema/data initialization failed: ' + bootstrap.stderr)
        config = work / 'app/config/db'
        config.mkdir(parents=True)
        (config / 'eshop.json').write_text(json.dumps({'socketPath': str(socket), 'user': 'portfolio_demo', 'password': password, 'database': 'eshop', 'multipleStatements': True}))
        # The source stays unchanged. The wrapper binds locally and adds a demo health route.
        (work / 'app/local-demo.cjs').write_text('''const express = require('express');
const originalListen = express.application.listen;
express.application.listen = function (_port, callback) {
  this.get('/__demo_health', (req, res) => {
    const origin = req.get('Origin') || '';
    if (/^https?:\\/\\/(localhost|127\\.0\\.0\\.1)(:\\d+)?$/.test(origin)) res.set('Access-Control-Allow-Origin', origin);
    res.set('Cache-Control', 'no-store').json({ originalEshop: true });
  });
  return originalListen.call(this, Number(process.env.ESHOP_PORT), '127.0.0.1', callback);
};
require('./index.js');
''')
        app = subprocess.Popen(['node', 'local-demo.cjs'], cwd=work / 'app', env=dict(env, ESHOP_PORT=str(args.port)), stdout=app_log, stderr=subprocess.STDOUT)
        print(f'Original Eshop: http://localhost:{args.port}/eShop/product', flush=True)
        print('Original Express/EJS UI and SQL fixtures. Database is temporary and local. Ctrl+C stops both services and discards this session.', flush=True)
        while app.poll() is None:
            if db.poll() is not None:
                raise RuntimeError('The disposable MariaDB instance stopped unexpectedly.')
            time.sleep(.5)
        if app.returncode:
            raise RuntimeError('Original Eshop stopped unexpectedly.')
    except KeyboardInterrupt:
        print('\nStopping the local Eshop demo and discarding its temporary database.', flush=True)
    except Exception:
        for label, log in [('Database', db_log), ('Application', app_log)]:
            log.flush(); log.seek(0)
            print(label + ' log:\n' + log.read()[-6000:], flush=True)
        raise
    finally:
        if app and app.poll() is None:
            app.terminate()
            try: app.wait(timeout=5)
            except subprocess.TimeoutExpired: app.kill(); app.wait()
        if db and db.poll() is None:
            sql('SHUTDOWN;')
            try: db.wait(timeout=10)
            except subprocess.TimeoutExpired: db.terminate(); db.wait(timeout=5)
        db_log.close(); app_log.close()
