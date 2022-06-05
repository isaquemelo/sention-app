import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ReactComponent as DatabaseIcon } from '@images/database.svg';
import { ReactComponent as BoxIcon } from '@images/box.svg';
import { ReactComponent as RefreshIcon } from '@images/refresh.svg';

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
    const { isLoading: isLoadingSensorsData, data: sensorsData } = useQuery(["sensorsData", device.id], () => getSensorsData(sensorsIds), { refetchInterval: 5000 })
    console.log(sensorsData)

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
                            <div className="sensor-block" data-sensor-type={sensor.type} key={sensor.id}>


                                {/* Sensor with multiple ports */}
                                {sensorSchema?.port.multiplePort && (
                                    <>
                                        <div className="title">
                                            <FunctionIcon />
                                            <span>{`${sensor.name}`}</span>
                                            {sensorSchema.port.sources?.map(({ id, label, unit }) => {
                                                return (
                                                    <>
                                                        <span className="label">{label}</span>
                                                        <span className="value">
                                                            {/* @ts-ignore */}
                                                            {(Math.round(receivedData.data[id] * 10) / 10)}
                                                            {unit}
                                                        </span>
                                                    </>
                                                )
                                            })}
                                        </div>

                                    </>
                                )}

                                {/* Sensor with multiple ports */}
                                {!sensorSchema?.port.multiplePort && (
                                    <>
                                        <div className="title">
                                            <FunctionIcon />
                                            <span>{`${sensor.name}`}</span>
                                        </div>
                                        <span className="data">{`${((receivedData?.data as { value: string }).value)}`}</span>
                                    </>
                                )}
                            </div>
                        )
                    }
                })}

            </div>
        </div>

    )
}