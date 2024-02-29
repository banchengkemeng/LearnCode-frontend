import {Menu} from '@arco-design/web-react';
import './index.scss';
import router from "@/router";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Grid} from '@arco-design/web-react';
import {useSelector} from "react-redux";

const Row = Grid.Row;
const Col = Grid.Col;

const MenuItem = Menu.Item;


function GlobalHeader() {

    const loginUser = useSelector(state => state.user.loginUser)
    const navigate = useNavigate()
    const location = useLocation()
    const [routeList, setRouteList] = useState([])


    useEffect(() => {
        router.routes.forEach(route => {
            if (route.path === '/') {
                setRouteList(route.children)
            }
        })
    }, [])

    const goRoute = (target) => {
        navigate(target)
    }

    return (
        <div className='global-header'>
            <Row className='grid'>
                <Col flex='auto'>
                    <Menu
                        mode='horizontal'
                        defaultSelectedKeys={[location.pathname.slice(1)]}
                        onClickMenuItem={goRoute}
                    >
                        <MenuItem className={'logo-item'} key='0' disabled>
                            <div className={'logo'}></div>
                        </MenuItem>
                        {routeList.map(item => {
                            return (item.meta === undefined || !item.meta.auth) ?
                                <MenuItem key={item.path}>{item.name}</MenuItem> : null
                        })}
                    </Menu>
                </Col>
                <Col flex='100px' className={'profile'}>
                    <div>{loginUser.username}</div>
                </Col>
            </Row>
        </div>
    );
}

export default GlobalHeader;