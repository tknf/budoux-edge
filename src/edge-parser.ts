/**
 * @license
 * Copyright 2023 TKNF LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { model as jaModel } from "budoux/module/data/models/ja.js";
import { model as zhHansModel } from "budoux/module/data/models/zh-hans.js";
import { model as zhHantModel } from "budoux/module/data//models/zh-hant.js";
import { sum } from "budoux/dist/utils.js";

export class Parser {
  model;

  constructor(model: { [key: string]: { [key: string]: number } }) {
    this.model = new Map(Object.entries(model).map(([k, v]) => [k, new Map(Object.entries(v))]));
  }

  /**
   * Parses the input sentence and returns a list of semantic chunks.
   *
   * @param sentence An input sentence.
   * @returns The retrieved chunks.
   */
  parse(sentence: string) {
    if (sentence === "") return [];
    const result = [sentence[0]];
    const baseScore = -0.5 * sum([...this.model.values()].map((group) => [...group.values()]).flat());

    for (let i = 1; i < sentence.length; i++) {
      let score = baseScore;
      score += this.model.get("UW1")?.get(sentence.slice(i - 3, i - 2)) || 0;
      score += this.model.get("UW2")?.get(sentence.slice(i - 2, i - 1)) || 0;
      score += this.model.get("UW3")?.get(sentence.slice(i - 1, i)) || 0;
      score += this.model.get("UW4")?.get(sentence.slice(i, i + 1)) || 0;
      score += this.model.get("UW5")?.get(sentence.slice(i + 1, i + 2)) || 0;
      score += this.model.get("UW6")?.get(sentence.slice(i + 2, i + 3)) || 0;
      score += this.model.get("BW1")?.get(sentence.slice(i - 2, i)) || 0;
      score += this.model.get("BW2")?.get(sentence.slice(i - 1, i + 1)) || 0;
      score += this.model.get("BW3")?.get(sentence.slice(i, i + 2)) || 0;
      score += this.model.get("TW1")?.get(sentence.slice(i - 3, i)) || 0;
      score += this.model.get("TW2")?.get(sentence.slice(i - 2, i + 1)) || 0;
      score += this.model.get("TW3")?.get(sentence.slice(i - 1, i + 2)) || 0;
      score += this.model.get("TW4")?.get(sentence.slice(i, i + 3)) || 0;
      if (score > 0) result.push("");
      result[result.length - 1] += sentence[i];
    }
    return result;
  }
}

/**
 * Loads a parser equipped with the default Japanese model.
 * @returns A parser with the default Japanese model.
 */
export const loadDefaultJapaneseParser = () => {
  return new Parser(jaModel);
};

/**
 * Loads a parser equipped with the default Simplified Chinese model.
 * @returns A parser with the default Simplified Chinese model.
 */
export const loadDefaultSimplifiedChineseParser = () => {
  return new Parser(zhHansModel);
};

/**
 * Loads a parser equipped with the default Traditional Chinese model.
 * @returns A parser with the default Traditional Chinese model.
 */
export const loadDefaultTraditionalChineseParser = () => {
  return new Parser(zhHantModel);
};

/**
 * Loads available default parsers.
 * @returns A map between available lang codes and their default parsers.
 */
export const loadDefaultParsers = () => {
  return new Map([
    ["ja", loadDefaultJapaneseParser()],
    ["zh-hans", loadDefaultSimplifiedChineseParser()],
    ["zh-hant", loadDefaultTraditionalChineseParser()]
  ]);
};
