import fs from 'fs';
import matter from 'gray-matter';

export default {
    paths() {
        const tagFreqs = fs.readdirSync('src/posts')
            .filter((filename: string) => filename.endsWith('.md'))
            .flatMap((filename: string) => {
                const file = fs.readFileSync(`src/posts/${filename}`, 'utf8')
                const { data } = matter(file);
                return data.tags ?? []
            })
            .reduce((freqMap, tag) => {
                if (freqMap.has(tag)) {
                    freqMap.set(tag, freqMap.get(tag) + 1)
                } else {
                    freqMap.set(tag, 1)
                }
                return freqMap
            }, new Map<string, number>())

        return [...tagFreqs]
            .sort((a, b) => b[1] - a[1])
            .map(([tag]) => ({params: {tag}}))
    }
}
