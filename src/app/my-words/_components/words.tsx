import { type getUsersToLearnList } from "~/server/query";

type UserToLearnList = Awaited<ReturnType<typeof getUsersToLearnList>>;

export async function Words(props: { toLearn: UserToLearnList }) {
  return (
    <>
      <div>
        {props.toLearn.map((x) => (
          <p key={x.id}>{x.word.word}</p>
        ))}
      </div>
    </>
  );
}
