import { useState } from 'react';
import { ReactComponent as MenuIcon } from '@images/menu-icon.svg'
import OverlayedMenu from '../OverlayedMenu';

import "./style.scss";

type onClick = () => void

type Props = {
    label: string,
    icon?: any,
    options?: {
        key?: string | number,
        label: string,
        onClick: onClick,
    }[] | false,
    onItemClick?: onClick,
}

export default function ListItem({ label, icon: Icon = false, options = false, onItemClick }: Props) {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className="list-item">
            <div className="list-item-info" onClick={onItemClick}>
                {Icon && <div className="list-item-info__icon">
                    {Icon ?? <></>}
                </div>}
                <span className="list-item-info__title">{label}</span>
            </div>

            {options &&
                <>
                    <MenuIcon onClick={() => setShowMenu(!showMenu)} />
                    <OverlayedMenu show={showMenu} options={options} toggleShow={() => setShowMenu(!showMenu)} />
                </>
            }
        </div>
    );
}