
export default await Promise.all([
    '../pages/posts/fancy-meal.md',
    '../pages/posts/hawaii-first-hundred-hours.md',
    '../pages/posts/turn-left-at-next-prime.md',
    '../pages/posts/bogosorting.md',
]
    .map(async sourcePath => {
        const module = await import(sourcePath)
        const pathParts = sourcePath.split('/')
        const filename = pathParts[pathParts.length - 1]

        return {
            frontmatter: module.frontmatter,
            link: `/posts/${filename.split('.')[0]}`,
        }
    })
)
