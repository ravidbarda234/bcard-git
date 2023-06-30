import React, { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  isDialogOpen: boolean;
  onDelete: () => void;
  onChangeDialog: (term?: string) => void;
};

const UserDeleteDialog: FC<Props> = ({
  isDialogOpen,
  onDelete,
  onChangeDialog,
}) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => onChangeDialog()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete this user?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This operation will completely delete the User and all its data from
          the database and it will not be possible to retrieve the user
          afterwards.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onChangeDialog()} color="error">
          cancel
        </Button>
        <Button onClick={onDelete} autoFocus color="info">
          Delete user
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDeleteDialog;
