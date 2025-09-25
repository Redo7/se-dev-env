import { useMemo } from "react";

function detectType(value: string): string {
  // null/undefined safety
  if (value == null) return "undefined";

  const trimmed = value.trim();

  // Boolean
  if (/^(true|false)$/i.test(trimmed)) {
    return "boolean";
  }

  // Number (int or float, allow negative)
  if (!isNaN(Number(trimmed)) && trimmed !== "") {
    return "number";
  }

  // Null
  if (trimmed === "null") return "null";

  // Array or Object
  if ((trimmed.startsWith("{") && trimmed.endsWith("}")) ||
      (trimmed.startsWith("[") && trimmed.endsWith("]"))) {
    try {
      const parsed = JSON.parse(trimmed);
      return Array.isArray(parsed) ? "array" : "object";
    } catch {
      return "string"; // not valid JSON
    }
  }

  // Default
  return "string";
}

export function useTypeDetection(value: string) {
  return useMemo(() => detectType(value), [value]);
}