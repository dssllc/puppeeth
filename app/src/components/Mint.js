import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import PuppeePicker from "./PuppeePicker";
import { ethers } from "ethers";
import Puppeeth
  from "../artifacts/contracts/Puppeeth.sol/Puppeeth.json";
import { CONTRACT_ADDRESS, RPC_ENDPOINT } from "../constants";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  customAppBar: {
    background: "transparent",
    boxShadow: "none"
  }
}));

export default function Mint() {
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

  const [tokenId, setTokenId] = useState(0);
  const [totalTokens, setTotalTokens] = useState(3125);

  return (
    <div className={classes.root}>
      <PuppeePicker
        tokenId={tokenId}
        tokenHandler={setTokenId}
        totalTokens={totalTokens}
      />
    </div>
  );
}
