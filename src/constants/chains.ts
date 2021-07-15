export enum SupportedChainId {
  ETHER_MAINNET = 1,
  KOVAN = 42,
}

export const NETWORK_LABELS: { [chainId in SupportedChainId | number]: string } = {
  [SupportedChainId.ETHER_MAINNET]: 'Ethereum Mainnet',
  [SupportedChainId.KOVAN]: 'Kovan',
}
