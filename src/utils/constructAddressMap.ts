import addresses from 'constants/addresses.json'

export function constructAddressMap<T extends string>(contractName: T): { [chainId: number]: T } {
  const keys = Object.keys(addresses)

  return keys.reduce<{ [chainId: number]: T }>((memo, chainId) => {
    // @ts-ignore
    if (addresses[chainId] !== undefined && addresses[chainId][contractName]) {
      // @ts-ignore
      memo[Number(chainId)] = addresses[chainId][contractName]
    }
    return memo
  }, {})
}
