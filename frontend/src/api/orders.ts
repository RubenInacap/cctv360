import { Order } from "../Interfaces";
import { authAxios } from "./useAxios";
import axios, { AxiosError } from 'axios';

export const search_order = async (query: string) => {
    const response = await authAxios.get(`/orders/search/?query=${query}`)
    return response.data;
};

export const edit_order = async (id: number) => {
   await authAxios.put(`/orders/deliver/${id}/`)
};

export const get_orders = async () => {
    const response = await authAxios.get(`/orders/`)
    return response.data
};

export const solo_order = async (id: number) => {
    const response = await authAxios.get(`/orders/solo/${id}/`)
    return response.data
};

export const my_orders = async () => {
   const response = await authAxios.get('orders/my/orders/') 
   return response.data
};


export const create_order = async (data: Order) => {
    console.log("Data received in create_order:", data);
  await authAxios.post('/orders/create/', data)
};