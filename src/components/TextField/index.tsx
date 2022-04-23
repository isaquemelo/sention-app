import "./style.scss";

type onChangeFunction = (text: string) => void

type Props = {
    type: "text" | "password",
    label: string,
    placeholder?: string,
    onChange?: onChangeFunction,
}

export default function TextField({ type, label, placeholder, onChange }: Props) {
    const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange)
            return onChange(ev.target.value)
    }

    return (
        <div className="textfield">
            <label>
                <span>{label}</span>
                <input type={type} placeholder={placeholder} onChange={handleOnChange} />
            </label>
        </div>
    );
}