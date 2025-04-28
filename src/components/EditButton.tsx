"use client"
import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { updateUser } from '@/libs/updateUser';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function EditButton({ params }: { params: { name: string , email:string , tel:string } }) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const token = session?.user?.token || "";
  const uid = session?.user?.user_id || "";
  const router = useRouter();
  

  const handleOpen = () => {
    setFormData({
      name: params.name,
      tel: params.tel,
      email: params.email,
    });
    setOpen(true);
    
  };
  
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    name: "",
    tel: "",
    email: "",
  })
  const handleSave = async () => {
    const requiredFields = ['name', 'tel', 'email'];
    const emptyFields = requiredFields.filter(field => {
      return !formData[field as keyof typeof formData] || formData[field as keyof typeof formData].toString().trim() === '';
    });

    if (emptyFields.length > 0) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const dataToSend = { ...formData } as any;
      
      if(!dataToSend){
        return console.log('Failed');
      }

      const res = await updateUser( token , uid ,formData);
      setOpen(false);
      router.refresh();

    }
    catch (err : any){
      console.log(err);
    }

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
    

  

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
            name='name'
            defaultValue={params.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="tel. :"
            type="text"
            fullWidth
            variant="standard"
            name='tel'
            defaultValue={params.tel}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email : "
            type="email"
            fullWidth
            variant="standard"
            name='email'
            defaultValue={params.email}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained"
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
