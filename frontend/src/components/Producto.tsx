import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit, AiFillPlusSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import { delete_product } from "../api/productos";
import { get_products } from "../api/productos";
import { useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "./Loader";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Producto } from "../Interfaces";

interface Props {
  results: any
}

const Productos = ({ results }: Props) => {

  const { ref, inView } = useInView()

  const { data, isLoading, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['productos'],
    get_products,
    {
      getNextPageParam: (page: any) => page.meta.next
    }
  )
  useEffect(() => {
    if (inView) {
      fetchNextPage()

    }
  }, [inView])

  const queryClient = useQueryClient();

  const deleteProdMutation = useMutation({
    mutationFn: delete_product,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
      toast.success("Producto Eliminado")
    },
    onError: (error) => {
      toast.error("Error!")
      console.error(error);
    },
  });
  console.log(data)

  if (error instanceof Error) return <>{toast.error(error.message)}</>
  if (deleteProdMutation.isLoading) return <Loader />

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Producto ID</th>
            <th scope="col" className="px-4 py-3">Nombre</th>
            <th scope="col" className="px-4 py-3">Precio</th>
            <th scope="col" className="px-4 py-3">Stock</th>
            <th scope="col" className="px-4 py-3 flex items-center justify-center gap-4">
              Actions
              <Link to="add">
                <AiFillPlusSquare size={22} className="text-green-300 cursor-pointer" />
              </Link>
            </th>

          </tr>
        </thead>
        {results && results.productos.length > 0 ? (
                    <>
                    {results &&
                        results.productos.map((productos: Producto) => (
                            <tbody>
                                <tr className="border-b dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {productos.id}
                                    </th>

                                    <td className="px-4 py-3">
                                        {productos.nombre}
                                    </td>

                                    <td className="px-4 py-3">
                                        $ {productos.precio}
                                    </td>

                                    <td className="px-4 py-3">
                                        {productos.contar_stock}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex justify-center gap-4">
                                            <BsFillTrashFill
                                                onClick={() => {
                                                    if (
                                                        productos.id !==
                                                        undefined
                                                    ) {
                                                        deleteProdMutation.mutate(
                                                            productos.id
                                                        );
                                                    }
                                                }}
                                                size={22}
                                                className="text-red-300 cursor-pointer"
                                            />

                                            <Link to={`edit/${productos.id}`}>
                                                <AiFillEdit
                                                    size={22}
                                                    className="text-white cursor-pointer"
                                                />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                </>
        ): (
            <>
          {data?.pages.map((page: any) => (
        <>

          <tbody
            key={page.meta.next}

          >
            {page.data.map((productos: Producto) => (

              <tr className="border-b dark:border-gray-700">
                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {productos.id}
                </th>

                <td className="px-4 py-3">
                  {productos.nombre}
                </td>
                <td className="px-4 py-3">
                  ${productos.precio}
                </td>
                <td className="px-4 py-3">
                  {productos.contar_stock}
                </td>
                <td className="px-4 py-3 flex items-center justify-center gap-4">


                  <BsFillTrashFill size={22}
                    onClick={() => {
                      if (productos.id !== undefined) {
                        deleteProdMutation.mutate(

                          productos.id

                        )
                      }
                    }
                    }
                    className="text-red-300 cursor-pointer" />


                  <Link to={`edit/${productos.id}`}>
                    <AiFillEdit size={22} className="text-green-300 cursor-pointer" />
                  </Link>



                </td>
              </tr>


            ))}
          </tbody>
          {!isLoading && data?.pages.length === 0 && (
            <p className="text-xl text-slate-800 dark:text-slate-200">
              No more results
            </p>
          )}
          {!isLoading &&
            data?.pages?.length !== undefined &&
            data.pages.length > 0 &&
            hasNextPage && (
              <div ref={ref}>
                {isLoading || isFetchingNextPage ? (
                  <Loader/>
                ) : null}
              </div>
            )}
        </>
        ))}
      </>
        )}

    </table>
    </div >

  )
 }
export default Productos;