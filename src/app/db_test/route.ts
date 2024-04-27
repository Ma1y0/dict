import { db } from "~/server/db";

export async function GET(req: Request) {
	const wAndm = await db.query.words.findFirst({
		where: (words, {eq}) => eq(words.id, 2),
		with: {
			meanings: true
		}
	})

	return Response.json({word: wAndm})
}
