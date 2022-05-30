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
import Sensor from "../../types/Sensor";
import actions from "../../constants/actuatorActions";
import logicOperators from "../../constants/logicOperators";
import ActuatorTrigger from "../../types/ActuatorTrigger";
import { createTrigger } from "../../services/actuatorTrigger/createTrigger";


type changeFunction = (text: any) => void


type Props = {
    actuator: Actuator,
    sensors: Sensor[]
}

export default function ActuatorTriggerForm({ actuator, sensors }: Props) {
    const { register, handleSubmit, getValues, watch, formState: { errors }, control, } = useForm();
    const navigate = useNavigate();

    const name = watch("name");
    const action = watch("action");
    const targetSensor = watch("sensor");
    const dataSource = watch("dataSource");
    const operator = watch("operator");
    const limitValue = watch("value");
    const description = watch("description");


    const queryClient = useQueryClient()

    const { mutate: newActuatorTrigger } = useMutation(
        () => {
            return createTrigger(actuator.id!, new ActuatorTrigger({
                name,
                action,
                sensorId: targetSensor,
                logicOperator: operator,
                value: parseFloat(limitValue),
                description: description,
                dataSource: isMultiplePortSensor ? dataSource : undefined
            }))
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["actuator", actuator.id]);
                navigate(`/devices/${actuator.deviceId}`)
            }
        }
    );

    const actionOptions = Object.entries(actions).map(([key, value]) => {
        return {
            value: key,
            label: value,
            key,
        }
    })

    const logicOperatorsOptions = Object.entries(logicOperators).map(([key, value]) => {
        return {
            value: key,
            label: value,
            key,
        }
    })

    const sensorsOptions = sensors.map(({ id = "", name }) => {
        return {
            value: id,
            label: name,
            key: id,
        }
    })

    const selectedSensorInstance = sensors.find(sensor => sensor.id === targetSensor)

    const sensorSchema = selectedSensorInstance ? sensorSchemas.find(schema => schema.id === selectedSensorInstance.type) : false
    const isMultiplePortSensor = sensorSchema && sensorSchema.port.multiplePort
    const sensorSourceOptions = isMultiplePortSensor && sensorSchema.port.sources ? sensorSchema.port.sources.map(({ id, label }) => {
        return {
            value: id,
            label: label,
            key: id
        }
    }) : []


    return (
        <form onSubmit={handleSubmit(() => newActuatorTrigger())}>
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
                name="action"
                rules={{ required: true, minLength: 1 }}
                defaultValue={""}
                render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                    <OptionsField
                        label="Action"
                        options={actionOptions}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        isError={error ? true : false}
                    />
                )}
            />

            <Controller
                control={control}
                name="sensor"
                rules={{ required: true, minLength: 1 }}
                defaultValue={""}
                render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                    <OptionsField
                        label="Sensor"
                        options={sensorsOptions}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        isError={error ? true : false}
                    />
                )}
            />

            {isMultiplePortSensor && <Controller
                control={control}
                name="dataSource"
                rules={{ required: true, minLength: 1 }}
                defaultValue={""}
                render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                    <OptionsField
                        label="Sensor data source"
                        options={sensorSourceOptions}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        isError={error ? true : false}
                    />
                )}
            />}

            <Controller
                control={control}
                name="operator"
                rules={{ required: true, minLength: 1 }}
                defaultValue={""}
                render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                    <OptionsField
                        label="Logic operator"
                        options={logicOperatorsOptions}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        isError={error ? true : false}
                    />
                )}
            />

            <Controller
                control={control}
                name="value"
                rules={{ required: true, minLength: 1 }}
                defaultValue={""}
                render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                    <TextField
                        label="Value"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        type="number"
                        isError={error ? true : false}
                    />
                )}
            />

            <Controller
                control={control}
                name="description"
                defaultValue={""}
                render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                    <TextField
                        label="Description"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        type="number"
                        multiline
                        isError={error ? true : false}
                    />
                )}
            />

            <button>
                <FloatingButton options={[
                    {
                        label: 'Save trigger',
                        onClick: () => { }
                    },
                ]} icon={SaveFloatingIcon} />
            </button>
        </form>
    )
}