import { Navigate } from "react-router-dom";

import { getUser } from "../services/authUtils";

function RoleProtectedRoute({ children, allowedRoles }) {

  const user = getUser();

  if (!user) {

    return <Navigate to="/login" />;

  }

  if (!allowedRoles.includes(user.role)) {

    return <Navigate to="/dashboard" />;

  }

  return children;

}

export default RoleProtectedRoute;