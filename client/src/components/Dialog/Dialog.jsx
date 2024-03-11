import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Input, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBook} from "../../features/book/book.action";

export default function BookDialog( {open, setOpen, currentBook, setCurrentBook}) {
    console.log(currentBook, "currentBook")
    const dispatch = useDispatch();
    const [title, setTitle] = useState(currentBook?.title);
    const [description, setDescription] = useState(currentBook?.description);
    const [amount, setAmount] = useState(currentBook?.amount);
    const [photo, setPhoto] = useState(currentBook?.photos);
    const handleClose = () => {
        setOpen(false);
    };
    async function handleClick(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("amount", amount);
        for(let y of photo)
        {
            formData.append("user_file" , y);
        }
        dispatch(createBook(formData));
    }
    function handlephotos(e) {
        setPhoto(e.target.files);
    }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Edit Book
        </DialogTitle>
        <DialogContent sx={{display:"flex", flexDirection:'column'}}>
        <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e)=> setTitle(e.target.value)} />
            <TextField id="outlined-basic"  variant="outlined" type="Number"  value={amount} 
              onChange={(e)=> { if(e.target.value < 0) {setAmount(0)}
               else if(e.target.value > 100) 
                {setAmount(100)}
               else 
                {setAmount(e.target.value)}}} />
            <TextField id="outlined-basic" label="Description" variant="outlined" value={description} onChange={(e)=> setDescription(e.target.value)} />
            <Input sx={{width:"221px"}} name="user_file" type='file' onChange={(e)=> handlephotos(e)} multiple />
            
        </DialogContent>
        <DialogActions>
        <Button type='submit' onClick={(e) => handleClick(e)}>Upload</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}