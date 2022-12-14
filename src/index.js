import { getProblems } from './utils/codeforces.js'
import { loadProblems, saveProblems } from './utils/filesystem.js'

const DOWNLOAD_PROBLEMS = false
const MIN_RATING = 1500
const MAX_RATING = 1700
const TAGS = ['dp', 'greedy', 'graphs']

if (DOWNLOAD_PROBLEMS) {
    const problems = await getProblems()
    await saveProblems(problems)
}

const problems = (await loadProblems())
    .filter(({ rating }) => rating >= MIN_RATING && rating <= MAX_RATING)
    .filter(({ tags }) => TAGS.every(tag => tags.includes(tag)))
    .sort((a, b) => b.solvedCount - a.solvedCount)

console.log(problems.slice(0, 3))
