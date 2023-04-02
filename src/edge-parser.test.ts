import { loadDefaultJapaneseParser } from "./edge-parser";
import { test, expect } from "vitest";

test("should work on Edge", async (_ctx) => {
  const parser = loadDefaultJapaneseParser();
  const result = parser.parse("こんにちは。今日はいい天気ですね。");
  expect(result).toEqual(["こんに", "ちは。", "今日は", "いい", "天気ですね。"]);
});
