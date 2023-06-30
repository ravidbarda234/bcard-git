import { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { Container } from "@mui/material";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "../hooks/useCards";

const CardsPage = () => {
  const { cards, error, isLoading, handleGetCards, handleDeleteCard, value } =
    useCards();
  const { filterdCards } = value;

  useEffect(() => {
    handleGetCards();
  }, []);

  const onDeleteCard = async (cardId: string) => {
    await handleDeleteCard(cardId);
    await handleGetCards();
  };

  return (
    <Container>
      <PageHeader
        title="Cards Page"
        subtitle="Here you can find all types of business cards"
      />

      <CardsFeedback
        onDelete={onDeleteCard}
        isLoading={isLoading}
        error={error}
        cards={filterdCards}
      />
    </Container>
  );
};

export default CardsPage;
