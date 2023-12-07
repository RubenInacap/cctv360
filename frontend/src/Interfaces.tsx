export interface Producto {
  id?: number
  nombre: string
  slug?: string
  descripcion: string
  precio: number
  valoracion?: number
  contar_stock: number
  categoria: string
  image: File | null;
  quantity?: number
  numero_reviews?: number
}

export interface Token {
  user_id: number;
  exp: number
  is_staff: boolean
  email:string
  username:string
  avatar: File | null;
};

export interface User {
  id?: number;
  avatar: File | null;
  email: string;
  username: string,
};


export interface Order {
    precio_total: number;
    direccion: string
    ciudad: string
    codigo_postal: string
    order_items: Producto[]
};
