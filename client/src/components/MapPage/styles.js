import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  infoButton: {
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(56,184,111,1)',
    color: 'white',
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    boxShadow: '2px 5px 10px #888888',
  },
  imgPlace: {
    width: '100%',
    height: '100%',
    // objectFit: 'cover',
    // objectPosition: '50% 50%',
  },
  textCon: {
    overflowY: 'auto',
    padding: '24px 0',
    '&::-webkit-scrollbar': {
      width: '12px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey', 
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(56,184,111,1)',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#339966',
    },
  },
}));

export default useStyles;