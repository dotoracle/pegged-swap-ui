import { Home, GitCommit } from 'react-feather'

type NavItem = {
  label: string
  icon?: JSX.Element
  children?: Array<NavItem>
  href?: string
  target?: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    href: 'https://dotoracle.network',
    target: '__blank',
    icon: <Home size={14} />,
  },
  {
    label: 'Bridge',
    href: 'https://bridge.dotoracle.network',
    target: '__blank',
    icon: <GitCommit size={14} />,
  },
]

export default NAV_ITEMS
