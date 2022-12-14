import { writeFile, readFile } from 'fs/promises'

export const saveFile = async (path, data) => {
    await writeFile(path, JSON.stringify(data))
}

export const saveProblems = async (problems) => {
    await saveFile('problems.json', problems)
}

export const loadProblems = async () => {
    const problems = await readFile('problems.json')
    const data = JSON.parse(problems)
    return data
}
