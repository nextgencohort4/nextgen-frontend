import Container from "@/Container.tsx";
import ProductCard from "@/components/products/ProductCard.tsx";

const Products = () => {
    return (
        <div>
            <Container>
                <div className="">
                    <h1 className="text-[40px] py-10">
                        POPULAR <span className="text-[#E0551B] font-bold">PRODUCTS</span>
                    </h1>
                    <ProductCard/>
                </div>
            </Container>
        </div>
    );
};

export default Products;
