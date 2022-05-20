import { forwardRef } from "react";
import "./style.scss";

type onChangeFunction = (text: string) => void

type Props = {
    type?: "text" | "password" | "number",
    label: string,
    placeholder?: string,
    isError?: boolean,
    autocomplete?: boolean,
    multiline?: boolean,
    onChange?: onChangeFunction,
    onBlur?: any,
    disabled?: boolean
    value?: string,
}

function TextField({ type = "text", label, disabled = false, value, placeholder, autocomplete = true, multiline = false, isError, onChange, onBlur }: Props) {
    const handleOnChange = (ev: any) => {
        if (onChange)
            return onChange(ev.target.value)
    }

    return (
        <div className={`textfield ${isError ? "textfield--error" : ""}`}>
            <label>
                <span>{label}</span>
                {!multiline && <input value={value} type={type} placeholder={placeholder} onChange={handleOnChange} onBlur={onBlur} required disabled={disabled} autoComplete={autocomplete ? "on" : "false"} />}
                {multiline && <textarea value={value} placeholder={placeholder} onChange={handleOnChange} onBlur={onBlur} required autoComplete={autocomplete ? "on" : "false"} />}

            </label>
        </div>
    );
}

export default TextField