const express = require("express");
const auth = require("../../auth/authService");
// const { handleError } = require("../../utils/handleErrors");
const normalizeCard = require("../helpers/normalizeCard");
const {
  getCards,
  getMyCards,
  getCard,
  createCard,
  updateCard,
  likeCard,
  deleteCard,
  changeBizNumber,
} = require("../models/cardsAccessDataService");
const validateCard = require("../validations/cardValidationService");
const { isBizNumberExists } = require("../helpers/generateBizNumber");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    return res.status(201).send(cards);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/my-cards", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const card = await getMyCards(userId);
    return res.status(201).send(card);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getCard(id);
    return res.status(201).send(card);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    let card = req.body;
    const user = req.user;

    if (!user.isBusiness)
      return res.status(400).send("Authentication Error: Unauthorize user");

    const { error } = validateCard(card);
    if (error) return res.status(400).send(error);

    card = await normalizeCard(card, user._id);

    card = await createCard(card);
    return res.status(201).send(card);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    let card = req.body;
    const cardId = req.params.id;
    const userId = req.user._id;

    if (userId !== card.user_id) {
      return res
        .status(400)
        .send(
          "Authorization Error: Only the user who created the business card can update its details"
        );
    }

    const { error } = validateCard(card);
    if (error) return res.status(400).send(error);

    card = await normalizeCard(card);
    card = await updateCard(cardId, card);
    return res.status(201).send(card);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.patch("/biz-number/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const user = req.user;
    const { bizNumber } = req.body;

    if (!user.isAdmin)
      return res
        .status(400)
        .send(
          "Authorization Error: you must be an admin type user to change this business number"
        );
    await isBizNumberExists(bizNumber);
    const card = await changeBizNumber(cardId, bizNumber);
    return res.status(201).send(card);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const userId = req.user._id;

    const card = await likeCard(cardId, userId);
    return res.status(201).send(card);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const user = req.user;

    const card = await deleteCard(cardId, user);
    return res.status(201).send(card);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
