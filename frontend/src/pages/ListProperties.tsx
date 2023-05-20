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
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
// import something which provides prompt if user is about to leave page;

const ListProperties = () => {
  const nav = useNavigate();
  const [hotelImage, setHotelImage] = useState<File | null>(null);
  const [roomImages, setRoomImages] = useState<File[] | null>(null);
  const [open, setOpen] = useState(false);
  const rooms = useAppSelector((state) => state.list.rooms);
  const { list } = useAppSelector((state) => state);
  const user = useAppSelector((state) => state.auth.user);

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

    const roomsCount = rooms.reduce((acc, room) => {
      return acc + room.quantity;
    }, 0);

    const formData = new FormData();

    formData.append("email", data.email!);
    formData.append("name", data.name!);
    formData.append("address", data.address!);
    formData.append("hotel_image", hotelImage!, hotelImage!.name);
    formData.append("room_count", JSON.stringify(roomsCount));
    formData.append("manager", JSON.stringify(user?.user_id));

    data.amenities.forEach((amenity) => {
      formData.append(`amenities`, JSON.stringify({ name: amenity.name }));
    });
    data.rooms.forEach((room, index) => {
      Object.keys(room).forEach((key) => {
        if (key !== "image") {
          formData.append(
            `rooms[${index}].${key}`,
            (room[key as keyof typeof room] as any).toString()
          );
        } else {
          formData.append(`rooms[${index}].image`, room.image);
        }
      });
    });
    formData.append("house_rules", JSON.stringify(data.house_rules));
    data.faqs.forEach((faq) => {
      formData.append(`faqs`, JSON.stringify(faq));
    });
    createHotel(formData)
      .unwrap()
      .then(() => {
        nav("/");
      })
      .catch(() => {
        setOpen(true);
      });
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
      loading={isLoading}
      onClickNext={listingCreateHandler}
      onClickPrev={roomPrevHandler}
      defaultImgs={roomImages}
    />,
  ]);

  usePrompt(
    "Are you sure you want to leave this page? Your listing progress will not be saved.",
    currentStepIndex > 1 && currentStepIndex < 7
  );

  return (
    <>
      <Snackbar open={open} onClose={() => setOpen(false)}>
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          elevation={6}
          variant="filled"
          sx={{ width: "100%" }}
        >
          Something went wrong. Please try again later.
        </Alert>
      </Snackbar>
      <Box padding={5}>{steps[currentStepIndex]}</Box>
    </>
  );
};

export default ListProperties;
