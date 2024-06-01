export default function BlogPage({params}:{params: {tagName : string}}) {
    return (
        <div>
            {/* TODO : Implement blog page that contain only that tag */}
            {params.tagName}
        </div>
    )
}