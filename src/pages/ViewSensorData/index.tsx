import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ReactComponent as DatabaseIcon } from '@images/database.svg';
import { ReactComponent as BoxIcon } from '@images/box.svg';

import "./style.scss";

import ShortHeader from "../../components/ShortHeader";
import { getSensor } from "../../services/sensors/getSensor";
import { getSensorData } from "../../services/sensors/getSensorData";
import Typography from "../../components/Typography";


type Props = {

}


export default function ViewSensorData({ }: Props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const [page, setPage] = useState(1)
    const [date, setDate] = useState(new Date())

    const { sensorId = "" } = useParams();
    const { isLoading, data: sensor } = useQuery(["sensor", sensorId], () => getSensor(sensorId))

    const { isLoading: isLoadingData, data: sensorData } = useQuery(["sensorData", page], () => getSensorData(sensorId, page, date))

    const pageTitle = isLoading || !sensor ? "Loading..." : `${sensor.name} data`

    return (
        <div className="view-sensor-data">
            <ShortHeader title={pageTitle} icon={<DatabaseIcon />} />

            <div className="container page">
                <h3>Data</h3>

                {sensorData && sensorData.length === 0 && (
                    <div className="no-results">
                        <BoxIcon />
                        <Typography type="body" alignment="center" size="l">Nothing here yet</Typography>
                        <Typography type="body" alignment="center" size="m">If this is unexpected, check if your sensor is properly configured.</Typography>
                    </div>
                )}

                {sensorData && sensorData.length >= 1 && (
                    <>
                        <ul className="sensor-data">
                            <li>
                                <span>Value</span>
                                <span>Time</span>
                            </li>
                            {sensorData && sensorData.map(data => {
                                const date = new Date(data.createdAt)
                                return (
                                    <li>
                                        <span>{data.data.toString()}</span>
                                        <div></div>
                                        <span>{`${date.getHours()}h${date.getMinutes()}`}</span>
                                    </li>
                                )
                            })}
                        </ul>

                        <div className="controls">
                            <button onClick={() => page - 1 > 0 ? setPage(page - 1) : ""}>&lt;</button>
                            <button onClick={() => setPage(page + 1)}>&gt;</button>
                        </div>
                    </>
                )}



            </div>

        </div>

    )
}