"use server";

import { didKnow, didntKnow } from "~/server/query";

export async function didKnowACTION(id: number) {
  await didKnow(id);
}

export async function didntKnowACTION(id: number) {
  await didntKnow(id);
}
