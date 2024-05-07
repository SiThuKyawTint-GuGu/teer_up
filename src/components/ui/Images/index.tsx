import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
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
import NotificationsIcon from "@mui/icons-material/Notifications";
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
import { FaArrowRight, FaFacebook, FaLightbulb, FaTelegram, FaUserCircle, FaWhatsapp } from "react-icons/fa";
import { FcBusinesswoman } from "react-icons/fc";
import { FiUsers } from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import { HiPlus } from "react-icons/hi";
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
  IoHeart,
  IoHeartOutline,
  IoInformationCircleOutline,
  IoLink,
  IoLinkOutline,
  IoLocationOutline,
  IoLogoApple,
  IoNotificationsOutline,
  IoPeopleOutline,
  IoSettingsOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import { MdDelete, MdMoreVert, MdOutlineDeleteSweep, MdOutlineMailOutline } from "react-icons/md";
import {
  PiAirplaneTiltLight,
  PiArrowDownRightThin,
  PiArrowsLeftRightDuotone,
  PiArrowsLeftRightThin,
  PiArrowUpRightThin,
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
  PiUserThin,
  PiWallet,
} from "react-icons/pi";
import { RxCross2, RxMagnifyingGlass } from "react-icons/rx";
import { SiAmazon, SiNetflix, SiTesla, SiVivawallet } from "react-icons/si";
import {
  ExploreIcon,
  GlobalIcon,
  HomeIcon,
  IconProps,
  LandingIcon,
  LoadingIcon,
  MentorshipIcon,
  ProfileIcon,
  SavedIcon,
  TeeupFooterIcon,
  TeeupIcon,
} from "./Icons";

export const Icons = {
  loading: ({ ...props }: IconProps) => <LoadingIcon {...props} />,
  landing: LandingIcon,
  teeUp: TeeupIcon,
  teeupFooter: TeeupFooterIcon,
  innovates: FaLightbulb,
  users: FiUsers,
  noti: NotificationsIcon,
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
  carousel: ViewCarouselIcon,
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
  plus: HiPlus,
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
  people: IoPeopleOutline,
  saved: IoBookmarkOutline,
  savedFill: IoBookmark,
  like: IoHeartOutline,
  likeFill: IoHeart,
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
  whatapp: FaWhatsapp,
  profileSetting: IoSettingsOutline,
  link: IoLinkOutline,
  info: BsInfoCircle,
  deleteCross: MdOutlineDeleteSweep,
  moreOption: MdMoreVert,

  // Nav menu icons
  homeIcon: ({ ...props }: IconProps) => <HomeIcon {...props} />,
  globeIcon: ({ ...props }: IconProps) => <GlobalIcon {...props} />,
  savedIcon: ({ ...props }: IconProps) => <SavedIcon {...props} />,
  profileIcon: ({ ...props }: IconProps) => <ProfileIcon {...props} />,
  mentorshipIcon: ({ ...props }: IconProps) => <MentorshipIcon {...props} />,
  exploreIcon: ({ ...props }: IconProps) => <ExploreIcon {...props} />,
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
      quality={100}
      className={className}
      src={src}
      width={width || 0}
      height={height || 0}
      alt={alt}
      {...props}
    />
  );
};
