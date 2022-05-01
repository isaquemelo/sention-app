import arrowRight from "../../../public/images/arrow-right.svg";

import "./style.scss";

type onClick = () => void

type Props = {
    label: string,
    type?: "primary" | "secondary",
    isSubmit?: boolean,
    showArrow?: boolean,
    onClick?: onClick,
}

export default function Button({ type = "primary", label, isSubmit = false, showArrow = true, onClick }: Props) {
    return (
        <button className={`button button--${type}`} type={isSubmit ? "submit" : "button"} onClick={onClick}>
            <span>{label}</span>
            {showArrow && <img src={arrowRight} alt="Arrow to the right" />}
        </button>
    );
}