import { useState } from 'react';
import './App.css';
import MpForm from './MpForm';
import MpPlot from './MpPlot';


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from "axios";

var Buffer = require('buffer/').Buffer
console.log(process.env)
console.log(process.env.BACKEND_URL)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';

function App() {
  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);


  const  handleUrl = async (url, config) => {
    setPlot(null);
    setLoading(true);
    setErrorMessage(null);

    const headers =  {
        'Accept': 'image/png',
        'Content-Type': 'application/json'
      }
      console.log(config)
  axios.post(BACKEND_URL + '/plot/', {url, ...config}, {responseType: "arraybuffer"})
  .then(response => {
  console.log(response);
  setLoading(false);
  setPlot(Buffer.from(response.data, "binary").toString("base64"))
}).catch(error => {setErrorMessage(Buffer.from(error.response.data, "utf-8").toString()); setLoading(false);});

  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <div className='Search-Header'>
          <h1>Mountain Project Tick Plot</h1>
          <MpForm urlValue={handleUrl} loading={loading}/>
        </div>
        <Box
          height={500}
          margin="auto"
          my={2}
          alignItems="center"
          justifyContent="center"
          style={{backgroundColor: "white"}}
      >
        {
          loading ?
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <CircularProgress />
            <div>Generating plot</div>
          </Stack>
          : <img src={`data:image/png;charset=utf-8;base64,${plot}`} alt=''/>
        }
        {
        errorMessage && <Alert severity="error">{errorMessage}</Alert>
        }
        </Box>
      </div>
    </LocalizationProvider>
  );
}

export default App;
