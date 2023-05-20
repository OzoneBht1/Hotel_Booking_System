import {
  Box,
  Button,
  Container,
  CssBaseline,
  List,
  ListItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { listActions } from "../../store/list-slice";
import { useForm, useFieldArray } from "react-hook-form";
import { IFAQCreate } from "../types/types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IListPropertiesAmenitiesProps {
  onClickNext: () => void;
  onClickPrev: () => void;
}

const faqSchema = yup.object().shape({
  faqs: yup.array().of(
    yup.object().shape({
      question: yup
        .string()
        .required("This is required")
        .matches(/.*\?$/, "Question should end with a question mark"),
      answer: yup.string().required("This is required"),
    })
  ),
});

const FaqAndCleanPractices = ({
  onClickNext,
  onClickPrev,
}: IListPropertiesAmenitiesProps) => {
  const dispatch = useAppDispatch();
  const smokingAllowedRef = useRef<HTMLInputElement | null>(null);
  const petsAllowedRef = useRef<HTMLInputElement | null>(null);
  const partiesAllowedRef = useRef<HTMLInputElement | null>(null);
  const selfCheckInRef = useRef<HTMLInputElement | null>(null);

  const { faqs } = useAppSelector((state) => state.list);
  const { house_rules } = useAppSelector((state) => state.list);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFAQCreate>({
    resolver: yupResolver(faqSchema),
    defaultValues:
      faqs.faqs.length > 0
        ? faqs
        : {
            faqs: [
              {
                question: "",
                answer: "",
              },
              {
                question: "",
                answer: "",
              },
              {
                question: "",
                answer: "",
              },
              {
                question: "",
                answer: "",
              },
            ],
          },
  });

  const { fields } = useFieldArray({
    control,
    name: "faqs",
  });

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(
      listActions.setHouseRules({
        house_rules: {
          smoking_allowed: smokingAllowedRef!.current!.checked,
          pets_allowed: petsAllowedRef!.current!.checked,
          parties_allowed: partiesAllowedRef!.current!.checked,
          self_check_in: selfCheckInRef!.current!.checked,
        },
      })
    );

    dispatch(listActions.setFaq(data));

    onClickNext();
  };
  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 5,
        }}
      >
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography variant="h5" component="h2">
            House Rules
          </Typography>
          <List>
            <ListItem>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="35%"
              >
                <Typography variant="body1">Smoking allowed</Typography>
                <Switch
                  defaultChecked={house_rules.smoking_allowed}
                  inputRef={smokingAllowedRef}
                />
              </Box>
            </ListItem>
            <ListItem>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="35%"
              >
                <Typography variant="body1">Pets allowed</Typography>
                <Switch
                  defaultChecked={house_rules.pets_allowed}
                  inputRef={petsAllowedRef}
                />
              </Box>
            </ListItem>
            <ListItem>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="35%"
              >
                <Typography variant="body1">Parties allowed</Typography>
                <Switch
                  defaultChecked={house_rules.parties_allowed}
                  inputRef={partiesAllowedRef}
                />
              </Box>
            </ListItem>
            <ListItem>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="35%"
              >
                <Typography variant="body1">Self Check In</Typography>
                <Switch
                  defaultChecked={house_rules.self_check_in}
                  inputRef={selfCheckInRef}
                />
              </Box>
            </ListItem>
          </List>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap={5}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h5" component="h2">
            Frequently Asked Questions
          </Typography>

          {fields.map((field, index) => (
            <Box key={field.id} display="flex" flexDirection="column" gap={2}>
              <TextField
                id={`outlined-basic-${index}`}
                label={`Question ${index + 1}`}
                sx={{
                  fontSize: 20,
                  fontWeight: 800,
                }}
                variant="outlined"
                error={errors.faqs?.[index]?.question ? true : false}
                helperText={
                  errors.faqs?.[index]?.question
                    ? (errors.faqs?.[index]?.question.message as string)
                    : ""
                }
                {...register(`faqs.${index}.question`)}
              />
              <TextField
                id={`outlined-basic-answer-${index}`}
                multiline
                label="Answer"
                variant="outlined"
                error={errors.faqs?.[index]?.answer ? true : false}
                helperText={
                  errors.faqs?.[index]?.question
                    ? (errors.faqs?.[index]?.answer.message as string)
                    : ""
                }
                {...register(`faqs.${index}.answer`)}
              />
            </Box>
          ))}

          <Box
            display="flex"
            width="100%"
            alignItems="flex-end"
            justifyContent="flex-end"
          >
            <Button
              sx={{ width: "20%", marginRight: "auto" }}
              color="secondary"
              variant="outlined"
              onClick={() => onClickPrev()}
            >
              Previous
            </Button>
            <Button
              sx={{ width: "20%", mt: 2 }}
              variant="contained"
              // onClick={nextClickHandler}
              type="submit"
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default FaqAndCleanPractices;
