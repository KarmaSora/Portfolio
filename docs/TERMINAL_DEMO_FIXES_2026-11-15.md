# FAT startup and MARVIN country input — 15 November 2026

**Current release authorization — PF-P1:** The author subsequently approved publishing the portfolio changes, including these verified repairs. Original project repositories are unchanged. [GitHub Pages hosting and release status](./GITHUB_PAGES_DEMOS.md).

The author reported two runtime failures after the initial demo pass: FAT appeared
not to enter a newly created directory, and MARVIN option 15 terminated when given
`sweden`. These have been reproduced and repaired locally under **PF-I4**.

## Version check

Both demo snapshots match the local project files byte-for-byte. Read-only remote
branch checks through the author's existing Git credentials confirmed that the
only advertised branch is `main`, at the same pinned heads:

| Repository | Remote main and snapshot |
| --- | --- |
| `KarmaSora/OperatingSystem` | `4e6d6d14fcd9329941de96ada97c7ad6e472a869` |
| `KarmaSora/python-course` | `56a2d08c21b90a9ee0a4e50849e82b3c30df7621` |

The GitHub connector could not access these private repositories, so the checks
used local Git authentication. No source repository was changed, committed or
pushed. The report does not claim to locate uncommitted code on another machine.

## FAT: blank disk metadata, not missing storage

The author used `ls`, `mkdir test`, `cd test`, without first running `format`.
The browser supplies an actual 8 MiB session-local `diskfile.bin` through MEMFS,
matching the original 2048 blocks of 4096 bytes. Its initial bytes are zero.

The original constructor reads that blank FAT as all-free blocks. Without
formatting, `mkdir` can allocate block 0, which is also the root directory. As a
result the child's listing aliases the root listing. Native reproduction showed
`pwd` becoming `/test` while `ls` continued showing the root contents. There is
no storage-exhaustion error. The original shell also deliberately keeps the same
`filesystem>` prompt after a successful `cd`.

Every new browser session now executes the original program's own `format`
command before accepting user input. The actual C++ formatter reserves root block
0 and FAT block 1. The initialization command is visible in the transcript.
Restart performs the same initialization for its new isolated disk. The C++
source, compiled filesystem algorithms and author-confirmed exit behaviour are
unchanged. The usage hint explains automatic formatting and `pwd`.

The earlier checks explicitly formatted the disk first, so they did not cover
the author's fresh-session sequence. The new checks do.

## MARVIN: case-sensitive dictionary lookup

The original `get_country_data` indexes the bundled dictionary using the exact
input. `Sweden` works, but `sweden`, `SWEDEN` and surrounding whitespace produce
an uncaught `KeyError` in option 15. Native reproduction confirmed the same crash
outside the browser.

Two small Python corrections now apply to the demo copy:

- Resolve a complete country name using stripped, case-insensitive input and
  preserve the dataset's canonical name.
- Report empty/unknown countries as a validation error and return to the menu.

Option 14 uses the same country resolver and its existing error handler. Dataset,
valid-country calculations, menu/ASCII interface and the fake AI premise are
unchanged. Immutable originals stay separate from the hash-recorded corrections
under [fixes](../vendor/terminal-projects/fixes/README.md). These corrections have
not been applied to the original Python repository.

## Asset updates and verification

Terminal builds now generate a content revision from the bundle, worker, styles,
program payloads and FAT artifacts. The demo iframe, bundle, worker and payload
requests carry that revision, so a refreshed demo uses matching new files rather
than an older cached worker or country-input payload.

Five persistent Python regression checks passed: country case/whitespace variants
match the original Sweden values; option 15 reports the data; empty/unknown names
recover; option 14 retains the original calculated comparison; and the generated
payload contains the exact reviewed corrections. Run:

```bash
python3 -B scripts/check-marvin-input.py
```

Focused browser checks cover the exact reported FAT sequence without a manual
format, separate root/child listings, child-local files, nested/parent/absolute
navigation, fresh-disk restart, MARVIN input variants, menu recovery and existing
utility behaviour. These are targeted regressions, not a claim of complete source
test-suite coverage. Build and browser evidence are retained in
`/tmp/portfolio-demo-bugfix/`; current status is recorded in the inventory/handoff.

The existing four-program browser regression pass also passed for MARVIN utilities, analyser counts/file switching/frequencies, typing/scoring, FAT operations/permissions/restart and phone layout after the shared worker/version changes.

The production /Portfolio build passed lint, type checks and all 11 generated static pages. The targeted browser checks passed against both localhost:3000 and the production export at 1440/390 px with no JavaScript errors or failed responses. The verified export was refreshed locally without overwriting the running development cache.

Portfolio/source publication and repository visibility remain unchanged.
