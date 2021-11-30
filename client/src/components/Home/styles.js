import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  mainCon: {
    height: '100%',
    marginTop: "64px",
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    }
  },
  popCon: {
    height: '100%',
    backgroundColor: 'rgba(56,184,111,1)',
  },
  card: {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'row',
    margin: '30px 40px 30px 60px',
  },
  imgCon: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '230px',
  },
  cardImg: {
    borderRadius: '20px',
    transform: 'translateX(-20px)',
    height: '170px',
    width: '200px',
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
  },
  cardContent: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 32px',
  },
  favBtnCon: {
    display: 'flex',
    flexDirection: 'column',
  },
  skeletonCon: {
    margin: '80px 0 0 40px',
  },
}));

export default useStyles;