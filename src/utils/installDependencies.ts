import { spawn } from 'child_process'
import isUsingYarn from './isUsingYarn'

function installDependencies (projectName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const install = spawn(isUsingYarn() ? 'yarn' : 'npm', ['install', '--ignore-scripts'], { cwd: projectName })

    install.stdout.on('data', data => {
      console.log(data.toString())
    })

    install.on('close', code => {
      if (code !== 0) {
        reject(new Error(`Failed to install dependencies with code ${code}`))
        return
      }

      console.log('Dependencies installed successfully!')
      resolve()
    })
  })
}

export default installDependencies
