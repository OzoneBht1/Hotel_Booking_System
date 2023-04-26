import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import FaqAndCleanPractices from "../components/ListProperties/FaqAndCleanPractices";
import ListPropertiesEmailForm from "../components/ListProperties/ListPropertiesEmailForm";
import ListPropertiesLanding from "../components/ListProperties/ListPropertiesLanding";
import ListPropertiesNameAmenities from "../components/ListProperties/ListPropertiesNameAmenities";
import ListPropertiesServices from "../components/ListProperties/ListPropertiesServices";
import ListPropertiesTransportation from "../components/ListProperties/ListPropertiesTransportation";
import ListPropertiesRoomInfo from "../components/ListProperties/ListPropertiesRoomInfo";
import { useMultistepForm } from "../hooks/use-multistep-form";
import { usePrompt } from "../hooks/use-prompt";
import { current } from "@reduxjs/toolkit";
// import something which provides prompt if user is about to leave page;

const ListProperties = () => {
  const nextHandler = () => {
    next();
  };
  const { steps, currentStepIndex, next } = useMultistepForm([
    <ListPropertiesLanding onClickNext={nextHandler} />,
    <ListPropertiesEmailForm onClickNext={nextHandler} />,
    <ListPropertiesNameAmenities onClickNext={nextHandler} />,
    <ListPropertiesServices onClickNext={nextHandler} />,
    <ListPropertiesTransportation onClickNext={nextHandler} />,
    <FaqAndCleanPractices onClickNext={nextHandler} />,
    <ListPropertiesRoomInfo onClickNext={nextHandler} />,
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
