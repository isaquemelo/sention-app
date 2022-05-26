import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import "./style.scss";

import { ReactComponent as EditIcon } from '@images/edit.svg';
import ListItem from "../../components/ListItem";
import Typography from "../../components/Typography";
import { getDevices } from "../../services/devices/getDevices";
import useSessionStorage from "../../hooks/useLocalStorage";
import FloatingButton from "../../components/FloatingButton";
import { deleteDevice } from "../../services/devices/deleteDevice";
import ShortHeader from "../../components/ShortHeader";
import ListSensors from "../../components/ListSensors";

export default function Sensors() {
    const navigate = useNavigate();

    const [userId] = useSessionStorage('userId', false)
    const { isLoading, data: devices } = useQuery("devices", () => getDevices(userId))

    const queryClient = useQueryClient()
    const navigator = useNavigate()

    const { mutate: removeDevice } = useMutation(
        (deviceId: string) => {
            return deleteDevice(deviceId)
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries("devices");
            }
        }
    );

    const skeletonArray = new Array(15).fill(0)

    return (
        <>
            <ShortHeader title="Sensors" />

            <div className="sensors">
                <div className="container page">
                    <div className="sensors-list">
                        {!isLoading &&
                            devices?.map(device => {
                                const shouldBeRendered = (device.sensors.length >= 1)
                                return shouldBeRendered && (
                                    <div key={device.id}>
                                        <div className="heading">
                                            <Typography className="device-name" type="title" size="m">{device.name ?? device.accessCode}</Typography>
                                            <button onClick={() => navigator(`/devices/${device.id}`)}>
                                                <EditIcon />
                                            </button>
                                        </div>

                                        <div className="list-sensors">
                                            <ListSensors sensors={device.sensors} />
                                        </div>
                                    </div>
                                )
                            })
                        }

                        {isLoading &&
                            skeletonArray.map(({ value }, index) => {
                                return <ListItem key={index} label={""} isSkeleton={true} />
                            })
                        }
                    </div>
                </div>

                {/* <FloatingButton options={[
                    {
                        label: 'Associate new device',
                        onClick: () => navigate('setup-device')
                    },
                ]} /> */}

            </div>
        </>
    )
}