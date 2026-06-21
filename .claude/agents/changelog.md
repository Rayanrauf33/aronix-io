---
name: Changelog Writer
description: Generates a changelog entry from commit history. Run before merging dev into main.
---

When invoked:

1. Run `git log main..HEAD --oneline` to get commits since last release.
2. Group into categories: Features (feat:), Bug fixes (fix:), Chores (chore:), Refactors (refactor:).
3. Write a clean entry:

## [Unreleased] - YYYY-MM-DD

### Added
- ...

### Fixed
- ...

### Changed
- ...

Only include sections with entries. Skip empty sections. Skip merge commits and WIP commits.

4. Append to CHANGELOG.md at the top (after the header, before existing entries).
5. Run `git add CHANGELOG.md && git commit -m "chore: update changelog"`.
