import React, {useState, useEffect} from "react";
import {useLocation, Link} from "react-router-dom";
import Container from "@/Container.tsx";
import {useGetProductsQuery} from "@/redux/api/productApiSlice.ts";
import LazyImage from "@/components/LazyImage.tsx";
import {SkeletonCard} from "@/components/Loader.tsx";

interface Product {
    _id: string;
    name: string;
    price: number;
    discount_price: number;
    images: string[];
    description: string;
    colors: string[];
}

const SearchResults: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q") || "";

    const [results, setResults] = useState<Product[]>([]);

    const {data, isLoading, error} = useGetProductsQuery({});

    useEffect(() => {
        if (data && query) {
            const filteredProducts = data.data.filter((product: Product) => {
                const searchTerms = query.toLowerCase().split(" ");
                return searchTerms.every(term =>
                    product.name.toLowerCase().includes(term) ||
                    product.description.toLowerCase().includes(term) ||
                    product.price.toString().includes(term) ||
                    (product.discount_price && product.discount_price.toString().includes(term)) ||
                    product.colors.some(color => color.toLowerCase().includes(term))
                );
            });
            setResults(filteredProducts);
        }
    }, [data, query]);

    if (isLoading) return (
        <Container>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                {[...Array(4)].map((_, index) => (
                    <SkeletonCard key={index}/>
                ))}
            </div>
        </Container>
    );

    if (error) return <Container>
        <div>Error: {error.toString()}</div>
    </Container>;

    return (
        <Container>
            <div className="mx-auto py-10">
                <h1 className="text-3xl font-bold mb-4">Search Results for: {query}</h1>

                {results.length === 0 && (
                    <p className="text-gray-600">No results found for "{query}"</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((product) => (
                        <Link to={`/product/${product._id}`} key={product._id}>
                            <div className="bg-[#ffe4cc] dark:bg-gray-800 shadow rounded-xl px-5 py-3 h-[29rem]">
                                <div className="overflow-hidden w-full relative group rounded-lg">
                                    <LazyImage
                                        src={product.images[0]}
                                        className="w-full h-[300px] object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
                                        alt={`Image of ${product.name}`}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 pt-2">
                                    <h2 className="font-bold">{product.name.substring(0, 25)}...</h2>
                                    <h2 className="font-bold">
                                        <div className="flex items-center">
                                            ₦ {product.discount_price || product.price}
                                            {product.discount_price && (
                                                <p className="ml-2 text-xs line-through text-gray-500">
                                                    ${product.price}
                                                </p>
                                            )}
                                        </div>
                                    </h2>
                                    <div className="flex flex-wrap gap-1">
                                        {product.colors.map((color, index) => (
                                            <span key={index}
                                                  className="text-sm bg-white dark:text-black font-bold capitalize px-2 py-1">
                                                {color}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default SearchResults;
