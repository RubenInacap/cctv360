import { authAxios, axi } from "./useAxios";
import { User } from "../Interfaces";


export const get_solo_user = async (id: number) => {
    const response = await authAxios.get(`/users/get/solo/${id}/`) 
    return response.data
};


export const search_users = async (query: string) => {
    const response = await authAxios.get(`/users/search/?query=${query}`) 
    return response.data
 };
 
export const delete_user = async (id: number) => {
    await authAxios.delete(`/users/delete/${id}/`) 
};

export const get_users = async () =>{
    const response = await authAxios.get("/users/get/")
    return response.data
}
export const registerRequest = async(email:string, username:string, password:string) => {
    await axi.post("/users/register/", {email,username,password});
}
export const loginRequest = async(email: string, password: string)=>{
    const response = await axi.post("/users/login/", {email , password})
    return response
}

export const edit_user = async (data: User) => {
    const formData = new FormData();
    formData.append("username", data.username)
    formData.append("email", data.email)
    if (data.avatar) {
        formData.append("avatar", data.avatar)
    }
    await authAxios.put(`/users/edit/${data.email}/`, formData)
};