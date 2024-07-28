import HeroSection from "@/components/HeroSection.tsx";
import AboutComponent from "@/components/AboutComponent.tsx";
import ProductDetailsComponent from "@/components/ProductDetailsComponent.tsx";
import CustomersReview from "@/components/CustomersReview.tsx";
import Products from "@/components/products/Products.tsx";
import RevealOnScroll from "@/components/RevealOnScroll.tsx";

const Home = () => {
    return (
        <div className="flex flex-col overflow-x-hidden">
            <RevealOnScroll>
                <HeroSection/>
            </RevealOnScroll>
            <RevealOnScroll>
                <Products/>
            </RevealOnScroll>
            <RevealOnScroll>
                <AboutComponent/>
            </RevealOnScroll>
            <RevealOnScroll>
                <ProductDetailsComponent/>
            </RevealOnScroll>
            <CustomersReview/>
        </div>
    );
};

export default Home;
