import {Outlet} from "react-router-dom";
import './index.scss'

function UserLayout() {
    return (
        <div className={'user-layout'}>
            <div className={'form'}>
                <div className={'user-title'}>
                    Online Judge And Interview
                </div>
                <Outlet/>
            </div>
        </div>

    )
}

export default UserLayout