import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router-dom";
// import NotPermitted from "./NotPermitted";
import NotFound from "../NotFound";

const RoleBaseRoute = (props) => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  // console.log("log state account", user);
  const userRole = user.role;

  if (isAdminRoute && userRole == "ADMIN") {
    // console.log("user role: ", userRole);

    return <>{props.children}</>;
  } else {
    return <NotFound />;
  }
};

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  return (
    <>
      {isAuthenticated === true ? (
        <>
          <RoleBaseRoute>{props.children}</RoleBaseRoute>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedRoute;
