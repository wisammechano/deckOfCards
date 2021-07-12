import { useState, useEffect } from "react";
import "../App.css";
import Card from "../components/Card/Card";
import API from "../API";

const VALUES = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13,
  ACE: 14,
};

const newPlayer = (bot = false) => ({
  name: "Player 1",
  isBot: bot,
  cardRank: -1,
});

const MainPage = () => {
  const [api, setApi] = useState(null);
  const [p1, setP1] = useState(newPlayer());
  const [p2, setP2] = useState(newPlayer(true));
  const [cards, setCards] = useState([]);

  const start = () => {
    API.new().then((api) => setApi(api));
  };

  useEffect(() => {
    start();
  }, []);

  const draw = () => {
    api.draw().then((cards) => {
      console.log(cards);
      setP1((prev) => ({ ...prev, cardRank: VALUES[cards[0].value] }));
      setP2((prev) => ({ ...prev, cardRank: VALUES[cards[1].value] }));
      setCards(cards);
    });
  };

  const winner = () => {
    if (p1.cardRank > p2.cardRank) {
      return "Player 1 won!";
    } else if (p2.cardRank > p1.cardRank) {
      return "Player 2 won!";
    } else {
      return "A tie!";
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Deck of {api?.remaining} cards</h1>
      <div className="main">
        <button
          className="button"
          onClick={draw}
          disabled={api?.remaining === 0}
        >
          Deal
        </button>
        {api?.remaining === 0 && (
          <div>
            <h2>Game Over!</h2>
            <button onClick={() => start()}>Another Game</button>
          </div>
        )}

        <Card cardValues={cards} />
        {winner()}
      </div>
    </div>
  );
};

export default MainPage;
