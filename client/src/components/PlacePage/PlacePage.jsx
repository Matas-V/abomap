import React from 'react';
import { useParams } from 'react-router';
import { useGetPlaceQuery } from '../../features/placesApi';

import { MdOutlineFavorite, MdPlace, MdShare } from 'react-icons/md';
import { CircularProgress } from '@mui/material';
import './styles.css';

const PlacePage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPlaceQuery(id);

  if (isLoading) {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <CircularProgress color="success" />
      </div>
    )
  }

  return (
    <>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
    />
    {/* <!-- main container --> */}
    <div className="container-fluid" style={{ marginTop: '64px' }}>
      {/* <!-- single row --> */}
      <div className="row">
        {/* <!-- col-left --> */}

        <div className="col-lg-6" style={{ paddingLeft: '45px', paddingTop: '20px' }}>
          <h1 style={{ marginBottom: '60px', marginLeft: '20px' }}>{data.title}</h1>
          <div className="wiki">
            <p>Wiki</p>
          </div>
          <div className="text-box">
            <p>
              Sartų ežeru iš pietų į pietvakarius prateka upė Šventoji, taip pat
              susrūva dar keli upeliai: Audra, Kriauna, Zalvė, Serbentupis,
              Vasyna, Plavelė, Ūžos upelis, Cibeikė, Ilgelė, Zaduoja, Biržupys.
              Jie suneša vandenis iš aplinkinių ežerų – Zalvės, Zaduojo, Ilgio,
              Plavio, Keležerio ir kt. Ežero pratakumas 452 % per metus.
            </p>
          </div>

          <div className="wiki" style={{ width: '220px', marginTop: '50px' }}>
            <p>Privalumai</p>
          </div>
          <div className="text-box" style={{ marginBottom: '50px' }}>
            <p>
              {data.description}
            </p>
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
        {/* <!-- Stulpelio pabaiga --> */}
        <div className="Skirtukas">
          <MdOutlineFavorite className="sirdis" style={{ fontSize: '40px', color: 'white' }} />
          <h3>{data.likesCount}</h3>
        </div>

        <div className="Skirtukas1">
          <button className="btn-like" href="#">
            <MdOutlineFavorite style={{ fontSize: '30px', color: 'white' }} />
          </button>
          <button className="btn-share" href="#">
            <MdShare style={{ fontSize: '30px', color: 'white' }} />
          </button>
          <button className="btn-point" href="#">
            <MdPlace style={{ fontSize: '30px', color: 'white' }} />
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default PlacePage;