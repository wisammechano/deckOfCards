import { useState, useEffect } from "react";
import "../App.css";

const MainPage = () => {
  const BASE_URL =
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
  const [deckId, setDeckId] = useState();
  useEffect(() => {
    const gameStart = async () => {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setDeckId(data.deck_id);
    };
    gameStart();
  }, []);
  const drawGame = async () => {
    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
    );
    const deckData = await res.json();
    console.log(deckData);
  };

  return (
    <div className="container">
      <h1 className="heading">Deck of 52 cards</h1>
      <div className="main">
        <button className="button" onClick={drawGame}>
          Deal
        </button>
      </div>
    </div>
  );
};

export default MainPage;
