import { Producto } from "../Interfaces";
import { authAxios, axi } from "./useAxios";

export const create_review = async (descripcion: string, valoracion: number, productId: number) => {
    await authAxios.post(`/productos/review/${productId}/`, {descripcion, valoracion})
 };
 
export const cate_api = async (categoria: string) => {
    const response = await authAxios.get(`/productos/cate/${categoria}/`)
    return response.data;
};

export const search_prod = async (query:string) => {
    const response = await authAxios.get(`/productos/search/?query=${query}`)
    return response.data;
}

export const get_solo= async (slug:string)=>{
    const response = await authAxios.get(`/productos/get/${slug}/`)
    return response.data
} 

export const get_solo_prod = async (id:number)=>{
    const response = await authAxios.get(`/productos/get/admin/${id}/`)
    return response.data
} 

export const edit_product = async(data: Producto) =>{
    const formData = new FormData();
    formData.append("nombre",data.nombre)
    formData.append("descripcion",data.descripcion)
    formData.append("contar_stock",data.contar_stock.toString())
    formData.append("categoria",data.categoria)
    formData.append("precio",data.precio.toString())
    if (data.image){
        formData.append("image", data.image)
    }
    await authAxios.put(`/productos/edit/${data.id}/`, formData)
};

export const delete_product = async(id: number) =>{
    await authAxios.delete(`/productos/delete/${id}/`)
}

export const post_product = async(data: Producto) =>{
    const formData = new FormData();
    formData.append("nombre",data.nombre)
    formData.append("descripcion",data.descripcion)
    formData.append("contar_stock",data.contar_stock.toString())
    formData.append("categoria",data.categoria)
    formData.append("precio",data.precio.toString())
    if (data.image){
        formData.append("image", data.image)
    }
    await authAxios.post('/productos/post/', formData)
};
export const get_products = async ({ pageParam = 1 }) => {
    const response = await axi.get(`/productos/?page=${pageParam}&pages=9`)
    return response.data
}