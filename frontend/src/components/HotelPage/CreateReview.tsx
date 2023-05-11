import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface ICreateReview {
  openModal: boolean;
  onClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CreateReview = ({ openModal, onClose }: ICreateReview) => {
  console.log("rendered create review");
  return (
    <Modal open={openModal} onClose={onClose}>
      <Box {...style}>fkfjdkfkdj</Box>
    </Modal>
  );
};

export default CreateReview;
