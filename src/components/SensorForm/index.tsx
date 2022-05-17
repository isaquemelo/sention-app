import { createRef, useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import sensorSchemas from "../../constants/sensorSchemas";
import OptionsField from "../OptionsField";
import TextField from "../TextField";
import "./style.scss";

type changeFunction = (text: any) => void


type Props = {
    updateIcon?: changeFunction
}

export default function SensorForm({ updateIcon }: Props) {
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



        </form>
    )
}