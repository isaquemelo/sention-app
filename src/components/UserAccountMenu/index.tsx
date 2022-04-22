import { useState } from "react"

import User from "../../interfaces/User"
import profileIcon from "../../images/profile.svg"

import "./style.scss";

type Props = {
    user: User
}

export default function UserAccountMenu({ user }: Props) {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="user-account-menu">

            {user && <div className="account">
                <button className="account-btn">
                    <span>{user.username}</span>
                    <div className="account-btn__icon">
                        <img src={profileIcon} alt="Profile icon" />
                    </div>
                </button>
            </div>}

            {!user && <div className="user-login">
                <button>Login</button>
            </div>}


        </div>
    )
}