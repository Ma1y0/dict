import { useState } from "react";

export function useCardId(max: number) {
  const [cardId, setCardId] = useState<number>(0);


  const nextCard = () => {
    if (cardId < max) setCardId((prevState) => prevState + 1);
		console.log(cardId + 1)
  };
  const prevCard = () => {
    if (cardId > 0) setCardId((prevState) => prevState - 1);
		console.log(cardId - 1)
  };

  return { cardId, nextCard, prevCard };
}
