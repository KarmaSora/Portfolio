# Local MARVIN country-input fixes

The immutable originals remain under `../original/marvin/`. These two files are
reviewable corrections applied to the portfolio demo copy at build time; the
private source repository is unchanged. `provenance.json` records the original
commit, input hashes and corrected output hashes. Builds verify both sides before
overlaying a corrected file into the delivered Python payload.

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
