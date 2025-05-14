import './App.css';
import { useState } from 'react';
import { Button } from '@mui/material';
import PlotSettings from './PlotSettings';

// const DEFAULT_CONFIG = {
//   styles: {}
// }

const DEFAULT_URL = 'https://www.mountainproject.com/user/200683687/ray-murphy/'  

function MpForm({urlValue, loading}) {
    const [url, setUrl] = useState(DEFAULT_URL);
    const [config, setConfig] = useState({});

    const updateConfig = (update) => {setConfig({...config, ...update});}

    async function search  (event) {
        event.preventDefault()
        await urlValue(url, config);
    }

    
    let buttonDisabled = loading || url === '';
  return (
    <div className="MpForm">
      <form onSubmit={search}>
        <label >
          <input 
            name="urlValue" 
            defaultValue={url}
            placeholder="mountain project user url" 
            onChange={(e)=>setUrl(e.target.value)}/> 
        </label>
        <Button type="submit" disabled={buttonDisabled}>Generate plot</Button>
        <PlotSettings updateConfig={updateConfig}  />
      </form>
    </div>
  );
}

export default MpForm;
