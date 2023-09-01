import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const filename = fileURLToPath(import.meta.url)
const cwd = path.dirname(filename)

async function getDeploymentsInfo() {
  /**
   * @type {Array<{name: string, expectedAddress: string}>}
   */
  const deploymentInfo = JSON.parse(
    await fs
      .readFile(path.resolve(cwd, "../deployment-info.json"), "utf-8")
      .catch(() => "[]")
  )

  return deploymentInfo
}

async function main() {
  const deploymentInfo = await getDeploymentsInfo()

  const template = `
    /* eslint-disable */
    // This file is generated automatically by scripts/write-types.ts
    // Do not modify this file manually.
    // Regenerate it by running \`yarn write-types\`
    `
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim()

  const types = deploymentInfo
    .map(({ name }) => `declare const CONTRACT_${name}: string`)
    .join("\n\n")

  await fs.writeFile(
    path.resolve(cwd, "../src/deployment-info.d.ts"),
    [template, types].join("\n\n")
  )
}

main().then(() =>
  // eslint-disable-next-line no-console
  console.info(
    "Contract address declarations written to src/deployment-info.d.ts"
  )
)
