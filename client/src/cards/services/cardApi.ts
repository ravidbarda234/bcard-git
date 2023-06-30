import axios from "axios";
import CardInterface from "../interfaces/CardInterface";
import { NormalizedEditCard } from "../types/cardTypes";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";
//all cards
export const getCards = async () => {
  try {
    const { data } = await axios.get<CardInterface[]>(`${apiUrl}/cards`);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
//card details
export const getCard = async (cardId: string) => {
  try {
    const { data } = await axios.get<CardInterface>(
      `${apiUrl}/cards/${cardId}`
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
//my cards
export const getMyCards = async () => {
  try {
    const { data } = await axios.get<CardInterface[]>(
      `${apiUrl}/cards/my-cards`
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

// create card
export const createCard = async (normalizedCard: object) => {
  try {
    const { data } = await axios.post<CardInterface>(
      `${apiUrl}/cards`,
      normalizedCard
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

// edit card
export const editCard = async (normalizedCard: NormalizedEditCard) => {
  try {
    const cardToServer = { ...normalizedCard };
    delete cardToServer._id;
    const { data } = await axios.put<CardInterface>(
      `${apiUrl}/cards/${normalizedCard._id}`,
      cardToServer
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
  }
};

// like status
export const changeLikeStatus = async (cardId: string) => {
  try {
    const { data } = await axios.patch<CardInterface>(
      `${apiUrl}/cards/${cardId}`
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

// delete Card
export const deleteCard = async (cardId: string) => {
  try {
    const { data } = await axios.delete<CardInterface[]>(
      `${apiUrl}/cards/${cardId}`
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
