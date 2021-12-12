import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  // Requests styles

  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  cardTitle: {
    border: 'solid 2px rgba(56,184,111,1)',
    borderRadius: '15px',
    padding: '5px 15px',
  },
  cardEmail: {
    backgroundColor: 'rgba(56,184,111,1)',
    color: 'white',
    padding: '0 15px',
    border: 'solid 2px rgba(56,184,111,1)',
    borderRadius: '15px',
  },
  cardImg: {
    width: '100px',
    height: '75px',
    borderRadius: '10px',
    margin: '10px 0',
  },
  cardImgCon: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    backgroundColor: '#ebebec',
    padding: '0 10px',
    borderRadius: '10px',
  },
  btnCon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  // PlacesControl styles

  card: {
    minHeight: '200px',
    width: '732px',
    position: 'relative',
    display: 'inline-flex',
  },
  imgCon: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '230px',
  },
  cardImg2: {
    borderRadius: '20px',
    transform: 'translateX(-20px)',
    height: '170px',
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
  },
  likesBtn: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'rgba(56,184,111,1)',
    borderRadius: '0 20px 20px 0',
    justifyContent: 'center',
    padding: '0 10px',
  }
}));

export default useStyles;