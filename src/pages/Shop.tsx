import Container from "@/Container.tsx";
import ProductCard from "@/components/products/ProductCard.tsx";
import RevelOnScroll from "@/components/RevealOnScroll.tsx";

const Shop = () => {
    return (
        <div className="my-10">
            <Container>
                <RevelOnScroll>
                    <ProductCard/>
                </RevelOnScroll>
            </Container>
        </div>
    );
};

export default Shop;
