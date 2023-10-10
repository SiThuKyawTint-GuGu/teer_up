import { Icons } from '@/components/ui/Images';

export interface Menu {
  key: string;
  icon: JSX.Element;
  title: string;
  child?: {
    key: string;
    icon: JSX.Element;
    title: string;
  }[];
}

export const menuList: Menu[] = [
  {
    key: '/',
    icon: <Icons.innovates className="w-[20px] h-[20px]" />,
    title: 'Innovates',
    child: [],
  },
  {
    key: '/reward',
    icon: <Icons.wallet className="w-[20px] h-[20px]" />,
    title: 'Reward',
    child: [],
  },
  {
    key: '/users',
    icon: <Icons.users className="w-[20px] h-[20px]" />,
    title: 'Users',
    child: [],
  },
  {
    key: '/discussions',
    icon: <Icons.discussions className="w-[20px] h-[20px]" />,
    title: 'Disccussions',
    child: [],
  },
  {
    key: '/setting',
    icon: <Icons.setting className="w-[20px] h-[20px]" />,
    title: 'Setting',
    child: [],
  },
  // {
  //   key: '/payments',
  //   icon: <Icons.payments className="w-[20px] h-[20px]" />,
  //   title: 'Payments',
  //   child: [],
  // },
  // {
  //   key: '/investment',
  //   icon: <Icons.investment className="w-[20px] h-[20px]" />,
  //   title: 'Investment',
  //   child: [],
  // },
  // {
  //   key: '/profile',
  //   icon: <Icons.user className="w-[20px] h-[20px]" />,
  //   title: 'Profile',
  //   child: [],
  // },
  // {
  //   key: '/support',
  //   icon: <Icons.support className="w-[20px] h-[20px]" />,
  //   title: 'Support',
  //   child: [],
  // },
  // {
  //   key: '/client',
  //   icon: <PersonIcon />,
  //   title: 'Clients',
  //   child: [
  //     {
  //       icon: <TableIcon />,
  //       title: 'Listing',
  //     },
  //     {
  //       icon: <EnterIcon />,
  //       title: 'Payment',
  //     },
  //     {
  //       icon: <ImageIcon />,
  //       title: 'Gallary',
  //     },
  //   ],
  // },
];

export const actionMenu: Menu[] = [
  {
    key: '',
    icon: <Icons.logout className="w-[20px] h-[20px]" />,
    title: 'Logout',
    child: [],
  },
];
