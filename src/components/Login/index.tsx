import sentionLogo from "../../images/sention-logo.svg";

import Button from "../Button";
import TextField from "../TextField";

import "./style.scss";

export default function Login() {
    return (
        <div className="login-form">
            <img src={sentionLogo} alt="Sention logo" className="login-form__logo" />

            <form>
                <TextField type="text" label="Username" />
                <TextField type="password" label="Password" />
                <Button label="Login" isSubmit={true} />
            </form>
        </div>
    )
}