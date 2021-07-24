import { useLingui } from '@lingui/react'
import { FaTwitter, FaGithub, FaTelegramPlane } from 'react-icons/fa'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import styled from 'styled-components'

const SocialLinks = styled.ul`
  @media (min-width: 768px) {
    text-align: right;
  }
`
const SocialItem = styled.li`
  display: inline-block;
  vertial-align: middle;
  margin-right: 2rem;
  @media (min-width: 768px) {
    margin-right: 0;
    margin-left: 2rem;
  }
  a {
    color: #fff;
    transition: 0.5s ease all;
  }
`

const Footer = () => {
  return (
    <footer className="flex-shrink-0 w-full bg-dto-footer-bg">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-auto p-4 md:h-20">
        <p className="text-white mb-3 md:mb-0">Copyright © {new Date().getFullYear()} DotOracle</p>
        <div>
          <SocialLinks>
            <SocialItem>
              <a
                href="https://t.me/dotoracle"
                target="_blank"
                rel="nofollow noreferrer noopener"
                className="hover:text-dto-pink"
              >
                <FaTelegramPlane size="1.5rem" />
              </a>
            </SocialItem>
            <SocialItem>
              <a
                href="https://twitter.com/DotOracle"
                target="_blank"
                rel="nofollow noreferrer noopener"
                className="hover:text-dto-pink"
              >
                <FaTwitter size="1.5rem" />
              </a>
            </SocialItem>
            <SocialItem>
              <a
                href="https://github.com/dotoracle"
                target="_blank"
                rel="nofollow noreferrer noopener"
                className="hover:text-dto-pink"
              >
                <FaGithub size="1.5rem" />
              </a>
            </SocialItem>
          </SocialLinks>
        </div>
      </div>
    </footer>
  )
}

export default Footer
