import "./style.scss";

type onChangeFunction = (any: any) => void

type Props = {
    acceptedPorts: number[],
    usedPorts: number[],
    label: string,
    value: number,
    isError?: boolean,
    onChange: onChangeFunction,
}


export default function PortSelector({ acceptedPorts, usedPorts, label, value, isError, onChange }: Props) {
    return (
        <div className={`port-selector ${isError ? "port-selector--error" : ""}`}>
            <label>
                <span>{label}</span>
            </label>

            <ul className="ports">
                {acceptedPorts.map(acceptedPort => {
                    const isUsed = usedPorts.some(port => port === acceptedPort)

                    return (
                        <li key={acceptedPort} className={`ports-port ${isUsed ? 'ports-port--used' : ''} ${value === acceptedPort ? 'ports-port--selected' : ''}`}>
                            <button disabled={isUsed} type="button" onClick={() => onChange(acceptedPort)}>{acceptedPort}</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}