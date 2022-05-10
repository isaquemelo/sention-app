import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as TemperatureIcon } from '@images/sensor-icons/temperature.svg';
import { ReactComponent as LightSensor } from '@images/sensor-icons/light.svg';
// import sentionLogo from "@images/sention-logo.svg";
// import Button from "../../components/Button";
// import TextField from "../../components/TextField";

import "./style.scss";
import Button from "../../components/Button";
import ListItem from "../../components/ListItem";
import Typography from "../../components/Typography";


export default function Devices() {
    const navigate = useNavigate();

    return (
        <div className="devices">
            <div className="container page">
                <Typography type="title" size="l">Devices</Typography>

                <div className="devices-list">
                    <ListItem
                        label="Room sensor"
                        icon={<TemperatureIcon />}
                        options={[{
                            label: "Option 1", onClick: () => {
                                console.log("Click inside option")
                            }
                        }]}
                        onItemClick={
                            () => {
                                console.log("List item clicked")
                            }
                        }
                    />

                    <ListItem
                        label="Light sensor"
                        // icon={<LightSensor />}
                        options={[{
                            label: "Option 1", onClick: () => {
                                console.log("Click inside option")
                            }
                        }]}
                        onItemClick={
                            () => {
                                // console.log("List item clicked")
                            }
                        }
                    />
                </div>
            </div>

        </div>

    )
}