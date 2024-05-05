import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
import { RiTreasureMapLine } from "react-icons/ri";


const PrivateRoute = ({ children }) => {
  const { user,  } = useContext(AuthContext);

  if (user) {
    return <>{children}</>;
  }

  return (
    <Navigate
      to="/login"
      state={{ from: location }}
      replace
    />
  );
};

export default PrivateRoute;