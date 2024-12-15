"use client";

import { Heading3Icon } from "lucide-react";
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

const Heading3 = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
							editor.chain().focus().toggleHeading({ level: 3 }).run();
							onClick?.(e);
						}}
						disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
						ref={ref}
						{...props}
					>
						{children || <Heading3Icon className="h-4 w-4" />}
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">
					<span>Heading 3</span>
				</TooltipContent>
			</Tooltip>
		);
	},
);

Heading3.displayName = "h3";

export { Heading3 };
