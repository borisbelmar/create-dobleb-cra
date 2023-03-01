export default function isUsingYarn (): boolean {
  return process.env.npm_execpath?.includes('yarn') || false
}
