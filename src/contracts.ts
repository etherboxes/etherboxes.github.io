import * as Web3 from 'web3';
import SquaresABI from './json/SquaresABI';
import { SQUARES_ADDRESS, VOTING_BASED_ORACLE_ADDRESS } from './util/constants';
import VotingBasedOracleABI from './json/VotingBasedOracleABI';

let web3Instance: Web3;
let usingInjectedWeb3: boolean = false;

if (typeof (window as any).web3 !== 'undefined') {
  console.log('using injected web3');
  usingInjectedWeb3 = true;
  web3Instance = new Web3((window as any).web3.currentProvider);
} else {
  console.log('using infura with zero client provider');

  const provider = (window as any).ZeroClientProvider({
    getAccounts: function () {
      return [];
    },
    rpcUrl: 'https://mainnet.infura.io/0eep3H3CSiqitPXv0aOy'
  });

  web3Instance = new Web3(provider);
}

export const canSend = usingInjectedWeb3;
export const web3 = web3Instance;

export const Squares = web3.eth.contract(SquaresABI as any).at(SQUARES_ADDRESS);
export const VotingBasedOracle = web3.eth.contract(VotingBasedOracleABI as any).at(VOTING_BASED_ORACLE_ADDRESS);