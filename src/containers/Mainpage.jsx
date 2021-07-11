import { useState, useEffect } from "react";
import "../App.css";
import Card from "../components/Card/Card";
const VALUES = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "JACK": 11,
  "QUEEN": 12,
  "KING": 13,
  "ACE": 14,
};
const MainPage = () => {
  const BASE_URL =
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
  const [deckId, setDeckId] = useState();
  const [deckDraw, setDeckDraw] = useState();
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
    setDeckDraw(deckData.cards);
  };
  console.log(deckDraw)
  const winerOrLoser = () => {
    let p1, p2;
    if (deckDraw) {
      p1 = deckDraw[0].value;
      p2 = deckDraw[1].value;
    }
    if (VALUES[p1] > VALUES[p2]) {
      return <h1>Player 1 wins</h1>
    } else if (VALUES[p2] > VALUES[p1]) {
      return <h1>Player 2 wins</h1>
    } else {
      return <h1>Draw</h1>
    }

  };
  return (
    <div className="container">
      <h1 className="heading">Deck of 52 cards</h1>
      <div className="main">
        <button className="button" onClick={drawGame}>
          Deal
        </button>
        <Card cardValues={deckDraw} />
        {winerOrLoser()}

      </div>
    </div>
  );
};

export default MainPage;
