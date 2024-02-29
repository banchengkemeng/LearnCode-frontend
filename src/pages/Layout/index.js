import { Layout } from '@arco-design/web-react';
import './index.scss'
import GlobalHeader from "@/components/GlobalHeader";
import {Outlet} from "react-router-dom";
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

const BasicLayout = () => {
    return (
        <div className='basic-layout'>
            <Layout>
                <Header className={'header'}>
                    <GlobalHeader />
                </Header>
                <Content className={'content'}>
                    <Outlet />
                </Content>
                <Footer className={'footer'}>Footer</Footer>
            </Layout>
        </div>
    );
};

export default BasicLayout;