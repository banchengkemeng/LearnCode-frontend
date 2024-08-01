import {Grid, Menu} from '@arco-design/web-react';
import './index.scss';
import router from "@/router";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {checkAccess, getToken} from "@/utils";

const Row = Grid.Row;
const Col = Grid.Col;

const MenuItem = Menu.Item;


function GlobalHeader() {

    const loginUser = getToken()
    const navigate = useNavigate()
    const location = useLocation()
    const [routeList, setRouteList] = useState([])
    // 获取默认高亮的菜单
    const getActiveKey = () => {

        if (location.pathname !== '/') {
            return location.pathname.slice(1)
        }

        for (let route of router.routes) {
            if (route.path !== '/') {
                continue
            }

            for (let item of route.children) {
                if (!item?.index) {
                    continue
                }
                return item?.meta.lightPath
            }
        }
    }

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

    const renderMenuItem = (item) => {
        const menuItem = <MenuItem key={item.path}>{item.name}</MenuItem>
        if (item.meta === undefined) {
            return menuItem
        }

        // 检查 hidden
        if (item.meta?.hidden) {
            return null
        }

        // 检查权限
        if (!checkAccess(item.meta?.auth)) {
            return null
        }
        return  menuItem
    }

    return (
        <div className='global-header'>
            <Row className='grid'>
                <Col flex='auto'>
                    <Menu
                        mode='horizontal'
                        defaultSelectedKeys={[getActiveKey()]}
                        onClickMenuItem={goRoute}
                    >
                        <MenuItem className={'logo-item'} key='0' disabled>
                            <div className={'logo'}></div>
                        </MenuItem>
                        {routeList.map(item => renderMenuItem(item))}
                    </Menu>
                </Col>
                <Col flex='100px' className={'profile'}>
                    <div>{loginUser.userName}</div>
                </Col>
            </Row>
        </div>
    );
}

export default GlobalHeader;