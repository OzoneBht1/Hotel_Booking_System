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
import { useCreateHotelMutation } from "../store/api/hotelSlice";
// import something which provides prompt if user is about to leave page;

const ListProperties = () => {
  const [hotelImage, setHotelImage] = useState<File | null>(null);
  const [roomImages, setRoomImages] = useState<File[] | null>(null);
  const rooms = useAppSelector((state) => state.list.rooms);
  const { list } = useAppSelector((state) => state);

  const [createHotel, { isLoading, isError }] = useCreateHotelMutation();
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

    const data = {
      ...list,
      amenities: list.amenities.map((amenity) => {
        return { name: amenity };
      }),
      faqs: list.faqs.faqs,
      rooms: rooms.map((room, index) => {
        return {
          ...room,
          image: roomImages![index],
        };
      }, []),
    };
    console.log(data.amenities);

    const formData = new FormData();

    // Add email, name, and address
    formData.append("email", data.email!);
    formData.append("name", data.name!);
    formData.append("address", data.address!);

    // Add amenities
    data.amenities.forEach((amenity, index) => {
      formData.append(`amenities[${index}]`, JSON.stringify(amenity));
    });

    // Add house_rules
    Object.keys(data.house_rules).forEach((key) => {
      formData.append(
        `house_rules.${key}`,
        data.house_rules[key as keyof typeof data.house_rules].toString()
      );
    });

    // Add faqs
    data.faqs.forEach((faq, index) => {
      formData.append(`faqs`, JSON.stringify(faq));
    });

    // Add rooms and their images
    data.rooms.forEach((room, index) => {
      Object.keys(room).forEach((key) => {
        if (key !== "image") {
          formData.append(
            `rooms[${index}].${key}`,
            room && room[key as keyof typeof room].toString()
          );
        } else {
          formData.append(`rooms[${index}].image`, room.image);
        }
      });
    });

    formData.getAll("faqs").forEach((faq) => {
      console.log(faq);
    });

    // Add hotel_image field if required
    // formData.append('hotel_image', hotelImage);

    createHotel(formData);
  };

  const roomPrevHandler = (roomImages: File[] | null) => {
    setRoomImages(roomImages);
    console.log(list);
    console.log(roomImages);

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
