import React, { useEffect } from "react";
import { Button, Container } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import useCards from "../hooks/useCards";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CardsFeedback from "../components/CardsFeedback";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProviders";

const MyCardsPage = () => {
  const { user } = useUser();

  const { value, handleGetMyCards, handleDeleteCard, handleLikeCard } =
    useCards();

  const { cards, error, isLoading, filterdCards } = value;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(ROUTES.CARDS);
    handleGetMyCards();
  }, []);

  const onDeleteCard = async (cardId: string) => {
    await handleDeleteCard(cardId);
    await handleGetMyCards();
  };

  if (!user || !user.isBusiness) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container>
      <PageHeader
        title="My Cards Page"
        subtitle="Here you can see your cards"
      />
      {cards?.length ? "" : "No cards to show yet.."}
      {cards?.length ? (
        ""
      ) : (
        <Button onClick={() => navigate(ROUTES.CREATE_CARD)}>
          create your first card!
        </Button>
      )}

      {cards && (
        <Fab
          onClick={() => navigate(ROUTES.CREATE_CARD)}
          color="primary"
          aria-label="add"
          sx={{
            position: "absolute",
            bottom: 75,
            right: 16,
          }}
        >
          <AddIcon />
        </Fab>
      )}
      <CardsFeedback
        isLoading={isLoading}
        error={error}
        cards={filterdCards}
        onDelete={onDeleteCard}
      />
    </Container>
  );
};

export default MyCardsPage;
