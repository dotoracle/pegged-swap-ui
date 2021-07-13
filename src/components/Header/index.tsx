import { Trans } from '@lingui/macro'
import useScrollPosition from '@react-hook/window-scroll'
import { darken } from 'polished'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Text } from 'rebass'
import { useETHBalances } from 'state/wallet/hooks'
import styled from 'styled-components/macro'
import Logo from '../../assets/images/logo.png'
import LogoMobilePNG from '../../assets/images/logo-mobile.png'
import { useActiveWeb3React } from '../../hooks/web3'
import { ExternalLink } from '../../theme'
import Menu from '../Menu'
import Modal from '../Modal'
import Row, { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import NetworkCard from './NetworkCard'
import UniBalanceContent from './UniBalanceContent'
import NAV_ITEMS from './NavItems'

const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px auto;
  padding: 0px 15px;
  width: 100%;
  max-width: 1280px;
  top: 0;
  position: relative;
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  @media (min-width: 992px) {
    margin-left: 2rem;
  }
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row-reverse;
    align-items: center;
  `};
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`

const HeaderLinks = styled(Row)`
  display: none;
  justify-self: center;
  width: fit-content;
  padding: 4px;
  border-radius: 16px;
  grid-auto-flow: column;
  grid-gap: 10px;

  @media (min-width: 992px) {
    display: flex;
  }
`

const HeaderRightCol = styled.div`
  display: flex;
  align-items: center;
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg2)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`

const LogoDesktop = styled.img`
  display: none;

  @media (min-width: 992px) {
    display: block;
  }
`

const LogoMobile = styled.img`
  display: block;

  @media (min-width: 992px) {
    display: none;
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
  padding: 8px 12px;
  word-break: break-word;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
    background-color: ${({ theme }) => theme.bg2};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName,
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
    text-decoration: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      display: none;
`}
`

const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg2};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`
const MenuItem = styled.div`
  position: relative;
  padding: 0 20px;
`

const MenuLink = styled.a`
  position: relative;
  text-transform: uppercase;
  font-weight: 500;
  color: #fff;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 0;
    height: 2px;
    transition: all 400ms ease;
    background-color: ${(props) => props.theme.pink};
  }

  &:hover {
    color: ${(props) => props.theme.pink};

    &::before {
      width: 100%;
    }
  }
`

export default function Header() {
  const { account } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)

  const scrollY = useScrollPosition()

  return (
    <HeaderFrame showBackground={scrollY > 45}>
      <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
        <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
      </Modal>
      <HeaderRow>
        <Title href=".">
          <LogoDesktop src={Logo} alt="DotOracle" />
          <LogoMobile src={LogoMobilePNG} alt="DotOracle" />
        </Title>
      </HeaderRow>

      <HeaderRightCol>
        <HeaderLinks>
          {NAV_ITEMS.map((navItem) => {
            return (
              <MenuItem key={navItem.label}>
                <MenuLink href={navItem.href ?? '#'} target={navItem.target ?? '_self'}>
                  {navItem.label}
                </MenuLink>
              </MenuItem>
            )
          })}
          {/* <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
            <Trans>Swap</Trans>
          </StyledNavLink>
          <StyledNavLink
            id={`pool-nav-link`}
            to={'/pool'}
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/add') ||
              pathname.startsWith('/remove') ||
              pathname.startsWith('/increase') ||
              pathname.startsWith('/find')
            }
          >
            <Trans>Pool</Trans>
          </StyledNavLink>
          <StyledNavLink id={`stake-nav-link`} to={'/vote'}>
            <Trans>Vote</Trans>
          </StyledNavLink>
          <StyledExternalLink id={`stake-nav-link`} href={'https://info.uniswap.org'}>
            <Trans>Charts</Trans>
            <sup>↗</sup>
          </StyledExternalLink> */}
        </HeaderLinks>
        <HeaderControls>
          <HeaderElement>
            {/* <NetworkCard /> */}
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  <Trans>{userEthBalance?.toSignificant(4)} ETH</Trans>
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
        </HeaderControls>
        <Menu />
      </HeaderRightCol>
    </HeaderFrame>
  )
}
