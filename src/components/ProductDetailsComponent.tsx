import star from "@/assets/Vector11.png";
import addidas from "@/assets/pngwing.com (12) 1.webp";
import Container from "@/Container.tsx";
import LazyImage from "@/components/LazyImage.tsx";

const ProductDetailsComponent = () => {
    return (
        <Container>
            <div className="flex lg:flex-row flex-col-reverse justify-center items-center gap-20 mb-10">
                <div className="flex flex-col gap-5">
                    <h2 className="text-[#E0551B] text-[20px] font-bold ">Product Details</h2>
                    <h1 className="text-[40px] leading-10 font-bold">
                        KNOW ABOUT YOUR <br/> MAIN <span className="text-[#E0551B]">PRODUCT</span>
                    </h1>
                    <p className="flex flex-wrap md:text-sm text-xs">
                        Experience unparalleled comfort and iconic style with the Nike <br/> Air Max, featuring
                        revolutionary Air cushioning technology and <br/> a breathable, durable design. Perfect for
                        running, casual wear, <br/> and sports activities.
                    </p>
                    <div className="flex items-center gap-3">
                        <LazyImage
                            src={star}
                            className="object-cover w-[22.6px] h-[21.34px] bg-[#fceee8] rounded-full"
                            alt="star image"
                        />
                        <div className="flex flex-col">
                            <h5 className="font-bold">Best quality shoes</h5>
                            <p className="text-sm">features the latest designer shoes</p>
                        </div>
                    </div>
                </div>

                <img src={addidas} className="w-[436.64px] h-[290px] object-cover" alt="addidas snicker"/>
            </div>
        </Container>
    );
};

export default ProductDetailsComponent;
