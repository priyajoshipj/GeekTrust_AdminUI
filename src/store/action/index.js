export const UPDATE_USERS = "UPDATE_USERS";
export const GET_ALL_USER = "GET_ALL_USER";
export const DELETE_USER = "DELETE_USER";

export const updateUsers = (params) =>({
    params,type:UPDATE_USERS
})

export const getAllUsers = (params) => {
    return ({
        params,type:GET_ALL_USER
    })
} 

export const deleteUsers = (params) => {
    return ({
        params,type:DELETE_USER
    })
} 

