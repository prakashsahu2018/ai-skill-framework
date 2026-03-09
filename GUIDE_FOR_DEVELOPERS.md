# Developer Guide — Using Skills from This Repository

This guide is for developers who want to **install and use** skills from this repository in their projects.

## Prerequisites

- Claude Code installed and authenticated
- Claude Code version 1.0.33 or later (`claude --version` to check)

## Setup (One-Time)

### Step 1: Add the marketplace

```shell
/plugin marketplace add prakashsahu2018/ai-skill-framework
```

This registers the skill catalog. No skills are installed yet.

### Step 2: Install the plugin

**Option A — CLI:**

```shell
/plugin install ai-skill-framework@ai-skill-framework
```

**Option B — Interactive UI:**

1. Run `/plugin`
2. Go to **Discover** tab
3. Select **ai-skill-framework**
4. Choose install scope:
   - **User** — available across all your projects
   - **Project** — available for all collaborators on this repo (adds to `.claude/settings.json`)
   - **Local** — available only for you in this repo

That's it. Skills are now available.

## Using Skills

### Automatic

Claude automatically uses skills when your task matches the skill description. For example, if you ask Claude to create a REST API, it will automatically apply the `java-backend` skill.

### Manual

Invoke a skill directly with the `/` command:

```shell
/ai-skill-framework:java-backend
```

### Available Skills

| Skill          | Trigger                                                     |
|----------------|-------------------------------------------------------------|
| `java-backend` | Creating REST APIs, JWT security, Spring Boot service logic |

## Getting Updates

When the maintainer pushes changes to skills, here's how you get them:

### Option 1: Enable Auto-Update (Recommended)

1. Run `/plugin`
2. Go to **Marketplaces** tab
3. Select **ai-skill-framework**
4. Select **Enable auto-update**

With this enabled, Claude Code automatically fetches the latest skills every time you start a new session.

### Option 2: Manual Update

Run this anytime to pull the latest changes:

```shell
/plugin marketplace update ai-skill-framework
```

### Apply Updates in Current Session

After an update, apply changes without restarting:

```shell
/reload-plugins
```

## Setup for Your Entire Team

To auto-configure this marketplace for everyone on a project, add this to your project's `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "ai-skill-framework": {
      "source": {
        "source": "github",
        "repo": "prakashsahu2018/ai-skill-framework"
      }
    }
  }
}
```

When team members trust the repo folder, Claude Code will prompt them to install the marketplace and plugins.

## Troubleshooting

| Problem                        | Solution                                                            |
|--------------------------------|---------------------------------------------------------------------|
| `/plugin` command not found    | Update Claude Code to v1.0.33+ (`npm update -g @anthropic-ai/claude-code`) |
| Skills not appearing           | Run `/reload-plugins` or restart Claude Code                        |
| Marketplace not loading        | Check internet access; re-run `/plugin marketplace add prakashsahu2018/ai-skill-framework` |
| Plugin cache stale             | Clear cache: `rm -rf ~/.claude/plugins/cache`, restart, reinstall   |

## Uninstalling

Remove the plugin:

```shell
/plugin uninstall ai-skill-framework@ai-skill-framework
```

Remove the marketplace:

```shell
/plugin marketplace remove ai-skill-framework
```
