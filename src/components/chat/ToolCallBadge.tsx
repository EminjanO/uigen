"use client";

import { Loader2 } from "lucide-react";

export function getToolLabel(toolName: string, args: Record<string, unknown>): string {
  const path = args.path as string | undefined;

  if (toolName === "str_replace_editor") {
    const command = args.command as string | undefined;
    switch (command) {
      case "create":
        return `Creating ${path ?? "file"}`;
      case "str_replace":
      case "insert":
        return `Editing ${path ?? "file"}`;
      case "view":
        return `Viewing ${path ?? "file"}`;
      default:
        return `Editing ${path ?? "file"}`;
    }
  }

  if (toolName === "file_manager") {
    const command = args.command as string | undefined;
    switch (command) {
      case "rename":
        return `Renaming ${path ?? "file"}`;
      case "delete":
        return `Deleting ${path ?? "file"}`;
      default:
        return path ?? toolName;
    }
  }

  return toolName;
}

interface ToolCallBadgeProps {
  toolName: string;
  args: Record<string, unknown>;
  state: string;
  result?: unknown;
}

export function ToolCallBadge({ toolName, args, state, result }: ToolCallBadgeProps) {
  const label = getToolLabel(toolName, args);
  const isDone = state === "result" && result != null;

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {isDone ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
