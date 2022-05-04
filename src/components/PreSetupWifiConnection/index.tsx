import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


import "./style.scss";
import networkIcon from '../../../public/images/network-icon.svg'
import Typography from "../Typography";
import Button from "../Button";

type Props = {
    nextStep: Function,
}

export default function PreSetupWifiConnection({ nextStep }: Props) {
    return (
        <div className="setup-device-pre-wifi-connection">
            <img className="wifi-icon" src={networkIcon} alt="Wi-Fi icon" />

            <Typography size="l" type="title">
                Setup your Wi-Fi connection
            </Typography>

            <Typography type="body">
                Your device will use this network to communicate with our servers.
            </Typography>

            <Button label={"Next"} showArrow={true} type="secondary" onClick={() => nextStep()} />
        </div>
    )
}