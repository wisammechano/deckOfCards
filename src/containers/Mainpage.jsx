import { useState, useEffect } from "react";
import "../App.css";
import Card from "../components/Card/Card";
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
  console.log(deckDraw);
  return (
    <div className="container">
      <h1 className="heading">Deck of 52 cards</h1>
      <div className="main">
        <button className="button" onClick={drawGame}>
          Deal
        </button>
        <Card cardValues={deckDraw} />
      </div>
    </div>
  );
};

export default MainPage;
// {deckDraw
//   ? deckDraw.cards.map((cardInfo) => {
//       return (
//         <div className="cardsContainer">
//           <div className="card">
//             <img src={cardInfo.image} alt={cardInfo.suit} />
//           </div>
//         </div>
//       );
//     })
//   : console.warn("there is no data on deckDraw")}
