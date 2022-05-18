import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import sensorSchemas from "../../constants/sensorSchemas";
import deviceToUsedPorts from "../../adapters/deviceToUsedPorts";
import Device from "../../types/Device";
import Sensor from "../../types/Sensor";
import FloatingButton from "../FloatingButton";
import OptionsField from "../OptionsField";
import PortSelector from "../PortSelector";
import TextField from "../TextField";
import { createSensor } from "../../services/sensors/createSensor";

import { ReactComponent as SaveFloatingIcon } from '@images/save-floating.svg';

import "./style.scss";

type changeFunction = (text: any) => void


type Props = {
    updateIcon?: changeFunction,
    device: Device,
}

export default function SensorForm({ updateIcon, device }: Props) {
    const { register, handleSubmit, getValues, watch, formState: { errors }, control, } = useForm();
    const navigate = useNavigate();

    const type = watch("type");
    const name = watch("name");
    const port = watch("port");

    const queryClient = useQueryClient()

    const { mutate: newSensor } = useMutation(
        () => {
            const isMultiplePort = sensorSchema?.port.multiplePort ?? false
            const multiplePorts: any = {}

            if (sensorSchema && sensorSchema.port.meta && isMultiplePort) {
                sensorSchema.port.meta.forEach(({ id }) => {
                    multiplePorts[id] = getValues(`port-${id}`);
                })
            }

            return createSensor(device.id, new Sensor({
                name,
                port: isMultiplePort ? multiplePorts : port,
                type,
            }))
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["device", device.id]);
                navigate(`/devices/${device.id}`)
            }
        }
    );

    useEffect(() => {
        if (updateIcon)
            updateIcon(type)
    }, [type]);

    const sensorOptions = sensorSchemas.map(({ id, label }) => {
        return {
            label: label,
            value: id,
            key: id,
        }
    })

    const sensorSchema = sensorSchemas.find(({ id }) => id === type)
    const supportedPorts = sensorSchema ? sensorSchema.port.supportedPorts : []
    const usedPorts = deviceToUsedPorts(device)

    return (
        <form onSubmit={handleSubmit(data => newSensor())}>
            <Controller
                control={control}
                name="name"
                rules={{ required: true, minLength: 5 }}
                defaultValue={""}
                render={({ field: { onChange, onBlur, value, ref, }, fieldState: { error } }) => (
                    <TextField
                        label="Name"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        isError={error ? true : false}
                    />
                )}
            />

            <Controller
                control={control}
                name="type"
                rules={{ required: true, minLength: 1 }}
                defaultValue={""}
                render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                    <OptionsField
                        label="Type"
                        options={sensorOptions}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        isError={error ? true : false}
                    />
                )}
            />

            {/* Multiple port sensor type */}
            {sensorSchema && sensorSchema.port.multiplePort && (
                <>
                    {sensorSchema.port.meta?.map(port => {
                        return (
                            <Controller
                                key={port.id}
                                rules={{ required: true, minLength: 1 }}
                                control={control}
                                name={`port-${port.id}`}
                                defaultValue={""}
                                render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                                    <PortSelector
                                        value={value}
                                        onChange={onChange}
                                        label={`Port ${port.label}`}
                                        acceptedPorts={supportedPorts}
                                        usedPorts={usedPorts}
                                        isError={error ? true : false}
                                    />
                                )}
                            />
                        )
                    })}
                </>
            )}

            {/* Single port sensor type */}
            {sensorSchema && !sensorSchema.port.multiplePort && (
                <Controller
                    control={control}
                    name="port"
                    defaultValue={""}
                    rules={{ required: true, minLength: 1 }}
                    render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                        <PortSelector
                            value={value}
                            onChange={onChange}
                            label={`Port`}
                            acceptedPorts={supportedPorts}
                            usedPorts={usedPorts}
                            isError={error ? true : false}
                        />
                    )}
                />
            )}

            <button>
                <FloatingButton options={[
                    {
                        label: 'Save sensor',
                        onClick: () => { }
                    },
                ]} icon={SaveFloatingIcon} />
            </button>
        </form>
    )
}