import BigNumber from 'web3/bower/bignumber.js/bignumber';

export default function numberDisplay(num: string | number | BigNumber): string {
  const bn = new BigNumber(num);

  return bn.round(5).valueOf();
}