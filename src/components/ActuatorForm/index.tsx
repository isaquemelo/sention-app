import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";


import deviceToUsedPorts from "../../adapters/deviceToUsedPorts";
import Device from "../../types/Device";
import FloatingButton from "../FloatingButton";
import PortSelector from "../PortSelector";
import TextField from "../TextField";
import Actuator from "../../types/Actuator";

import { ReactComponent as SaveFloatingIcon } from '@images/save-floating.svg';

import "./style.scss";
import pins from "../../constants/pins";

type StructedFormData = {
    id?: string,
    name: string,
    type: string,
    port: number
}


type Props = {
    device: Device,
    actuator?: Actuator,
    submitForm: (data: StructedFormData) => any
}

export default function ActuatorForm({ device, actuator, submitForm }: Props) {
    const { handleSubmit, watch, control, } = useForm(
        {
            defaultValues: {
                name: actuator ? actuator.name : "",
                type: actuator ? actuator.type : "",
                port: actuator ? actuator.port.toString() : "",
            }
        }
    );

    const generateStructuredData = (): StructedFormData => {

        const newActuator: StructedFormData = {
            name,
            type: "DIGITAL",
            port: parseInt(port)
        }

        if (actuator && actuator.id) {
            newActuator.id = actuator.id
        }

        return newActuator
    }

    const name = watch("name");
    const port = watch("port");


    const ignoredPorts = actuator ? actuator.port : false
    const usedPorts = deviceToUsedPorts(device, ignoredPorts)

    return (
        <form onSubmit={handleSubmit(() => submitForm(generateStructuredData()))}>
            <Controller
                control={control}
                name="name"
                rules={{ required: true, minLength: 5 }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
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
                name="port"
                rules={{ required: true, minLength: 1 }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <PortSelector
                        value={parseInt(value)}
                        onChange={onChange}
                        label={`Port`}
                        acceptedPorts={pins.ADC_PINS}
                        usedPorts={usedPorts}
                        isError={error ? true : false}
                    />
                )}
            />

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