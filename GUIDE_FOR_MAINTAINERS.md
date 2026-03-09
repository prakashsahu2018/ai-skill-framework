# Skill Maintainer Guide

This guide is for developers who **create, update, and manage skills** in this repository.

## Repository Structure

```
ai-skill-framework/
├── .claude-plugin/
│   ├── plugin.json          # Plugin identity (name, version, author)
│   └── marketplace.json     # Marketplace config (lists all plugin bundles)
├── skills/
│   └── java-backend/
│       └── SKILL.md          # Skill definition with YAML frontmatter
├── GUIDE_FOR_MAINTAINERS.md  # This file
├── GUIDE_FOR_DEVELOPERS.md   # Guide for developers who use these skills
└── README.md
```

## Adding a New Skill

1. Create a folder under `skills/` with a lowercase, hyphenated name:

   ```bash
   mkdir -p skills/my-new-skill
   ```

2. Create `skills/my-new-skill/SKILL.md` with YAML frontmatter:

   ```yaml
   ---
   name: my-new-skill
   description: "Clear description of what this skill does and when to use it."
   ---

   # My New Skill

   Instructions that Claude will follow when this skill is active.

   ## Guidelines
   - Guideline 1
   - Guideline 2
   ```

3. Register the skill in `.claude-plugin/marketplace.json` — add the path to the `skills` array inside the relevant plugin bundle:

   ```json
   "skills": [
     "./skills/java-backend",
     "./skills/my-new-skill"
   ]
   ```

4. Bump the `version` in both `plugin.json` and `marketplace.json` (use semantic versioning).

5. Commit and push to `main`.

## Updating an Existing Skill

1. Edit the `SKILL.md` file inside the skill folder.
2. Bump the `version` in `plugin.json` and `marketplace.json`.
3. Commit and push.

**How updates reach other developers:**
- Developers with **auto-update enabled** get the latest version automatically when they start Claude Code.
- Others can manually run: `/plugin marketplace update ai-skill-framework`
- After update, run `/reload-plugins` to apply changes without restarting.

## SKILL.md Frontmatter Reference

| Field                      | Required?   | Description                                              |
|----------------------------|-------------|----------------------------------------------------------|
| `name`                     | No          | Skill identifier (defaults to folder name)               |
| `description`              | Recommended | What the skill does — Claude uses this to auto-trigger    |
| `disable-model-invocation` | No          | Set `true` to prevent Claude from auto-triggering         |
| `user-invocable`           | No          | Set `false` to hide from `/` menu                        |
| `allowed-tools`            | No          | Restrict which tools Claude can use                       |
| `context`                  | No          | Set `fork` to run in isolated subagent                    |

## Adding Supporting Files

Skills can include extra files (templates, scripts, examples) alongside `SKILL.md`:

```
skills/my-skill/
├── SKILL.md           # Main instructions (required)
├── templates/         # Templates Claude can use
├── examples/          # Example outputs
└── scripts/           # Scripts Claude can run
```

Reference them from `SKILL.md` so Claude knows when to load them.

## Creating a New Plugin Bundle

If you want to group skills into a separate installable bundle, add a new entry in `marketplace.json`:

```json
{
  "name": "frontend-skills",
  "description": "Skills for frontend development",
  "source": "./",
  "strict": false,
  "skills": [
    "./skills/react-patterns",
    "./skills/css-conventions"
  ]
}
```

Developers can then install just that bundle: `/plugin install frontend-skills@ai-skill-framework`

## Versioning

Follow semantic versioning:
- **Patch** (1.0.0 -> 1.0.1): Fix typos, clarify instructions
- **Minor** (1.0.0 -> 1.1.0): Add new skills, enhance existing ones
- **Major** (1.0.0 -> 2.0.0): Breaking changes to skill behavior

## Testing Locally

Before pushing, test your plugin locally:

```bash
claude --plugin-dir ./
```

Then try invoking your skill:

```
/ai-skill-framework:java-backend
```

## Checklist Before Pushing

- [ ] `SKILL.md` has YAML frontmatter with `name` and `description`
- [ ] Skill path is added to `marketplace.json`
- [ ] Version bumped in `plugin.json` and `marketplace.json`
- [ ] Tested locally with `claude --plugin-dir ./`
- [ ] `description` is clear enough for Claude to know when to auto-trigger
