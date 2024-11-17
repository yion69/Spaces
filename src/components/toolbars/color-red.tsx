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
import { Color } from "@tiptap/extension-color";
import { useToolbar } from "@/components/toolbars/toolbar-provider";
import type { Extension } from "@tiptap/core";
import type { StarterKitOptions } from "@tiptap/starter-kit";

type StarterKitExtensions = Extension<StarterKitOptions, any>;

const ColorRed = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
							editor.chain().focus().setColor('#fb5607').run();
							onClick?.(e);
						}}
						disabled={!editor.can().chain().focus().setColor("#fb5607").run()}
						ref={ref}
						{...props}
					>
						{children || <div className="h-6 w-6 bg-red-400 rounded-full"></div>}
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">
					<span>Color Red</span>
				</TooltipContent>
			</Tooltip>
		);
	},
);

ColorRed.displayName = "ColorRed";

export { ColorRed };
