import Announcement from '../pages/announcement'
import Contact from '../pages/contact'
import Destruction from '../pages/destruction'
import Help from '../pages/help'
import Home from '../pages/home'
import Introduction from '../pages/Introduction'
import Partners from '../pages/partners'
import Public from '../pages/public'
// import Reward from '../pages/reward'
import Technology from '../pages/technology'
import Voting from '../pages/voting'
import Governance from '../pages/governance'
import Integral from '../pages/integral'
import Exchange from '../pages/exchange'
// import Mine from '../pages/mine'
import Combustion from '../pages/combustion'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/home',
    exact: true,
    component: Home,
  },
  {
    path: '/technology',
    exact: true,
    component: Technology,
  },
  {
    path: '/public',
    exact: true,
    component: Public,
  },
  {
    path: '/announcement',
    exact: true,
    component: Announcement,
  },
  {
    path: '/partners',
    exact: true,
    component: Partners,
  },
  {
    path: '/help',
    exact: true,
    component: Help,
  },
  {
    path: '/contact',
    exact: true,
    component: Contact,
  },
  {
    path: '/introduction',
    exact: true,
    component: Introduction,
  },
  // {
  //   path: '/reward',
  //   exact: true,
  //   component: Reward,
  // },
  {
    path: '/voting',
    exact: true,
    component: Voting,
  },
  {
    path: '/destruction',
    exact: true,
    component: Destruction,
  },
  {
    path: '/governance',
    exact: true,
    component: Governance,
  },
  {
    path: '/integral',
    exact: true,
    component: Integral,
  },
  {
    path: '/exchange',
    exact: true,
    component: Exchange,
  },
  // {
  //   path: '/mine',
  //   exact: true,
  //   component: Mine,
  // },
  {
    path: '/combustion',
    exact: true,
    component: Combustion,
  },
]

export default routes
