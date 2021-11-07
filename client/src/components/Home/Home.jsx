import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, Card, CardMedia, CardContent, Skeleton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useGetPlacesQuery, useLikePlaceMutation } from '../../features/placesApi';

import useStyles from './styles';

const localStoreData = () => {
  const userLikes = localStorage.getItem('likes');
  if (!userLikes) {
    return localStorage.setItem('likes', JSON.stringify([]));
  }
  return JSON.parse(userLikes);
}

const Home = () => {
  const { data } = useGetPlacesQuery();
  const [likePlace] = useLikePlaceMutation();
  const [userLikes, setUserLikes] = useState(localStoreData() || []);
  let popularPlaces = [];
  const classes = useStyles();
  
  if (data) {
    const copyOfData = [...data];
    const popular = copyOfData.sort((a,b) => (a.likesCount < b.likesCount) ? 1 : ((b.likesCount < a.likesCount) ? -1 : 0));
    popularPlaces = popular;
  }

  const handleLikeBtn = (e, id) => {
    e.preventDefault();
    if (userLikes.indexOf(id) !== -1) {
      likePlace({ placeId: id, state: { action: 'DISLIKE' }});
      const newUserLikes = userLikes.filter((item) => item !== id );
      setUserLikes(newUserLikes);
    } else {
      likePlace({ placeId: id, state: { action: 'LIKE' }});
      setUserLikes([...userLikes, id]);
    }
  }

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(userLikes));
  }, [userLikes]);

  const likeBtnColorHandler = (id) => {
    if (userLikes?.indexOf(id) !== -1) {
      return true;
    } else return false;
  }

  if (!data) {
    return (
      <Container display="flex" spacing={2} className={classes.skeletonCon}>
        <Skeleton animation="wave" variant="text" height={50} width={600} />
        <Skeleton animation="wave" variant="rectangular" width={600} height={223} style={{ margin: '20px 0'}} />
        <Skeleton animation="wave" variant="rectangular" width={600} height={223} style={{ margin: '20px 0'}} />
      </Container>
    );
  }

  return (
    <Box className={classes.mainCon}>
      <Container className={classes.popCon}>
        <Box margin="60px 40px 10px 60px">
          <Typography color="white" variant="h4" style={{ fontFamily: 'Arial, Rounded, MT', fontWeight: 'bold' }}>Populiariausia</Typography>
        </Box>
        {popularPlaces?.map((item) => (
          <Card key={item._id} sx={{ borderRadius: '20px', overflow: 'visible' }} className={ classes.card }>
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
              <Typography variant="h6" style={{ fontFamily: 'Arial, Rounded, MT', fontWeight: 'bold' }} color="rgba(56,184,111,1)">{item.title}</Typography>
              <Typography style={{ margin: '20px 0' }} variant="body2">{item.description.substring(0, 200)}...</Typography>
              <Button style={{ color: 'white', backgroundColor: 'rgba(56,184,111,1)', padding: '10px 20px', fontSize: '11px', maxWidth: '150px', fontFamily: 'Lucida Sans Unicode', textTransform: 'none' }} size="small" variant="contained">Skaityti daugiau</Button>
            </CardContent>
            <Button onClick={(e) => handleLikeBtn(e, item._id)} variant="contained" style={{ backgroundColor: 'rgba(255,21,21,0.549)', color: '#FFFFFF' }} sx={{ borderRadius: '0 20px 20px 0', width: '45px', padding: '6px 12px' }}>
              <div className={classes.favBtnCon}>
                { likeBtnColorHandler(item._id) ? <FavoriteIcon style={{ color: '#e50004' }} /> : <FavoriteIcon />}
                <Typography variant="subtitle2" color="white">{item.likesCount}</Typography>
              </div>
            </Button>
          </Card>
        ))}
      </Container>

      <Container>
        <Box margin="60px 40px 10px 60px">
          <Typography color="rgba(56,184,111,1)" variant="h4" style={{ fontFamily: 'Arial, Rounded, MT', fontWeight: 'bold' }}>Katalogas</Typography>
        </Box>
        {data?.map((item) => (
          <Card key={item._id} sx={{ borderRadius: '20px', overflow: 'visible', boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)', }} className={classes.card}>
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
              <Typography variant="h6" style={{ fontFamily: 'Arial, Rounded, MT', fontWeight: 'bold' }} color="rgba(56,184,111,1)">{item.title}</Typography>
              <Typography style={{ margin: '20px 0' }} variant="body2">{item.description.substring(0, 200)}...</Typography>
              <Button style={{ color: 'white', backgroundColor: 'rgba(56,184,111,1)', padding: '10px 20px', fontSize: '11px', maxWidth: '150px', fontFamily: 'Lucida Sans Unicode', textTransform: 'none' }} size="small" variant="contained">Skaityti daugiau</Button>
            </CardContent>
            <Button onClick={(e) => handleLikeBtn(e, item._id)} variant="contained" style={{ backgroundColor: 'rgba(255,21,21,0.549)', color: '#FFFFFF' }} sx={{ borderRadius: '0 20px 20px 0', width: '45px', padding: '6px 12px' }}>
              <div className={classes.favBtnCon}>
                { likeBtnColorHandler(item._id) ? <FavoriteIcon style={{ color: '#e50004' }} /> : <FavoriteIcon />}
                <Typography variant="subtitle2" color="white">{item.likesCount}</Typography>
              </div>
            </Button>
          </Card>
        ))}
      </Container>
    </Box>
  )
}

export default Home;