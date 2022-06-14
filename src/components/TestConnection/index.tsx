import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


import "./style.scss";
import wifiIcon from '@images/wifi-icon.svg'
import Typography from "../Typography";
import Button from "../Button";

type Props = {
    nextStep: Function,
}

export default function TestConnection({ nextStep }: Props) {
    const [isTestingConnection, setIsTestingConnection] = useState(false)

    const testConnection = () => {
        setIsTestingConnection(true);
        axios.get(`http://192.168.4.1/ping`, { timeout: 5000 }).then(() => {
            nextStep()
        }).catch(() => {
            alert("Sorry, we could not validate your connection to the device.")
        }).finally(() => {
            setIsTestingConnection(false);
        })
    }

    return (
        <div className="setup-device-test-connection">
            <img className="wifi-icon" src={wifiIcon} alt="Wi-Fi icon" />

            <Typography size="l" type="title">
                Connect to device's Wi-Fi
            </Typography>

            <Typography type="body">
                By connecting to this network you will be able to setup your device to start using it
            </Typography>

            <Button label={isTestingConnection ? "Testing your connection..." : "Test conection with device"} showArrow={!isTestingConnection} type="secondary" disabled={isTestingConnection} onClick={testConnection} />
        </div>
    )
}