import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const skillsDir = path.join(root, "skills");
const namePattern = /^[a-z0-9-]+$/;

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listSkillDirs() {
  if (!(await exists(skillsDir))) {
    return [];
  }

  const entries = await readdir(skillsDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

async function listFilesRecursive(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFilesRecursive(entryPath)));
      continue;
    }

    if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) {
    return null;
  }

  const data = {};
  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separator = line.indexOf(":");
    if (separator === -1) {
      return null;
    }

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  return data;
}

async function validateSkill(skillName) {
  const errors = [];
  const skillPath = path.join(skillsDir, skillName);
  const skillMd = path.join(skillPath, "SKILL.md");

  if (!namePattern.test(skillName)) {
    errors.push(`skill folder name must use lowercase letters, digits, and hyphens: ${skillName}`);
  }

  if (!(await exists(skillMd))) {
    errors.push("missing SKILL.md");
    return errors;
  }

  const content = await readFile(skillMd, "utf8");
  const frontmatter = parseFrontmatter(content);
  if (!frontmatter) {
    errors.push("SKILL.md must start with simple YAML frontmatter");
    return errors;
  }

  if (frontmatter.name !== skillName) {
    errors.push(`frontmatter name must equal folder name (${skillName})`);
  }

  if (!frontmatter.description || frontmatter.description.length < 80) {
    errors.push("frontmatter description must be present and descriptive");
  }

  const extraKeys = Object.keys(frontmatter).filter(
    (key) => key !== "name" && key !== "description",
  );
  if (extraKeys.length > 0) {
    errors.push(`frontmatter has unsupported keys: ${extraKeys.join(", ")}`);
  }

  if (/\[TODO|TODO:/i.test(content)) {
    errors.push("SKILL.md contains TODO markers");
  }

  const linkedResourcePaths = [
    ...content.matchAll(/`((?:references|examples)\/[^`]+)`/g),
  ].map((match) => match[1]);

  for (const linkedResourcePath of linkedResourcePaths) {
    const resourcePath = path.join(skillPath, ...linkedResourcePath.split("/"));
    if (!(await exists(resourcePath))) {
      errors.push(`linked resource does not exist: ${linkedResourcePath}`);
    }
  }

  const skillFiles = await listFilesRecursive(skillPath);
  for (const filePath of skillFiles) {
    if (!/\.(md|yaml|yml|json)$/i.test(filePath)) {
      continue;
    }

    const fileContent = await readFile(filePath, "utf8");
    if (/\b(?:Python|Rust|PyYAML|quick_validate|pip)\b|init_skill\.py|generate_openai_yaml\.py/i.test(fileContent)) {
      errors.push(`file contains unsupported implementation prerequisite: ${path.relative(skillPath, filePath)}`);
    }
  }

  const agentsYaml = path.join(skillPath, "agents", "openai.yaml");
  if (await exists(agentsYaml)) {
    const agentsContent = await readFile(agentsYaml, "utf8");
    for (const required of ["display_name", "short_description", "default_prompt"]) {
      if (!agentsContent.includes(`${required}:`)) {
        errors.push(`agents/openai.yaml missing interface.${required}`);
      }
    }
  }

  return errors;
}

const skillNames = await listSkillDirs();
if (skillNames.length === 0) {
  console.error("No skills found under skills/.");
  process.exit(1);
}

let failureCount = 0;
for (const skillName of skillNames) {
  const errors = await validateSkill(skillName);
  if (errors.length === 0) {
    console.log(`OK ${skillName}`);
    continue;
  }

  failureCount += 1;
  console.error(`FAIL ${skillName}`);
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
}

if (failureCount > 0) {
  process.exit(1);
}

console.log(`Validated ${skillNames.length} skill(s).`);
