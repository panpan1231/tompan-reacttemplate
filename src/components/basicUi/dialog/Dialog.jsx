import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";
import "./style.scss";

/*
onConfirm: click confirm function 
onCallParent: show & hide function
show: true % false from parent state
title: dialog title text
msg: dialog content text
confirm: dialog confirm text
cancel: dialog cancel text default:取消
*/

export default function AlertDialog({
  title,
  msg,
  cancel,
  confirm,
  onCallParent,
  onConfirm,
  show,
}) {
  const { t } = useTranslation();
  return (
    <div className="AlertDialog">
      {/* <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        className="componentsDialog"
        open={show}
        onClose={() => onCallParent()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="btnContainer">
            <Button onClick={() => onCallParent()}>
              {!!cancel ? cancel : t("normal.cancel")}
            </Button>
          </div>
          <div className="btnContainer">
            <Button onClick={() => onConfirm()} className="confirm" autoFocus>
              {confirm}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
