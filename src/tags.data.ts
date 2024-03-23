import PostsData from './posts.data.ts'

const allPosts = await PostsData.load()

export default {
    load() {
        return allPosts
            .reduce((tagFreq, post) => {
                (post.frontmatter.tags ?? []).forEach(tag => {
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