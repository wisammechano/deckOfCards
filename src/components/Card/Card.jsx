const Card = ({ cardValues }) => {
  // console.log(typeof cardValues.cards);
  return (
    <div>
      {cardValues
        ? cardValues.map((values) => {
            return (
              <div className="cardsContainer">
                <div className="card">
                  <img src={values.image} alt={values.suit} />
                </div>
              </div>
            );
          })
        : console.warn("there is no data")}
    </div>
  );
};
export default Card;
// {
//  {deckDraw
//             ? deckDraw.cards.map((cardInfo) => {
//                 return (

//                 );
//               })
//             : console.warn("there is no data on deckDraw")}

// }
