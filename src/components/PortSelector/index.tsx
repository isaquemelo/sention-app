import "./style.scss";

type onChangeFunction = (any: any) => void

type Props = {
    acceptedPorts: number[],
    usedPorts: number[],
    label: string,
    value: number,
    onChange: onChangeFunction,
}


export default function PortSelector({ acceptedPorts, usedPorts, label, value, onChange }: Props) {
    return (
        <div className="port-selector">
            <label>
                <span>{label}</span>
            </label>

            <ul className="ports">
                {acceptedPorts.map(acceptedPort => {
                    const isUsed = usedPorts.some(port => port === acceptedPort)

                    return (
                        <li key={acceptedPort} className={`ports-port ${isUsed ? 'ports-port--used' : ''} ${value === acceptedPort ? 'ports-port--selected' : ''}`}>
                            <button type="button" onClick={() => onChange(acceptedPort)}>{acceptedPort}</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}