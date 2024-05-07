export interface Meaning {
  definition: string;
  example?: string;
  antonyms: string[];
  synonyms: string[];
  partOfSpeech: string;
}

interface PosSynAnt {
  partOfSpeech: string;
  antonyms: string[];
  synonyms: string[];
}

export function parseDefJson(s: any): Meaning[] {
  let meanings: Meaning[] = [];
  let posSynAnt: PosSynAnt[] = [];

  for (const a of s) {
    for (const posPart of a.meanings) {
      const pos = posPart.partOfSpeech;
      const synonyms: string[] = posPart.antonyms;
      const antonyms: string[] = posPart.antonyms;

      posSynAnt.push({ partOfSpeech: pos, synonyms, antonyms });

      for (const def of posPart.definitions) {
        const m: Meaning = {
          definition: def.definition,
          example: def.example,
          antonyms: def.antonyms,
          synonyms: def.synonyms,
          partOfSpeech: pos,
        };

        meanings.push(m);
      }
    }
  }

  return meanings;
}
