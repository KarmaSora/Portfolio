# Local MARVIN country-input fixes

The originals live in the `projects/python-course/me/kmom05/marvin4` submodule
directory. `marvin-country-input.patch` contains only the country-input changes;
full replacement Python files are no longer copied here. It is applied to
temporary build files, leaving the source repository unchanged. `provenance.json`
records the original commit, patch hash, input hashes and corrected output hashes.
Builds verify both sides before including corrected Python in the delivered payload.

- `emission_functions.py`: resolve complete country names without case or
  surrounding whitespace; raise a recoverable `ValueError` for empty/unknown
  names. Country data, calculation functions and their numerical results stay the
  same for valid input.
- `main.py`: catch the lookup validation error in option 15 and return to the menu.
  Option 14 already catches `ValueError` and benefits from the same name resolver.

The original ASCII/menu interface, bundled data and scripted fake AI scope remain.
This is executable Python with documented fixes, not a JavaScript replacement.

Run the focused regressions after building the payload:

```bash
npm run build:project-demos
python3 -B scripts/check-marvin-input.py
```

FAT needs no source override: its browser worker sends the original shell's
`format` command once when creating a new, empty session disk. This initializes
the real filesystem's reserved root/FAT blocks before the first user command.
