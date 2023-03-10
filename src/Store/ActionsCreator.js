import { SIGN_IN, SIGN_OUT,REGISTERDATA, RECENTSEARCH, RECENTSEARCHREMOVE, RECENTSEARCHREMOVEALL } from "./Actions";

export const signIn = (user) => {
    return {
        type: SIGN_IN,
        user: user.userData,
        isLogin: user.isLogin,
    }
}

export const registerData = (data) => {
    return {
        type: REGISTERDATA,
        Data: data.register
    }
}
export const recentSearches = (data) => {
    return {
        type: RECENTSEARCH,
        data
    }
}
export const recentSearchRemove = (data) => {
    return {
        type: RECENTSEARCHREMOVE,
        data
    }
}
export const recentSearchRemoveAll = () => {
    return {
        type: RECENTSEARCHREMOVEALL,
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT,
        user: null,
        isLogin: false
    }
}