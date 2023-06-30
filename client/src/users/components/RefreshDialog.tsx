import React, { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  isDialogOpenRefresh: boolean;
  onConfirm: () => void;
  onCancel: (term?: string) => void;
};

const RefreshDialog: React.FC<Props> = ({
  isDialogOpenRefresh,
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog
      open={isDialogOpenRefresh}
      onClose={() => onCancel()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to change this user status?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Once you confirm the site will log you out and you will be forced to
          log back in with your new user settings.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onCancel()} color="error">
          cancel
        </Button>
        <Button onClick={onConfirm} autoFocus color="info">
          confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RefreshDialog;
