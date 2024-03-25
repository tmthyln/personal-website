import matter from 'gray-matter';
import {globSync} from 'glob';
import fs from 'node:fs';

export default {
    load() {
        return (globSync('posts/*.md'))
            .map(filename => {
                const file = fs.readFileSync(filename, 'utf8')
                const { data } = matter(file)
                return data.tags ?? []
            })
            .reduce((tagFreq, tags) => {
                tags.forEach(tag => {
                    if (tagFreq.has(tag)) {
                        tagFreq.set(tag, tagFreq.get(tag) + 1)
                    } else {
                        tagFreq.set(tag, 1)
                    }
                })
                return tagFreq
            }, new Map<string, number>())
    },
}