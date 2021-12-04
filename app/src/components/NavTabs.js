import { useState, useEffect } from "react";
import { AppBar, Tab, makeStyles } from "@material-ui/core";
import PuppeePicker from "./PuppeePicker";
import Info from "./Info";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Team from "./Team";
import { ethers } from "ethers";
import Puppeeth
  from "../artifacts/contracts/Puppeeth.sol/Puppeeth.json";
import { CONTRACT_ADDRESS, RPC_ENDPOINT } from "../constants";
import {
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  customAppBar: {
    background: "transparent",
    boxShadow: "none"
  },
  team: {
    backgroundColor: "#FF0094",
    color: theme.palette.background.paper
  },
  faqs: {
    backgroundColor: "#A305FA",
    color: theme.palette.background.paper
  }
}));

export default function NavTabs() {
  let tokenContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    Puppeeth.abi,
    ethers.getDefaultProvider(RPC_ENDPOINT)
  );

  const classes = useStyles();

  async function getTotalTokens() {
    setTotalTokens((await tokenContract.totalTokens()).toNumber());
  }

  useEffect(() => {
    getTotalTokens();
  });

  const [tab, setTab] = useState("mint");
  const [tokenId, setTokenId] = useState(0);
  const [totalTokens, setTotalTokens] = useState(3125);

  function handleChange(event, newValue) {
    setTab(newValue);
  }

  return (
    <div className={classes.root}>
      <TabContext value={tab}>
        <AppBar position="static" elevation={0} className={classes.customAppBar}>
          <TabList
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="puppeeth navigation"
            centered>
            <Tab
              label="Team"
              value="team"
              component={Link}
              to="/team"
            />
            <Tab
              label="Mint"
              value="mint"
              component={Link}
              to="/"
            />
            <Tab
              label="Info"
              value="info"
              component={Link}
              to="/info"
            />
          </TabList>
        </AppBar>
        <TabPanel value="mint">
          <PuppeePicker
            tokenId={tokenId}
            tokenHandler={setTokenId}
            totalTokens={totalTokens}
          />
        </TabPanel>
        <TabPanel className={classes.team} value="team">
          <Team />
        </TabPanel>
        <TabPanel className={classes.faqs} value="info">
          <Info />
        </TabPanel>
      </TabContext>
    </div>
  );
}
