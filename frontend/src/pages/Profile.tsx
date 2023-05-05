import React, { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { useUserDetailQuery } from "../store/api/authorization-api-slice";
import { UserType } from "../components/types/types";
import Layout from "../components/AdminComponents/Layout";
import UserProfile, { AccountProfile } from "../components/UserProfile";
import { Stack } from "@mui/system";
const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  // console.log(user);
  // const { data, isLoading } = useUserDetailQuery(user!.user_id);
  return (
    <>
      {user && user.user_type === UserType.ADMIN ? (
        <Layout>
          <Stack width="100%" justifyContent="center">
            <AccountProfile />
            <UserProfile />
          </Stack>
        </Layout>
      ) : (
        <UserProfile />
      )}
    </>
  );
};

export default Profile;
