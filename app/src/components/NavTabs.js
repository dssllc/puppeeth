import { useState, useEffect } from "react";
import { AppBar, Tab, makeStyles } from "@material-ui/core";
import PuppeePicker from "./PuppeePicker";
import Faqs from "./Faqs";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Team from "./Team";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import Puppeeth
  from "../artifacts/contracts/Puppeeth.sol/Puppeeth.json";
import { CONTRACT_ADDRESS, RPC_ENDPOINT_1, RPC_ENDPOINT_4, NETWORK_ID } from "../constants";

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
    ethers.getDefaultProvider(NETWORK_ID === 4 ? RPC_ENDPOINT_4 : RPC_ENDPOINT_1)
  );

  const classes = useStyles();

  const web3React = useWeb3React();

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

            <Tab label="team" value="team" />
            <Tab label="mint" value="mint" />
            <Tab label="faqs" value="faqs" />
          </TabList>
        </AppBar>
        <TabPanel value="mint">
          <PuppeePicker
            tokenId={tokenId}
            tokenHandler={setTokenId}
            totalTokens={totalTokens}
            tokenContract={tokenContract}
            web3React={web3React}
          />
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
