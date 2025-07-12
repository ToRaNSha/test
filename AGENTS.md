# Repository Guide

## Key Directories
- `.github/` – GitHub configuration files.
- `tests/` – Jest test suite.

## Test Command
Run all tests with coverage using:

```sh
npm test
```

This runs Jest and produces coverage information in the summary.

## Code Coverage
Coverage is generated automatically by Jest. To view detailed coverage reports, run:

```sh
npm test -- --coverage
```

This outputs an HTML report in `coverage/`.

## Notes
- **Do not edit `THREAD_ACCESS_MK01.md`.** This file is considered fragile and should remain untouched.

