import { Trans } from '@lingui/macro'
import { NETWORK_LABELS } from 'constants/chains'
import { useActiveWeb3React } from 'hooks/web3'
import { ArrowDownCircle } from 'react-feather'
import styled from 'styled-components/macro'
import { MEDIA_WIDTHS } from 'theme'

const L2Icon = styled.img`
  display: none;
  height: 40px;
  margin: auto 20px auto 4px;
  width: 40px;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: block;
  }
`
const DesktopTextBreak = styled.div`
  display: none;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToMedium}px) {
    display: block;
  }
`
const Wrapper = styled.div<{ logoUrl: string }>`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 12px;
  position: relative;
  width: 100%;

  :before {
    background-image: url(${({ logoUrl }) => logoUrl});
    background-repeat: no-repeat;
    background-size: 300px;
    content: '';
    height: 300px;
    opacity: 0.1;
    position: absolute;
    transform: rotate(25deg) translate(-90px, -40px);
    width: 300px;
    z-index: -1;
  }
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: row;
    padding: 16px 20px;
  }
`
const Body = styled.div`
  line-height: 143%;
  margin: 12px;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin: 16px 20px 31px;
    flex: 1 1 auto;
    margin: 0;
  }
`
const LinkOutCircle = styled(ArrowDownCircle)`
  transform: rotate(230deg);
  width: 20px;
  height: 20px;
`
const LinkOutToBridge = styled.a`
  align-items: center;
  background-color: black;
  border-radius: 16px;
  color: white;
  display: flex;
  justify-content: space-between;
  margin: 0;
  max-height: 47px;
  padding: 14px;
  text-decoration: none;
  width: auto;
  :hover,
  :focus,
  :active {
    background-color: black;
  }
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin: auto 0 auto auto;
    padding: 14px 17px;
    min-width: 226px;
  }
`
export function MinimalNetworkAlert() {
  const { chainId } = useActiveWeb3React()

  if (!chainId) {
    return null
  }
  return <></>
}
