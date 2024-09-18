import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const ConfirmDelete = ({open,handleClose,deletehandler}) => {
  return (
    <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Are you sure you want to delete this group?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
            <Button onClick={deletehandler}  variant="contained" color="error">
            Delete
            </Button>
        </DialogActions>  
          </Dialog>
  )
}

export default ConfirmDelete