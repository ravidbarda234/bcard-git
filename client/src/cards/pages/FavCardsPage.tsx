import React from "react";
import { Button, Container } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { useEffect } from "react";
import useCards from "../hooks/useCards";
import { useCallback } from "react";
import CardsFeedback from "../components/CardsFeedback";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

const FavCardsPage = () => {
  const { value, ...rest } = useCards();
  const { isLoading, cards, error, filterdCards } = value;
  const navigate = useNavigate();

  const { handleGetFavCards, handleDeleteCard } = rest;
  useEffect(() => {
    handleGetFavCards();
  }, []);

  const onDeleteCard = useCallback(async (cardId: string) => {
    await handleDeleteCard(cardId);
    await handleGetFavCards();
  }, []);

  const changeLikeStatus = useCallback(async () => {
    await handleGetFavCards();
  }, []);

  return (
    <Container>
      <PageHeader
        title="Favorite Cards Page"
        subtitle="here you can see your favorite cards"
      />
      {filterdCards.length ? (
        <CardsFeedback
          cards={filterdCards}
          isLoading={isLoading}
          error={error}
          onDelete={onDeleteCard}
          onLike={changeLikeStatus}
        />
      ) : (
        `You haven't liked any card yet...`
      )}
      {!filterdCards.length && (
        <Button onClick={() => navigate(ROUTES.CARDS)}>go to cards page</Button>
      )}
    </Container>
  );
};

export default FavCardsPage;
