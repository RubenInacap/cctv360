import { search_prod } from "../api/productos"
import { useQuery } from "@tanstack/react-query"
import { useSearchStore } from "../store/search";
import ProductCard from "../components/ProductCard";
import { Producto } from "../Interfaces";


const SearchResults = () => {
    const searchTerm = useSearchStore((state) => state.searchTerm);

    const { data } = useQuery({
        queryKey: ['productos', searchTerm],
        queryFn: () => {
            if (searchTerm) {
                return search_prod(searchTerm)
            }
            return { productos: [] }
        }
    })

    return (
        <div className="flex justify-center">
            <div
                className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-16"
            >
                {data && data.productos.map((productos: Producto) => (
                    <ProductCard productos={productos} />
                ))}
            </div>
        </div>
    )
}
export default SearchResults