import { useState } from "react"
import { ReactComponent as FloatingButtonIcon } from '@images/floating-button.svg'

import './style.scss'
import OverlayedMenu from "../OverlayedMenu"

type onClick = () => void
type Props = {
    icon?: any,
    options?: {
        key?: string | number,
        label: string,
        onClick: onClick,
    }[] | false,
}

export default function FloatingButton({ options, icon: Icon }: Props) {
    const [displayMenu, setDisplayMenu] = useState(false);
    const toggleDisplayMenu = () => setDisplayMenu(!displayMenu);

    const executeFirstOption = () => {
        const option = options && options[0] ? options[0] : false

        if (option) {
            option.onClick()
        }
    }

    const isSingleOption = options && options.length <= 1

    const TheIcon = !Icon ? FloatingButtonIcon : Icon

    return (
        <div className="floating-action-button">
            {<TheIcon onClick={!isSingleOption ? toggleDisplayMenu : executeFirstOption} />}
            {!isSingleOption && <OverlayedMenu show={displayMenu} options={options} toggleShow={toggleDisplayMenu} />}
        </div>
    )
}