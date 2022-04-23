import { Route, Navigate } from "react-router-dom";
import useSessionStorage from "../../hooks/useLocalStorage";

type Props = {
    children: JSX.Element,
}

const AuthRoute = ({ children }: Props) => {
    const [token] = useSessionStorage("token", false)
    return token ? children : <Navigate to="/login" replace />
};

export default AuthRoute