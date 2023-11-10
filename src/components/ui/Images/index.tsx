import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ArticleIcon from "@mui/icons-material/Article";
import BallotIcon from "@mui/icons-material/Ballot";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CreateIcon from "@mui/icons-material/Create";
import FeedIcon from "@mui/icons-material/Feed";
import HelpIcon from "@mui/icons-material/Help";
import KeyIcon from "@mui/icons-material/Key";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import SettingsIcon from "@mui/icons-material/Settings";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import NextImage from "next/image";
import { BsInfoCircle } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { FaArrowRight, FaFacebook, FaLightbulb, FaTelegram, FaUserCircle } from "react-icons/fa";
import { FcBusinesswoman } from "react-icons/fc";
import { FiUsers } from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import {
  IoBookmark,
  IoBookmarkOutline,
  IoCalendarOutline,
  IoChatbubbleOutline,
  IoCheckmark,
  IoCheckmarkCircle,
  IoChevronBack,
  IoChevronDownOutline,
  IoChevronUpSharp,
  IoCloseCircleSharp,
  IoGlobeOutline,
  IoHeart,
  IoHeartOutline,
  IoHome,
  IoInformationCircleOutline,
  IoLink,
  IoLinkOutline,
  IoLocationOutline,
  IoLogoApple,
  IoNotificationsOutline,
  IoPeopleOutline,
  IoPersonCircleOutline,
  IoSettingsOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import { MdDelete, MdOutlineMailOutline } from "react-icons/md";
import {
  PiAirplaneTiltLight,
  PiArrowDownRightThin,
  PiArrowUpRightThin,
  PiArrowsLeftRightDuotone,
  PiArrowsLeftRightThin,
  PiBagSimpleThin,
  PiCameraLight,
  PiCameraPlusFill,
  PiCar,
  PiCaretDownFill,
  PiCaretLeftThin,
  PiCaretUpThin,
  PiChatTeardropTextThin,
  PiCheckThin,
  PiCurrencyCircleDollarThin,
  PiDatabaseThin,
  PiFilmSlate,
  PiFlowArrowLight,
  PiHouseThin,
  PiNotePencil,
  PiPlanetThin,
  PiPlusThin,
  PiUserThin,
  PiWallet,
} from "react-icons/pi";
import { RxCross2, RxMagnifyingGlass } from "react-icons/rx";
import { SiAmazon, SiNetflix, SiTesla, SiVivawallet } from "react-icons/si";
import { LandingIcon, TeeupFooterIcon, TeeupIcon } from "./Icons";

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
        <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" />
      </svg>
    );
  },
  landing: LandingIcon,
  teeUp: TeeupIcon,
  teeupFooter: TeeupFooterIcon,
  innovates: FaLightbulb,
  users: FiUsers,
  userscore: SupervisedUserCircleIcon,
  content: ArticleIcon,
  category: BallotIcon,
  post: PostAddIcon,
  form: CreateIcon,
  keyword: KeyIcon,
  question: HelpIcon,
  dimension: TextSnippetIcon,
  admin: PeopleOutlineIcon,
  preference: RoomPreferencesIcon,
  industry: CorporateFareIcon,
  department: ApartmentIcon,
  mentor: AccountBoxIcon,
  discussions: GoCommentDiscussion,
  contents: ChromeReaderModeIcon,
  wallet: PiWallet,
  blogs: FeedIcon,
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
  arrowDown: KeyboardArrowDownIcon,
  caretRight: KeyboardArrowRightIcon,
  caretLeft: PiCaretLeftThin,
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
  setting1: SettingsIcon,
  logout: LogoutIcon,
  userManagement: PeopleAltIcon,
  edit: PiNotePencil,
  delete: MdDelete,
  mark: IoCheckmarkCircle,
  rightArrow: FaArrowRight,
  home: IoHome,
  globe: IoGlobeOutline,
  people: IoPeopleOutline,
  saved: IoBookmarkOutline,
  savedFill: IoBookmark,
  person: IoPersonCircleOutline,
  like: IoHeartOutline,
  likefill: IoHeart,
  comment: IoChatbubbleOutline,
  share: IoShareSocialOutline,
  inputError: IoInformationCircleOutline,
  back: IoChevronBack,
  profileCamera: PiCameraPlusFill,
  userProfile: FaUserCircle,
  location: IoLocationOutline,
  calender: IoCalendarOutline,
  caretDown: PiCaretDownFill,
  upArrow: IoChevronUpSharp,
  checkMark: IoCheckmark,
  downArrow: IoChevronDownOutline,
  closeCircle: IoCloseCircleSharp,
  shareLink: IoLink,
  facebook: FaFacebook,
  telegram: FaTelegram,
  profileSetting: IoSettingsOutline,
  link: IoLinkOutline,
  info: BsInfoCircle,
};

interface Image {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
}

export const Image: React.FC<Image> = ({ src, width, className, height, alt, ...props }: Image) => {
  return <NextImage className={className} src={src} width={width || 0} height={height || 0} alt={alt} {...props} />;
};
