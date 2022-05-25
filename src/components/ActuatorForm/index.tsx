import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";


import deviceToUsedPorts from "../../adapters/deviceToUsedPorts";
import Device from "../../types/Device";
import FloatingButton from "../FloatingButton";
import OptionsField from "../OptionsField";
import PortSelector from "../PortSelector";
import TextField from "../TextField";
import { createActuator } from "../../services/actuators/createActuator";
import Actuator from "../../types/Actuator";

import { ReactComponent as SaveFloatingIcon } from '@images/save-floating.svg';

import "./style.scss";
import pins from "../../constants/pins";


type changeFunction = (text?: any, ...any: any) => void


type Props = {
    device: Device,
    actuator?: Actuator,
    submitForm: (data: { name: string, port: number | string }) => any
}

export default function ActuatorForm({device, actuator, submitForm = () => {}}: Props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const {handleSubmit, watch, formState: { errors }, control, } = useForm(
        {
            defaultValues: {
                name: actuator ? actuator.name : "",
                port: actuator ? actuator.port : ""
            }
        }
    );
    const name = watch("name");
    const port = watch("port");

    
    const ignoredPorts = actuator ? actuator.port : false
    const usedPorts = deviceToUsedPorts(device, ignoredPorts)

    return (
        <form onSubmit={handleSubmit(data => submitForm(data))}>
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
                name="port"
                defaultValue={""}
                rules={{ required: true, minLength: 1 }}
                render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                    <PortSelector
                        value={value}
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