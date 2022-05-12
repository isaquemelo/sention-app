import { useState } from "react"
import { ReactComponent as FloatingButtonIcon } from '@images/floating-button.svg'

import './style.scss'
import OverlayedMenu from "../OverlayedMenu"

type onClick = () => void
type Props = {
    options?: {
        key?: string | number,
        label: string,
        onClick: onClick,
    }[] | false,
}

export default function FloatingButton({ options }: Props) {
    const [displayMenu, setDisplayMenu] = useState(false);
    const toggleDisplayMenu = () => setDisplayMenu(!displayMenu);

    return (
        <div className="floating-action-button">
            <FloatingButtonIcon onClick={toggleDisplayMenu} />
            <OverlayedMenu show={displayMenu} options={options} toggleShow={toggleDisplayMenu} />
        </div>
    )
}