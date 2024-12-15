"use client";

import { Separator } from "@/components/ui/separator";
import { BlockquoteToolbar } from "@/components/toolbars/blockquote";
import { BoldToolbar } from "@/components/toolbars/bold";
import { BulletListToolbar } from "@/components/toolbars/bullet-list";
import { CodeToolbar } from "@/components/toolbars/code";
import { CodeBlockToolbar } from "@/components/toolbars/code-block";
import { HardBreakToolbar } from "@/components/toolbars/hard-break";
import { HorizontalRuleToolbar } from "@/components/toolbars/horizontal-rule";
import { ItalicToolbar } from "@/components/toolbars/italic";
import { OrderedListToolbar } from "@/components/toolbars/ordered-list";
import { RedoToolbar } from "@/components/toolbars/redo";
import { StrikeThroughToolbar } from "@/components/toolbars/strikethrough";
import { ToolbarProvider } from "@/components/toolbars/toolbar-provider";
import { EditorContent, type Extension, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Heading1 } from "@/components/toolbars/heading-1";
import { Heading2 } from "@/components/toolbars/heading-2";
import { Heading3 } from "@/components/toolbars/heading-3";
import { ColorRed } from "@/components/toolbars/color-red";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { ColorWhite } from "@/components/toolbars/color-white";
import { ColorYellow } from "@/components/toolbars/color-yellow";
import { ColorPink } from "@/components/toolbars/color-pink";
import { ColorPurple } from "@/components/toolbars/color-purple";
import { ColorBlue } from "@/components/toolbars/color-blue";

export const extensionsCustom = [
	StarterKit.configure({
		orderedList: {
			HTMLAttributes: {
				class: "list-decimal",
			},
		},
		bulletList: {
			HTMLAttributes: {
				class: "list-disc",
			},
		},
		code: {
			HTMLAttributes: {
				class: "bg-accent rounded-md p-1",
			},
		},
		horizontalRule: {
			HTMLAttributes: {
				class: "my-2",
			},
		},
		codeBlock: {
			HTMLAttributes: {
				class: "bg-primary text-primary-foreground p-2 text-sm rounded-md p-1",
			},
		},
		heading: {
			levels: [1, 2, 3, 4],
			HTMLAttributes: {
				class: "tiptap-heading",
			},
		},
	}),
	Color,
	TextStyle
];

const content = `
<h2 class="tiptap-heading" style="text-align: center">Hello world 🌍</h2>
`;

interface TipTapI { setDocument: React.Dispatch<React.SetStateAction<JSONContent>>};

const Tiptap = ({ setDocument }:TipTapI) => {
	const editor = useEditor({
		extensions: extensionsCustom as Extension[],
		content,
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class: "h-screen w-full"
			}
		},
		onUpdate({ editor }) {
			setDocument(editor.getJSON());
			console.log(editor.getText());
		}

	});

	if (!editor) {
		return null;
	}
	return (
		<div className="border w-full h-full relative rounded-md rounded-t-none overflow-hidden overflow-y-scroll no-scrollbar">
			<div className="flex w-full items-center py-2 px-2 justify-between border-b  sticky top-0 left-0 bg-zinc-50 dark:bg-background z-20">
				<ToolbarProvider editor={editor}>
					<TooltipProvider>
						<div className="flex items-center gap-2">
							<RedoToolbar />
							<Separator orientation="vertical" className="h-7" />
							<BoldToolbar />
							<ItalicToolbar />
							<StrikeThroughToolbar />
							<BulletListToolbar />
							<OrderedListToolbar />
							<CodeToolbar />
							<CodeBlockToolbar />
							<HorizontalRuleToolbar />
							<BlockquoteToolbar />
							<HardBreakToolbar />
							<Separator orientation="vertical" className="h-7" />
							<Heading1 />
							<Heading2 />
							<Heading3 />
							<Separator orientation="vertical" className="h-7" />
							<ColorWhite />
							<ColorYellow />
							<ColorRed />
							<ColorPink />
							<ColorPurple />
							<ColorBlue />
						</div>
					</TooltipProvider>
				</ToolbarProvider>
			</div>
			<div
				onClick={() => {
					editor?.chain().focus().run();
				}}
				className="cursor-text min-h-[18rem] bg-zinc-100 dark:bg-background"
			>
				<EditorContent className="outline-none" editor={editor} />
			</div>
		</div>
	);
};

export default Tiptap;
