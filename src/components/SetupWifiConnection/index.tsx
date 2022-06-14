import { useNavigate } from "react-router-dom";
import { isValidElement, useEffect, useState } from "react";
import axios from "axios";


import "./style.scss";
import networkIcon from '@images/network-icon.svg'
import Typography from "../Typography";
import Button from "../Button";
import TextField from "../TextField";
import useSessionStorage from "../../hooks/useLocalStorage";

type Props = {
    nextStep: Function,
}

export default function SetupWifiConnection({ nextStep }: Props) {
    const [isSaving, setIsSaving] = useState(false);
    const [ssid, setSSID] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState(false);

    const [username] = useSessionStorage("username", false)
    const [userPassword] = useSessionStorage("password", false)

    useEffect(() => {
        setError(false)
    }, [ssid, password])

    const saveCredentials = () => {
        setIsSaving(true);

        const data = {
            network: {
                "ssid": ssid,
                "password": password
            },
            user: {
                "username": username,
                "password": userPassword
            }
        }

        axios.post(`https://192.168.4.1/credentials`, data).then(() => {
            setError(false);
            axios.post(`https://192.168.4.1/reboot`, data, { timeout: 5000 })
            nextStep()
        }).catch(() => {
            setError(true);

            alert("Sorry, we could not connect to this network. Check the credentials.")
        }).finally(() => {
            setIsSaving(false);
        })
    }

    return (
        <div className="setup-device-wifi-connection">
            <img className="wifi-icon" src={networkIcon} alt="Wi-Fi icon" />

            <Typography size="m" type="title">
                Enter your network credentials
            </Typography>

            <div className={isSaving ? "disabled" : ""}>
                <TextField type="text" label="Network name (SSID)" onChange={setSSID} isError={error} autocomplete={false} />
                <TextField type="password" label="Password" onChange={setPassword} isError={error} autocomplete={false} />
            </div>


            <Button label={isSaving ? "Testing your Wi-Fi network" : "Save"} showArrow={true} type="secondary" onClick={saveCredentials} disabled={isSaving} />
        </div>
    )
}