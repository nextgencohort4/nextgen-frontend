import boots from "@/assets/compressed/NIK23240_1000_6__39907.png";
import LazyImage from "@/components/LazyImage.tsx";

const ActionPurpose = () => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center text-gray-800 justify-center lg:mt-32 mt-10 mb-5">
                <h1 className="font-bold md:text-5xl text-2xl text-center">Putting Our Purpose into Action</h1>
                <p className="text-lg text-center">Our marketplace empowers and unites people.</p>
            </div>
            <LazyImage
                className="object-cover w-full lg:h-[484px]"
                src={boots}
                alt="boots"
            />
        </div>
    );
};

export default ActionPurpose;
