import TagsData from '../tags.data.ts'

const tagFrequencyMap = TagsData.load()
export default {
    paths() {
        return [...tagFrequencyMap.entries()]
            .map(([tag, count]) => ({
                params: {
                    tag,
                },
            }))
    }
}
