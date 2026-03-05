#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const https = require("https");

const command = process.argv[2];
const skillName = process.argv[3];

if (command !== "install") {
    console.log("Usage: ai-skill install <skill-name>");
    process.exit(1);
}

if (!skillName) {
    console.log("Please provide skill name");
    process.exit(1);
}

const skillUrl =
    "https://raw.githubusercontent.com/prakashsahu2018/ai-skill-framework/main/skills/" +
    skillName +
    "/SKILL.md";

const projectRoot = process.cwd();
const claudeDir = path.join(projectRoot, ".claude");
const skillDir = path.join(claudeDir, "skills");

if (!fs.existsSync(claudeDir)) {
    fs.mkdirSync(claudeDir);
}

if (!fs.existsSync(skillDir)) {
    fs.mkdirSync(skillDir);
}

const skillFile = path.join(skillDir, skillName + ".md");

const file = fs.createWriteStream(skillFile);

https.get(skillUrl, function (response) {
    response.pipe(file);

    file.on("finish", () => {
        file.close();

        const configPath = path.join(claudeDir, "config.yaml");

        if (!fs.existsSync(configPath)) {
            fs.writeFileSync(
                configPath,
                `context_files:\n  - .claude/skills/${skillName}.md\n`
            );
        }

        console.log("✅ Skill installed:", skillName);
    });
});