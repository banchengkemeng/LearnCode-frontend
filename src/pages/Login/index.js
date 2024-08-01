import {Form, Input, Button} from '@arco-design/web-react';
import './index.scss'
import {IconLock, IconUser} from "@arco-design/web-react/icon";
import {fetchLogin} from "@/store/modules/user";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const FormItem = Form.Item;

function Login() {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log('loginFormData: ', data)
        await dispatch(fetchLogin(data))
        navigate('/')
    }

    return (
        <div>
            <div className={'subtitle'}>用户登录</div>
            <Form
                form={form}
                wrapperCol={{span: 24}}
                autoComplete='off'
                onSubmit={onSubmit}
            >
                <FormItem field='userAccount' rules={[{required: true, message: '用户名是必填项'}]}>
                    <Input addBefore={<IconUser />} placeholder='请输入用户名'/>
                </FormItem>
                <FormItem field='userPassword' rules={[{required: true, message: '密码是必填项'}]}>
                    <Input addBefore={<IconLock />} placeholder='请输入密码'/>
                </FormItem>
                <FormItem>
                    <Button type='primary' htmlType='submit' long>
                        登录
                    </Button>
                </FormItem>
                <FormItem>
                    <Button id={'register-button'} type='text' long>
                        注册
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
}

export default Login;