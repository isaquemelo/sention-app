import { forwardRef } from "react";
import "./style.scss";

type onChangeFunction = (text: string) => void

type Props = {
    label: string,
    isError?: boolean,
    onChange?: onChangeFunction,
    onBlur?: any,
    value?: string,
    options?: {
        value: string,
        label: string,
        key: string,
    }[]
}

function OptionsField({ label, value, isError, onChange, onBlur, options }: Props) {
    const handleOnChange: React.ChangeEventHandler<HTMLSelectElement> = (ev) => {
        if (onChange)
            return onChange(ev.target.value)
    }

    console.log("value", value)

    return (
        <div className={`options-field ${isError ? "options-field--error" : ""}`}>
            <label>
                <span>{label}</span>
                <select onChange={handleOnChange} value={value}>
                    {options?.map(({ value, label, key }) => {
                        return <option key={key} value={value}>{label}</option>
                    })}

                    {!value && <option value=""></option>}
                </select>
            </label>
        </div>
    );
}

export default OptionsField