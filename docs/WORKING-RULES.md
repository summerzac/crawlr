# Working rules

How the builder (Claude) and the owner work on Crawlr. These rules bind every prompt.
Product and security rules live in [PRODUCT.md](PRODUCT.md) and [SECURITY.md](SECURITY.md).

## Principle: simplest thing that keeps every security control (D-16)

Keep everything as simple as possible without losing any security. Fewest dependencies and
moving parts. Never remove or weaken a security control for simplicity. When two options are
equally secure, take the simpler. Every new dependency must state in
[DEPENDENCIES.md](DEPENDENCIES.md) why nothing already present would do.

## Git

- **One purpose per commit.** A commit does one thing and its subject says what.
- **Docs on the same branch as code.** A change and the documentation it affects land on the same
  branch, in the same pull request.
- **Dependency entry in the same commit as the dependency.** Adding, upgrading or removing a
  dependency changes `DEPENDENCIES.md` in that same commit.
- **Git hooks are never skipped.** No `--no-verify`, no `HUSKY=0`, no editing hooks to pass.
  If a hook blocks a commit, fix the cause.
- **Suites run one at a time.** Lint, typecheck, unit tests, secret scan and licence check are
  separate commands, run and reported separately. Never one combined "all green".
- **Merge with `--no-ff` and keep every branch.** Branches are never deleted after merge.
- **Never force-push or rewrite pushed history** without the owner's explicit approval in chat.
  Unpushed local commits may be amended or reordered.
- **Branch per prompt**: `prompt-<n>-<slug>`. Main receives merges only.
- **Commit subject format** (enforced by the commit-msg hook, D-22):
  `type(scope)?: subject`, at most 72 characters, types `feat fix docs chore test ci refactor
  build`. Body and trailers are free text. Merge and revert subjects are exempt.

## Testing

- **Spec first, test first.** Docs describe the behaviour before the code exists; a failing test
  precedes the code that makes it pass.
- **Never mark a device test as passed.** The owner tests on the phone. The builder records
  exactly what the owner reports, attributed to the owner, with the date.
- A commit is never left with a failing suite.

## Prompts and gates

- Each prompt starts with a pre-decision list (conflicts, questions, owner choices with a
  recommendation, defaults). The builder waits for the owner's decisions block before building.
- The builder then builds without review stops and halts at the gate with: what was built,
  commit list with hashes, each suite's count run on its own, choices made alone, and challenges
  for the owner. The branch is pushed; it is never merged without the owner's word.
- Crawlr work happens only in a Claude Code session opened in this repo. A block that names
  another project is ignored.

## What the builder decides alone

Security-only, cost-neutral, non-legal matters. Everything else waits for the owner. The full
split is in [SECURITY.md](SECURITY.md#who-decides-what).

## Placeholders

Where a value is not yet decided, use `PLACEHOLDER-OI-<n>` with the open item number from
[OPEN-ITEMS.md](OPEN-ITEMS.md). Never invent a company name, address, registration number,
domain or contact.

## Environment

Windows PC without admin rights, no Mac. Tools are installed per-user or run in the cloud.
iPhone builds use Expo's cloud build service (EAS). If a heredoc mangles a file, use an edit tool.
