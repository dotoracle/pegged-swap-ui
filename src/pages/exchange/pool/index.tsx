import { ChainId, CurrencyAmount, JSBI, NATIVE, Pair } from 'dotoracle-sdk'
import React, { useMemo } from 'react'
import { classNames, currencyId } from '../../../functions'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../../state/user/hooks'

import Alert from '../../../components/Alert'
import { BIG_INT_ZERO } from '../../../constants'
import Back from '../../../components/Back'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import Container from '../../../components/Container'
import { Currency } from 'dotoracle-sdk'
import Dots from '../../../components/Dots'
import Empty from '../../../components/Empty'
import ExternalLink from '../../../components/ExternalLink'
import FullPositionCard from '../../../components/PositionCard'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { MigrationSupported } from '../../../features/migration'
import Typography from '../../../components/Typography'
import Web3Connect from '../../../components/Web3Connect'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../../hooks/useActiveWeb3React'
import { useETHBalances } from '../../../state/wallet/hooks'
import { useLingui } from '@lingui/react'
import { useRouter } from 'next/router'
import { useTokenBalancesWithLoadingIndicator } from '../../../state/wallet/hooks'
import { useV2Pairs } from '../../../hooks/useV2Pairs'

export default function Pool() {
  const { i18n } = useLingui()
  const router = useRouter()
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () =>
      trackedTokenPairs.map((tokens) => ({
        liquidityToken: toV2LiquidityToken(tokens),
        tokens,
      })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens]
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = useV2Pairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const migrationSupported = chainId in MigrationSupported
  return (
    <>
      <Head>
        <title>Pool | DTO Pegged Swap</title>
        <meta
          key="description"
          name="description"
          content="DTO Pegged Swap liquidity pools are markets for trades between the two tokens, you can provide these tokens and become a liquidity provider to earn fees from trades."
        />
      </Head>

      <Container maxWidth="2xl" className="space-y-6">
        <div className="p-4 mb-3 space-y-3">
          <Back />

          <Typography component="h1" variant="h2">
            {i18n._(t`My Liquidity Positions`)}
          </Typography>
        </div>

        {/* <Alert
          title={i18n._(t`Liquidity Provider Rewards`)}
          message={i18n._(t`Liquidity providers earn a 0.25% fee on all trades proportional to their share of
                        the pool. Fees are added to the pool, accrue in real time and can be claimed by
                        withdrawing your liquidity`)}
          type="information"
        /> */}

        <div className="p-4 space-y-4 rounded bg-dark-900">
          <div className="grid grid-flow-row gap-3">
            {!account ? (
              <Web3Connect size="lg" color="blue" className="w-full" />
            ) : v2IsLoading ? (
              <Empty>
                <Dots>{i18n._(t`Loading`)}</Dots>
              </Empty>
            ) : allV2PairsWithLiquidity?.length > 0 ? (
              <>
                {allV2PairsWithLiquidity.map((v2Pair) => (
                  <FullPositionCard
                    key={v2Pair.liquidityToken.address}
                    pair={v2Pair}
                    stakedBalance={CurrencyAmount.fromRawAmount(v2Pair.liquidityToken, '0')}
                  />
                ))}
              </>
            ) : (
              <Empty className="flex text-lg text-center text-low-emphesis">
                <div className="px-4 py-2">{i18n._(t`No liquidity was found. `)}</div>
              </Empty>
            )}
            <div className={classNames('grid gap-4', migrationSupported ? 'grid-cols-3' : 'grid-cols-2')}>
              <Button
                id="add-pool-button"
                color="pink"
                className="grid items-center justify-center grid-flow-col gap-2 whitespace-nowrap"
                onClick={() => router.push(`/add/${currencyId(NATIVE[chainId])}`)}
              >
                {i18n._(t`Add`)}
              </Button>
              <Button id="add-pool-button" color="gray" onClick={() => router.push(`/find`)}>
                {i18n._(t`Import`)}
              </Button>

              {migrationSupported && (
                <Button id="create-pool-button" color="gray" onClick={() => router.push(`/migrate`)}>
                  {i18n._(t`Migrate`)}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
