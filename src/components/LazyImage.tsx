import React, {useEffect, useRef, useState, forwardRef, ForwardedRef, CSSProperties} from "react";

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    style?: CSSProperties;
}

const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
    ({src, alt, className, style}, forwardedRef: ForwardedRef<HTMLImageElement>) => {
        const [inView, setInView] = useState(false);
        const [isLoaded, setIsLoaded] = useState(false);
        const [error, setError] = useState(false);
        const localRef = useRef<HTMLImageElement | null>(null);

        const setRefs = React.useCallback(
            (node: HTMLImageElement | null) => {
                localRef.current = node;
                if (typeof forwardedRef === "function") {
                    forwardedRef(node);
                } else if (forwardedRef) {
                    forwardedRef.current = node;
                }
            },
            [forwardedRef]
        );

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                        observer.disconnect();
                    }
                },
                {
                    rootMargin: "100px",
                }
            );

            const currentRef = localRef.current;
            if (currentRef) {
                observer.observe(currentRef);
            }

            return () => {
                if (currentRef) {
                    observer.unobserve(currentRef);
                }
            };
        }, []);

        const handleLoad = () => {
            setIsLoaded(true);
        };

        const handleError = () => {
            setError(true);
        };

        return (
            <div className={className} style={style}>
                {inView ? (
                    <img
                        ref={setRefs}
                        src={src}
                        alt={alt}
                        onLoad={handleLoad}
                        onError={handleError}
                        className={`object-cover w-full h-full transition-transform duration-500 ease-in-out transform group-hover:scale-110 rounded-xl ${
                            isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    />
                ) : (
                    <div
                        ref={setRefs}
                        className="w-full h-full bg-transparent backdrop-blur-md rounded-xl"
                    />
                )}
                {error && <div>Error loading image</div>}
            </div>
        );
    }
);

export default LazyImage;
