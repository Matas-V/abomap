import { makeStyles } from "@mui/styles";
import background from '../../images/background.svg';

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: 'calc(100vh - 30px)',
    background: `url(${background}) no-repeat`,
    display: 'flex',
    flexDirection: 'row',
    marginTop: '64px',
    padding: '80px 60px',
  },
  form: {
    marginTop: '100px',
  },
  formDisplay: {
    display: 'flex',
    flexDirection: 'row',
  },
  formInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  upload: {
    padding: '45px 25px',
    backgroundColor: '#f8f8f8',
    borderRadius: '0 20px 20px 0',
  },
  inputs: {
    margin: '20px 0',
  },
  btnCon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '30px 0'
  },
  textField: {
    width: '100%',
    "&:hover .MuiInputLabel-root": {
      color: theme.palette.text.primary
    },
    "& .Mui-focused.MuiInputLabel-root": {
      color: theme.palette.success.main,
    },
  },
  filledInput: {
    "&:hover .MuiInputAdornment-root": {
      color: 'black',
      transition: 'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    "&.Mui-focused .MuiInputAdornment-root": {
      color: 'green',
      transition: 'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    "& #filled-adornment-description": {
      marginLeft: '23px'
    }
  },
  imgPreviewCon: {
    display: 'flex',
    flexDirection: 'row',
    margin: '40px 20px',
    zIndex: '5',
    justifyContent: 'center',
  },
  imgDisplay: {
    height: '100px',
    borderRadius: '15px',
    boxShadow: `0px -0.7px 3.4px -3px rgba(0, 0, 0, 0.184), 0px -1.1px 5.2px -3px rgba(0, 0, 0, 0.197), 0px -1.1px 6.1px -3px rgba(0, 0, 0, 0.196), 0px -0.6px 6.6px -3px rgba(0, 0, 0, 0.19), 0px 0.4px 7.1px -3px rgba(0, 0, 0, 0.184), 0px 2.1px 8.2px -3px rgba(0, 0, 0, 0.177), 0px 4.7px 10.3px -3px rgba(0, 0, 0, 0.171), 0px 8.4px 14.6px -3px rgba(0, 0, 0, 0.166), 0px 13.9px 23.6px -3px rgba(0, 0, 0, 0.163), 0px 22px 64px -3px rgba(0, 0, 0, 0.16)`,
  },
}));

export const inputStyles = {
  fontSize: '1.5rem',
  '&:before': {
    borderBottom: '3px solid rgba(0, 0, 0, 0.42)',
  },
  '&:after': {
    borderBottom: '4px solid rgba(56,184,111,1)',
  },
  '&:hover:not(.Mui-disabled):before': {
    borderBottom: '3px solid rgba(0, 0, 0, 0.87)',
  },
  margin: '10px 0',
}

export default useStyles;