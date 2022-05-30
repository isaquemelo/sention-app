import { NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as Dashboard } from '@images/dashboard.svg'
import { ReactComponent as Sensor } from '@images/sensor.svg'
import { ReactComponent as Actuator } from '@images/actuator.svg'
import { ReactComponent as Device } from '@images/device.svg'


import "./style.scss";

type onClick = () => void

type Props = {
    label: string,
    icon?: any,
    options?: {
        key?: string | number,
        label: string,
        onClick: onClick,
    }[] | false,
    onItemClick?: onClick,
}

type handler = {
    isActive: boolean
}

export default function NavigationBar() {
    const classHandler = ({ isActive }: handler) => "item" + (isActive ? "  item--active" : "")

    return (
        <nav className="navigation-bar">
            <NavLink
                to="/"
                className={classHandler}>

                <div className="item-icon">
                    <Dashboard />
                </div>

                <span>Dashboard</span>
            </NavLink>

            <NavLink
                to="/devices"
                className={classHandler}>

                <div className="item-icon">
                    <Device />
                </div>

                <span>Devices</span>
            </NavLink>

            <NavLink
                to="/sensors"
                className={classHandler}>

                <div className="item-icon">
                    <Sensor />
                </div>

                <span>Sensors</span>
            </NavLink>

            <NavLink
                to="/actuators"
                className={classHandler}>

                <div className="item-icon">
                    <Actuator />
                </div>

                <span>Actuators</span>
            </NavLink>
        </nav>
    );
}