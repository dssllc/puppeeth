import { useState, useEffect } from "react";
import { AppBar, Tabs, Tab, makeStyles } from '@material-ui/core';
import PuppeePicker from './PuppeePicker';
import About from './About';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  customAppBar: {
    background: 'transparent',
    boxShadow: 'none'
  },
  faqs: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.background.paper
  }
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = useState('mint');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static" elevation={0} className={classes.customAppBar}>
          <TabList
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="puppeeth navigation"
            centered>
            <Tab label="mint" value="mint" />
            <Tab label="team" value="team" />
            <Tab label="faqs" value="faqs" />
          </TabList>
        </AppBar>
        <TabPanel value="mint">
          <PuppeePicker />
        </TabPanel>
        <TabPanel value="team">Item Twowerwer</TabPanel>
        <TabPanel className={classes.faqs} value="faqs">
          <About />
        </TabPanel>
      </TabContext>
    </div>
  );
}
