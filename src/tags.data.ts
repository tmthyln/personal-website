import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
    transform(rawData) {
        const tagFreq = new Map<string, number>()
        rawData.forEach(({ frontmatter }) => {
            ;(frontmatter.tags ?? []).forEach((tag: string) => {
                tagFreq.set(tag, (tagFreq.get(tag) ?? 0) + 1)
            })
        })
        return Array.from(tagFreq.entries()).sort(([a], [b]) => a.localeCompare(b))
    }
})
