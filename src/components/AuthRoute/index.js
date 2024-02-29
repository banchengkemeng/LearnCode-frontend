import { checkAccess, getToken} from "@/utils";
import {Navigate} from "react-router-dom";

function AuthRoute({children, auth}) {
    const loginUser = getToken()

    // 如果有权限
    if (!checkAccess(loginUser, auth)) {
        return <Navigate to={'/403'}></Navigate>
    }
    return  <>{children}</>
}

export default AuthRoute