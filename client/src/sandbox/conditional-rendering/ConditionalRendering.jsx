import React from "react";

const ConditionalRendering = () => {
  let cards = [];
  //   cards = ["one", "two", "three"];

  if (!cards.length) return <p>Opps... no cards in the database...</p>;

  return (
    <div>
      {cards.map((card, i) => (
        <p key={i}>{card}</p>
      ))}
    </div>
  );
};

export default ConditionalRendering;
