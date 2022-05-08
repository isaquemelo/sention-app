import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


import "./style.scss";
import wifiIcon from '../../../public/images/wifi-icon.svg'
import Typography from "../Typography";
import Button from "../Button";

type Props = {
    nextStep: Function,
}

export default function GetBackToOrdinaryNetwork({ nextStep }: Props) {
    return (
        <div className="setup-device-test-connection">
            <img className="wifi-icon" src={wifiIcon} alt="Wi-Fi icon" />

            <Typography size="l" type="title">
                Connect to your ordinary internet network to finish
            </Typography>

            <Typography type="body">
                The device managed to connect to internet. Now you can connect back to your network and link the device to your account
            </Typography>

            <Button label={"I’m connected to my network"} showArrow={true} type="secondary" onClick={() => nextStep()} />
        </div>
    )
}