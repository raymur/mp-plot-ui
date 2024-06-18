import './App.css';
import { useState } from 'react';
import { Button, FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Typography} from '@mui/material';
import Switch from '@mui/material/Switch';
import { useEffect } from 'react';

const DEFAULT_CONFIG = {
  styles: {solo: true, lead: true}
}

function PlotSettings({updateConfig}) {
  const [styles, setStyles] = useState(DEFAULT_CONFIG.styles);

  useEffect(() => updateConfig(DEFAULT_CONFIG), [] )

  let onStylesChange = (e) => { 
    const newStyles = {...styles, [e.target.name]: e.target.checked}
    setStyles(newStyles);
    updateConfig({styles: newStyles});
  };




  return (
    <div className="PlotSettings">
      <Button onClick={e => console.log(styles)} >but </Button>



      <FormGroup label="Styles" onChange={onStylesChange} >
      <Typography variant="body1" gutterBottom>
        Which styles of climbing should be included?
      </Typography>
        <FormControlLabel control={<Checkbox name="solo" checked={styles.solo}/>} label="Solo"  />
        {/* <Checkbox label="TR" />
        <Checkbox label="Follow" /> */}
        <FormControlLabel control={<Checkbox name="lead" checked={styles.lead}/>} label="Lead"  />
      </FormGroup >

      


      {/* <Typography variant="body1" gutterBottom>
        Which route types should be included?
      </Typography>
      <Checkbox label="Trad" defaultChecked />
      <Checkbox label="Sport" defaultChecked />


      <Typography variant="body1" gutterBottom>
        Display multipitch climbs as larger dots?
      </Typography>
      <Switch  defaultChecked /> */}
    </div>
  );
}

export default PlotSettings;
