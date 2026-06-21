# /ship

Full deployment flow: feature branch -> dev -> main.
Runs checks, opens PRs, waits for CI, merges at each stage, generates changelog.

---

## Step 1 -- Uncommitted changes

Run:
```bash
git status --porcelain
```

If there are uncommitted changes:

1. Run `git diff HEAD` and `git status` to understand what changed.
2. Generate a conventional commit message from the diff. Use the format:
   `<type>(<scope>): <short description>`
   Types: feat, fix, chore, refactor, docs, style, test.
   Scope is optional -- use the primary directory or feature affected.
   Example: `feat(login): add server action for signInWithPassword`
3. Stage and commit:
```bash
git add -A
git commit -m "<generated message>"
```

If there are no uncommitted changes, continue to Step 2.

---

## Step 2 -- Type check and lint

Run both commands:
```bash
npx tsc --noEmit
npm run lint
```

If either fails:
- Show the full error output.
- Stop. Do not proceed.
- Tell the user which command failed and what to fix.

If both pass, continue to Step 3.

---

## Step 3 -- Push feature branch

Get the current branch name:
```bash
git branch --show-current
```

If the branch is `dev` or `main`, stop and tell the user:
"You are on a protected branch. Create a feature branch first with: git checkout -b feat/<name>"

Otherwise push:
```bash
git push origin <current-branch>
```

If push fails (e.g. upstream not set), run:
```bash
git push --set-upstream origin <current-branch>
```

---

## Step 4 -- Open PR: feature branch -> dev

Get the diff for PR context:
```bash
git log dev..<current-branch> --oneline
git diff dev..<current-branch> --stat
```

Generate:
- A short PR title (conventional format, max 72 chars)
- A filled-in PR body using the template below

PR body template -- fill in every section based on the actual diff:
```
## What does this PR do?

<1-2 sentence summary of the change>

## Type of change

- [x] <whichever applies: Feature / Fix / Chore / Refactor>

## Changes made

- <bullet per meaningful change>

## How to test

1. <step-by-step verification>

## Checklist

- [x] Code follows project conventions (named exports, no em dashes, no `any` types)
- [x] TypeScript has no new errors (`npm run build`)
- [x] Tested locally
- [x] No `console.log`s left in
- [x] PR targets `dev`, not `main`
```

Open the PR:
```bash
gh pr create --base dev --head <current-branch> --title "<title>" --body "<filled body>"
```

Capture the PR number from the output (e.g. `https://github.com/.../pull/42` -> `42`).

If PR creation fails, stop and report the error.

---

## Step 5 -- Wait for CI on the feature -> dev PR

Poll every 30 seconds. On each tick run:
```bash
gh pr checks <PR-number> --watch=false
```

Parse the output:
- If all checks show `pass` -> continue to Step 6.
- If any check shows `fail` -> stop. Report which check failed and its log URL. Do not merge.
- If checks are still `pending` -> wait 30 seconds and poll again.
- After 10 minutes with no resolution, stop and tell the user CI is taking longer than expected and to check GitHub Actions manually.

---

## Step 6 -- Merge feature branch into dev

```bash
gh pr merge <PR-number> --merge --delete-branch
```

If merge fails, stop and report the error.

Confirm the merge landed:
```bash
git fetch origin
git log origin/dev --oneline -5
```

---

## Step 7 -- Generate changelog entry

Invoke the changelog agent defined at `.claude/agents/changelog.md`.

The agent should:
1. Run `git log main..origin/dev --oneline` to get commits being promoted.
2. Generate a changelog entry in Keep a Changelog format:
```
## [Unreleased] - <YYYY-MM-DD>

### Added
- <entry>

### Changed
- <entry>

### Fixed
- <entry>
```
   Only include sections that have relevant entries. Omit empty sections.
3. Return the generated entry text.

---

## Step 8 -- Append changelog and push to dev

Pull latest dev:
```bash
git checkout dev
git pull origin dev
```

Check if `CHANGELOG.md` exists:
```bash
ls CHANGELOG.md
```

If it does not exist, create it with this header:
```
# Changelog

All notable changes to this project will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

```

Prepend the changelog entry from Step 7 directly after the header (before any existing entries).

Commit and push:
```bash
git add CHANGELOG.md
git commit -m "chore: update changelog"
git push origin dev
```

If push fails, stop and report the error.

---

## Step 9 -- Open PR: dev -> main, then merge it

Open the PR:
```bash
gh pr create --base main --head dev --title "chore: release to production" --body "Promoting dev to main. Changelog updated. CI passed on dev."
```

Capture the PR number.

Wait for CI on this PR using the same polling logic as Step 5.

Once CI is green, merge:
```bash
gh pr merge <PR-number> --merge
```

If any part fails, stop and report.

---

## Step 10 -- Report completion

Run:
```bash
git fetch origin
git log origin/main --oneline -1
```

Report to the user:

```
Ship complete.

Feature branch : <branch-name>
Merged into    : dev -> main
Final commit   : <hash> <message>
Changelog      : CHANGELOG.md updated
```

If any step failed at any point earlier and you stopped there, instead report:

```
Ship stopped at step <N>: <reason>
No changes were merged beyond that point.
Next step: <what the user should do to resolve it>
```
