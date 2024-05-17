import * as deepl from "deepl-node";
import { env } from "~/env";

const translator = new deepl.Translator(env.DEEPL_API_KEY);

// Lang is ISO 639-1 language code
export function translate(s: string, lang: deepl.TargetLanguageCode) {
  return translator.translateText(s, "en", lang);
}
