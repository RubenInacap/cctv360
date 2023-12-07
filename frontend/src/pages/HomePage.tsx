import ProductCard from "../components/ProductCard";
import { Producto } from "../Interfaces";
import { get_products } from "../api/productos";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useInView } from "react-intersection-observer";
import SearchResults from "./SearchResults";
import { useSearchStore } from "../store/search";

const HomePage = () =>{
    const {ref, inView} = useInView()
    const searchTerm = useSearchStore((state) => state.searchTerm);

    const {data, isLoading, error ,isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
        ['productos'],
        get_products,
        {
            getNextPageParam: (page: any) => page.meta.next
        }
    )
    useEffect(()=>{
        if(inView){
            fetchNextPage()

        }
    },[inView])

    if (error instanceof Error) return <>{toast.error(error.message)}</>
    if (searchTerm) return <SearchResults />

    return (
            <>
                {data?.pages.map((page: any) => (
                    <>
                        <div className="flex justify-center">
                            <div
                                key={page.meta.next}
                                className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-16"
                            >
                                {page.data.map((productos: Producto) => (
                                    <ProductCard
                                        key={productos.id}
                                        productos={productos}
                                    />
                                ))}
                            </div>
                        </div>
    
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
                                        <p>Loading .....</p>
                                    ) : null}
                                </div>
                            )}
                    </>
                ))}
            </>
        );
    };
    
export default HomePage;