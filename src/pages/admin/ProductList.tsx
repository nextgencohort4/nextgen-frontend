import React, {useState} from "react";
import Container from "@/Container.tsx";
import SmallNav from "@/pages/products/SmallNav.tsx";
import LazyImage from "@/components/LazyImage.tsx";
import {FaPlus} from "react-icons/fa";
import Pagination from "@/components/Pagination.tsx";
import EditProductModal from "@/pages/admin/EditProductModal.tsx";
import {useGetProductsQuery} from "@/redux/api/productApiSlice.ts";
import {SkeletonCard} from "@/components/Loader.tsx";
import RevelOnScroll from "@/components/RevealOnScroll.tsx";

const ProductList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const {data: productsData, isLoading, error} = useGetProductsQuery({});

    const products = productsData?.data || [];
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return (
            <Container>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-10">
                    {[...Array(6)].map((_, index) => (
                        <SkeletonCard key={index}/>
                    ))}
                </div>
            </Container>
        );
    }

    if (error) {
        return <div>Error: {error.toString()}</div>;
    }

    return (
        <RevelOnScroll>
            <SmallNav/>
            <Container>
                <div className="my-10">
                    <h1 className="text-4xl font-bold text-center md:text-left">Hot picks for you!</h1>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mt-5">
                        {currentProducts.map((product: Product) => (
                            <div
                                key={product._id}
                                className="relative flex items-center justify-center rounded-xl shadow-lg bg-[#FCEEE8] w-full h-[357.23px] max-w-[450px] mx-auto"
                            >
                                <div className="overflow-hidden relative group rounded-lg">
                                    <LazyImage
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="object-cover w-[335.08px] h-[216px]"
                                    />
                                </div>
                                <EditProductModal product={product}>
                                    <div
                                        className="absolute lg:bottom-5 bottom-5 p-1 right-5 cursor-pointer bg-[#E0551B] text-white font-bold rounded-full"
                                    >
                                        <FaPlus size={35}/>
                                    </div>
                                </EditProductModal>
                            </div>
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-10">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            </Container>
        </RevelOnScroll>
    );
};

export default ProductList;
