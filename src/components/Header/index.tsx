import { ChainId } from 'dotoracle-sdk'
import React from 'react'

import ExternalLink from '../ExternalLink'
import Image from 'next/image'
import Link from 'next/link'
import NavLink from '../NavLink'
import { Popover } from '@headlessui/react'
import Web3Network from '../Web3Network'
import Web3Status from '../Web3Status'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useETHBalances } from '../../state/wallet/hooks'
import { useLingui } from '@lingui/react'

function AppBar(): JSX.Element {
  const { i18n } = useLingui()
  const { account, chainId, library } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  return (
    <header className="flex-shrink-0 w-full bg-dto-header-bg">
      <Popover as="nav" className="z-10 mx-auto w-full max-w-screen-xl">
        {({ open }) => (
          <>
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="hidden md:block">
                    <Image src="/logo.png" alt="DotOracle" width="236px" height="38px" />
                  </div>
                  <div className="block md:hidden">
                    <Image src="/logo-mobile.png" alt="DotOracle" width="40px" height="40px" />
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center w-auto">
                  <div className="hidden sm:block sm:mr-4">
                    <div className="flex space-x-2">
                      <NavLink href="/swap">
                        <a
                          id={`swap-nav-link`}
                          className="p-2 text-baseline text-white hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap font-medium uppercase"
                        >
                          {i18n._(t`Swap`)}
                        </a>
                      </NavLink>
                      <NavLink href="/pool">
                        <a
                          id={`pool-nav-link`}
                          className="p-2 text-baseline text-white hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap font-medium uppercase"
                        >
                          {i18n._(t`Pool`)}
                        </a>
                      </NavLink>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full space-x-2 sm:justify-end">
                    {library && library.provider.isMetaMask && <Web3Network />}
                    <div className="w-auto flex items-center rounded p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
                      <Web3Status />
                    </div>
                  </div>
                </div>
                <div className="flex -mr-2 sm:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-high-emphesis focus:outline-none">
                    <span className="sr-only">{i18n._(t`Open main menu`)}</span>
                    {open ? (
                      <svg
                        className="block w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      // <X title="Close" className="block w-6 h-6" aria-hidden="true" />
                      <svg
                        className="block w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                      // <Burger title="Burger" className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
              </div>
            </div>

            <Popover.Panel className="sm:hidden">
              <div className="flex flex-col px-4 pt-2 pb-3 space-y-1">
                <Link href={'/swap'}>
                  <a
                    id={`swap-nav-link`}
                    className="p-2 text-baseline text-white hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap uppercase font-medium"
                  >
                    {i18n._(t`Swap`)}
                  </a>
                </Link>
                <Link href={'/pool'}>
                  <a
                    id={`pool-nav-link`}
                    className="p-2 text-baseline text-white hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap uppercase font-medium"
                  >
                    {i18n._(t`Pool`)}
                  </a>
                </Link>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </header>
  )
}

export default AppBar
