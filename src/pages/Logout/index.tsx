import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useSessionStorage from "../../hooks/useLocalStorage";

export default function Logout() {
    const [token, setToken] = useSessionStorage('token', false)
    const [username, setUsernameStorage] = useSessionStorage("username", false)
    const [password, setPasswordStorage] = useSessionStorage("password", false)

    const navigate = useNavigate();

    useEffect(() => {
        setToken(false)
        setUsernameStorage(false)
        setPasswordStorage(false)

        navigate("/login");
    }, [])

    return (
        <h3> Ending your session... </h3>
    )
}