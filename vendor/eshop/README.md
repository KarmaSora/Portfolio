# Original Eshop local demo

`original/` holds 37 unchanged source/template/style/SQL/fixture files from `KarmaSora/database/kmom06/eshop2`; `provenance.json` pins their commit and hashes. Original database configuration/credentials are excluded.

```bash
npm ci --prefix vendor/eshop --ignore-scripts
npm run demo:eshop
# Or with a portable MariaDB installation:
MARIADB_BASE=/path/to/mariadb/usr npm run demo:eshop
```

Open `http://localhost:1337/eShop/product`. The portfolio discovers a healthy local instance and exposes **Open Eshop**. A wrapper binds Express to loopback and adds health discovery; the app's routes, EJS UI and SQL logic are unchanged. MariaDB uses a temporary Unix socket with networking disabled. Every run gets fresh fixtures and generated credentials with data/execute permissions. Ctrl+C stops both services and discards the temporary database. Existing databases and source checkouts are untouched.

The runner uses a hash-verified temporary app copy. Its separately pinned dependencies are not included in the portfolio's client bundle. Browser checks exercised catalogue, category, customer, order and create-product pages plus product creation/read/update/deletion through the original forms. This is focused verification, not a claim that every order/stock edge case was repaired.

Public deployment needs a real Node/MariaDB host. Once deployed and reviewed, configure `NEXT_PUBLIC_ESHOP_DEMO_URL`. Without that setting public builds emit no localhost demo action. This work does not deploy the backend or change repository visibility.
