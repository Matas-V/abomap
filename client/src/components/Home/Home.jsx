import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Skeleton } from '@mui/material';
import PlaceCard from './Card';

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
  const [userLikes, setuserLikes] = useState(localStoreData() || []);
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
      const newuserLikes = userLikes.filter((item) => item !== id );
      setuserLikes(newuserLikes);
    } else {
      likePlace({ placeId: id, state: { action: 'LIKE' }});
      setuserLikes([...userLikes, id]);
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

  return (
    <Box className={classes.mainCon}>
      <Container className={classes.popCon}>
        <Box margin="60px 40px 10px 60px">
          <Typography color="white" variant="h3" style={{ fontFamily: 'Arial, Rounded, MT', fontWeight: 'bold' }}>Populiariausia</Typography>
        </Box>
        {data ? popularPlaces?.map((item) => (
          <PlaceCard key={item._id} item={item} likeBtnColorHandler={likeBtnColorHandler} handleLikeBtn={handleLikeBtn} />
        )) : (
          <>
            <Skeleton animation="wave" variant="rectangular" width={'85%'} height={200} style={{ margin: '30px 40px 30px 60px', borderRadius: '20px' }} />
            <Skeleton animation="wave" variant="rectangular" width={'85%'} height={200} style={{ margin: '30px 40px 30px 60px', borderRadius: '20px' }} />
            <Skeleton animation="wave" variant="rectangular" width={'85%'} height={200} style={{ margin: '30px 40px 30px 60px', borderRadius: '20px' }} />
          </>
        )}
      </Container>

      <Container>
        <Box margin="60px 40px 10px 60px">
          <Typography color="rgba(56,184,111,1)" variant="h3" style={{ fontFamily: 'Arial, Rounded, MT', fontWeight: 'bold' }}>Katalogas</Typography>
        </Box>
        {data ? data?.map((item) => (
          <PlaceCard key={item._id} item={item} likeBtnColorHandler={likeBtnColorHandler} handleLikeBtn={handleLikeBtn} />
        )) : (
          <>
            <Skeleton animation="wave" variant="rectangular" width={'85%'} height={200} style={{ margin: '30px 40px 30px 60px', borderRadius: '20px' }} />
            <Skeleton animation="wave" variant="rectangular" width={'85%'} height={200} style={{ margin: '30px 40px 30px 60px', borderRadius: '20px' }} />
            <Skeleton animation="wave" variant="rectangular" width={'85%'} height={200} style={{ margin: '30px 40px 30px 60px', borderRadius: '20px' }} />
          </>
        )}
      </Container>
    </Box>
  )
}

export default Home;