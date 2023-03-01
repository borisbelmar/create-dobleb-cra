import { readFile, writeFile } from 'fs/promises'

async function renamePackageJson (projectName: string): Promise<void> {
  const packageJsonContent = await readFile(`${projectName}/package.json`, 'utf-8')

  const packageJson = JSON.parse(packageJsonContent)

  packageJson.name = projectName

  const newPackageJsonContent = JSON.stringify(packageJson, null, 2)

  await writeFile(`${projectName}/package.json`, newPackageJsonContent)

  console.log('Package.json renamed successfully!')
}

export default renamePackageJson
