import StarterKit from "@tiptap/starter-kit";
import { Editor, Extension, JSONContent } from '@tiptap/core'
import { EditorContent, useEditor } from "@tiptap/react";
import { extensionsCustom } from "../notes/tiptap";

export default function RichTextEditor ({ note_content }:JSONContent ) {

	const editor = useEditor({
		extensions: extensionsCustom as Extension[],
		immediatelyRender: false,
        content: note_content ? note_content : "Your Mom",
        editable: false,
		editorProps: {
			attributes: {
				class: "h-screen w-full"
			}
		},
	});

    return(
        <>
            <EditorContent editor={editor} />
        </>
    )
}