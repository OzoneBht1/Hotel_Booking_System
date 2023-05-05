import React, { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { useUserDetailQuery } from "../store/api/authorization-api-slice";
import { UserType } from "../components/types/types";
import Layout from "../components/AdminComponents/Layout";
import UserProfile, { AccountProfile } from "../components/UserProfile";
import { Stack } from "@mui/system";
import { PasswordUpdate } from "../components/PasswordUpdate";
const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  // console.log(user);
  // const { data, isLoading } = useUserDetailQuery(user!.user_id);
  return (
    <>
      {user && user.user_type === UserType.ADMIN ? (
        <Layout>
          <Stack width="80%" gap={4}>
            <Stack
              direction="row"
              width="100%"
              gap={3}
              alignItems="flex-end"
              justifyContent="center"
            >
              <AccountProfile />
              <UserProfile />
            </Stack>

            <PasswordUpdate />
          </Stack>
        </Layout>
      ) : (
        <>
          <UserProfile />

          <PasswordUpdate />
        </>
      )}
    </>
  );
};

export default Profile;
