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

export const amenitiesMap = {
  "Local Library": <LocalLibraryIcon />,
  "Local Pharmacy": <LocalPharmacyIcon />,
  "Local Taxi": <LocalTaxiIcon />,
  "Local Gas Station": <LocalGasStationIcon />,
  "Wheelchair Accessible Concierge Desk": <DeskIcon />,
  "Wheelchair Accessible Business Center": <BusinessCenterIcon />,
  "Wheelchair Accessible Registration Desk": <HowToRegIcon />,
  "Wheelchair Accessible Lobby": <WeekendIcon />,
  "Wheelchair Accessible Path of Travel": <AccessibleForwardIcon />,
  Elevator: <ElevatorIcon />,
  "Braille or Raised Signage": <MenuBookIcon />,
  "Roll-in Shower": <ShowerIcon />,
  "In-room Accessibility": <RoomServiceIcon />,
  "Accessible Parking": <LocalParkingIcon />,
  "Accessible Bathroom": <HotTubIcon />,
  "Safe Deposit Box": <LockIcon />,
  "Room Service": <RoomServiceIcon />,
  Restaurant: <RestaurantIcon />,
  "Meeting Rooms": <MeetingRoomIcon />,
  "Luggage Storage": <LuggageIcon />,
  "Laundry Service": <LocalLaundryServiceIcon />,
  Kitchen: <KitchenIcon />,
  Kitchenette: <KitchenIcon />,
  "Internet Access": <WifiIcon />,
  "Hot Tub": <HotTubIcon />,
  "Hair Salon": <StoreFrontIcon />,
  "Grocery Store": <LocalGroceryStoreIcon />,
  "Free Shuttle": <DirectionsBusIcon />,
  "Free Public Transportation": <DirectionsBusIcon />,
  "Free Parking": <LocalParkingIcon />,
  "Free Newspaper": <MenuBookIcon />,
  "Free Long Distance Calls": <PhoneIcon />,
  "Free Local Calls": <PhoneIcon />,
  "Convenience Store": <LocalConvenienceStoreIcon />,
  "Coffee Shop": <LocalCafeIcon />,
  "Bridal Suite": <LocalFloristIcon />,
  "Airport Transportation": <DirectionsBusIcon />,
  "Wake Up Service": <AlarmIcon />,
  "Mini Market": <LocalMallIcon />,
  Laundry: <LocalLaundryServiceIcon />,
  "Currency Exchange": <LocalAtmIcon />,
  "Car Rental": <DirectionsCarIcon />,
  "Breakfast Buffet": <LocalDiningIcon />,
  "Babysitting/Child Services": <ChildCareIcon />,
  "ATM on site": <LocalAtmIcon />,
  "24 Hour Security": <LockIcon />,
  "Valet Parking": <LocalParkingIcon />,
  "Shuttle Service": <DirectionsBusIcon />,
  "Safety Deposit Box": <LockIcon />,
  Newspapers: <MenuBookIcon />,
  "Multilingual Staff": <TranslateIcon />,
  "Gift Shop": <LocalMallIcon />,
  "Express Check In/Out": <MeetingRoomIcon />,
  "Dry Cleaning": <LocalLaundryServiceIcon />,
  Concierge: <LocalConvenienceStoreIcon />,
  "24 Hour Front Desk": <MeetingRoomIcon />,
  "Business Center": <BusinessCenterIcon />,
  "Indoor Pool": <PoolIcon />,
  Beachfront: <BeachAccessIcon />,
  "Disabled Access": <AccessibleIcon />,
  "Pet Friendly": <PetsIcon />,
  "Family Rooms": <FamilyRestroomIcon />,
  "Non Smoking Rooms": <SmokeFreeIcon />,
  "Air Conditioning": <ACUnitIcon />,
  Bar: <LocalBarIcon />,
  Gym: <FitnessCenterIcon />,
  Spa: <SpaIcon />,
  Pool: <PoolIcon />,
  "Free Airport Shuttle": <DirectionsBusIcon />,
  "Free Breakfast": <LocalDiningIcon />,
};

export const getIcon = (name: string) => {
  return amenitiesMap[name as keyof typeof amenitiesMap] !== undefined ? (
    amenitiesMap[name as keyof typeof amenitiesMap]
  ) : (
    <DisabledByDefaultIcon />
  );
};
