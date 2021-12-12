import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPlaceQuery, useLikePlaceMutation } from '../../features/placesApi';

import { MdPlace, MdShare } from 'react-icons/md';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { CircularProgress } from '@mui/material';
import './styles.css';

const localStoreData = () => {
  const userLikes = localStorage.getItem('likes');
  if (!userLikes) {
    return localStorage.setItem('likes', JSON.stringify([]));
  }
  return JSON.parse(userLikes);
}

const PlacePage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPlaceQuery(id);
  const [liked, setLiked] = useState(false);
  const [likePlace] = useLikePlaceMutation();

  const handleLike = (e) => {
    e.preventDefault();
    if (liked) {
      likePlace({ placeId: id, state: { action: 'DISLIKE' }});
      const likes = localStoreData().filter((likesID) => id !== likesID);
      localStorage.setItem('likes', JSON.stringify(likes));
      setLiked(false);
    } else {
      likePlace({ placeId: id, state: { action: 'LIKE' }});
      const likes = localStoreData();
      likes.push(id);
      localStorage.setItem('likes', JSON.stringify(likes));
      setLiked(true);
    }
  }

  useEffect(() => {
    const likes = localStoreData();
    likes?.map((itemId) => {
      if (id === itemId) return setLiked(true)
      return undefined;
    })
  }, []);

  if (isLoading) {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <CircularProgress color="success" />
      </div>
    )
  }

  return (
  <div className="container-fluid" style={{ marginTop: '64px' }}>
    {/* <!-- single row --> */}
    <div className="row" style={{ minHeight: 'calc(100vh - 94px)' }}>
      {/* <!-- col-left --> */}

      <div className="col-lg-5" style={{ paddingLeft: '45px', paddingTop: '20px' }}>
        <h1 style={{ marginBottom: '60px', marginLeft: '20px' }}>{data.title}</h1>
        <div className="wiki">
          <p>Wiki</p>
        </div>
        <div className="text-box" style={{ marginBottom: '50px', overflowY: 'auto' }}>
          <p>{data.wiki}</p>
        </div>

        <div className="wiki" style={{ width: '220px', marginTop: '50px', }}>
          <p>Privalumai</p>
        </div>
        <div className="text-box" style={{ marginBottom: '50px', overflowY: 'auto', wordWrap: 'break-word' }}>
          <p>
            {data.description}
          </p>
        </div>
      </div>

      <div className="col-lg-1">
        <div className="Skirtukas">
          {liked ? <IoMdHeart className="sirdis" style={{ fontSize: '40px' }} /> : <IoMdHeartEmpty className="sirdis" style={{ fontSize: '40px' }} />}
          <h3>{data.likesCount}</h3>
        </div>

        <div className="Skirtukas1">
          <button className="btn-like" href="#" onClick={(e) => handleLike(e)}>
            {liked ? <IoMdHeart style={{ fontSize: '40px', color: 'white' }} /> : <IoMdHeartEmpty style={{ fontSize: '40px', color: 'white' }} />}
          </button>
          <button className="btn-share" href="#">
            <MdShare style={{ fontSize: '30px', color: 'white' }} />
          </button>
          <button className="btn-point" href="#">
            <MdPlace style={{ fontSize: '30px', color: 'white' }} />
          </button>
        </div>
      </div>

      {/* <!-- col-right --> */}

      <div
        className="col-lg-6"
        style={{ backgroundColor: 'white', paddingTop: '45px' }}
      >
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          {/* <!-- Indicators --> */}
          <ol className="carousel-indicators">
            {data.photos.map((_, i) => (
              <li key={i} className={i === 0 ? `active` : undefined} data-target="#myCarousel" data-slide-to={i}></li>
            ))}
          </ol>

          {/* <!-- Wrapper for slides --> */}
          <div className="carousel-inner">
            <div className="item active">
              <img src={data.photos[0]} alt="Abo vieta" />
            </div>
            {data.photos.map((img, i) => i !== 0 && (
              <div className="item" key={i}>
                <img src={img} alt="Abo vieta" />
              </div>
            ))}
          </div>

          {/* <!-- Left and right controls --> */}
          <a
            className="left carousel-control"
            href="#myCarousel"
            data-slide="prev"
          >
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="right carousel-control"
            href="#myCarousel"
            data-slide="next"
          >
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        {/* <!--Karuseles pabaiga--> */}
        <div className="nuotrauku_dez">
          <div className="row" style={{ paddingLeft: '14%', paddingTop: '20px' }}>
            {data.photos.map((img, i) => (
              <div className="col-sm-3" key={i}>
                <img src={img} alt="Abo vieta" />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
  )
}

export default PlacePage;