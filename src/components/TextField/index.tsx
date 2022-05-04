import "./style.scss";

type onChangeFunction = (text: string) => void

type Props = {
    type: "text" | "password",
    label: string,
    placeholder?: string,
    isError?: boolean,
    autocomplete?: boolean,
    onChange?: onChangeFunction,
}

export default function TextField({ type, label, placeholder, autocomplete = true, isError, onChange }: Props) {
    const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange)
            return onChange(ev.target.value)
    }

    return (
        <div className={`textfield ${isError ? "textfield--error" : ""}`}>
            <label>
                <span>{label}</span>
                <input type={type} placeholder={placeholder} onChange={handleOnChange} required autoComplete={autocomplete ? "on" : "false"} />
            </label>
        </div>
    );
}