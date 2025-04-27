"use client"
import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import Image from 'next/image';

export default function EditButton() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <Image src="/img/edit.png" alt="edit" width={25} height={25} />
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name :"
            type="text"
            fullWidth
            variant="standard"
            defaultValue="John Doe"
          />
          <TextField
            margin="dense"
            label="tel. :"
            type="text"
            fullWidth
            variant="standard"
            defaultValue="tel."
          />
          <TextField
            margin="dense"
            label="Email : "
            type="email"
            fullWidth
            variant="standard"
            defaultValue="john@example.com"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} variant="contained"
              sx={{
              bgcolor: 'limegreen',
              color: 'white',
              '&:hover': {
                bgcolor: 'green',
              },
            }}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
