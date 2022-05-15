import { useLazyQuery, useQuery } from "@apollo/client";
import { BigNumber, Contract } from "ethers";
import { useEffect, useState } from "react";
import { useWeb3Context } from "web3-react";
import { ALL_ENTITIES } from "../graphql/queries/cDai";

const compoundDAIContractAddress = "0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD";

const contractAbi = [
    "function getAccountSnapshot(address account) external view returns (uint, uint, uint, uint)",
];

const contract = new Contract(compoundDAIContractAddress, contractAbi);

const cDAIdecimals = 8;
const DAIdecimals = 18;

// TODO: cast data to list of entities (create entities models)
// Display table of interactions

export const usecDAI = () => {
    const { library, active, account } = useWeb3Context();
    const [cDAIbalance, setcDAIbalance] = useState<BigNumber | null>(null);
    const [exchangeRate, setExchangeRate] = useState<BigNumber | null>(null);
    const [loadInteractions, { loading, error, data }] = useLazyQuery(
        ALL_ENTITIES,
        {
            variables: {
                walletAddress: "0x0Aa5567ff016aB1f706667C809D6D71C554A6FE3",
            },
            pollInterval: 1000,
        }
    );

    useEffect(() => {
        (async () => {
            if (active && library && account) {
                // Load interactions from TheGraph
                loadInteractions();

                // Load contract balances
                const currentContract = contract.connect(library);
                const snapshot = await currentContract.getAccountSnapshot(
                    account
                );
                const cTokenBalance: BigNumber = snapshot[1];
                console.log("SNAPSHOT", snapshot);
                console.log("number", snapshot[3].toString());
                setcDAIbalance(cTokenBalance);
                setExchangeRate(snapshot[3]);
            }
        })();
    }, [active, library, account]);

    console.log(loading, error, data);

    return { cDAIbalance, exchangeRate };
};
