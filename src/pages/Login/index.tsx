import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import sentionLogo from "../../images/sention-logo.svg";
import Button from "../../components/Button";
import TextField from "../../components/TextField";

import "./style.scss";

import doLogin from "../../actions/doLogin";
import useSessionStorage from "../../hooks/useLocalStorage";

export default function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState(false)

    const [token, setUserToken] = useSessionStorage("token", false)
    const [name, setName] = useSessionStorage("name", false)

    const navigate = useNavigate();

    useEffect(() => {
        setError(false)
    }, [username, password])

    useEffect(() => {
        if (token)
            navigate('/', { replace: true })
    }, [])

    const handleSubmit = async () => {
        setError(false);

        doLogin(username, password).then(({ name, token }) => {
            setUserToken(token)
            setName(name)
            navigate("/", { replace: true });
        }).catch(() => {
            setError(true);
        })
    }

    return (
        <div className="login-page">
            <div className="container">
                <div className="login-form">
                    <img src={sentionLogo} alt="Sention logo" className="login-form__logo" />

                    <form onSubmit={(ev) => ev.preventDefault()}>
                        <TextField type="text" label="E-mail" onChange={setUsername} isError={error} />
                        <TextField type="password" label="Password" onChange={setPassword} isError={error} />
                        <Button label="Login" isSubmit={true} onClick={handleSubmit} />
                    </form>
                </div>
            </div>
        </div>

    )
}