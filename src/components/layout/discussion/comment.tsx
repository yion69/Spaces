
interface CommentProps {
    comment_author: string,
    comment_content: string,
}

export default function Comment ({ comment_author, comment_content }:CommentProps) {
    return(
        <div className="h-fit w-full p-4 box-border border-b">
            <h1>@{comment_author}</h1>
            <p className="text-sm">{comment_content}</p>
        </div>
    )
}