"use server";

import { didKnow } from "~/server/query";

export async function didKnowACTION(id: number) {
	await didKnow(id)
}

export async function didntKnowACTION(id: number) {
  console.log(id);
}
