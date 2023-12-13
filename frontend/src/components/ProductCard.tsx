import { Link } from "react-router-dom";
import { Producto } from "../Interfaces";
import { useCartStore } from "../store/cart";
import Rating from "./Rating";
import { toast } from "react-hot-toast";
interface Props {
    productos: Producto
};

const ProductCard = ({ productos }: Props) => {

    const addToCart = useCartStore(state => state.addToCart)



    return (
        <div>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to={`/productos/${productos.slug}`}>
                    <img
                        className="rounded-t-lg product-image"
                        src={`${import.meta.env.VITE_BACKEND_URL}${productos.image}`}
                        alt=""
                    />
                </Link>
                <div className="p-5 ">
                    <Link to={`/productos/${productos.slug}`}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {productos.nombre}
                        </h5>
                        <div className="flex justify-between">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-200">
                                $ {productos.precio}
                            </h5>
                            <div className="flex items-center">



                                <span className="ml-1 text-gray-500 dark:text-gray-400">
                                    {productos.valoracion !== null && 
                                        <Rating 
                                        value={productos.valoracion} />
                                        
                                    }
                                </span>

                            </div>
                        </div>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {productos.descripcion}
                    </p>

                    <button

                        onClick={() => {addToCart(productos)
                        toast.success("Producto Agregado")}
                        }
                        className={`mb-2 inline-flex items-center mx-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${productos.contar_stock === 0 && 'opacity-50 cursor-not-allowed'}`}
                        disabled={productos.contar_stock === 0}
                    >
                        {productos.contar_stock === 0 ? 'Sin Stock' : 'Agregar Al Carro'}
                        <svg
                            aria-hidden="true"
                            className="w-4 h-4 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </button>

                    <Link
                        to={`/productos/${productos.slug}`}
                        className="inline-flex items-center mx-3
        px-3 py-2 text-sm font-medium text-center text-white 
        bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 
        focus:outline-none focus:ring-blue-300 dark:bg-blue-600 
        dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                    Ver
                        <svg
                            aria-hidden="true"
                            className="w-4 h-4 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;