import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React, {useState} from "react";
import {useUpdateProductMutation, useDeleteProductMutation} from "@/redux/api/productApiSlice.ts";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "react-toastify";
import {toastConfig} from "@/components/toastConfig.ts";
import RevelOnScroll from "@/components/RevealOnScroll.tsx";
import {Product} from "@/types/Product.ts";

interface EditProductModalProps {
    children: React.ReactNode;
    product: Product;
    onDelete?: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({children, product, onDelete}) => {
    const [updateProduct, {isLoading: isUpdating}] = useUpdateProductMutation();
    const [deleteProduct, {isLoading: isDeleting}] = useDeleteProductMutation();

    const [images, setImages] = useState<File[]>([]);
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [discountPrice, setDiscountPrice] = useState(product.discount_price?.toString() || "");
    const [colors, setColors] = useState<string[]>(product.colors || []);
    const [sizes, setSizes] = useState<string[]>(product.sizes || []);
    const [deliveryInfo, setDeliveryInfo] = useState(product.delivery_info || "");
    const [returnInfo, setReturnInfo] = useState(product.return_info || "");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!product._id) {
            toast.error("Product ID is missing", toastConfig);
            return;
        }

        try {
            const formData = new FormData();
            images.forEach((image) => {
                formData.append(`images`, image);
            });
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price.toString());
            if (discountPrice) {
                formData.append("discount_price", discountPrice);
            }
            colors.forEach((color, index) => {
                formData.append(`colors[${index}]`, color);
            });
            sizes.forEach((size, index) => {
                formData.append(`sizes[${index}]`, size);
            });
            formData.append("delivery_info", deliveryInfo);
            formData.append("return_info", returnInfo);

            const productResult = await updateProduct({id: product._id, data: formData}).unwrap();

            if (productResult.error) {
                toast.error("Product update failed", toastConfig);
            } else {
                toast.success("Product updated successfully", toastConfig);
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Product update failed", toastConfig);
        }
    };

    const handleDelete = async () => {
        if (!product._id) {
            toast.error("Product ID is missing", toastConfig);
            return;
        }

        if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
            try {
                await deleteProduct(product._id).unwrap();
                toast.success("Product deleted successfully", toastConfig);
                if (onDelete) {
                    onDelete();
                }
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete product", toastConfig);
            }
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
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                <RevelOnScroll>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Upload Images
                                <Input
                                    type="file"
                                    name="images"
                                    accept="image/*"
                                    onChange={uploadFileHandler}
                                    multiple
                                    className="mt-1 border border-gray-500 cursor-pointer"
                                />
                            </label>
                        </div>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Product Name"
                            className="border border-gray-500"
                        />
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            className="border border-gray-500"
                        />
                        <Input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            placeholder="Price"
                            className="border border-gray-500"
                        />
                        <Input
                            type="number"
                            value={discountPrice}
                            onChange={(e) => setDiscountPrice(e.target.value)}
                            placeholder="Discount Price"
                            className="border border-gray-500"
                        />
                        <Input
                            type="text"
                            value={colors.join(", ")}
                            onChange={(e) => setColors(e.target.value.split(",").map(color => color.trim()))}
                            placeholder="Colors (comma-separated)"
                            className="border border-gray-500"
                        />
                        <Input
                            type="text"
                            value={sizes.join(", ")}
                            onChange={(e) => setSizes(e.target.value.split(",").map(size => size.trim()))}
                            placeholder="Sizes (comma-separated)"
                            className="border border-gray-500"
                        />
                        <Textarea
                            value={deliveryInfo}
                            onChange={(e) => setDeliveryInfo(e.target.value)}
                            placeholder="Delivery Info"
                            className="border border-gray-500"
                        />
                        <Textarea
                            value={returnInfo}
                            onChange={(e) => setReturnInfo(e.target.value)}
                            placeholder="Return Info"
                            className="border border-gray-500"
                        />
                        <Button
                            className="w-full bg-[#FF773E] hover:bg-[#FF773E] font-bold dark:text-white"
                            type="submit"
                            disabled={isUpdating}
                        >
                            {isUpdating ? "Updating..." : "Update Product"}
                        </Button>
                        <Button
                            className="w-full bg-red-600 hover:bg-red-700 font-bold text-white"
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Delete Product"}
                        </Button>
                    </form>
                </RevelOnScroll>
            </DialogContent>
        </Dialog>
    );
};

export default EditProductModal;
