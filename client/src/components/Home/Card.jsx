import React from 'react';
import { Typography, Button, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { MdOutlineFavorite } from 'react-icons/md';
import useStyles from './styles';

const PlaceCard = ({ item, handleLikeBtn, likeBtnColorHandler }) => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Card sx={{ borderRadius: '20px', overflow: 'visible' }} className={ classes.card }>
      <div className={classes.imgCon}>
        <CardMedia
          component="img"
          className={classes.cardImg}
          image={item.photos[0]}
          alt="Abo place picture"
          sx={{ objectFit: 'fill' }}
        />
      </div>
      <CardContent className={classes.cardContent}>
        <Typography variant="h4" style={{ fontFamily: 'Arial, Rounded, MT', fontWeight: 'bold' }} color="rgba(56,184,111,1)">{item.title}</Typography>
        <Typography style={{ margin: '20px 0' }} variant="h6">{item.description.substring(0, 200)}...</Typography>
        <Button onClick={() => navigate(`/vieta/${item._id}`)} style={{ color: 'white', backgroundColor: 'rgba(56,184,111,1)', padding: '10px 20px', fontSize: '11px', maxWidth: '150px', fontFamily: 'Lucida Sans Unicode', textTransform: 'none' }} size="small" variant="contained">Skaityti daugiau</Button>
      </CardContent>
      <Button onClick={(e) => handleLikeBtn(e, item._id)} variant="contained" style={{ backgroundColor: 'rgba(255,21,21,0.549)', color: '#FFFFFF' }} sx={{ borderRadius: '0 20px 20px 0', width: '45px', padding: '6px 12px' }}>
        <div className={classes.favBtnCon}>
          { likeBtnColorHandler(item._id) ? <MdOutlineFavorite style={{ color: '#e50004', fontSize: '2.5rem' }} /> : <MdOutlineFavorite style={{ fontSize: '2.5rem' }} />}
          <Typography variant="h5" color="white">{item.likesCount}</Typography>
        </div>
      </Button>
    </Card>
  )
}

export default PlaceCard;