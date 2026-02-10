# Protocol: End of Task

**When to use**: After completing any feature, fix, or meaningful change-set
**Purpose**: Ensure changes are validated, committed, pushed, and documented reliably
**Executor**: This protocol is executed by the AI agent by default; the human may override or pause it explicitly

---

## Standard Checklist (Run in Order)

### 1. Update TODO.md

- [ ] Mark completed item as done
- [ ] Add any new follow-up tasks discovered during implementation

### 2. Run Validation

- [ ] Open in browser — no console errors
- [ ] Test on mobile viewport (375px width)
- [ ] Test offline behaviour (if service worker is active)
- [ ] Audio plays correctly (if audio changes made)

**If validation can't be run**: Explain why explicitly.

### 3. Commit

**Format**:
```
<type>: <summary in 50 chars or less>

- Bullet 1 (what changed)
- Bullet 2 (why, if non-obvious)
```

**Types**: `feat`, `fix`, `ui`, `docs`, `refactor`, `test`, `chore`

### 4. Push

**Command**: `git push`

**Verification**:
- `git status` shows "up to date with origin/main"
- OR push output shows remote ref updated

**Report**:
- "pushed" if verified
- "not pushed" or "not confirmed" if any ambiguity

### 5. Report Back

**Standard format**:

```
## Task: <task name>

**Files changed**: <list of modified files>
**Validation**: <browser test result>
**Commit**: `<hash>` - "<commit message summary>"
**Push status**: <pushed | not pushed + error>
```

### 6. Update NOW.md (MANDATORY)

- [ ] Update current state, active work, and recent context
- [ ] This is the PRIMARY handover document — next session reads this first
- [ ] Keep it concise (~50 lines max)

### 7. Append to Session Log (ARCHIVE — brief only)

- [ ] Append 3-4 lines to `ops/ARCHIVE/SESSION_LOG.md`:
  ```
  ### Session [N] ([date])
  Focus: [what was worked on]
  Commits: [key commit hashes]
  Status: [complete / in progress / blocked]
  ```
- [ ] Do NOT read this file at session start — it is ARCHIVE (write-only append)

---

## Important Notes

### When to Skip This Protocol

- User explicitly says "no commit yet" or "don't push"
- Task is incomplete or experimental
- User requests "stop" or "pause"

### When to Run This Protocol Automatically

- **Default behavior**: Run after every completed task unless told otherwise
- Goal is to reduce human workload, not increase it

### Never Claim Success Without Proof

- Don't report "pushed" if you can't confirm remote updated
- Don't report "works" if you didn't test in browser
- Don't report "fixed" if you didn't verify the fix

**If uncertain**: Be explicit about what you couldn't verify and why.
