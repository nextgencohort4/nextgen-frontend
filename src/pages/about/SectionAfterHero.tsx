const SectionAfterHero = () => {
    return (
        <div className="flex lg:flex-row flex-col my-5 items-center gap-5">
            <div
                className="section-after-hero-a text-gray-800 flex flex-col justify-center lg:px-10 px-3 border border-gray-200 rounded-xl">
                <div
                    className="flex flex-col md:gap-5 gap-1 md:mt-60 pb-2 mt-20 bg-black/30 text-white rounded-xl p-3 backdrop-blur-md border border-white/20 shadow-lg">
                    <div>
                        <h1 className="font-bold md:text-base text-xs">FOR SELLERS</h1>
                        <h2 className="font-bold md:text-base text-xs">Expand your customer base and grow your
                            business.</h2>
                    </div>
                    <p className="md:text-base text-xs md:leading-normal leading-2">
                        We provide sellers with the opportunity to grow their businesses with minimal barriers,
                        regardless
                        of size, background, or geographic location. We don't compete with our sellers; we succeed when
                        they
                        thrive.
                    </p>
                </div>
            </div>

            <div
                className="section-after-hero-b text-gray-800 flex flex-col justify-center lg:px-10 px-3 border border-gray-200 rounded-xl">
                <div
                    className="flex flex-col md:gap-5 gap-1 md:mt-60 pb-2 mt-20 bg-black/30 text-white rounded-xl p-3 backdrop-blur-md border border-white/20 shadow-lg">
                    <div>
                        <h1 className="font-bold md:text-base text-xs">FOR ATHLETES</h1>
                        <h2 className="font-bold md:text-base text-xs">Browse an extensive selection of quality sport
                            shoes.</h2>
                    </div>
                    <p className="md:text-base text-xs md:leading-normal leading-2">
                        Buyers on the Trendy Shoes marketplace, its localized counterparts, and the Trendy Shoes mobile
                        app enjoys a highly personalized experience with an unmatched selection and excellent value.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SectionAfterHero;
