import { useParams } from "react-router-dom";
import { solo_order } from "../api/orders";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";

const SoloOrder = () => {
    const { id } = useParams();

    let new_id: number;

    if (id !== undefined) {
        new_id = Number(id);
    }

    const { data, isError, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: () => solo_order(new_id),
    });

    if (isError) return toast.error("Error!");
    if (isLoading) return <Loader />;
    console.log(data.delivered_at)

    return (
        <div className="overflow-x-auto container mx-auto px-4 pt-11 text-gray-800 dark:text-gray-300">
            <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            Total Precio
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Entregado
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Fecha de Creacion
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Fecha de Entrega
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Ciudad
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Direccion
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Codigo Postal
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="border-b dark:border-gray-700">
                        <td
                            className="px-4 py-3 font-medium whitespace-nowrap dark:text-white"
                        >
                            $ {data.precio_total}
                        </td>
                        <td className="px-4 py-3">
                            {data.is_delivered === false || null ? (
                                <p className="text-red-500">No entregado</p>
                            ) : (
                                <p className="text-green-500">Entregado</p>
                            )}
                        </td>
                        <td className="px-4 py-3">
                            {data && data.created_at !== undefined ? (
                                <>
                                    {new Date(data.created_at).toLocaleString()}
                                </>
                            ) : (
                                <>Fecha no disponible</>
                            )}
                        </td>
                        <td className="px-4 py-3">
                            {data && data.delivered_at !== undefined && data.delivered_at !== null && (
                                <>
                                    {new Date(data.delivered_at).toLocaleString()}
                                </>
                            )}
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex justify-center gap-4">
                                {data && data.direccion_envio !== undefined && (
                                    <>
                                        {data.direccion_envio.ciudad}
                                    </>
                                )}
                            </div>
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex justify-center gap-4">
                                {data && data.direccion_envio !== undefined && (
                                    <>
                                        {data.direccion_envio.direccion}
                                    </>
                                )}
                            </div>
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex justify-center gap-4">
                                {data && data.direccion_envio !== undefined && (
                                    <>
                                        {data.direccion_envio.codigo_postal}
                                    </>
                                )}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table className="w-full text-sm text-left mt-11">
                <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            Producto
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Cantidad
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Precio
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {data.order_items && data.order_items.map((p: any) => (
                        <tr className="border-b dark:border-gray-700" key={p.id}>
                            <td
                                className="px-4 py-3 font-medium whitespace-nowrap dark:text-white"
                            >
                                {p.productos}
                            </td>
                            <td className="px-4 py-3">
                                {p.quantity}
                            </td>
                            <td className="px-4 py-3">
                                $ {p.precio}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SoloOrder;
