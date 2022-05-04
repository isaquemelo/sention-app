import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// import sentionLogo from "../../../public/images/sention-logo.svg";
// import Button from "../../components/Button";
// import TextField from "../../components/TextField";

import "./style.scss";
import Button from "../../components/Button";
import TestConnection from "../../components/TestConnection";
import PreSetupWifiConnection from "../../components/PreSetupWifiConnection";
import SetupWifiConnection from "../../components/SetupWifiConnection";


export default function DeviceSetup() {
    const [stepIndex, setStepIndex] = useState(0);

    const navigate = useNavigate();

    const nextStep = () => {
        setStepIndex(stepIndex + 1)
    }

    const steps = [
        <TestConnection nextStep={nextStep} />,
        <PreSetupWifiConnection nextStep={nextStep} />,
        <SetupWifiConnection nextStep={nextStep} />
    ]

    return (
        <div className="device-setup">
            <div className="container">
                {steps[stepIndex]}

                <div className="steps">
                    {steps.map((_, index) => {
                        return (<button key={index} className={`${index === stepIndex ? 'active' : ''}`}>{index + 1}</button>)
                    })}

                </div>
            </div>

        </div>

    )
}