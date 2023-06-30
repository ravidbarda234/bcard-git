import React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useUser } from "../../../users/providers/UserProviders";
import { useNavigate } from "react-router-dom";
import useCards from "../../hooks/useCards";
import CardDeleteDialog from "./cardDeleltDialog";
import ROUTES from "../../../routes/routesModel";
import CardInterface from "../../interfaces/CardInterface";

type Props = {
  onDelete: (x: string) => void;
  cardId: string;
  cardUserId: string;
  card: CardInterface;
  onLike: () => void;
};

const CardActionBar: React.FC<Props> = ({
  onDelete,
  cardId,
  cardUserId,
  card,
  onLike,
}) => {
  const navigate = useNavigate();
  const { _id, likes, user_id } = card;
  const { user } = useUser();
  const { handleLikeCard } = useCards();
  const [isLiked, setLike] = useState(() => {
    if (!user) return false;
    return !!likes.find((userId) => userId === user._id);
  });

  const [isDialog, setIsDialog] = useState(false);

  const handleDialog = (term?: string) => {
    if (term === "open") return setIsDialog(true);
    setIsDialog(false);
  };

  const handleDeleteCard = () => {
    handleDialog();
    onDelete(cardId);
  };

  const handleLike = async () => {
    setLike((prev) => !prev);
    await handleLikeCard(_id);
    onLike();
  };

  return (
    <CardActions disableSpacing sx={{ pt: 0, justifyContent: "space-between" }}>
      <Box>
        {user && (user._id === cardUserId || user.isAdmin) && (
          <IconButton
            aria-label="delete card"
            onClick={() => handleDialog("open")}
          >
            <DeleteIcon />
          </IconButton>
        )}
        <CardDeleteDialog
          isDialogOpen={isDialog}
          onChangeDialog={handleDialog}
          onDelete={handleDeleteCard}
        />

        {user && user._id === cardUserId && (
          <IconButton
            onClick={() => navigate(`${ROUTES.EDIT_CARD}/${cardId}`)}
            aria-label="edit card"
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>

      <Box>
        {user && (
          <IconButton aria-label="add to fav" onClick={handleLike}>
            <FavoriteIcon color={isLiked ? "error" : "inherit"} />
          </IconButton>
        )}
      </Box>
    </CardActions>
  );
};

export default CardActionBar;
