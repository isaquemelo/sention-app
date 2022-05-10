import arrowRight from "@images/arrow-right.svg";

import "./style.scss";

type onClick = () => void

type Props = {
    label: string,
    type?: "primary" | "secondary",
    isSubmit?: boolean,
    showArrow?: boolean,
    disabled?: boolean,
    onClick?: onClick,
}

export default function Button({ type = "primary", label, disabled = false, isSubmit = false, showArrow = true, onClick }: Props) {
    return (
        <button disabled={disabled} className={`button button--${type} ${disabled ? 'button--disabled' : ''}`} type={isSubmit ? "submit" : "button"} onClick={onClick}>
            <span>{label}</span>
            {!disabled && showArrow && <img src={arrowRight} alt="Arrow to the right" />}
        </button>
    );
}