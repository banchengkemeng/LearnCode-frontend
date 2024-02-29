import {createSlice} from "@reduxjs/toolkit";
import {NOT_LOGIN} from "@/utils";
import {login} from "@/apis/user";

const userStore = createSlice({
    name: 'user',
    initialState: {
        loginUser: {
            username: '未登录',
            role: NOT_LOGIN
        }
    },
    reducers: {
        setLoginUser (state, action) {
            state.loginUser = action.payload
        }
    }
})

const {setLoginUser} = userStore.actions

const fetchLogin = (data) => {
    return async (dispatch) => {
        const res = await login(data)
        console.log(res)
        dispatch(setLoginUser(res.data))
    }
}

export {
    fetchLogin
}

const userReducer = userStore.reducer
export default userReducer