#!/usr/bin/env python3
"""Regressions for the reported country-input crash in the portfolio demo."""
import importlib.util
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
VENDOR = ROOT / 'vendor/terminal-projects'
PROJECT = json.loads((VENDOR / 'provenance.json').read_text())['projects']['marvin']
ORIGINAL = ROOT / PROJECT['submodule'] / PROJECT['path']
FIX = json.loads((VENDOR / 'fixes/provenance.json').read_text())['projects']['marvin']
temporary = tempfile.TemporaryDirectory(prefix='portfolio-marvin-test-')
FIXED = Path(temporary.name)
for file in PROJECT['files']:
    source = ORIGINAL / file['path']
    if hashlib.sha256(source.read_bytes()).hexdigest() != file['sha256']:
        raise RuntimeError('MARVIN source changed: ' + file['path'])
    shutil.copy2(source, FIXED / file['path'])
patch = VENDOR / 'fixes' / FIX['patch']
if hashlib.sha256(patch.read_bytes()).hexdigest() != FIX['patchSha256']:
    raise RuntimeError('MARVIN patch provenance does not match')
subprocess.run(['git', 'apply', '--check', str(patch)], cwd=FIXED, check=True, capture_output=True)
subprocess.run(['git', 'apply', str(patch)], cwd=FIXED, check=True, capture_output=True)
for file in FIX['files']:
    if hashlib.sha256((FIXED / file['path']).read_bytes()).hexdigest() != file['sha256']:
        raise RuntimeError('MARVIN patched output changed: ' + file['path'])
sys.path.insert(0, str(ORIGINAL))

def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

original = load_module('original_emission_functions', ORIGINAL / 'emission_functions.py')
fixed = load_module('fixed_emission_functions', FIXED / 'emission_functions.py')

class CountryInputTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temporary = temporary
        cls.app = FIXED

    @classmethod
    def tearDownClass(cls):
        cls.temporary.cleanup()

    def run_menu(self, inputs):
        result = subprocess.run([sys.executable, '-B', 'main.py'], input=inputs, text=True,
                                capture_output=True, cwd=self.app, timeout=8,
                                env=dict(os.environ, PYTHONDONTWRITEBYTECODE='1'))
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertNotIn('Traceback', result.stderr)
        self.assertIn('Bye, bye - and welcome back anytime!', result.stdout)
        return result.stdout

    def test_case_and_whitespace_variants_keep_original_country_values(self):
        expected = original.get_country_data('Sweden')
        for name in ['Sweden', 'sweden', 'SWEDEN', ' sWeDeN ']:
            with self.subTest(name=name):
                self.assertEqual(fixed.get_country_data(name), expected)
                output = self.run_menu('15\n' + name + '\n\nq\n')
                self.assertIn('Emission: 1990:', output)
                self.assertIn('Population        - 1990:', output)

    def test_unknown_and_empty_country_return_to_menu(self):
        for name in ['Atlantiss', '', '   ']:
            with self.subTest(name=name):
                output = self.run_menu('15\n' + name + '\n\nq\n')
                self.assertIn('Use option 13 to search.', output)
                self.assertGreaterEqual(output.count("Hi, I'm Shadow"), 2)

    def test_year_comparison_accepts_lowercase_without_changing_calculation(self):
        expected = original.get_country_change_for_years('Sweden', 1990, 2017)
        self.assertEqual(fixed.get_country_change_for_years(' sweden ', 1990, 2017), expected)
        output = self.run_menu('14\n sweden ,1990,2017\n\nq\n')
        self.assertIn(str(expected) + '%', output)

    def test_unknown_country_in_year_lookup_is_recoverable(self):
        output = self.run_menu('14\nAtlantiss,1990\n\nq\n')
        self.assertIn('Country does not exist!', output)

    def test_built_payload_contains_exact_reviewed_fixes(self):
        path = ROOT / 'public/project-apps/terminal/programs/marvin.json'
        if not path.exists():
            self.skipTest('Run npm run build:project-demos before checking generated payloads')
        files = json.loads(path.read_text())
        for file in PROJECT['files']:
            source = FIXED / file['path']
            self.assertEqual(files[source.name], source.read_text())

if __name__ == '__main__':
    unittest.main(verbosity=2)
