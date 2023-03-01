import { spawn } from 'child_process'

function cloneRepo (url: string, destination: string, branch = 'main'): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log('Cloning template...')

    const gitClone = spawn('git', ['clone', url, destination, '--branch', branch, '--depth', '1', '--single-branch'], { detached: false })

    gitClone.stdout.on('data', data => {
      console.log(data.toString())
    })

    gitClone.on('close', code => {
      if (code === 128) {
        reject(new Error(`${destination} already exists. Please delete it and try again`))
        return
      }
      if (code !== 0) {
        reject(new Error(`Git clone failed with code ${code}`))
        return
      }

      const removeGit = spawn('rm', ['-rf', `${destination}/.git`, `${destination}/yarn.lock`])

      removeGit.on('close', exitCode => {
        if (exitCode !== 0) {
          reject(new Error(`Failed to remove .git folder with code ${code}`))
          return
        }

        console.log('Template cloned successfully!')
        resolve()
      })
    })
  })
}

export default cloneRepo
