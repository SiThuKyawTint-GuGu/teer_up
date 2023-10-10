import NextImage from 'next/image';
import { CiLogout, CiSettings } from 'react-icons/ci';
import { FcBusinesswoman } from 'react-icons/fc';
import { IoLogoApple, IoNotificationsOutline } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';
import {
  PiAirplaneTiltLight,
  PiArrowDownRightThin,
  PiArrowsLeftRightDuotone,
  PiArrowsLeftRightThin,
  PiArrowUpRightThin,
  PiBagSimpleThin,
  PiCameraLight,
  PiCar,
  PiCaretDownThin,
  PiCaretRightThin,
  PiCaretUpThin,
  PiChatTeardropTextThin,
  PiCheckThin,
  PiCurrencyCircleDollarThin,
  PiDatabaseThin,
  PiFilmSlate,
  PiFlowArrowLight,
  PiHouseThin,
  PiPlanetThin,
  PiPlusThin,
  PiUserThin,
  PiWallet,
} from 'react-icons/pi';
import { RxCross2, RxDashboard, RxMagnifyingGlass } from 'react-icons/rx';
import { SiAmazon, SiNetflix, SiTesla, SiVivawallet } from 'react-icons/si';

export const Icons = {
  loading: ({ ...props }) => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block animate-spin"
        {...props}
      >
        <path
          opacity="0.2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          fill="currentColor"
        />
        <path
          d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
          fill="currentColor"
        />
      </svg>
    );
  },
  dashboard: RxDashboard,
  wallet: PiWallet,
  transactions: PiArrowsLeftRightDuotone,
  cashback: PiDatabaseThin,
  payments: PiCurrencyCircleDollarThin,
  investment: PiFlowArrowLight,
  user: PiUserThin,
  support: PiChatTeardropTextThin,
  search: RxMagnifyingGlass,
  cross: RxCross2,
  film: PiFilmSlate,
  planet: PiPlanetThin,
  caretUp: PiCaretUpThin,
  caretDown: PiCaretDownThin,
  caretRight: PiCaretRightThin,
  plus: PiPlusThin,
  check: PiCheckThin,
  email: MdOutlineMailOutline,
  notification: IoNotificationsOutline,
  profile: FcBusinesswoman,
  upRight: PiArrowUpRightThin,
  downRight: PiArrowDownRightThin,
  leftRight: PiArrowsLeftRightThin,
  car: PiCar,
  bag: PiBagSimpleThin,
  plane: PiAirplaneTiltLight,
  house: PiHouseThin,
  camera: PiCameraLight,
  apple: IoLogoApple,
  tesla: SiTesla,
  netflix: SiNetflix,
  amazon: SiAmazon,
  logo: SiVivawallet,
  setting: CiSettings,
  logout: CiLogout,
};

interface Image {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
}

export const Image: React.FC<Image> = ({ src, width, className, height, alt, ...props }: Image) => {
  return (
    <NextImage
      className={className}
      src={src}
      width={width || 0}
      height={height || 0}
      alt={alt}
      {...props}
    />
  );
};
