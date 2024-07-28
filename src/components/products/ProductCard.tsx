import React, {useState} from "react";
import {CiHeart} from "react-icons/ci";
import {FaHeart} from "react-icons/fa";
import {IoIosArrowRoundForward} from "react-icons/io";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LazyImage from "@/components/LazyImage.tsx";
import {
    addToFavorites,
    removeFromFavorites,
    selectFavoriteProduct,
} from "@/redux/features/favoriteSlice.ts";
import {useGetProductsQuery} from "@/redux/api/productApiSlice.ts";
import {SkeletonCard} from "@/components/Loader.tsx";
import Pagination from "@/components/Pagination.tsx";
import {Product} from "@/types/Product.ts";

interface ProductCardProps {
    products?: Product[];
}

const ProductCard: React.FC<ProductCardProps> = ({products: propProducts}) => {
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavoriteProduct);
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const {data, isLoading, error, isError} = useGetProductsQuery({});

    const products = propProducts || data?.data || [];
    const totalProducts = products.length;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const toggleFavorite = (product: Product) => {
        if (favorites.some(fav => fav._id === product._id)) {
            dispatch(removeFromFavorites({_id: product._id}));
        } else {
            dispatch(addToFavorites({...product}));
        }
    };

    if (isLoading) return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
            {[...Array(4)].map((_, index) => (
                <SkeletonCard key={index}/>
            ))}
        </div>
    );

    if (isError) return <div>Error: {error.toString()}</div>;

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentItems.map((product: Product) => (
                    <div key={product._id} className="bg-[#ffe4cc] shadow rounded-xl px-5 py-3">
                        <Link to={`/product/${product._id}`}>
                            <div className="overflow-hidden w-full relative group rounded-lg">
                                <LazyImage
                                    src={product.images[0]}
                                    className="w-full h-[300px] object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
                                    alt={`Image of ${product.name}`}
                                />
                            </div>
                        </Link>

                        <div className="flex flex-col gap-2 pt-2">
                            <div className="flex justify-between items-center">
                                <h2 className="font-bold">{product.name.substring(0, 25)}...</h2>
                                <button onClick={() => toggleFavorite(product)}>
                                    {favorites.some(fav => fav._id === product._id) ? (
                                        <FaHeart className="text-red-500" size={25}/>
                                    ) : (
                                        <CiHeart
                                            className="bg-[#ffd4b7] text-[#ff8855] rounded-full font-bold"
                                            size={25}
                                        />
                                    )}
                                </button>
                            </div>

                            <h2 className="font-bold">
                                ₦ {product.discount_price || product.price}
                                {product.discount_price && (
                                    <span className="ml-2 text-sm line-through text-gray-500">
                                        ₦ {product.price}
                                    </span>
                                )}
                            </h2>

                            <div className="flex justify-between items-center">
                                <h2 className="font-bold">View details</h2>
                                <IoIosArrowRoundForward className="" size={25}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default ProductCard;
