# Project AI tools

This directory travels with the starter when you clone or copy it.

```text
.opencode/
├── agents/
│   └── reviewer.md
└── skills/
    ├── frontend-design/
    │   ├── SKILL.md
    │   └── LICENSE.txt
    └── ui-ux-pro-max/
        ├── SKILL.md
        ├── data/
        ├── references/
        └── scripts/
```

## Responsibilities

- Root `AGENTS.md` defines project conventions and when to use the design skills.
- Root `CLAUDE.md` imports those same instructions for Claude Code.
- Root `opencode.jsonc` holds OpenCode settings.
- `skills/` contains reusable workflows and their supporting resources.
- `agents/reviewer.md` defines an optional read-only review assistant. It inherits
  the calling session's model and denies editing, shell commands, and delegation.

OpenCode discovers project skills and agents automatically. The two skill IDs
are `frontend-design` and `ui-ux-pro-max`. Project copies take precedence over
global copies with the same IDs under standard discovery. Explicit skill sources
in configuration can override that selection; check the loaded skill's base path
if you use custom sources. Run `/reload` if newly added definitions do not appear.

Use the reviewer by asking: **“Use the reviewer subagent to review these changes.”**
The parent should provide the diff or changed-file list and verification results.
Creating the file does not automatically launch the reviewer.

## Running the UI/UX search locally

The bundled UI/UX skill includes examples written for a Claude plugin install.
For this project, use the actual script inside this directory instead of the
`${CLAUDE_PLUGIN_ROOT}` paths in those examples. From the repository root:

```bash
python3 .opencode/skills/ui-ux-pro-max/scripts/search.py "keyboard focus modal" --domain ux
python3 .opencode/skills/ui-ux-pro-max/scripts/search.py "component state" --stack react
```

From another working directory, use the script's absolute path. Python 3 is
required; the search scripts use the standard library. When persisting design
output, pass `--output-dir` with the target project's root as the skill describes.

Other tools that do not discover `.opencode/skills/` can read the local `SKILL.md`
files directly, following the root project instructions.

## Maintaining bundled skills

These are copies of the locally installed skills as of 2026-11-18, including
their supplied supporting resources. They are committed snapshots, not symlinks
to one developer's home folder, and do not update when global skills change.
Keep the supplied license and attribution files with the copied content.
Review upstream changes deliberately when refreshing these copies.

Preserve upstream files when formatting app code; `.prettierignore` excludes
the bundled skills. Python cache files are ignored by Git.
