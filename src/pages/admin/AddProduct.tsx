import Container from "@/Container.tsx";
import React, {useState} from "react";
import {toast} from "react-toastify";
import {toastConfig} from "@/components/toastConfig.ts";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {useCreateProductMutation} from "@/redux/api/productApiSlice.ts";
import RevelOnScroll from "@/components/RevealOnScroll.tsx";

const AddProduct = () => {
    const [images, setImages] = useState<File[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [colors, setColors] = useState<string[]>([]);
    const [sizes, setSizes] = useState<string[]>([]);
    const [deliveryInfo, setDeliveryInfo] = useState("");
    const [returnInfo, setReturnInfo] = useState("");

    const navigate = useNavigate();

    const [createProduct, {isLoading}] = useCreateProductMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (images.length === 0) {
            toast.error("At least one image is required", toastConfig);
            return;
        }

        if (!name || !description || !price || colors.length === 0 || sizes.length === 0) {
            toast.error("All fields are required", toastConfig);
            return;
        }

        try {
            const formData = new FormData();
            images.forEach((image) => {
                formData.append(`images`, image);
            });
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("discount_price", discountPrice);
            colors.forEach((color, index) => {
                formData.append(`colors[${index}]`, color);
            });
            sizes.forEach((size, index) => {
                formData.append(`sizes[${index}]`, size);
            });
            formData.append("delivery_info", deliveryInfo);
            formData.append("return_info", returnInfo);

            const productResult = await createProduct(formData).unwrap();

            if (productResult.error) {
                toast.error("Product creation failed", toastConfig);
            } else {
                toast.success("Product created successfully", toastConfig);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error("Product creation failed", toastConfig);
        }
    };

    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const filesArray = Array.from(e.target.files);
            setImages(prevImages => [...prevImages, ...filesArray]);
            toast.success("Images uploaded", toastConfig);
        } else {
            toast.error("No files selected", toastConfig);
        }
    };

    return (
        <RevelOnScroll>
            <Container>
                <div className="flex items-center justify-center min-h-screen my-10">
                    <div className="flex flex-col items-center justify-center min-h-screen my-10">
                        <div className="">
                            <div className="flex flex-col gap-5">
                                <h1 className="text-2xl font-bold text-center">Add Product</h1>

                                <div>
                                    {images.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    className="w-24 h-24 object-cover"
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Product Preview ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    <label
                                        className="hover:underline font-bold text-gray-700 dark:text-white cursor-pointer">
                                        Upload Images
                                        <Input
                                            type="file"
                                            name="images"
                                            accept="image/*"
                                            onChange={uploadFileHandler}
                                            multiple
                                            className="hidden w-full"
                                        />
                                    </label>
                                </div>

                                <div className="flex flex-col gap-5">
                                    <div className="flex gap-3">
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="name" className="font-bold text-sm">Name</label>
                                            <Input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={name}
                                                placeholder="Enter product name"
                                                onChange={(e) => setName(e.target.value)}
                                                className="lg:w-[25rem] border border-gray-500"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="price" className="font-bold text-sm">Price</label>
                                            <Input
                                                type="number"
                                                name="price"
                                                id="price"
                                                value={price}
                                                placeholder="Enter product price"
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="lg:w-[25rem] border border-gray-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="discountPrice" className="font-bold text-sm">Discount
                                                Price</label>
                                            <Input
                                                type="number"
                                                name="discountPrice"
                                                id="discountPrice"
                                                value={discountPrice}
                                                placeholder="Enter discount price"
                                                onChange={(e) => setDiscountPrice(e.target.value)}
                                                className="lg:w-[25rem] border border-gray-500"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="colors" className="font-bold text-sm">Colors</label>
                                            <Input
                                                type="text"
                                                name="colors"
                                                id="colors"
                                                value={colors.join(", ")}
                                                placeholder="Enter colors (comma-separated)"
                                                onChange={(e) => setColors(e.target.value.split(",").map(color => color.trim()))}
                                                className="lg:w-[25rem] border border-gray-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="sizes" className="font-bold text-sm">Sizes</label>
                                        <Input
                                            type="text"
                                            name="sizes"
                                            id="sizes"
                                            value={sizes.join(", ")}
                                            placeholder="Enter sizes (comma-separated)"
                                            onChange={(e) => setSizes(e.target.value.split(",").map(size => size.trim()))}
                                            className="border border-gray-500"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="description" className="font-bold text-sm">Description</label>
                                        <Textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Enter product description"
                                            className="border border-gray-500"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="deliveryInfo" className="font-bold text-sm">Delivery
                                            Info</label>
                                        <Textarea
                                            value={deliveryInfo}
                                            onChange={(e) => setDeliveryInfo(e.target.value)}
                                            placeholder="Enter delivery information"
                                            className="border border-gray-500"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="returnInfo" className="font-bold text-sm">Return Info</label>
                                        <Textarea
                                            value={returnInfo}
                                            onChange={(e) => setReturnInfo(e.target.value)}
                                            placeholder="Enter return information"
                                            className="border border-gray-500"
                                        />
                                    </div>

                                    <Button
                                        disabled={isLoading}
                                        className="bg-[#E0551B] hover:bg-[#D84615] text-white font-bold rounded-lg"
                                        onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}>
                                        Create Product
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </RevelOnScroll>
    );
};

export default AddProduct;
