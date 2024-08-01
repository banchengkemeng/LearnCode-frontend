import {createSlice} from "@reduxjs/toolkit";
import {NOT_LOGIN, setToken} from "@/utils";
import {login} from "@/apis/user";

const userStore = createSlice({
    name: 'user',
    initialState: {
        loginUser: {
            createTime: "",
            id: "",
            updateTime: "",
            userAvatar: "",
            userName: "未登录",
            userProfile: "",
            userRole: NOT_LOGIN
        }
    },
    reducers: {
        setLoginUser (state, action) {
            state.loginUser = action.payload
            setToken(state.loginUser)
        }
    }
})

const {setLoginUser} = userStore.actions

const fetchLogin = (data) => {
    return async (dispatch) => {
        const res = await login(data)
        dispatch(setLoginUser(res.data))
    }
}

export {
    fetchLogin
}

const userReducer = userStore.reducer
export default userReducer