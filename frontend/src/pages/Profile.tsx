import React, { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { useUserDetailQuery } from "../store/api/authorization-api-slice";
const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);
  const { data, isLoading } = useUserDetailQuery(user!.user_id);
  useEffect(() => {
    console.log(data);
  }, [isLoading]);

  return (
    <>
      {data ? (
        <div>
          <h1>Profile</h1>
          <p>Username: {data.first_name}</p>
          <p>Email: {data.email}</p>
          <p>Country: {data.country}</p>
          <p>Gender: {data.gender}</p>
          Image: <img src={data.image} />
        </div>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
};

export default Profile;
