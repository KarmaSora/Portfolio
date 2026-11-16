# Set up portfolio.karammatar.com on Cloudflare

The portfolio gets a separate Cloudflare Worker named **karam-portfolio** at
**https://portfolio.karammatar.com/**. The existing GitHub Pages copy stays at
**https://karmasora.github.io/Portfolio/**. Both are built from the same repository.
Anime Watcher keeps its existing hostname and service; no Pi setup is needed.

GitHub Actions builds both copies. It already has access to the private source
submodules through `PORTFOLIO_FINE_GRAINED_PERSONAL_ACCESS_TOKEN`. Cloudflare
receives only the finished static export, so no second GitHub integration or
source token needs configuring in Cloudflare.

## 1. Copy the Cloudflare account ID

1. Open [the Cloudflare dashboard](https://dash.cloudflare.com/) and select the
   account containing **karammatar.com**.
2. Open **Workers & Pages**.
3. In **Account Details**, copy **Account ID**. This is a 32-character value.
   You can also press **Ctrl+K**, search **Copy account ID**, and select it.

Use the **Account ID**, rather than the separate Zone ID shown for a domain.
[Cloudflare's account-ID instructions](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).

## 2. Create a Cloudflare deployment token

1. In that Cloudflare account, open **Manage Account → API Tokens**.
2. Select **Create Token**.
3. Under **Permission policies**, open **Custom** and choose
   **Edit Cloudflare Workers**. In the profile-token interface, the equivalent
   option is **Use template** beside **Edit Cloudflare Workers**.
4. Name it **Portfolio GitHub deployment**.
5. Restrict **Account Resources** to the account containing `karammatar.com`.
6. Restrict **Zone Resources** to **Specific zone → karammatar.com**. The
   configuration attaches `portfolio.karammatar.com` as a Worker custom domain.
7. Leave the template's permissions in place. Choose an expiration you can renew
   before it stops future deployments. Leave client-IP filtering empty because
   this runs on GitHub-hosted build machines.
8. Continue to the summary and create the token. Copy its value for step 3.

This follows Cloudflare's [GitHub Actions authentication instructions](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/#1-authentication).
This is a **Cloudflare API token**, separate from the existing GitHub token.

## 3. Save the two settings in GitHub

Open [Portfolio → Settings → Secrets and variables → Actions](https://github.com/KarmaSora/Portfolio/settings/secrets/actions).

First select **Secrets → New repository secret**:

| Field | Value |
| --- | --- |
| Name | `CLOUDFLARE_API_TOKEN` |
| Secret | Paste the new Cloudflare token. |

Save it. Keep the existing `PORTFOLIO_FINE_GRAINED_PERSONAL_ACCESS_TOKEN` secret.
The two tokens serve different services. Put the token into the GitHub secret
field, not a chat message or a repository file.

Then select **Variables → New repository variable**:

| Field | Value |
| --- | --- |
| Name | `CLOUDFLARE_ACCOUNT_ID` |
| Value | Paste the account ID from step 1. |

Save this as a **repository variable**, not a secret. The workflow uses its
presence to enable Cloudflare deployment. Add the API-token secret first.

## 4. Run the prepared deployment

1. Open [Portfolio → Actions](https://github.com/KarmaSora/Portfolio/actions).
2. Select **Deploy portfolio to Cloudflare** in the workflow list.
3. Select **Run workflow**, choose **main**, then confirm **Run workflow**.
4. Open the run and wait for its steps to succeed. It checks out the private
   projects, installs the pinned dependencies, builds for the hostname root,
   runs the MARVIN regressions, then uploads the static site with Wrangler.

The worker and its custom-domain attachment are created by this deployment.
There is no empty Worker project or Cloudflare Git build to configure manually.
Later pushes to `main` update both hosts through their separate workflows.
Before the account-ID variable is configured, the Cloudflare job is skipped.

## 5. Check the domain in Cloudflare

Open **Workers & Pages → karam-portfolio → Settings → Domains & Routes**.
You should see **portfolio.karammatar.com** as a **Custom Domain**. The Wrangler
configuration declares that exact hostname; Cloudflare manages its DNS record
and certificate. It can take time for initial certificate issuance and DNS
updates to finish.

Open **https://portfolio.karammatar.com/** once it is active. The same worker
also has a `workers.dev` URL for checking the deployment while the custom
hostname activates. It appears in the workflow output and Worker dashboard.

The custom domain is declared in `wrangler.jsonc`, so future deployments keep it.
Use the Worker custom-domain settings when troubleshooting; adding a manual
CNAME alone is not this setup's deployment mechanism.
[Cloudflare custom-domain configuration](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

If deployment reports an existing DNS record or another Worker already owning
`portfolio.karammatar.com`, inspect that hostname's record/binding first. The
deployment does not deliberately replace conflicting origins or DNS records.
Anime Watcher's hostname does not need changing.

## 6. Check the actual portfolio and demos

- Homepage images, project details and CV download load.
- `/demos/showcase/` shows the original ShowcaseSERL UI and its catalogue.
- `/demos/fat/`: enter `mkdir test`, `cd test`, then `pwd`.
- `/demos/marvin/`: choose `15`, then enter `sweden`.
- `/demos/compiler/`, `/demos/arm/`, `/demos/typing/` and `/demos/analyser/` load.
- The existing GitHub Pages address still works independently.

After saving the two GitHub settings, Karam can run the workflow himself or tell
Codex the settings are saved so deployment and external HTTPS verification can
continue. No token value needs to be shared in chat.

## Build and hosting details

| Build | Command | URL prefix | Hosting |
| --- | --- | --- | --- |
| GitHub Pages | `npm run build` with `NEXT_PUBLIC_BASE_PATH=/Portfolio` | `/Portfolio` | Existing Pages workflow |
| Cloudflare | `npm run build:cloudflare` | Empty; hostname root | New Cloudflare workflow |

`build:cloudflare` overrides any inherited `/Portfolio` base path and selects
`https://portfolio.karammatar.com/` for metadata. The jobs use separate build
machines, so their `out/` folders cannot overwrite one another.

`wrangler.jsonc` serves `out/` using directory indexes and normal 404 handling;
it does not run the Next development server or an application database. The
Cloudflare API token is available only to configuration validation/deployment,
not the frontend build. The original source repositories remain unchanged.

For a deliberate local deployment after authenticating Wrangler:

```bash
git submodule update --init
npm ci
npm run build:cloudflare
npx wrangler@4.158.0 deploy
```

## Setup status

The hostname/build configuration and workflow are ready. Both production
exports passed build/lint/TypeScript checks and five Python regressions. Browser
checks passed the catalogue/details, metadata/asset prefixes, all seven demo
routes, original Showcase data/UI and 390 px layouts for both hosting prefixes.
Wrangler 4.158.0 passed a deployment dry run; the local Workers emulator passed
FAT directory/file operations/restart and MARVIN country-input handling with no
observed browser errors or failed local responses. Setup gating, missing
credentials and invalid account IDs were checked without real token values.

Evidence is retained in `/tmp/portfolio-cloudflare-setup/`. The original project
submodules remain unchanged. Cloudflare credentials and actual deployment still
need the steps above; the new domain is not claimed active until external HTTPS
checks pass.
