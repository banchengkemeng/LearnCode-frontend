import {Link, useNavigate} from "react-router-dom";

function NotAuth() {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/user/login')
    }, 3000)

    return (
        <div>
            无权限, 3s后将跳转到
            <Link to={'/user/login'}>登录页</Link>
        </div>
    )
}

export default NotAuth