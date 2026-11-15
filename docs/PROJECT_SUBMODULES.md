# Project submodules and the GitHub build token

The portfolio reads project source from four pinned Git submodules. Project
repositories stay unchanged. Portfolio UI, browser adapters, build scripts,
provenance and a small MARVIN country-input patch stay in this repository.

| Submodule | Original repository | Used by |
| --- | --- | --- |
| `projects/showcase-serl` | `KarmaSora/showcaseSERL` | Original ShowcaseSERL interface/data |
| `projects/python-course` | `KarmaSora/python-course` | MARVIN, Typing Trainer, related Text Analyser |
| `projects/operating-system` | `KarmaSora/OperatingSystem` | FAT Lab2 source and optional WASM rebuild |
| `projects/database` | `KarmaSora/database` | Original optional local Eshop runner |

There are no tracked copies of these source trees under `vendor/*/original/`.
The builders read the submodules directly and include only the explicitly
listed demo files. ARM's compiled executable and the Compiler's recorded
artifacts remain separate assets; they do not require more source repositories.
FAT's pinned WASM remains an asset so ordinary builds need no Emscripten SDK.

The deployment target remains the existing GitHub Pages testing site. This
migration does not set up a Pi, Eshop hosting or a new custom-domain deployment.

## 1. Create your read-only token

On GitHub, sign into **KarmaSora**, then open:

**[Create a fine-grained personal access token](https://github.com/settings/personal-access-tokens/new)**

The navigation path is your profile picture → **Settings** → **Developer
settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate
new token**.

Fill in these settings:

| Setting | Value |
| --- | --- |
| Token name | `Portfolio project source reader` |
| Expiration | Choose an expiration you will remember to renew, for example 90 days. |
| Resource owner | `KarmaSora` |
| Repository access | **Only select repositories** |
| Selected repositories | **showcaseSERL**, **python-course**, **OperatingSystem**, **database** |
| Repository permissions → Contents | **Read-only** |
| Metadata | Leave its automatically included read access. |
| Other permissions | Leave unselected. |

Click **Generate token**, then copy the value for the next step. The portfolio
repository itself is public; the private-project selections above grant the
build access to its source dependencies. No write, administration or workflow
permission is needed on the original projects.

These steps use GitHub's [fine-grained token settings](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token).

## 2. Put it in the Portfolio repository's Actions secrets

Open **[Portfolio → Settings → Secrets and variables → Actions](https://github.com/KarmaSora/Portfolio/settings/secrets/actions)**.

Choose **New repository secret**, then enter:

```text
Name: PORTFOLIO_FINE_GRAINED_PERSONAL_ACCESS_TOKEN
Secret: paste the token you just generated
```

Click **Add secret**. Use the **Secrets** tab; this is a repository secret, not
an Actions variable or a `github-pages` environment secret. The build job needs
it before the deployment job starts. Do not put it in `.env`, `portfolio.json`,
source files or a chat message.

GitHub documents this screen under [repository Actions secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets#creating-secrets-for-a-repository).

The workflow checks that the secret exists, checks out the four submodules
using it, and disables persisted Git credentials. Later build steps use the
checked-out files. The secret is never passed to Next's public environment or
included in `out/`; only `out/` is uploaded to GitHub Pages.

## 3. Publish the migration after the secret is ready

The migration is prepared locally first. Adding the secret alone does not
publish these changes. Once the changes are pushed to `main`, the existing
**Deploy to GitHub Pages** workflow checks out the submodules and rebuilds the
site. For a retry after updating a secret, use **Actions → Deploy to GitHub
Pages → select the run → Re-run failed jobs**, or **Run workflow** on `main`
after the migration is present there.

Check that the credential check, Checkout, Build, MARVIN regression check and
Deploy jobs succeed. Then open:

**https://karmasora.github.io/Portfolio/**

Check ShowcaseSERL plus the terminal demos. For FAT, enter `mkdir test`,
`cd test`, then `pwd`. For MARVIN, choose `15`, then enter `sweden`.

Until the migration is published, the live site remains the previous snapshot
deployment. Changing a token does not change which project commit is selected.

## Working locally

The Actions secret is only for GitHub's build machines. On your computer, use
your existing GitHub Git authentication, for example GitHub CLI/Git Credential
Manager or your SSH configuration. `.gitmodules` uses HTTPS URLs. GitHub's
[checkout guidance](https://github.com/actions/checkout/tree/v4#checkout-multiple-repos-private)
explains why the default Actions token cannot read other private repositories.

For a new checkout:

```bash
git clone --recurse-submodules https://github.com/KarmaSora/Portfolio.git
cd Portfolio
npm ci
npm run dev
```

For an existing checkout after pulling the migration:

```bash
git pull --ff-only
git submodule sync
git submodule update --init
npm ci
npm run dev
```

The current working checkout already has the submodules initialized. The
portfolio builders do not install dependencies inside the source repositories,
edit their files, or run their package scripts.

## Updating a project later

After committing and pushing an update in its original repository, advance
only the relevant submodule. For the Python projects, for example:

```bash
git submodule update --remote --checkout projects/python-course
npm run sources:refresh
npm run build
python3 -B scripts/check-marvin-input.py
git diff --submodule=log
```

`sources:refresh` records the checked-out commits and recalculates the existing
file allowlists' hashes. It never copies project source trees. It refuses
tracked edits in the submodules and requires reviewing the MARVIN patch if its
input files changed. No source is fetched by that refresh command itself.

After the checks and a browser review, commit the updated submodule pointer
and changed provenance files together in the portfolio. A normal
`git submodule update --init` restores the currently recorded pointer; the
`--remote` option deliberately selects the source repository's newer branch
revision. See [Git's submodule documentation](https://git-scm.com/docs/git-submodule).

If the FAT source revision changes, refresh provenance first, then rebuild its
binary with Emscripten **4.0.21** before the ordinary build:

```bash
EMXX=/path/to/emsdk/upstream/emscripten/em++ npm run build:fat-demo
npm run build
```

The migration uses exactly the previous source commits and preserves the
existing program behaviour. Future source changes still need compatibility
checks before deployment. Automatic update PRs are not configured by this change.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Credential check reports a missing secret | Add a **repository secret** named exactly `PORTFOLIO_FINE_GRAINED_PERSONAL_ACCESS_TOKEN` in the Portfolio repository. |
| Checkout reports repository not found / 403 / authentication failure | Confirm the token owner, its expiration, all four selected repositories and Contents read permission. Check repository approval requirements if ownership changes. |
| Build says a submodule is missing | Run `git submodule update --init` using working local Git authentication. |
| Build reports a source revision/hash mismatch | Restore the recorded submodule revision, or review the intended update and run `npm run sources:refresh`. |
| Refresh requests a MARVIN patch review | The patched original files changed. Update the small patch and its input/output hashes, then run its regression checks. |
| Build says the FAT binary uses another revision | Rebuild FAT with the pinned Emscripten toolchain after refreshing its source provenance. |
| Builds stop after the token expires | Generate a replacement with the same four repositories/permissions, update the existing Actions secret, then rerun the workflow. |

## Verification status

Local verification passed:

- A fresh `git submodule update --init --depth 1` checked out all four pinned
  revisions from GitHub using the workstation's existing Git authentication.
- The production export passed compilation, lint and TypeScript checks; all
  seven demo routes were generated. Five MARVIN regressions passed.
- Browser checks passed original ShowcaseSERL styling/data/search/filter/sort,
  project/QR navigation, kiosk timing, deep links and phone layout, plus FAT
  directory/file operations/restart and MARVIN country-input recovery.
- Missing submodules, mismatched commits, altered source hashes, dirty source
  refreshes and altered patch hashes were rejected in a disposable checkout.
- Refreshing unchanged sources preserved provenance exactly. All four source
  worktrees stayed unchanged after building/testing. Terminal runtime revision
  remains `8dc899fd4db20436`.
- The workflow's missing-secret branch and its submodule/credential-persistence
  settings were checked locally.
- The optional local Eshop runner passed catalogue/category/customer/order/form
  page checks and product create/read/update/delete with a disposable database
  on a separate port. Its source checkout stayed unchanged; no backend is hosted.
- Rebuilt Showcase JavaScript/CSS/data, all three Python payloads, FAT WASM and
  the ARM executable match the earlier working export byte-for-byte. Local
  `out/` was refreshed from the verified build; the running dev cache was preserved.

Temporary evidence is in `/tmp/portfolio-submodule-migration/`. These are focused
migration checks. The actual Actions checkout with `PORTFOLIO_FINE_GRAINED_PERSONAL_ACCESS_TOKEN` can
only be verified after you add that secret and the migration is published.
