import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { getToolLabel, ToolCallBadge } from "../ToolCallBadge";

afterEach(() => {
  cleanup();
});

describe("getToolLabel", () => {
  it("returns 'Creating {path}' for str_replace_editor create", () => {
    expect(getToolLabel("str_replace_editor", { command: "create", path: "/App.jsx" })).toBe("Creating /App.jsx");
  });

  it("returns 'Editing {path}' for str_replace_editor str_replace", () => {
    expect(getToolLabel("str_replace_editor", { command: "str_replace", path: "/components/Card.jsx" })).toBe("Editing /components/Card.jsx");
  });

  it("returns 'Editing {path}' for str_replace_editor insert", () => {
    expect(getToolLabel("str_replace_editor", { command: "insert", path: "/App.jsx" })).toBe("Editing /App.jsx");
  });

  it("returns 'Viewing {path}' for str_replace_editor view", () => {
    expect(getToolLabel("str_replace_editor", { command: "view", path: "/App.jsx" })).toBe("Viewing /App.jsx");
  });

  it("falls back to 'file' when path is missing", () => {
    expect(getToolLabel("str_replace_editor", { command: "create" })).toBe("Creating file");
  });

  it("returns 'Renaming {path}' for file_manager rename", () => {
    expect(getToolLabel("file_manager", { command: "rename", path: "/App.jsx" })).toBe("Renaming /App.jsx");
  });

  it("returns 'Deleting {path}' for file_manager delete", () => {
    expect(getToolLabel("file_manager", { command: "delete", path: "/App.jsx" })).toBe("Deleting /App.jsx");
  });

  it("falls back to tool name for unknown tools", () => {
    expect(getToolLabel("unknown_tool", {})).toBe("unknown_tool");
  });
});

describe("ToolCallBadge", () => {
  it("displays user-friendly label instead of raw tool name", () => {
    render(<ToolCallBadge toolName="str_replace_editor" args={{ command: "create", path: "/App.jsx" }} state="call" />);
    expect(screen.getByText("Creating /App.jsx")).toBeDefined();
    expect(screen.queryByText("str_replace_editor")).toBeNull();
  });

  it("shows spinner when state is call", () => {
    const { container } = render(
      <ToolCallBadge toolName="str_replace_editor" args={{ command: "create", path: "/App.jsx" }} state="call" />
    );
    expect(container.querySelector(".animate-spin")).not.toBeNull();
    expect(container.querySelector(".bg-emerald-500")).toBeNull();
  });

  it("shows green dot when state is result with a result value", () => {
    const { container } = render(
      <ToolCallBadge toolName="str_replace_editor" args={{ command: "create", path: "/App.jsx" }} state="result" result="Success" />
    );
    expect(container.querySelector(".bg-emerald-500")).not.toBeNull();
    expect(container.querySelector(".animate-spin")).toBeNull();
  });

  it("shows spinner when state is result but result is undefined", () => {
    const { container } = render(
      <ToolCallBadge toolName="str_replace_editor" args={{ command: "create", path: "/App.jsx" }} state="result" />
    );
    expect(container.querySelector(".animate-spin")).not.toBeNull();
  });

  it("renders editing label for file_manager delete", () => {
    render(<ToolCallBadge toolName="file_manager" args={{ command: "delete", path: "/components/Card.jsx" }} state="call" />);
    expect(screen.getByText("Deleting /components/Card.jsx")).toBeDefined();
  });
});
