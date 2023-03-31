import React from "react";
import { useLocation } from "react-router-dom";
const SearchedResults = () => {
  const location = useLocation();

  console.log(location);
  return <p>Hi mom</p>;
};

export default SearchedResults;
