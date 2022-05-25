import { useEffect, useState } from "react";
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

type changeFunction = (text?: any, ...any: any) => void

type StructedFormData = { name: string, type: string, port: string | number | object }

type Props = {
    submitForm: (data: StructedFormData) => any,
    updateIcon?: changeFunction,
    device: Device,
    sensor?: Sensor,

}

const sensorOptions = sensorSchemas.map(({ id, label }) => {
    return {
        label: label,
        value: id,
        key: id,
    }
})


export default function SensorForm({ updateIcon, device, sensor, submitForm = () => { } }: Props) {
    const [sensorSchema, setSensorSchema] = useState<typeof sensorSchemas[number] | undefined>()

    const { handleSubmit, getValues, watch, control, } = useForm(
        {
            defaultValues: {
                name: sensor ? sensor.name : "",
                type: sensor ? sensor.type : "",
                port: sensor && typeof sensor.port !== 'object' ? sensor.port : ""
            }
        });

    const generateStructuredData = (): StructedFormData => {
        const isMultiplePort = sensorSchema?.port.multiplePort ?? false
        const multiplePorts: any = {}

        if (sensorSchema && sensorSchema.port.meta && isMultiplePort) {
            sensorSchema.port.meta.forEach(({ id }) => {
                //@ts-ignore
                multiplePorts[id] = getValues(`port-${id}`);
            })
        }

        return {
            name,
            type,
            port: isMultiplePort ? multiplePorts : port,
        }
    }

    const type = watch("type");
    const name = watch("name");
    const port = watch("port");

    useEffect(() => {
        setSensorSchema(sensorSchemas.find(({ id }) => id === type))

        if (updateIcon)
            updateIcon(type)
    }, [type]);

    const supportedPorts = sensorSchema ? sensorSchema.port.supportedPorts : []
    const ignoredPorts = sensor ? sensor.port : false
    const usedPorts = deviceToUsedPorts(device, ignoredPorts)

    return (
        <form onSubmit={handleSubmit(() => submitForm(generateStructuredData()))}>
            <Controller
                control={control}
                name="name"
                rules={{ required: true, minLength: 5 }}
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
                // defaultValue={}
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
                                // @ts-ignore
                                name={`port-${port.id}`}
                                defaultValue={
                                    // @ts-ignore
                                    sensor ? sensor.port[port.id] : ""
                                }
                                render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                                    <PortSelector
                                        // @ts-ignore
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
                    rules={{ required: true, minLength: 1 }}
                    render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                        <PortSelector
                            value={(value as number)}
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