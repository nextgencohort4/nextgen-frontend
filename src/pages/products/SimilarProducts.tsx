import {useEffect, useState} from "react";
import Container from "@/Container.tsx";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi,
} from "@/components/ui/carousel";
import yellow from "@/assets/product-details/pngwing.com (28) 1.png";
import purple from "@/assets/product-details/pngwing.com (34) 1.png";
import red from "@/assets/product-details/pngwing.com (31) 1.png";
import green from "@/assets/product-details/pngwing.com (24) 1.png";
import LazyImage from "@/components/LazyImage.tsx";

const products = [
    {src: yellow, bg: "#f46e18"},
    {src: purple, bg: "#fff"},
    {src: red, bg: "#150702"},
    {src: green, bg: "#fceee8"},
    {src: purple, bg: "#f46e18"},
    {src: red, bg: "#150702"},
];

const SimilarProducts = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    useEffect(() => {
        if (!api) {
            return;
        }

        const interval = setInterval(() => {
            if (current === api.scrollSnapList().length - 1) {
                api.scrollTo(0);
            } else {
                api.scrollNext();
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [api, current]);

    return (
        <Container>
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl md:text-4xl lg:text-[40px] leading-tight">
                    Similar <span className="text-[#f46e18]">Products</span> you might like
                </h1>
                <div className="my-5">
                    <Carousel className="w-full" setApi={setApi}>
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {products.map((product, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                                >
                                    <div className="aspect-square w-full">
                                        <LazyImage
                                            className="w-full h-full shadow-xl p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl object-cover border"
                                            src={product.src}
                                            alt={`Product ${index + 1}`}
                                            style={{backgroundColor: product.bg}}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </Container>
    );
};

export default SimilarProducts;
