import { useState, useCallback, useMemo, useEffect } from "react";
import CardInterface from "../interfaces/CardInterface";
import { useUser } from "../../users/providers/UserProviders";
import {
  getCards,
  getMyCards,
  editCard,
  changeLikeStatus,
  deleteCard,
  createCard,
  getCard,
} from "../services/cardApi";
import { CardFromClientType, CardMapToModelType } from "../types/cardTypes";
import normalizeCard from "../components/card/helpers/normalizations/normalizeCard";
import normalizeEditCard from "../components/card/helpers/normalizations/normalizeEditCard";
import { NormalizedEditCard } from "../../cards/types/cardTypes";

import { string } from "joi";
import { useSnack } from "../../providers/SnackbarProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAxiosInterceptors from "../../hooks/useAxiosInterceptors";
import ROUTES from "../../routes/routesModel";

type ErrorType = null | string;
type CardsType = null | CardInterface[];
type CardType = null | CardInterface;

const useCards = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const [cards, setCards] = useState<CardsType>(null);
  const [card, setCard] = useState<CardType>(null);
  const [query, setQuery] = useState("");
  const [filterdCards, setfilterdCards] = useState<CardInterface[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    if (cards) {
      setfilterdCards(
        cards.filter(
          (card) =>
            card.title.includes(query) || String(card.bizNumber).includes(query)
        )
      );
    }
  }, [cards, query]);

  const requestStatus = (
    loading: boolean,
    errorMessage: ErrorType,
    cards: CardsType,
    card: CardType
  ) => {
    setLoading(loading);
    setError(errorMessage);
    setCards(cards);
    setCard(card);
  };

  useAxiosInterceptors();

  const snack = useSnack();

  const navigate = useNavigate();

  const { user } = useUser();

  const handleGetCards = async () => {
    try {
      setLoading(true);
      const cards = await getCards();
      requestStatus(false, null, cards, null);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  };

  const handleGetCard = useCallback(async (cardId: string) => {
    try {
      setLoading(true);
      const card = await getCard(cardId);
      requestStatus(false, null, null, card);
      return card;
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  }, []);

  const handleGetMyCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getMyCards();
      requestStatus(false, null, cards, null);
    } catch (error) {
      if (typeof error === "string")
        return requestStatus(false, error, null, null);
    }
  }, []);

  const handleCreateCard = useCallback(
    async (cardFromClient: CardFromClientType) => {
      try {
        setLoading(true);
        const normalizedCard = normalizeCard(cardFromClient);
        const card = await createCard(normalizedCard);
        requestStatus(false, null, null, card);
        snack("success", "A new business card has been created");
        navigate(ROUTES.MY_CARDS);
      } catch (error) {
        if (typeof error === "string")
          return requestStatus(false, error, null, null);
      }
    },
    []
  );

  const handleUpdateCard = useCallback(
    async (cardFromClient: CardMapToModelType) => {
      try {
        setLoading(true);
        const normalizedCard = normalizeEditCard(cardFromClient);
        const card: any = editCard(normalizedCard);
        requestStatus(false, null, null, card);
        snack("success", "The business card has been successfully updated");
        navigate(ROUTES.MY_CARDS);
      } catch (error) {
        if (typeof error === "string")
          return requestStatus(false, error, null, null);
      }
    },
    []
  );

  const handleDeleteCard = async (cardId: string) => {
    try {
      setLoading(true);
      await deleteCard(cardId);
      requestStatus(false, null, null, card);
      snack("success", "The business card has been successfully deleted");
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  };

  const handleGetFavCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getCards();
      const favCards = cards.filter(
        (card) => !!card.likes.find((id) => id === user?._id)
      );

      requestStatus(false, null, favCards, null);
    } catch (error) {
      if (typeof error === "string")
        return requestStatus(false, error, null, null);
    }
  }, []);

  const handleLikeCard = async (cardId: string) => {
    try {
      const card = await changeLikeStatus(cardId);
      requestStatus(false, null, cards, card);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  };

  const value = useMemo(() => {
    return { isLoading, cards, card, error, filterdCards };
  }, [isLoading, cards, card, error, filterdCards]);

  return {
    isLoading,
    error,
    cards,
    card,
    value,
    handleGetCards,
    handleGetCard,
    handleGetMyCards,
    handleCreateCard,
    handleUpdateCard,
    handleDeleteCard,
    handleLikeCard,
    handleGetFavCards,
  };
};

export default useCards;
