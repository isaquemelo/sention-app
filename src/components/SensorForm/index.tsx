import { createRef, useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import sensorsToUsedPorts from "../../adapters/sensorsToUsedPorts";
import sensorSchemas from "../../constants/sensorSchemas";
import Device from "../../types/Device";
import OptionsField from "../OptionsField";
import PortSelector from "../PortSelector";
import TextField from "../TextField";
import "./style.scss";

type changeFunction = (text: any) => void


type Props = {
    updateIcon?: changeFunction,
    device: Device,
}

export default function SensorForm({ updateIcon, device }: Props) {
    const { register, handleSubmit, watch, formState: { errors }, control, } = useForm();

    const onSubmit = data => console.log(data);
    const watchType = watch("type");

    useEffect(() => {
        if (updateIcon)
            updateIcon(watchType)
    }, [watchType]);

    const sensorOptions = sensorSchemas.map(({ id, label }) => {
        return {
            label: label,
            value: id,
            key: id,
        }
    })

    const sensorSchema = sensorSchemas.find(({ id }) => id === watchType)
    const supportedPorts = sensorSchema ? sensorSchema.port.supportedPorts : []
    const usedPorts = sensorsToUsedPorts(device.sensors)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="name"
                defaultValue={""}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField
                        label="Name"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                )}
            />

            <Controller
                control={control}
                name="type"
                defaultValue={""}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <OptionsField
                        label="Type"
                        options={sensorOptions}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                )}
            />

            {/* Multiple port sensor type */}
            {sensorSchema && sensorSchema.port.multiplePort && (
                <>
                    {sensorSchema.port.meta?.map(port => {
                        return (
                            <Controller
                                control={control}
                                name={`port-${port.id}`}
                                defaultValue={""}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <PortSelector
                                        value={value}
                                        onChange={onChange}
                                        label={`Port ${port.label}`}
                                        acceptedPorts={supportedPorts}
                                        usedPorts={usedPorts} />
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
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <PortSelector
                            value={value}
                            onChange={onChange}
                            label={`Port`}
                            acceptedPorts={supportedPorts}
                            usedPorts={usedPorts} />
                    )}
                />
            )}
        </form>
    )
}