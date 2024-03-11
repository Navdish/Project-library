import { Box, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook } from "../../features/book/book.action";
import BookCard from "../../components/BookCard/Bookcard";

function Home() {
    axios.defaults.headers.common['token'] = localStorage.getItem("token");
    const [search, setSearch] =useState("");
    const dispatch = useDispatch();
    useEffect(()=> {
      dispatch(fetchBook({search : search}));
    }, [])

    const handleSearch =(e) => {
      setSearch(e.target.value);
      dispatch(fetchBook({search : e.target.value}));
    
    }

    const books = useSelector((state)=> state.book.book);
    return(
      <>
        <Box>
          <Box sx={{display:'flex', justifyContent:"center", mt:"10px"}}>
            <TextField id="outlined-basic" label="Search" variant="outlined" value={search} onChange={(e)=> handleSearch(e)}/>
          </Box>
          <Box sx={{display:"flex", gap:'10px', margin:"10px", flexWrap:"wrap"}}>
            {books && books?.map((book)=> {
              return <BookCard  book ={book}/>
            })}
          </Box>
        </Box>
      </>
    )
  }
  
  export default Home;
  