import type { NextPage } from "next";
import { useWeb3Context } from "web3-react";
import { Button, Divider } from "@mui/material";
import { usecDAI } from "../hooks/usecDAI";
import { formatUnits } from "ethers/lib/utils";

const cDAIdecimals = 8;
const DAIdecimals = 18;
// magic
const mantissaDecimals = 18 + DAIdecimals;

const Home: NextPage = () => {
    const context = useWeb3Context();
    const { active } = context;

    const onConnectWallet = () => {
        context.setFirstValidConnector(["metamask"]);
    };
    const onDisconnectWallet = () => {
        context.unsetConnector();
    };

    const { cDAIbalance, exchangeRate } = usecDAI();

    if (!active || !cDAIbalance || !exchangeRate) {
        return (
            <Button onClick={onConnectWallet} variant="outlined">
                Connect wallet
            </Button>
        );
    }

    return (
        <>
            <Button onClick={onDisconnectWallet} variant="outlined">
                Disconnect wallet
            </Button>
            <p>cDAI balance: {`${formatUnits(cDAIbalance, cDAIdecimals)}`}</p>
            <p>
                DAI balance in Compound:{" "}
                {`${formatUnits(
                    cDAIbalance.mul(exchangeRate),
                    mantissaDecimals
                )}`}
            </p>
            <Divider />
        </>
    );
};

export default Home;
