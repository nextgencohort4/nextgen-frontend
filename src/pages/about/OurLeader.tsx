import {MdChevronRight} from "react-icons/md";

const OurLeader = () => {
    return (
        <div className="our-leader flex lg:mt-32 mt-10">
            <div className="w-[50vw]"></div>
            <div
                className="flex flex-col gap-5 lg:text-white w-[50vw] m-auto bg-black/30 text-white rounded-xl p-3 backdrop-blur-md border border-white/20 shadow-lg"
            >
                <div className="flex flex-col gap-5">
                    <h1 className="md:text-5xl text-lg font-bold">Our Leaders</h1>
                    <p className="md:text-base text-xs md:leading-normal leading-2 font-bold">
                        Meet the visionary leaders at Trendy Shoes who are shaping our company's future and
                        revolutionizing
                        the ecommerce landscape. Their innovative strategies and dedication to excellence are driving
                        growth
                        and ensuring that we remain at the forefront of the industry. Get to know the team behind our
                        success and learn how they are transforming the way people buy and sell online.
                    </p>
                </div>
                <div
                    className="flex items-center text-white gap-2 hover:underline transform duration-300 cursor-pointer font-bold"
                >
                    <p>Learn more</p>
                    <MdChevronRight/>
                </div>
            </div>
        </div>
    );
};

export default OurLeader;


// import {MdChevronRight} from "react-icons/md";
//
// const OurLeader = () => {
//     return (
//         <div className="our-leader flex lg:mt-32 mt-10">
//             <div className="w-[50vw]"></div>
//             <div
//                 className="flex flex-col gap-5 lg:text-white w-[50vw] m-auto bg-black text-white rounded-xl p-3">
//                 <div className="flex flex-col gap-5">
//                     <h1 className="md:text-5xl text-lg font-bold">Our Leaders</h1>
//                     <p className="md:text-base text-xs md:leading-normal leading-2 font-bold">
//                         Meet the visionary leaders at Trendy Shoes who are shaping our company's future and
//                         revolutionizing
//                         the ecommerce landscape. Their innovative strategies and dedication to excellence are driving
//                         growth
//                         and ensuring that we remain at the forefront of the industry. Get to know the team behind our
//                         success and learn how they are transforming the way people buy and sell online.
//                     </p>
//                 </div>
//                 <div
//                     className="flex items-center text-white gap-2 hover:underline transform duration-300 cursor-pointer font-bold">
//                     <p>Learn more</p>
//                     <MdChevronRight/>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default OurLeader;
