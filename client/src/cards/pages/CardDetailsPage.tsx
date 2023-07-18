import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../../components/PageHeader";
import { useParams } from "react-router-dom";
import Card from "../components/card/Card";
import useCards from "../hooks/useCards";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import CardsFeedback from "../components/CardsFeedback";
import { Button } from "@mui/material";
import ROUTES from "../../routes/routesModel";
import { useNavigate } from "react-router-dom";

const CardDetailsPage = () => {
  const { cardId } = useParams();
  const { card, error, isLoading, handleGetCard, handleLikeCard, value } =
    useCards();
  const { filterdCards } = value;
  const navigate = useNavigate();

  useEffect(() => {
    if (cardId) handleGetCard(cardId);
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;

  if (!isLoading && !card) return <p>No card to display...</p>;

  if (!isLoading && card)
    return (
      <Container>
        <PageHeader
          title="Business Details"
          subtitle="Here you can see details of the business"
        />
        <div>
          <Card onLike={() => {}} card={card} onDelete={() => {}} />

          <CardsFeedback
            cards={filterdCards}
            error={error}
            isLoading={isLoading}
            onDelete={console.log}
          />
        </div>
        <Button
          color="success"
          variant="contained"
          sx={{ marginTop: 1 }}
          onClick={() => navigate(`${ROUTES.MORE_DETAILS}/${card._id}`)}
        >
          Click here for more details
        </Button>
        <br />
        <br />
      </Container>
    );
  return null;
};

export default CardDetailsPage;
