import { Box } from "@mui/system";
import { useState } from "react";
import FaqAndCleanPractices from "../components/ListProperties/FaqAndCleanPractices";
import ListPropertiesEmailForm from "../components/ListProperties/ListPropertiesEmailForm";
import ListPropertiesLanding from "../components/ListProperties/ListPropertiesLanding";
import ListPropertiesNameAmenities from "../components/ListProperties/ListPropertiesNameAmenities";
import ListPropertiesServices from "../components/ListProperties/ListPropertiesServices";
import ListPropertiesTransportation from "../components/ListProperties/ListPropertiesTransportation";
import ListPropertiesRoomInfo from "../components/ListProperties/ListPropertiesRoomInfo";
import { useMultistepForm } from "../hooks/use-multistep-form";
import { usePrompt } from "../hooks/use-prompt";
import ListPropertiesAccessibilities from "../components/ListProperties/ListPropertiesAccessibilities";
import { useAppSelector } from "../store/hooks";
// import something which provides prompt if user is about to leave page;

const ListProperties = () => {
  const [hotelImage, setHotelImage] = useState<File | null>(null);
  const [roomImages, setRoomImages] = useState<File[] | null>(null);
  const rooms = useAppSelector((state) => state.list.rooms);
  const { list } = useAppSelector((state) => state);
  console.log(list);

  const nextHandler = () => {
    next();
  };

  const prevHandler = () => {
    prev();
  };

  const imageReceieveHandler = (image: File) => {
    console.log("GOT IMAGE");
    setHotelImage(image);
    next();
  };

  const listingCreateHandler = (roomImages: File[] | null) => {
    setRoomImages(roomImages);
    console.log(list);
  };

  const roomPrevHandler = (roomImages: File[] | null) => {
    setRoomImages(roomImages);
    prev();
  };

  const { steps, currentStepIndex, next, prev } = useMultistepForm([
    <ListPropertiesLanding onClickNext={nextHandler} />,
    <ListPropertiesEmailForm onClickNext={nextHandler} />,
    <ListPropertiesNameAmenities
      onClickNext={imageReceieveHandler}
      onClickPrev={prevHandler}
      defaultImg={hotelImage}
    />,
    <ListPropertiesAccessibilities
      onClickNext={nextHandler}
      onClickPrev={prevHandler}
    />,
    <ListPropertiesServices
      onClickNext={nextHandler}
      onClickPrev={prevHandler}
    />,
    <ListPropertiesTransportation
      onClickNext={nextHandler}
      onClickPrev={prevHandler}
    />,
    <FaqAndCleanPractices
      onClickNext={nextHandler}
      onClickPrev={prevHandler}
    />,
    <ListPropertiesRoomInfo
      onClickNext={listingCreateHandler}
      onClickPrev={roomPrevHandler}
      defaultImgs={roomImages}
    />,
  ]);

  usePrompt(
    "Are you sure you want to leave this page? Your listing progress will not be saved.",
    currentStepIndex > 1
  );

  return (
    <>
      <Box padding={5}>{steps[currentStepIndex]}</Box>
    </>
  );
};

export default ListProperties;
