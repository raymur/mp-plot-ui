import './App.css';
import { useState, useMemo } from 'react';
import { FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Typography} from '@mui/material';
import { useEffect } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Switch from '@mui/material/Switch'

const DEFAULT_CONFIG = {
  styles: {solo: false, tr: false, follow: false, lead: true},
  dates: {start: null, end: null},
  types: {sport: true, trad: true, tr: true },
  includeFalls: false
}

function PlotSettings({updateConfig}) {
  const [styles, setStyles] = useState(DEFAULT_CONFIG.styles);
  const [types, setTypes] = useState(DEFAULT_CONFIG.types);
  const [dates, setDates] = useState(DEFAULT_CONFIG.dates);
  const [includeFalls, setIncludeFalls] = useState(DEFAULT_CONFIG.includeFalls);
  const [error, setError] = useState(null);
  useEffect(() => updateConfig(DEFAULT_CONFIG), [] )

  const onStylesChange = (e) => { 
    const newStyles = {...styles, [e.target.name]: e.target.checked}
    setStyles(newStyles);
    updateConfig({styles: newStyles});
  };

  const onTypesChange = (e) => { 
    const newTypes = {...types, [e.target.name]: e.target.checked}
    setTypes(newTypes);
    updateConfig({types: newTypes});
  };

  const onDateChange = (newDate, dateType) => { 
    const newDates = {...dates, [dateType]: newDate}
    setDates(newDates);
    updateConfig({dates: newDates});
  };

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'maxDate':
      case 'minDate': {
        return 'Please select an end date after the start date';
      }
      default: {
        return '';
      }
    }
  }, [error]);

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

            <Grid xs={4} md={3}>
              <FormGroup label="Types" onChange={onTypesChange} >
                <Typography variant="body1" gutterBottom align="left">
                  Route type:
                </Typography>
                <FormControlLabel control={<Checkbox name="sport" checked={types.sport}/>} label="Sport"  />
                <FormControlLabel control={<Checkbox name="trad" checked={types.trad}/>} label="Trad"  />
                <FormControlLabel control={<Checkbox name="tr" checked={types.tr}/>} label="TR"  />
              </FormGroup>
            </Grid>

            <Grid xs={3} md={2}>
              <FormControlLabel
                control={
                  <Switch
                  checked={includeFalls}
                  onChange={(evt) => {
                    setIncludeFalls(evt.target.checked); 
                    updateConfig({includeFalls: evt.target.checked});
                  }}
                />             
                }
              label='Include falls:'
              labelPlacement="start"
            />
            </Grid>

            <Grid xs={6} md={4}>
              <FormGroup label="Date" >
                <Typography variant="body1" gutterBottom align="left">
                  Date filter:
                </Typography>
                <DatePicker 
                  label="Start date" 
                  value={dates.start} 
                  onChange={(newDate) => onDateChange(newDate, "start")}
                  maxDate={dates.end}/>
                <DatePicker 
                  label="End date" 
                  value={dates.end} 
                  onChange={(newDate) => onDateChange(newDate, "end")}
                  onError={e => setError(e)}
                  slotProps={{
                    textField: {
                      helperText: errorMessage,
                    },
                  }}
                  minDate={dates.start}/>
              </FormGroup>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      
    </div>
  );
}

export default PlotSettings;
