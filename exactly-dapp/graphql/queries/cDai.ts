import { gql } from "@apollo/client";

export const ALL_ENTITIES = gql`
    query GetCDAIInteractions($walletAddress: Bytes!) {
        approvalEntities(where: { address: $walletAddress }) {
            id
            address
            amount
        }
        redeemEntities(where: { address: $walletAddress }) {
            id
            address
            amount
        }
        mintEntities(where: { address: $walletAddress }) {
            id
            address
            amount
        }
        borrowEntities(where: { address: $walletAddress }) {
            id
            address
            amount
        }
        repayEntities(where: { borrower: $walletAddress }) {
            id
            amount
        }
    }
`;
