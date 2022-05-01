import useSessionStorage from "../../hooks/useLocalStorage";
import ShortSetionLogo from "../../../public/images/short-sention-logo.svg"
import User from "../../interfaces/User"
import UserAccountMenu from "../UserAccountMenu"

import "./style.scss";

export default function Header() {
    const [name] = useSessionStorage('name', false)
    const user = { username: name }

    return (
        <div className="container">
            <header className="header">
                <img src={ShortSetionLogo} className="logo" alt="Sention logo " />
                <UserAccountMenu user={user} />
            </header>
        </div>
    )
}