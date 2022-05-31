import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ReactComponent as DatabaseIcon } from '@images/database.svg';
import { ReactComponent as BoxIcon } from '@images/box.svg';
import { ReactComponent as RefreshIcon } from '@images/refresh.svg';

import "./style.scss";

import ShortHeader from "../../components/ShortHeader";
import { getSensor } from "../../services/sensors/getSensor";
import { getSensorData } from "../../services/sensors/getSensorData";
import Typography from "../../components/Typography";
import SensorData from "../../types/SensorData";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import FloatingButton from "../../components/FloatingButton";


type Props = {

}


export default function ViewSensorData({ }: Props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const [page, setPage] = useState(0)
    const [sensorData, setSensorData] = useState<SensorData[] | false>(false)
    const [accumulatedData, setAccumulatedData] = useState<SensorData[]>([])
    const [date, setDate] = useState(new Date())

    const { sensorId = "" } = useParams();
    const { isLoading, data: sensor } = useQuery(["sensor", sensorId], () => getSensor(sensorId))


    const loadMoreResults = (customPage = page, customDate = date) => {
        return getSensorData(sensorId, customPage + 1, customDate).then(sensorData => {
            setPage(customPage + 1)
            setSensorData(sensorData)
        })

    }

    const handleInputChange = (value: string) => {
        const date = new Date(value)
        setPage(0)
        setDate(date)
        setAccumulatedData([])

        loadMoreResults(0, date)

    }

    useEffect(() => {
        loadMoreResults()
    }, []);

    useEffect(() => {
        if (!sensorData) return

        setAccumulatedData([...accumulatedData, ...sensorData])

    }, [sensorData]);

    const pageTitle = isLoading || !sensor ? "Loading..." : `${sensor.name} data`


    return (
        <div className="view-sensor-data">
            <ShortHeader title={pageTitle} icon={<DatabaseIcon />} />

            <div className="container page">
                {/* <h3>Data</h3> */}

                <TextField label="Date" type="date" onChange={handleInputChange} />

                {accumulatedData && page === 1 && accumulatedData.length === 0 && (
                    <div className="no-results">
                        <BoxIcon />
                        <Typography type="body" alignment="center" size="l">Nothing here yet</Typography>
                        <Typography type="body" alignment="center" size="m">If this is unexpected, check if your sensor is properly configured.</Typography>
                    </div>
                )}

                {accumulatedData && accumulatedData.length >= 1 && (
                    <>
                        <ul className="sensor-data">
                            <li>
                                <span>Value</span>
                                <span>Time</span>
                            </li>
                            {accumulatedData.map(data => {
                                const date = new Date(data.createdAt)

                                return (
                                    <li key={data.id}>
                                        {typeof data.data !== 'object' && <span>{data.data.toString()}</span>}
                                        {typeof data.data === 'object' &&
                                            <span className="freedom">
                                                {
                                                    Object.keys(data.data).map((key) => {
                                                        // @ts-ignore
                                                        return <span key={key}>{`${key}: ${data.data[key]}`}</span>
                                                    })
                                                }
                                            </span>
                                        }
                                        <div></div>
                                        <span>{`${date.getHours()}h${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`}</span>
                                    </li>
                                )
                            })}
                        </ul>

                        {/* <div className="controls">
                            <button onClick={() => page - 1 > 0 ? setPage(page - 1) : ""}>&lt;</button>
                            <button onClick={() => setPage(page + 1)}>&gt;</button>
                        </div> */}
                        <Button label="Load more data" onClick={() => loadMoreResults()} />
                        <FloatingButton icon={RefreshIcon} options={[{
                            label: "Reload data", onClick() {
                                const date = new Date()
                                setPage(0)
                                setDate(date)
                                setAccumulatedData([])

                                loadMoreResults(0, date)
                            },
                        }]} />
                    </>
                )}

            </div>

        </div>

    )
}