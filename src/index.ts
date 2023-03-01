#!/usr/bin/env node
/// <reference types="node" />

import cloneRepo from './utils/cloneRepo'
import installDependencies from './utils/installDependencies'
import isUsingYarn from './utils/isUsingYarn'
import renamePackageJson from './utils/renamePackageJson'

const TEMPLATE_REPO_URL = 'https://github.com/borisbelmar/cra-template.git'

async function main () {
  try {
    const projectName = process.argv[2]
    // Get package.json version
    const packageJson = await import('../package.json')
    console.log(`dobleB. Create React App Template v${packageJson.version}\n`)

    console.log('Creating project...')

    if (!projectName) {
      console.error('Please provide a project name')
      return
    }

    await cloneRepo(TEMPLATE_REPO_URL, projectName)

    await installDependencies(projectName)

    await renamePackageJson(projectName)

    console.log('Project created successfully! \n')

    console.log('To start the project run:')
    console.log(`cd ${projectName} && ${isUsingYarn() ? 'yarn' : 'npm run'} start \n`)

    console.log('To build the project run:')
    console.log(`cd ${projectName} && ${isUsingYarn() ? 'yarn' : 'npm run'} build`)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('')
    console.error(error.message)
    process.exit(1)
  }
}

main()
