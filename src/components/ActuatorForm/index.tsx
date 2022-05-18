import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import sensorSchemas from "../../constants/sensorSchemas";
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


type changeFunction = (text: any) => void


type Props = {
    device: Device,
}

export default function ActuatorForm({ device }: Props) {
    const { register, handleSubmit, getValues, watch, formState: { errors }, control, } = useForm();
    const navigate = useNavigate();

    const name = watch("name");
    const port = watch("port");

    const queryClient = useQueryClient()

    const { mutate: newActuator } = useMutation(
        () => {
            return createActuator(device.id, new Actuator({
                name,
                port: port,
                type: 'DIGITAL',
            }))
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["device", device.id]);
                navigate(`/devices/${device.id}`)
            }
        }
    );

    const usedPorts = deviceToUsedPorts(device)

    return (
        <form onSubmit={handleSubmit(() => newActuator())}>
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