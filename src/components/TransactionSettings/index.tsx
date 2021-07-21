import React, { useRef, useState } from 'react'
import { useUserTransactionTTL } from '../../state/user/hooks'

import { DEFAULT_DEADLINE_FROM_NOW } from '../../constants'
import { Percent } from 'dotoracle-sdk'
import QuestionHelper from '../QuestionHelper'
import Typography from '../Typography'
import { classNames } from '../../functions'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

enum DeadlineError {
  InvalidInput = 'InvalidInput',
}

export interface TransactionSettingsProps {
  placeholderSlippage: Percent // varies according to the context in which the settings dialog is placed
}

export default function TransactionSettings({ placeholderSlippage }: TransactionSettingsProps) {
  const { i18n } = useLingui()

  const [deadline, setDeadline] = useUserTransactionTTL()

  const [deadlineInput, setDeadlineInput] = useState('')
  const [deadlineError, setDeadlineError] = useState<DeadlineError | false>(false)

  function parseCustomDeadline(value: string) {
    // populate what the user typed and clear the error
    setDeadlineInput(value)
    setDeadlineError(false)

    if (value.length === 0) {
      setDeadline(DEFAULT_DEADLINE_FROM_NOW)
    } else {
      try {
        const parsed: number = Math.floor(Number.parseFloat(value) * 60)
        if (!Number.isInteger(parsed) || parsed < 60 || parsed > 180 * 60) {
          setDeadlineError(DeadlineError.InvalidInput)
        } else {
          setDeadline(parsed)
        }
      } catch (error) {
        console.error(error)
        setDeadlineError(DeadlineError.InvalidInput)
      }
    }
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <div className="flex items-center">
          <Typography variant="sm" className="text-high-emphesis">
            {i18n._(t`Transaction deadline`)}
          </Typography>

          <QuestionHelper text={i18n._(t`Your transaction will revert if it is pending for more than this long.`)} />
        </div>
        <div className="flex items-center">
          <div
            className="p-2 rounded bg-dark-800 min-w-[82px] max-w-[102px]"
            style={{ maxWidth: '40px', marginRight: '8px' }}
            tabIndex={-1}
          >
            <input
              className={classNames(deadlineError ? 'text-red' : '', 'bg-transparent placeholder-low-emphesis')}
              placeholder={(DEFAULT_DEADLINE_FROM_NOW / 60).toString()}
              value={
                deadlineInput.length > 0
                  ? deadlineInput
                  : deadline === DEFAULT_DEADLINE_FROM_NOW
                  ? ''
                  : (deadline / 60).toString()
              }
              onChange={(e) => parseCustomDeadline(e.target.value)}
              onBlur={() => {
                setDeadlineInput('')
                setDeadlineError(false)
              }}
              color={deadlineError ? 'red' : ''}
            />
          </div>
          <Typography variant="sm">{i18n._(t`minutes`)}</Typography>
        </div>
      </div>
    </div>
  )
}
