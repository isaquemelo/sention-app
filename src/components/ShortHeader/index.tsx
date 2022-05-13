import { ReactComponent as BackIcon } from '@images/arrow-left.svg'
import { ReactComponent as MenuIcon } from '@images/menu-white.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import OverlayedMenu from '../OverlayedMenu'

import './style.scss'

type onClick = () => void

type Props = {
    title: string,
    icon?: any,
    options?: {
        key?: string | number,
        label: string,
        onClick: onClick,
    }[] | false,
}

export default function ShortHeader({ title, icon: Icon, options }: Props) {
    const navigator = useNavigate()
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className='short-header'>
            <div className='right'>
                <button className='short-header--back' onClick={() => navigator(-1)}>
                    <BackIcon />
                </button>

                {Icon &&
                    <div className="short-header--icon">
                        {Icon ?? <></>}
                    </div>
                }

                <span className='short-header--title'>{title}</span>
            </div>

            <div className='left'>
                <button onClick={() => setShowMenu(true)}>
                    <MenuIcon />
                </button>

                <OverlayedMenu show={showMenu} options={options} toggleShow={() => setShowMenu(!showMenu)} />
            </div>
        </div >
    )
}