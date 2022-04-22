import ShortSetionLogo from "../../images/short-sention-logo.svg"
import User from "../../interfaces/User"
import UserAccountMenu from "../UserAccountMenu"

import "./style.scss";

export default function Header() {
    const user: User = { username: "isaquemelo" }

    return (
        <div className="container">
            <header className="header">
                <img src={ShortSetionLogo} className="logo" alt="Sention logo " />
                <UserAccountMenu user={user} />
            </header>
        </div>
    )
}