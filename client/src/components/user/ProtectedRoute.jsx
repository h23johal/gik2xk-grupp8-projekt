import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

//ProtectedRoute - En wrapper-komponent för att skydda rutter.
const ProtectedRoute = ({ requiredRole }) => {
  const { user } = useAuth(); // Hämta inloggad användare från AuthContext
  if (!user || (requiredRole && user.id !== requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
