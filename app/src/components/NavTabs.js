import { useState } from "react";
import { AppBar, Tab, makeStyles } from '@material-ui/core';
import PuppeePicker from './PuppeePicker';
import Faqs from './Faqs';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Team from "./Team";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  customAppBar: {
    background: 'transparent',
    boxShadow: 'none'
  },
  team: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.background.paper
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

            <Tab label="team" value="team" />
            <Tab label="mint" value="mint" />
            <Tab label="faqs" value="faqs" />
          </TabList>
        </AppBar>
        <TabPanel value="mint">
          <PuppeePicker />
        </TabPanel>
        <TabPanel className={classes.team} value="team">
          <Team />
        </TabPanel>
        <TabPanel className={classes.faqs} value="faqs">
          <Faqs />
        </TabPanel>
      </TabContext>
    </div>
  );
}
