import { Box, Button, IconButton, Input, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBook, fetchBook } from "../../features/book/book.action";
import axios from "axios";
import {Link} from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './AdminDashboard.css'
import BookDialog from "../../components/Dialog/Dialog";

function AdminDashboard() {
    axios.defaults.headers.common['token'] = localStorage.getItem("token");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(Number);
    const [photo, setPhoto] = useState();
    const [open, setOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState();
    const dispatch = useDispatch();
    const [search, setSearch] =useState("");
    const books = useSelector((state)=> state.book.book);
    
    useEffect(()=> {
      dispatch(fetchBook({search : search}));
    }, [])

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
      console.log(e.target.files);
      setPhoto(e.target.files);
    }

    async function handleEdit(e, book, key){
      setCurrentBook(book);
      setOpen(true);
    }


  
  async function handleDelete(e, user){
      
  }
    return(
      <>
        <Box sx={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
            <Box sx={{display:"flex", m:"10px", alignItems:"center", flexDirection:"column", justifyContent:"center", width:"221px"}}>
              <Typography>Add new Book</Typography>
            <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e)=> setTitle(e.target.value)} />
            <TextField id="outlined-basic"  variant="outlined" type="Number"  value={amount} 
              onChange={(e)=> { if(e.target.value < 0) {setAmount(0)}
               else if(e.target.value > 100) 
                {setAmount(100)}
               else 
                {setAmount(e.target.value)}}} />
            <TextField id="outlined-basic" label="Description" variant="outlined" value={description} onChange={(e)=> setDescription(e.target.value)} />
            <Input name="user_file" type='file' onChange={(e)=> handlephotos(e)} multiple />
            <Button type='submit' onClick={(e) => handleClick(e)}>Upload</Button>
            </Box>

            <Box >
            <table className='home-table'>
                        <tr className='table-header'>
                            <th>NAME</th>
                            <th>DESCRIPTION</th>
                            <th>QUANTITY</th>
                            <th>Edit</th>
                            <th>DELETE</th>
                        </tr>
                    
                    
                    {books && books.map((book, key)=> {
                        return(
                            <>
                            
                            <tr className='row'>
                                <td>{book.title}</td>
                                <td>{book.description}</td>
                                <td>{book.amount}</td>
                                <td><IconButton onClick={(e)=> {handleEdit(e, book, key)}}><EditIcon /></IconButton></td>
                                <td><IconButton onClick={(e)=> handleDelete(e, book)}><DeleteIcon/></IconButton></td>
                            </tr>
                            
                            </>
                        )
                    })}
                </table>
            </Box>
            <BookDialog open={open} setOpen={setOpen} currentBook = {currentBook} setCurrentBook = {setCurrentBook}/>
        </Box>
      </>
    )
  }
  
  export default AdminDashboard;
  