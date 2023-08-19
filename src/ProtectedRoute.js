import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({ element, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
