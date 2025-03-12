
interface CommentProps {
    comment_author: string,
    comment_content: string,
    comment_time: string,
}

export default function Comment ({ comment_author, comment_content, comment_time }:CommentProps) {
    return(
        <div className="flex flex-col h-fit w-full p-4 box-border border-b gap-2">
            <h1 className="flex justify-between items-center">@{comment_author} <span className="text-xs text-zinc-500">{comment_time}</span></h1>
            <p className="ms-8 text-sm">{comment_content}</p>
        </div>
    )
}