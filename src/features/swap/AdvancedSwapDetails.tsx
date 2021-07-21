import { Currency, Ether, Percent, TradeType, Trade as V2Trade, CurrencyAmount } from 'dotoracle-sdk'
import React from 'react'
import { RowBetween, RowFixed } from '../../components/Row'

import QuestionHelper from '../../components/QuestionHelper'
import SwapRoute from './SwapRoute'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

export interface AdvancedSwapDetailsProps {
  trade?: V2Trade<Currency, Currency, TradeType>
  allowedSlippage: Percent
  minerBribe?: string
}

export function AdvancedSwapDetails({ trade, allowedSlippage, minerBribe }: AdvancedSwapDetailsProps) {
  const { i18n } = useLingui()

  return !trade ? null : (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row items-center justify-between">
        <span className="flex items-center">
          <div className="text-sm text-secondary">{i18n._(t`Route`)}</div>
          <QuestionHelper text={i18n._(t`Routing through these tokens resulted in the best price for your trade.`)} />
        </span>
        <SwapRoute trade={trade} />
      </div>

      <RowBetween>
        <RowFixed>
          <div className="text-sm text-secondary">
            {trade.tradeType === TradeType.EXACT_INPUT ? i18n._(t`Minimum received`) : i18n._(t`Maximum sent`)}
          </div>
          <QuestionHelper
            text={i18n._(
              t`Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.`
            )}
          />
        </RowFixed>
        <RowFixed>
          <div className="text-sm font-bold text-high-emphesis">
            {trade.tradeType === TradeType.EXACT_INPUT
              ? `${trade.minimumAmountOut(allowedSlippage).toSignificant(6)} ${trade.outputAmount.currency.symbol}`
              : `${trade.maximumAmountIn(allowedSlippage).toSignificant(6)} ${trade.inputAmount.currency.symbol}`}
          </div>
        </RowFixed>
      </RowBetween>
    </div>
  )
}
