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
import { createNotificationTrigger } from "../../services/notificationTrigger/createNotificationTrigger";
import NotificationTrigger from "../../types/NotificationTrigger";


type changeFunction = (text: any) => void


type Props = {
    sensor: Sensor
}

export default function NotificationTriggerForm({ sensor }: Props) {
    const { register, handleSubmit, getValues, watch, formState: { errors }, control, } = useForm();
    const navigate = useNavigate();

    const name = watch("name");
    const dataSource = watch("dataSource");
    const operator = watch("operator");
    const limitValue = watch("value");
    const content = watch("content");


    const queryClient = useQueryClient()

    const { mutate: newNotificationTrigger } = useMutation(
        () => {
            return createNotificationTrigger(sensor.id!, new NotificationTrigger({
                name,
                type: "EMAIL",
                logicOperator: operator,
                value: parseInt(limitValue),
                content,
                dataSource: isMultiplePortSensor ? dataSource : undefined
            }))
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["sensor", sensor.id]);
                // navigate(`/sensors/${sensor.id}`)
            }
        }
    );


    const logicOperatorsOptions = Object.entries(logicOperators).map(([key, value]) => {
        return {
            value: key,
            label: value,
            key,
        }
    })

    const sensorSchema = sensorSchemas.find(schema => schema.id === sensor.type)
    const isMultiplePortSensor = sensorSchema && sensorSchema.port.multiplePort
    const sensorSourceOptions = isMultiplePortSensor && sensorSchema.port.sources ? sensorSchema.port.sources.map(({ id, label }) => {
        return {
            value: id,
            label: label,
            key: id
        }
    }) : []


    return (
        <form onSubmit={handleSubmit(() => newNotificationTrigger())}>
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
                name="content"
                defaultValue={""}
                render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                    <TextField
                        label="Content"
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