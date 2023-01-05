import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { MuiFileInput } from "mui-file-input";
import { CircularProgress, Avatar } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface ImageFormProps {
  onReceiveImage: (value: File | null) => void;
  loading: boolean;
  onBack: () => void;
}

const CustomBox = styled(Box)({
  "&.MuiBox-root": {
    backgroundColor: "#fff",
    borderRadius: "2rem",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    padding: "1rem",
  },
  "&.MuiBox-root:hover, &.MuiBox-root.dragover": {
    opacity: 0.6,
  },
});

const allowedFileTypes = ["png", "jpeg", "jpg"];

const ImageForm = ({ onReceiveImage, loading, onBack }: ImageFormProps) => {
  const [value, setValue] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const handleChange = (newValue: File | null) => {
    if (!newValue) return setValue(null);

    if (
      allowedFileTypes.includes(newValue?.type.split("/")[1]) &&
      newValue?.size < 5 * 1024 * 1024
    ) {
      setValue(newValue);
      setError(null);
    } else {
      setError(
        "The image must be a png, jpeg or jpg file with a maximum size of 5MB"
      );
    }
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
    onReceiveImage(value);
  };

  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Avatar
        src={value ? URL.createObjectURL(value!) : ""}
        sx={{ width: 200, height: 200, margin: 1 }}
      />
      <MuiFileInput
        size="small"
        getInputText={(file) => (file?.name ? file.name : "No file selected")}
        placeholder="Upload your profile picture"
        value={value}
        onChange={handleChange}
        sx={{ margin: 1 }}
        hideSizeText
      />
      {error && (
        <Typography color="error" sx={{ margin: 1 }}>
          {error}
        </Typography>
      )}
      <Box display="flex" sx={{ width: "100%" }} alignItems="center">
        <Button variant="outlined" onClick={onBack} sx={{ margin: 3, flex: 3 }}>
          Back
        </Button>
        <LoadingButton
          loading={loading}
          type="submit"
          sx={{ m: 3, flex: 3 }}
          variant="contained"
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default ImageForm;
