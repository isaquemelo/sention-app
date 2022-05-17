import { forwardRef } from "react";
import "./style.scss";

type onChangeFunction = (text: string) => void

type Props = {
    type?: "text" | "password",
    label: string,
    placeholder?: string,
    isError?: boolean,
    autocomplete?: boolean,
    onChange?: onChangeFunction,
    onBlur?: any,
    value?: string,
}

function TextField({ type = "text", label, value, placeholder, autocomplete = true, isError, onChange, onBlur }: Props) {
    const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange)
            return onChange(ev.target.value)
    }

    return (
        <div className={`textfield ${isError ? "textfield--error" : ""}`}>
            <label>
                <span>{label}</span>
                <input value={value} type={type} placeholder={placeholder} onChange={handleOnChange} onBlur={onBlur} required autoComplete={autocomplete ? "on" : "false"} />
            </label>
        </div>
    );
}

export default TextField