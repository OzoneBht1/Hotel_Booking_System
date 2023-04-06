import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import BathroomIcon from "@mui/icons-material/Bathroom";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import LockIcon from "@mui/icons-material/Lock";
import DeskIcon from "@mui/icons-material/Desk";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import WeekendIcon from "@mui/icons-material/Weekend";
import ElevatorIcon from "@mui/icons-material/Elevator";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShowerIcon from "@mui/icons-material/Shower";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import KitchenIcon from "@mui/icons-material/Kitchen";
import WifiIcon from "@mui/icons-material/Wifi";
import HotTubIcon from "@mui/icons-material/HotTub";
import StoreFrontIcon from "@mui/icons-material/Storefront";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LuggageIcon from "@mui/icons-material/Luggage";
import PetsIcon from "@mui/icons-material/Pets";
import SpaIcon from "@mui/icons-material/Spa";
import PoolIcon from "@mui/icons-material/Pool";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import PhoneIcon from "@mui/icons-material/Phone";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import AlarmIcon from "@mui/icons-material/Alarm";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import TranslateIcon from "@mui/icons-material/Translate";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AccessibleIcon from "@mui/icons-material/Accessible";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import ACUnitIcon from "@mui/icons-material/AcUnit";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

type AmenityCategory = 'Accessibility' | 'Services' | 'Transportation' | 'Miscellaneous';

type Amenity = {
  icon: React.ReactElement;
  category: AmenityCategory;
};

type AmenitiesMap = Record<string, Amenity>;
export const amenitiesMap: AmenitiesMap 

 = {
  "Local Library": {
    icon: <LocalLibraryIcon />,
    category: "Services",
  },
  "Local Pharmacy": {
    icon: <LocalPharmacyIcon />,
    category: "Services",
  },
  "Local Taxi": {
    icon: <LocalTaxiIcon />,
    category: "Transportation",
  },
  "Local Gas Station": {
    icon: <LocalGasStationIcon />,
    category: "Transportation",
  },
  "Wheelchair Accessible Concierge Desk": {
    icon: <DeskIcon />,
    category: "Accessibility",
  },
  "Wheelchair Accessible Business Center": {
    icon: <BusinessCenterIcon />,
    category: "Accessibility",
  },
  "Wheelchair Accessible Registration Desk": {
    icon: <HowToRegIcon />,
    category: "Accessibility",
  },
  "Wheelchair Accessible Lobby": {
    icon: <WeekendIcon />,
    category: "Accessibility",
  },
  "Wheelchair Accessible Path of Travel": {
    icon: <AccessibleForwardIcon />,
    category: "Accessibility",
  },
  Elevator: {
    icon: <ElevatorIcon />,
    category: "Accessibility",
  },
  "Braille or Raised Signage": {
    icon: <MenuBookIcon />,
    category: "Accessibility",
  },
  "Roll-in Shower": {
    icon: <ShowerIcon />,
    category: "Accessibility",
  },
  "In-room Accessibility": {
    icon: <RoomServiceIcon />,
    category: "Accessibility",
  },
  "Accessible Parking": {
    icon: <LocalParkingIcon />,
    category: "Accessibility",
  },
  "Accessible Bathroom": {
    icon: <HotTubIcon />,
    category: "Accessibility",
  },
  "Safe Deposit Box": {
    icon: <LockIcon />,
    category: "Services",
  },
  "Room Service": {
    icon: <RoomServiceIcon />,
    category: "Services",
  },
  Restaurant: {
    icon: <RestaurantIcon />,
    category: "Services",
  },
  "Meeting Rooms": {
    icon: <MeetingRoomIcon />,
    category: "Services",
  },
  "Luggage Storage": {
    icon: <LuggageIcon />,
    category: "Services",
  },
  "Laundry Service": {
    icon: <LocalLaundryServiceIcon />,
    category: "Services",
  },
  Kitchen: {
    icon: <KitchenIcon />,
    category: "Services",
  },
  Kitchenette: {
    icon: <KitchenIcon />,
    category: "Services",
  },
  "Internet Access": {
    icon: <WifiIcon />,
    category: "Services",
  },
  "Hot Tub": {
    icon: <HotTubIcon />,
    category: "Services",
  },
  "Hair Salon": {
    icon: <StoreFrontIcon />,
    category: "Services",
  },
  "Grocery Store": {
    icon: <LocalGroceryStoreIcon />,
    category: "Services",
  },
  "Free Shuttle": {
    icon: <DirectionsBusIcon />,
    category: "Transportation",
  },
  "Free Public Transportation": {
    icon: <DirectionsBusIcon />,
    category: "Transportation",
  },
  "Free Parking": {
    icon: <LocalParkingIcon />,
    category: "Transportation",
  },
  "Free Newspaper": {
    icon: <MenuBookIcon />,
    category: "Services",
  },
  "Free Long Distance Calls": {
    icon: <PhoneIcon />,
    category: "Services",
  },
  "Free Local Calls": {
    icon: <PhoneIcon />,
    category: "Services",
  },
  "Convenience Store": {
    icon: <LocalConvenienceStoreIcon />,
    category: "Services",
  },
  "Coffee Shop": {
    icon: <LocalCafeIcon />,
    category: "Services",
  },
  "Bridal Suite": {
    icon: <LocalFloristIcon />,
    category: "Services",
  },
  "Airport Transportation": {
    icon: <DirectionsBusIcon />,
    category: "Transportation",
  },
  "Wake Up Service": {
    icon: <AlarmIcon />,
    category: "Services",
  },
  "Mini Market": {
    icon: <LocalMallIcon />,
    category: "Services",
  },
  "Currency Exchange": {
    icon: <LocalAtmIcon />,
    category: "Services",
  },
  "Car Rental": {
    icon: <DirectionsCarIcon />,
    category: "Transportation",
  },
  "Breakfast Buffet": {
    icon: <LocalDiningIcon />,
    category: "Services",
  },
  "Babysitting/Child Services": {
    icon: <ChildCareIcon />,
    category: "Services",
  },
  "ATM on site": {
    icon: <LocalAtmIcon />,
    category: "Services",
  },
  "24 Hour Security": {
    icon: <LockIcon />,
    category: "Services",
  },
  "Valet Parking": {
    icon: <LocalParkingIcon />,
    category: "Transportation",
  },
  "Shuttle Service": {
    icon: <DirectionsBusIcon />,
    category: "Transportation",
  },
  "Safety Deposit Box": {
    icon: <LockIcon />,
    category: "Services",
  },
  "Multilingual Staff": {
    icon: <TranslateIcon />,
    category: "Services",
  },
  "Gift Shop": {
    icon: <LocalMallIcon />,
    category: "Services",
  },
  "Express Check In/Out": {
    icon: <MeetingRoomIcon />,
    category: "Services",
  },
  "Dry Cleaning": {
    icon: <LocalLaundryServiceIcon />,
    category: "Services",
  },
  Concierge: {
    icon: <LocalConvenienceStoreIcon />,
    category: "Services",
  },
  "24 Hour Front Desk": {
    icon: <MeetingRoomIcon />,
    category: "Services",
  },
  "Business Center": {
    icon: <BusinessCenterIcon />,
    category: "Services",
  },
  "Indoor Pool": {
    icon: <PoolIcon />,
    category: "Services",
  },
  Beachfront: {
    icon: <BeachAccessIcon />,
    category: "Accessibility",
  },
  "Disabled Access": {
    icon: <AccessibleIcon />,
    category: "Accessibility",
  },
  "Pet Friendly": {
    icon: <PetsIcon />,
    category: "Accessibility",
  },
  "Family Rooms": {
    icon: <FamilyRestroomIcon />,
    category: "Accessibility",
  },
  "Non Smoking Rooms": {
    icon: <SmokeFreeIcon />,
    category: "Accessibility",
  },
  "Air Conditioning": {
    icon: <ACUnitIcon />,
    category: "Accessibility",
  },
  Bar: {
    icon: <LocalBarIcon />,
    category: "Services",
  },
  Gym: {
    icon: <FitnessCenterIcon />,
    category: "Services",
  },
  Spa: {
    icon: <SpaIcon />,
    category: "Services",
  },
  Pool: {
    icon: <PoolIcon />,
    category: "Services",
  },
  "Free Airport Shuttle": {
    icon: <DirectionsBusIcon />,
    category: "Transportation",
  },
  "Free Breakfast": {
    icon: <LocalDiningIcon />,
    category: "Services",
  },
};
// export const amenitiesMap = {
//   "Local Library": <LocalLibraryIcon />,
//   "Local Pharmacy": <LocalPharmacyIcon />,
//   "Local Taxi": <LocalTaxiIcon />,
//   "Local Gas Station": <LocalGasStationIcon />,
//   "Wheelchair Accessible Concierge Desk": <DeskIcon />,
//   "Wheelchair Accessible Business Center": <BusinessCenterIcon />,
//   "Wheelchair Accessible Registration Desk": <HowToRegIcon />,
//   "Wheelchair Accessible Lobby": <WeekendIcon />,
//   "Wheelchair Accessible Path of Travel": <AccessibleForwardIcon />,
//   Elevator: <ElevatorIcon />,
//   "Braille or Raised Signage": <MenuBookIcon />,
//   "Roll-in Shower": <ShowerIcon />,
//   "In-room Accessibility": <RoomServiceIcon />,
//   "Accessible Parking": <LocalParkingIcon />,
//   "Accessible Bathroom": <HotTubIcon />,
//   "Safe Deposit Box": <LockIcon />,
//   "Room Service": <RoomServiceIcon />,
//   Restaurant: <RestaurantIcon />,
//   "Meeting Rooms": <MeetingRoomIcon />,
//   "Luggage Storage": <LuggageIcon />,
//   "Laundry Service": <LocalLaundryServiceIcon />,
//   Kitchen: <KitchenIcon />,
//   Kitchenette: <KitchenIcon />,
//   "Internet Access": <WifiIcon />,
//   "Hot Tub": <HotTubIcon />,
//   "Hair Salon": <StoreFrontIcon />,
//   "Grocery Store": <LocalGroceryStoreIcon />,
//   "Free Shuttle": <DirectionsBusIcon />,
//   "Free Public Transportation": <DirectionsBusIcon />,
//   "Free Parking": <LocalParkingIcon />,
//   "Free Newspaper": <MenuBookIcon />,
//   "Free Long Distance Calls": <PhoneIcon />,
//   "Free Local Calls": <PhoneIcon />,
//   "Convenience Store": <LocalConvenienceStoreIcon />,
//   "Coffee Shop": <LocalCafeIcon />,
//   "Bridal Suite": <LocalFloristIcon />,
//   "Airport Transportation": <DirectionsBusIcon />,
//   "Wake Up Service": <AlarmIcon />,
//   "Mini Market": <LocalMallIcon />,
//   Laundry: <LocalLaundryServiceIcon />,
//   "Currency Exchange": <LocalAtmIcon />,
//   "Car Rental": <DirectionsCarIcon />,
//   "Breakfast Buffet": <LocalDiningIcon />,
//   "Babysitting/Child Services": <ChildCareIcon />,
//   "ATM on site": <LocalAtmIcon />,
//   "24 Hour Security": <LockIcon />,
//   "Valet Parking": <LocalParkingIcon />,
//   "Shuttle Service": <DirectionsBusIcon />,
//   "Safety Deposit Box": <LockIcon />,
//   Newspapers: <MenuBookIcon />,
//   "Multilingual Staff": <TranslateIcon />,
//   "Gift Shop": <LocalMallIcon />,
//   "Express Check In/Out": <MeetingRoomIcon />,
//   "Dry Cleaning": <LocalLaundryServiceIcon />,
//   Concierge: <LocalConvenienceStoreIcon />,
//   "24 Hour Front Desk": <MeetingRoomIcon />,
//   "Business Center": <BusinessCenterIcon />,
//   "Indoor Pool": <PoolIcon />,
//   Beachfront: <BeachAccessIcon />,
//   "Disabled Access": <AccessibleIcon />,
//   "Pet Friendly": <PetsIcon />,
//   "Family Rooms": <FamilyRestroomIcon />,
//   "Non Smoking Rooms": <SmokeFreeIcon />,
//   "Air Conditioning": <ACUnitIcon />,
//   Bar: <LocalBarIcon />,
//   Gym: <FitnessCenterIcon />,
//   Spa: <SpaIcon />,
//   Pool: <PoolIcon />,
//   "Free Airport Shuttle": <DirectionsBusIcon />,
//   "Free Breakfast": <LocalDiningIcon />,
// };


export const getIcon = (name: string) => {
  const amenity = amenitiesMap[name];
  return amenity ? amenity.icon : <DisabledByDefaultIcon />;
};

