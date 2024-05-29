import BusinessIcon from "@mui/icons-material/Business";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ArticleIcon from "@mui/icons-material/Article";
import BallotIcon from "@mui/icons-material/Ballot";
import BookIcon from "@mui/icons-material/Book";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CreateIcon from "@mui/icons-material/Create";
import FeedIcon from "@mui/icons-material/Feed";
import GroupIcon from "@mui/icons-material/Group";
import HelpIcon from "@mui/icons-material/Help";
import KeyIcon from "@mui/icons-material/Key";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import SchoolIcon from "@mui/icons-material/School";
import SettingsIcon from "@mui/icons-material/Settings";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
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
  PiUserThin,
  PiWallet,
} from "react-icons/pi";
import { RxCross2, RxMagnifyingGlass } from "react-icons/rx";
import { SiAmazon, SiNetflix, SiTesla, SiVivawallet } from "react-icons/si";
import {
  ChatIcon,
  CommentIcon,
  ExploreIcon,
  FilterIcon,
  GlobalIcon,
  HeartIcon,
  HistoryIcon,
  HomeIcon,
  IconProps,
  LandingIcon,
  ListLikedIcon,
  LoadingIcon,
  MentorshipIcon,
  ProfileIcon,
  SavedIcon,
  SchoolBlogIcon,
  SchoolDashboardIcon,
  SchoolJobIcon,
  SchoolLogoutIcon,
  SchoolSettingsIcon,
  SettingIcon,
  StudentsIcon,
  TeeupFooterIcon,
  TeeupIcon,
  UserIcon,
  VerifiedIcon,
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
  companyAdmin: GroupIcon,
  schoolAdmin: PeopleAltIcon,
  preference: RoomPreferencesIcon,
  industry: CorporateFareIcon,
  department: ApartmentIcon,
  mentor: AccountBoxIcon,
  carousel: ViewCarouselIcon,
  company: BusinessIcon,
  school: SchoolIcon,
  major: MenuBookIcon,
  course: CastForEducationIcon,
  book: BookIcon,
  schoolBuilding: ApartmentIcon,
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
  userIcon: UserIcon,
  verifiedIcon: VerifiedIcon,
  filterIcon: FilterIcon,
  commentIcon: CommentIcon,
  listLikedIcon: ListLikedIcon,

  // Nav menu icons
  homeIcon: ({ ...props }: IconProps) => <HomeIcon {...props} />,
  globeIcon: ({ ...props }: IconProps) => <GlobalIcon {...props} />,
  savedIcon: ({ ...props }: IconProps) => <SavedIcon {...props} />,
  profileIcon: ({ ...props }: IconProps) => <ProfileIcon {...props} />,
  mentorshipIcon: ({ ...props }: IconProps) => <MentorshipIcon {...props} />,
  exploreIcon: ({ ...props }: IconProps) => <ExploreIcon {...props} />,
  historyIcon: ({ ...props }: IconProps) => <HistoryIcon {...props} />,
  chatIcon: ({ ...props }: IconProps) => <ChatIcon {...props} />,
  settingIcon: ({ ...props }: IconProps) => <SettingIcon {...props} />,
  schoolDashboardIcon: ({ ...props }: IconProps) => <SchoolDashboardIcon {...props} />,
  schoolStudentsIcon: ({ ...props }: IconProps) => <StudentsIcon {...props} />,
  schoolSettingsIcon: ({ ...props }: IconProps) => <SchoolSettingsIcon {...props} />,
  schoolLogoutIcon: ({ ...props }: IconProps) => <SchoolLogoutIcon {...props} />,
  schoolBlogIcon: ({ ...props }: IconProps) => <SchoolBlogIcon {...props} />,
  schoolJobIcon: ({ ...props }: IconProps) => <SchoolJobIcon {...props} />,
  heartIcon: ({ ...props }: IconProps) => <HeartIcon {...props} />,
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
      style={{ width: width ? width : "auto", height: height ? height : "auto" }}
      {...props}
    />
  );
};
