import { Box } from "@mui/system";
import React from "react";
import ListPropertiesEmailForm from "../components/ListProperties/ListPropertiesEmailForm";
import ListPropertiesLanding from "../components/ListProperties/ListPropertiesLanding";
import ListPropertiesNameAmenities from "../components/ListProperties/ListPropertiesNameAmenities";
import { useMultistepForm } from "../hooks/use-multistep-form";
import { useAppSelector } from "../store/hooks";

const ListProperties = () => {
  const user = useAppSelector((state) => state.auth.user?.user_id);
  console.log(user);

  const nextHandler = () => {
    next();
  };
  const { steps, currentStepIndex, next, prev } = useMultistepForm([
    <ListPropertiesLanding onClickNext={nextHandler} />,
    <ListPropertiesEmailForm onClickNext={nextHandler} />,
    <ListPropertiesNameAmenities onClickNext={nextHandler} />,
  ]);
  return <Box padding={5}>{steps[currentStepIndex]}</Box>;
};

export default ListProperties;
