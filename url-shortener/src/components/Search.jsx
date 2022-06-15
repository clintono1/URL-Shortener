import React, {useState} from 'react'
import { TextField, Button, LinearProgress } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import LinkIcon from '@mui/icons-material/Link';
import shrtcode from '../backend/shrtcode';
import DisplayLink from './DisplayLink';

const HTTP_URL_VALIDATOR_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const Search = () => {
    const[link, setLink] = useState('');
    const[short, setShort] = useState('');
    const[isLoading, setIsLoading] = useState(false);


    const handleSubmit = (e) => {
      e.preventDefault(); //on submission prevent page refresh
      if (checkLink(link)){
      getLink();
      setLink('');
      setIsLoading(!isLoading);
      }
    };

     // Link Validation Function
  const checkLink = (string) => {
    // Regex to check if string is a valid URL
    return string.match(HTTP_URL_VALIDATOR_REGEX);
  };

    const getLink = async () => {
      await shrtcode
      .get(`shorten?url=${link}`)
      .then((response) => {
        setShort(response.data.result.short_link);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error)
      })
    }


  return (
    <>
        <form  style={{ display: 'flex', flexDirection: 'column'}} 
          onSubmit={(e) => handleSubmit(e)}
        >
            <TextField 
            label="Input Your Link"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            value={link}
            style={{ marginBottom: '20px' }}
            onChange={ (e) => setLink(e.target.value)}
            />
            {!isLoading && (
            <Button 
            variant="contained"
            color="primary"
            onClick={(e) => handleSubmit(e)}
            style={{ marginBottom: '20px' }}
            >
                Submit
            </Button>
            )}
            {isLoading && <LinearProgress />}
        </form>
        {short && (
          <>
            <h2>Link</h2>
            <DisplayLink shortend={short} />
          </>
        )}
     </>
  );
};

export default Search