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
  },
}));

export default useStyles;