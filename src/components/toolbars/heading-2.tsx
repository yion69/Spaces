"use client";

import { Heading2Icon } from "lucide-react";
import React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "@/components/toolbars/toolbar-provider";
import type { Extension } from "@tiptap/core";
import type { StarterKitOptions } from "@tiptap/starter-kit";

type StarterKitExtensions = Extension<StarterKitOptions, any>;

const Heading2 = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, onClick, children, ...props }, ref) => {
		const { editor } = useToolbar();
		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className={cn(
							"h-8 w-8",
							editor?.isActive("bold") && "bg-accent",
							className,
						)}
						onClick={(e) => {
							editor.chain().focus().toggleHeading({ level: 2 }).run();
							onClick?.(e);
						}}
						disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
						ref={ref}
						{...props}
					>
						{children || <Heading2Icon className="h-4 w-4" />}
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">
					<span>Heading 2</span>
				</TooltipContent>
			</Tooltip>
		);
	},
);

Heading2.displayName = "h2";

export { Heading2 };