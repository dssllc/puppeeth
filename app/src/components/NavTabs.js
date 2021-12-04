import { AppBar, Tab, makeStyles } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import {
  Link,
  useLocation
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  customAppBar: {
    background: "transparent",
    boxShadow: "none"
  }
}));

export default function NavTabs() {

  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <TabContext value={location.pathname}>
        <AppBar position="static" elevation={0} className={classes.customAppBar}>
          <TabList
            indicatorColor="primary"
            textColor="primary"
            aria-label="puppeeth navigation"
            centered>
            <Tab
              label="Team"
              value="/team"
              component={Link}
              to="/team"
            />
            <Tab
              label="Mint"
              value="/"
              component={Link}
              to="/"
            />
            <Tab
              label="Info"
              value="/info"
              component={Link}
              to="/info"
            />
          </TabList>
        </AppBar>
      </TabContext>
    </div>
  );
}
