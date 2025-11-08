import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { Spin } from "antd";

const ProtectedRoute = ({ allowedRoles }) => {
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading) return <div className="flex justify-center items-center h-screen">
        <Spin size="small" />
    </div>

    if (!user) return <Navigate to="/login" replace />;

    if (!allowedRoles.includes(user.role))
        return <Navigate to="/login" replace />;

    return <Outlet />;
};

export default ProtectedRoute;