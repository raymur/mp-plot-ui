import './App.css';
import { useState } from 'react';
import { FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Typography} from '@mui/material';
// import Switch from '@mui/material/Switch';
import { useEffect } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Unstable_Grid2';

const DEFAULT_CONFIG = {
  styles: {solo: false, tr: false, follow: false, lead: true}
}


function Item(x){
  return (<p>hello </p>)
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
      <Accordion>    
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Plot Settings
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={2}>
          <Grid xs={6} md={4}>
            <FormGroup label="Styles" onChange={onStylesChange} >
              <Typography variant="body1" gutterBottom align="left">
                Climbing styles:
              </Typography>
              <FormControlLabel control={<Checkbox name="solo" checked={styles.solo}/>} label="Solo"  />
              <FormControlLabel control={<Checkbox name="tr" checked={styles.tr}/>} label="TR"  />
              <FormControlLabel control={<Checkbox name="follow" checked={styles.follow}/>} label="Follow"  />
              <FormControlLabel control={<Checkbox name="lead" checked={styles.lead}/>} label="Lead"  />
            </FormGroup>
          </Grid>
        </Grid>

        </AccordionDetails>
      </Accordion>

      
    </div>
  );
}

export default PlotSettings;
