import { Icons } from '@/components/Images';

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
    icon: <Icons.dashboard className="w-[20px] h-[20px]" />,
    title: 'Dashboard',
    child: [],
  },
  {
    key: '/wallet',
    icon: <Icons.wallet className="w-[20px] h-[20px]" />,
    title: 'Wallet',
    child: [],
  },
  {
    key: '/transactions',
    icon: <Icons.transactions className="w-[20px] h-[20px]" />,
    title: 'Transactions',
    child: [],
  },
  {
    key: '/cashback',
    icon: <Icons.cashback className="w-[20px] h-[20px]" />,
    title: 'Cashback',
    child: [],
  },
  {
    key: '/payments',
    icon: <Icons.payments className="w-[20px] h-[20px]" />,
    title: 'Payments',
    child: [],
  },
  {
    key: '/investment',
    icon: <Icons.investment className="w-[20px] h-[20px]" />,
    title: 'Investment',
    child: [],
  },
  {
    key: '/profile',
    icon: <Icons.user className="w-[20px] h-[20px]" />,
    title: 'Profile',
    child: [],
  },
  {
    key: '/support',
    icon: <Icons.support className="w-[20px] h-[20px]" />,
    title: 'Support',
    child: [],
  },
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
    key: '/setting',
    icon: <Icons.setting className="w-[20px] h-[20px]" />,
    title: 'Setting',
    child: [],
  },
  {
    key: '',
    icon: <Icons.logout className="w-[20px] h-[20px]" />,
    title: 'Logout',
    child: [],
  },
];
