export enum SupportedChainId {
  ETHER_MAINNET = 1,
  KOVAN = 42,
  BSC_MAINNET = 56,
  BSC_TESTNET = 97,
}

export const NETWORK_LABELS: { [chainId in SupportedChainId | number]: string } = {
  [SupportedChainId.ETHER_MAINNET]: 'Ethereum Mainnet',
  [SupportedChainId.KOVAN]: 'Kovan',
  [SupportedChainId.BSC_MAINNET]: 'BSC Mainnet',
  [SupportedChainId.BSC_TESTNET]: 'BSC Testnet',
}
