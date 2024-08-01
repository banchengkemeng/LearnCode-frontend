import { checkAccess} from "@/utils";
import {Navigate} from "react-router-dom";

function AuthRoute({children, auth}) {
    // 如果有权限
    if (!checkAccess(auth)) {
        return <Navigate to={'/403'}></Navigate>
    }
    return  <>{children}</>
}

export default AuthRoute