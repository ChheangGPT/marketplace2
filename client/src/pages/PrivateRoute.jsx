import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />
    return children;
}