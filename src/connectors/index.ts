import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { SupportedChainId } from '../constants/chains'
import getLibrary from '../utils/getLibrary'

import { NetworkConnector } from './NetworkConnector'

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY

if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}

const NETWORK_URLS: {
  [chainId in SupportedChainId]: string
} = {
  [SupportedChainId.ETHER_MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.KOVAN]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.BSC_MAINNET]: 'https://bsc-dataseed.binance.org/',
  [SupportedChainId.BSC_TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
}

const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.ETHER_MAINNET,
  SupportedChainId.KOVAN,
  SupportedChainId.BSC_MAINNET,
  SupportedChainId.BSC_TESTNET,
]

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 1,
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider))
}

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
})
