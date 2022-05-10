import { ReactComponent as CloseIcon } from '@images/close-icon.svg'
import "./style.scss";


type onClick = () => void

type Props = {
    show: boolean,
    options?: {
        key?: string | number,
        label: string,
        onClick: onClick,
    }[] | false,
    toggleShow: onClick,
}

export default function OverlayedMenu({ show = true, options, toggleShow }: Props) {
    return (
        <>
            {show &&
                <div className="overlayed-menu">
                    <ul className="overlayed-menu-list">
                        <button id="close-menu" onClick={() => toggleShow()}> <CloseIcon /> </button>

                        {options && options.map(({ key, label, onClick }) => {
                            return (
                                <li key={key}>
                                    <button aria-label={label} onClick={onClick}>
                                        {label}
                                    </button>
                                </li>
                            )
                        })}

                    </ul>
                </div>
            }
        </>
    );
}