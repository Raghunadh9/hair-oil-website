import { IoMdCheckmark } from "react-icons/io";
import { TiHomeOutline } from "react-icons/ti";
import { MdHealthAndSafety, MdOutlineDashboard } from "react-icons/md";
import { GoPencil, GoSignOut } from "react-icons/go";
import { IoAnalyticsOutline, IoStar } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { MdElectricBolt } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";
import { IoMdArrowUp } from "react-icons/io";
import {
  FaArrowDown,
  FaBottleDroplet,
  FaBoxOpen,
  FaHandsHolding,
  FaLink,
  FaRegUser,
} from "react-icons/fa6";
import {
  RiExternalLinkLine,
  RiSecurePaymentLine,
  RiVerifiedBadgeFill,
} from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { FiPlusCircle, FiUser } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosRepeat } from "react-icons/io";
import {
  FaAngleRight,
  FaRegArrowAltCircleDown,
  FaShippingFast,
} from "react-icons/fa";
import { BsCart, BsHeart, BsSearch, BsShop } from "react-icons/bs";
import { GiHamburgerMenu, GiTreeBranch } from "react-icons/gi";
import { TbDiscount, TbMapPinSearch } from "react-icons/tb";
import { CiBoxList } from "react-icons/ci";
import { HiMiniMapPin } from "react-icons/hi2";
import { LuBox } from "react-icons/lu";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { BsGraphUpArrow } from "react-icons/bs";
import { RiSecurePaymentFill } from "react-icons/ri";

export const ICONS = {
  right: <IoMdCheckmark size={25} />,
  securePayment: <RiSecurePaymentFill size={30} color="#00983B" />,

  homeMobile: <TiHomeOutline size={25} />,
  dashboard: <MdOutlineDashboard />,
  write: <GoPencil />,
  analytics: <IoAnalyticsOutline />,
  audience: <GoPeople />,
  electric: <MdElectricBolt />,
  settings: <IoSettingsOutline />,
  world: <BiWorld />,
  logOutMobile: <CgLogOut />,
  logOut: <CgLogOut size={22} />,
  topArrow: <IoMdArrowUp />,
  rightArrow: <FaAngleRight size={25} />,
  copy: <FaLink />,
  link: <RiExternalLinkLine />,
  backArrow: <IoIosArrowBack />,
  eye: <MdOutlineRemoveRedEye />,
  cross: <RxCross2 />,
  profile: <CgProfile size={25} />,
  plus: <FiPlusCircle />,
  delete: <MdDeleteOutline size={20} />,
  regenerate: <IoIosRepeat />,
  cart: <BsCart size={25} />,
  cartMobile: <BsCart size={20} />,
  search: <BsSearch size={25} />,
  searchMobile: <BsSearch size={20} />,
  hamburger: <GiHamburgerMenu size={25} />,
  user: <FiUser size={27} />,
  shopMobile: <BsShop size={24} />,
  oilBottleMobile: <FaBottleDroplet size={25} />,
  signOutMobile: <GoSignOut size={22} />,
  trackOrder: <TbMapPinSearch size={25} />,
  trackOrderMobile: <TbMapPinSearch size={20} />,
  order: <FaBoxOpen size={25} />,
  orderMobile: <FaBoxOpen size={20} />,
  collectionsMobile: <CiBoxList size={25} />,
  reviewStar: <IoStar size={20} className="stroke-orange-400" />,
  securePay: <RiSecurePaymentLine size={20} />,
  fastShipping: <FaShippingFast size={20} />,
  safety: <MdHealthAndSafety size={20} />,
  rightBadge: <RiVerifiedBadgeFill size={20} />,
  handmade: <FaHandsHolding size={20} />,
  branch: <GiTreeBranch size={20} />,
  map: <HiMiniMapPin size={25} />,
  downArrow: <FaArrowDown size={15} />,
  orderBoxMobile: <LuBox size={20} />,
  discount: <TbDiscount size={30} color="#00983B" />,
  checkBadge: <HiMiniCheckBadge size={100} color="#00983B" />,
  checkBadgeProduct: <HiMiniCheckBadge size={35} color="#0AA06E" />,
  trending: <BsGraphUpArrow size={45} />,
};
