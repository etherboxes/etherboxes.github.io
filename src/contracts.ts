import * as Web3 from 'web3';
import SquaresABI from './json/SquaresABI';
import { SQUARES_ADDRESS, VOTING_BASED_ORACLE_ADDRESS } from './util/constants';
import VotingBasedOracleABI from './json/VotingBasedOracleABI';

let web3: Web3;

if (typeof (window as any).web3 !== 'undefined') {
  web3 = new Web3((window as any).web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/0eep3H3CSiqitPXv0aOy'));
}

export const Squares = web3.eth.contract(SquaresABI as any).at(SQUARES_ADDRESS);
export const VotingBasedOracle = web3.eth.contract(VotingBasedOracleABI as any).at(VOTING_BASED_ORACLE_ADDRESS);