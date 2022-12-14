import fetch from 'node-fetch'

const API_URL = 'https://codeforces.com/api'

export const getProblems = async () => {
    const response = await fetch(`${API_URL}/problemset.problems`)
    const data = await response.json()
    
    if(data.status !== 'OK') throw new Error('Failed to fetch problems', data.comment)
    
    const contests = {}
    for(const problem of data.result.problems) {
        contests[problem.contestId] = {
            ...contests[problem.contestId],
            [problem.index]: problem
        }
    }

    for(const { contestId, index, solvedCount} of data.result.problemStatistics) {
        contests[contestId][index]['solvedCount'] = solvedCount
    }

    const problems = []
    for(const contestId in contests) {
        for(const index in contests[contestId]) {
            problems.push(contests[contestId][index])
        }
    }

    return problems
}
