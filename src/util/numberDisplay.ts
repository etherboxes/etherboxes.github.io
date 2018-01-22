import BigNumber from 'web3/bower/bignumber.js/bignumber';
import { web3 } from '../contracts';

export function weiDisplay(num: string | number | BigNumber): string {
  return numberDisplay(web3.fromWei(new BigNumber(num), 'ether'));
}

export default function numberDisplay(num: string | number | BigNumber): string {
  const bn = new BigNumber(num);

  return bn.round(5).valueOf();
}