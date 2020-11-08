import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Modal = (props) => {
  
  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>{props.header}</DialogTitle>
      <DialogContent>
          {props.content}
      </DialogContent>
      <DialogActions>
          {props.footer}
    
      </DialogActions>
    </Dialog>
  );
};


export default Modal;