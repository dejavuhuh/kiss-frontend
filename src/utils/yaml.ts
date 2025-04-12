import yaml from 'js-yaml'

export function isValidYaml(content: string): boolean {
  try {
    yaml.load(content)
    return true
  }
  catch {
    return false
  }
}
