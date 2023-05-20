import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import {
  useUpdateProfileMutation,
  useUserDetailQuery,
} from "../store/api/authorization-api-slice";
import { UserType, ICountryData, ISelect } from "../components/types/types";
import Layout from "../components/AdminComponents/Layout";
import UserProfile from "../components/UserProfile";
import { Stack } from "@mui/system";
import { PasswordUpdate } from "../components/PasswordUpdate";
import * as yup from "yup";
import { getCountries } from "../components/api/getCountries";
import { Alert, Snackbar } from "@mui/material";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data, isLoading } = useUserDetailQuery(user!.user_id);
  const [updateProfile] = useUpdateProfileMutation();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [countries, setCountries] = useState<ISelect[]>([]);
  console.log(data);

  const fetchCountries = useCallback(async () => {
    const returnedData = await getCountries<ICountryData[]>();
    const transformedCountries: ISelect[] = [];

    returnedData.map((country) => {
      transformedCountries.push({
        value: country.name,
        label: country.name,
      });
    });
    setCountries(transformedCountries);
  }, []);

  useEffect(() => {
    fetchCountries();
  }, []);

  const formReceieveHandler = (data: any) => {
    const first_name = data.firstName;
    const last_name = data.lastName;

    delete data.email;
    delete data.firstName;
    delete data.lastName;

    console.log(data);

    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("gender", data.gender);
    formData.append("country", data.country);
    if (data.image) {
      formData.append("image", data.image, data.image.name);
    }

    updateProfile({ formData, id: user?.user_id }).then(() => {
      setShowSnackbar(true);
      setSnackbarMessage("Profile updated successfully");
    });
  };

  return (
    <>
      {user && user.user_type === UserType.ADMIN ? (
        <Layout>
          <Snackbar
            open={showSnackbar}
            autoHideDuration={6000}
            onClose={() => setShowSnackbar(false)}
          >
            <Alert
              onClose={() => setShowSnackbar(false)}
              severity="success"
              elevation={6}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <Stack width="80%" gap={4}>
            <Stack
              direction="row"
              width="100%"
              gap={3}
              alignItems="flex-end"
              justifyContent="center"
            >
              {data && countries && (
                <UserProfile
                  onSubmitForm={formReceieveHandler}
                  data={data}
                  countries={countries}
                />
              )}
            </Stack>

            <PasswordUpdate />
          </Stack>
        </Layout>
      ) : (
        <>
          {data && countries && (
            <UserProfile
              onSubmitForm={formReceieveHandler}
              data={data}
              countries={countries}
            />
          )}

          <PasswordUpdate />
        </>
      )}
    </>
  );
};

export default Profile;
