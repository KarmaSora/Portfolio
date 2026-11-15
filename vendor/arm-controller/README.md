# Original ARM controller executable

`controller-original.elf` is the executable previously built from the supplied `ARMv7/assignment/currentCode.s` and used for the original CPUlator captures. The source copy associated with that build matched the current source byte-for-byte. Its source and executable SHA-256 hashes are recorded in `provenance.json`.

The private assembly source is not copied into this portfolio. The executable is retained so normal portfolio builds do not require installing an ARM toolchain. Rebuilding or changing the actual program requires its original repository and an intentional replacement of the executable/provenance together.

`scripts/build-arm-demo.mjs` removes only the ELF file's large empty alignment gap and updates file offsets/alignment metadata. It verifies that every loadable instruction/data byte, its memory address and the entry point remain unchanged. The resulting small ELF fits in CPUlator's program-loading URL; it is also available as a fallback download.

The demo uses CPUlator's official website and its own interface. No CPUlator application code is copied or rehosted. The author explicitly approved sending the compiled program to CPUlator in its URL for automatic loading on 15 November 2026. The private repository's visibility is unchanged. No assembly source or public share link is uploaded to CPUlator.
