import { useCartStore } from "../store/cart";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create_order } from "../api/orders";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CartPage = () => {

    const removeFromCart = useCartStore(state => state.removeFromCart)
    const addToCart = useCartStore(state => state.addToCart)
    const cart = useCartStore(state => state.cart);


    const removeAll = useCartStore((state) => state.removeAll);
    
    const precio_total = useCartStore((state) => state.totalPrice);
 
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [codigo_postal, setCodigo_Postal] = useState('');

    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const createOrderMut = useMutation({
        mutationFn: create_order,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success("Orden Creada!")
            removeAll()
            navigate("/")

        },
        onError: () => {
            console.error("Error en la mutación", Error);
            toast.error("Error!")

        },
    });

    const createOrder = (data: any, actions: any) => {
        console.log(data)
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: precio_total
                    },
                },
            ],
            application_context: {
                shipping_preference: "NO_SHIPPING"
            }
        });
    };

    const onApprove = (data: any, actions: any) => {
        console.log(data);
        return actions.order.capture(handleSubmit());
    };


    const handleSubmit = () => {
        console.log("Datos del formulario:", {
            order_items: cart,
            precio_total: precio_total,
            direccion: direccion,
            ciudad: ciudad,
            codigo_postal: codigo_postal,
        });
    
        createOrderMut.mutate({
            order_items: cart,
            precio_total: precio_total,
            direccion: direccion,
            ciudad: ciudad,
            codigo_postal: codigo_postal,
        });
    };
    console.log(createOrderMut)



    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="relative mt-5 overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                                <div className="flex items-center flex-1 space-x-4">
                                    <h5>
                                        <span className="text-gray-300 text-xl font-bold">
                                            Productos en su carro: {cart.length}
                                        </span>
                                    </h5>
                                    <h5>
                                        <span className="text-gray-300 text-xl font-bold">
                                            Total: {precio_total === null && "0"}{" "}
                                            $ {precio_total}
                                        </span>
                                    </h5>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Producto
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Categoria
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Cantidad
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Precio
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((productos) => (
                                            <>
                                                <tr
                                                    key={productos.id}
                                                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                >
                                                    <th
                                                        scope="row"
                                                        className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        <img
                                                            src={`http://127.0.0.1:8000${productos.image}`}
                                                            alt={productos.nombre}
                                                            className="w-auto h-8 mr-3"
                                                        />

                                                        {productos.nombre}
                                                    </th>
                                                    <td className="px-4 py-2">
                                                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                                            {productos.categoria}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        <div className="flex items-center space-x-3">
                                                            <button
                                                                onClick={() =>
                                                                    removeFromCart(
                                                                        productos
                                                                    )
                                                                }
                                                                className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                                type="button"
                                                            >
                                                                <span className="sr-only">
                                                                    Cantidad

                                                                </span>
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    aria-hidden="true"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                        clip-rule="evenodd"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                            <div>
                                                                {
                                                                    productos.quantity
                                                                }
                                                                <input
                                                                    type="number"
                                                                    id="first_product"
                                                                    className="hidden bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                    placeholder="1"
                                                                    required
                                                                />
                                                            </div>
                                                            <button
                                                                onClick={() =>
                                                                    addToCart(
                                                                        productos
                                                                    )
                                                                }
                                                                className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                                type="button"
                                                            >
                                                                <span className="sr-only">
                                                                    Cantidad
                                                                    Boton
                                                                </span>
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    aria-hidden="true"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                                        clip-rule="evenodd"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        ${productos.precio}
                                                    </td>

                                                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        $ {productos.quantity !== undefined ? productos.precio * productos.quantity : 0}
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Direccion de Envio
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Direccion</label>
                                <input
                                    onChange={(e) => {
                                        setDireccion(e.target.value);
                                        console.log('Dirección actualizada:', e.target.value);
                                    }}
                                    value={direccion}
                                    type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Direccion" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ciudad</label>
                                <input
                                    onChange={(e) => {
                                        setCiudad(e.target.value);
                                        console.log('Ciudad actualizada:', e.target.value);
                                    }}
                                    value={ciudad}
                                    type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ciudad" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Codigo Postal</label>
                                <input
                                    onChange={(e) => {
                                        setCodigo_Postal(e.target.value);
                                        console.log('CodigoPostal actualizada:', e.target.value);
                                    }}
                                    value={codigo_postal}
                                    type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Codigo Postal" />
                            </div>

                            <div className="ml-[180px]">
                                <PayPalScriptProvider
                                    options={{
                                        clientId: "AUoQ-EnzCs0YV7ZpDsakJvU1IvgVEokgmolaNhWDGAgk1K4vrTd9QfRzSzwxuyP53kBqhUaRGqyIy_D2",
                                        currency: "USD",
                                        commit: true
                                    }}
                                >
                                    <PayPalButtons
                                        createOrder={(data: any, actions: any) => createOrder(data, actions)}
                                        onApprove={(data: any, actions: any) => onApprove(data, actions)}
                                        style={{ layout: "horizontal" }}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </>
    );
};

export default CartPage;