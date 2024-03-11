import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function BookCard({book}) {

  const handleBorrow = (e, book) => {

  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{height:"140px", width:"100%"}}>
        <img
          alt=''
          src={`http://localhost:8080/${book.photos[0]}`}
          style={{
            height:"140px",
            width:'225px'
          }}
        />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {book.description}
        </Typography>
      </CardContent>
      <CardActions sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <Button size="small" onClick={(e, book)=> handleBorrow(e, book)}>Borrow</Button>
        <Typography variant="body2" color="text.secondary" >
            Available : {book.amount}
        </Typography>
      </CardActions>
    </Card>
  );
}