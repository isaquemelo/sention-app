import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ReactComponent as SwitchOnIcon } from '@images/switch-on.svg';
import { ReactComponent as SwitchOffIcon } from '@images/switch-off.svg';
import { ReactComponent as PlusCircleIcon } from '@images/plus-circle.svg';
import { ReactComponent as BoxIcon } from '@images/box.svg';

import "./style.scss";

import ShortHeader from "../../components/ShortHeader";
import { getSensor } from "../../services/sensors/getSensor";
import { getSensorData } from "../../services/sensors/getSensorData";
import Typography from "../../components/Typography";
import SensorData from "../../types/SensorData";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import FloatingButton from "../../components/FloatingButton";
import Device from "../../types/Device";
import { getSensorsData } from "../../services/sensors/getSensorsData";
import sensorSchemas from "../../constants/sensorSchemas";
import buildSensorIcon from "../../builders/buildSensorIcon";


type Props = {
    device: Device
}


export default function ViewDeviceData({ device }: Props) {
    const sensorsIds = device.sensors.map((sensor) => sensor.id!)
    const { isLoading: isLoadingSensorsData, data: sensorsData } = useQuery(["sensorsData", device.id], () => getSensorsData(sensorsIds), { refetchInterval: 1500 })

    const navigator = useNavigate()

    console.log(device.sensors, sensorsData)

    return (
        <div className="view-device-data">
            <div className="heading">
                <h4>{`${device.accessCode}`}</h4>
                <h2>{`${device.name.length ? device.name : "Unnamed device"}`}</h2>
            </div>

            <div className="sensors-data">
                {device.sensors.map(sensor => {
                    const sensorSchema = sensorSchemas.find(schema => schema.id === sensor.type)
                    const receivedData = sensorsData?.find(sensorData => sensorData.sensorId === sensor.id)

                    if (receivedData) {
                        const FunctionIcon = buildSensorIcon(sensor.type)

                        return (
                            <Fragment key={sensor.id}>
                                {/* Sensor with sources */}
                                {sensorSchema?.port.multiplePort && (
                                    <>
                                        {sensorSchema.port.sources?.map(({ id, label, unit }) => {
                                            return (
                                                <Link key={id + sensor.id} to={`sensors/${sensor.id}`} className="sensor-block" data-sensor-type={sensor.type}>
                                                    <div className="title">
                                                        <div className="icon-wrapper">
                                                            <FunctionIcon />
                                                        </div>
                                                        <span>{`${label}`}</span>
                                                    </div>

                                                    <div className="data" data-value-type={id}>
                                                        <span className="value">
                                                            {/* @ts-ignore */}
                                                            {(Math.round(receivedData.data[id] * 10) / 10)}
                                                            {unit}
                                                        </span>
                                                    </div>

                                                    <span className="source">{`${sensor.name}`}</span>
                                                </Link>
                                            )
                                        })}
                                    </>
                                )}

                                {/* Sensor with single source */}
                                {!sensorSchema?.port.sources && (
                                    <Link key={sensor.id} to={`sensors/${sensor.id}`} className={`sensor-block`} data-sensor-type={sensor.type}>
                                        <div className="title">
                                            <div className="icon-wrapper">
                                                <FunctionIcon />
                                            </div>
                                            <span>{`${sensor.name}`}</span>
                                        </div>
                                        <div className="data">
                                            {`${((receivedData?.data as { value: number }).value)}`}
                                            {sensorSchema?.id === "DIGITAL" && (
                                                ((receivedData?.data as { value: number }).value === 1) ? <SwitchOnIcon /> : <SwitchOffIcon />
                                            )}
                                        </div>
                                    </Link>
                                )}

                            </Fragment>
                        )
                    }
                })}

                {sensorsData && sensorsData.length % 2 !== 0 && (
                    <Link key={"last-but-not-least"} to={`sensors/create/${device.id}`} className={`sensor-block sensor-block--skeleton`}>
                        <PlusCircleIcon />
                        <span>New sensor</span>
                    </Link>
                )}


                {(device.sensors.length === 0 || sensorsData?.length === 0) && (
                    <div className="no-results">
                        <BoxIcon />
                        <Typography type="body" alignment="center" size="l">Nothing here yet</Typography>
                        <Typography type="body" alignment="center" size="m">Add sensors to your device and check if your sensor is properly configured.</Typography>
                        <Button label="Edit device" showArrow onClick={() => navigator(`/devices/${device.id}`)} />
                    </div>
                )}

            </div>
        </div>

    )
}