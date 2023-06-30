import React from "react";

import CardInterface from "./../interfaces/CardInterface";
import Card from "./card/Card";
import Grid from "@mui/material/Grid";

type Props = {
  cards: CardInterface[];
  onDelete: (id: string) => void;
  onLike: () => void;
};

const Cards: React.FC<Props> = ({ cards, onDelete, onLike }) => {
  return (
    <Grid container spacing={2} pb={2}>
      {cards.map((card: CardInterface) => (
        <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
          <Card onLike={onLike} onDelete={onDelete} card={card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
