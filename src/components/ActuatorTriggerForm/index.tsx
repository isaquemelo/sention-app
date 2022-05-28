import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import sensorSchemas from "../../constants/sensorSchemas";
import FloatingButton from "../FloatingButton";
import OptionsField from "../OptionsField";
import TextField from "../TextField";
import Actuator from "../../types/Actuator";

import { ReactComponent as SaveFloatingIcon } from '@images/save-floating.svg';

import "./style.scss";
import Sensor from "../../types/Sensor";
import actions from "../../constants/actuatorActions";
import logicOperators from "../../constants/logicOperators";
import ActuatorTrigger from "../../types/ActuatorTrigger";

type Props = {
    submitForm: (data: StructuredFormData) => any,
    actuatorTrigger?: ActuatorTrigger
    actuator: Actuator,
    sensors: Sensor[],
}

type StructuredFormData = {
    id?: string
    name: string
    action: string
    logicOperator: string
    value: number
    description: string
    sensorId: string
    dataSource?: string
}

export default function ActuatorTriggerForm({ actuator, sensors, actuatorTrigger, submitForm}: Props) {
    const { register, handleSubmit, getValues, watch, formState: { errors }, control, } = useForm(
        {
            defaultValues: {
                name: actuatorTrigger ? actuatorTrigger.name : "",
                action: actuatorTrigger ? actuatorTrigger.action : "",
                sensor: actuatorTrigger ? actuatorTrigger.sensorId : "",
                dataSource: actuatorTrigger ? actuatorTrigger.dataSource : "",
                operator: actuatorTrigger ? actuatorTrigger.logicOperator : "",
                value: actuatorTrigger ? actuatorTrigger.value : "",
                description: actuatorTrigger ? actuatorTrigger.description : "",
            }
        }
    );

    const name = watch("name");
    const action = watch("action");
    const targetSensor = watch("sensor");
    const dataSource = watch("dataSource");
    const operator = watch("operator");
    const limitValue = watch("value");
    const description = watch("description");

    const generateStructuredData = (): StructuredFormData => {
        const newActuatorTrigger: StructuredFormData = {
            name,
            action,
            logicOperator: operator,
            value: parseInt(limitValue as string),
            description,
            sensorId: targetSensor,
            dataSource: isMultiplePortSensor ? dataSource : undefined
        }

        if (actuatorTrigger){
            newActuatorTrigger.id = actuatorTrigger.id
        }

        return newActuatorTrigger
    }

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
                name="action"
                rules={{ required: true, minLength: 1 }}
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