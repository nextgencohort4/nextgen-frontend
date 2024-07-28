import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import Container from "@/Container.tsx";
import {MdOutlineStar} from "react-icons/md";
import locator from "@/assets/product-details/Vector.png";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import pickup from "@/assets/product-details/Group 49533.png";
import delivery from "@/assets/product-details/Group 49534.png";
import returnPolicy from "@/assets/product-details/Group 49535.png";
import {
    useCreateReviewMutation,
    useGetProductDetailsQuery,
    useGetAllReviewsQuery
} from "@/redux/api/productApiSlice.ts";
import LazyImage from "@/components/LazyImage.tsx";
import Pagination from "@/components/Pagination.tsx";
import {toastConfig} from "@/components/toastConfig.ts";
import {Review} from "@/types/Review.ts";

const REVIEWS_PER_PAGE = 5;

const ProductReview = () => {
    const {id: productId} = useParams<{ id: string }>();
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [reviews, setReviews] = useState<Review[]>([]);

    const {refetch: refetchProductDetails} = useGetProductDetailsQuery(productId);
    const {data: reviewsData, refetch: refetchReviews} = useGetAllReviewsQuery(productId);
    const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation();

    const {userInfo} = useSelector((state: any) => state.auth);

    useEffect(() => {
        // Load reviews from localStorage on component mount
        const storedReviews = localStorage.getItem(`reviews_${productId}`);
        if (storedReviews) {
            setReviews(JSON.parse(storedReviews));
        }
    }, [productId]);

    useEffect(() => {
        if (reviewsData?.data) {
            console.log("Reviews from API:", reviewsData.data);
            setReviews(reviewsData.data);
            // Store reviews in localStorage
            localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviewsData.data));
        }
    }, [reviewsData, productId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!productId) {
            toast.error("Product ID is missing", {
                position: "top-center",
                autoClose: 2000,
            });
            return;
        }
        try {
            const result = await createReview({productId, rating, comment}).unwrap();
            const newReview: Review = {
                _id: result.data.review._id,
                productId: result.data.review.productId,
                userId: result.data.review.userId,
                rating: result.data.review.rating,
                comment: result.data.review.comment,
                createdAt: result.data.review.createdAt,
                updatedAt: result.data.review.updatedAt,
                v: result.data.review.v,
            };
            const updatedReviews = [newReview, ...reviews];
            setReviews(updatedReviews);
            // Update localStorage
            localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));
            console.log("Updated reviews:", updatedReviews);
            toast.success("Review submitted successfully", toastConfig);
            setRating(0);
            setComment("");
            refetchProductDetails();
            refetchReviews();
        } catch (err: unknown) {
            const error = err as { data?: { message?: string } };
            toast.error(error.data?.message || "Something went wrong", toastConfig);
        }
    };

    const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
    const paginatedReviews = reviews.slice(
        (currentPage - 1) * REVIEWS_PER_PAGE,
        currentPage * REVIEWS_PER_PAGE
    );

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="bg-[#ff6b2d] text-white">
            <Container>
                <div className="flex lg:flex-row flex-col lg:gap-10 gap-5 py-5">
                    <div className="lg:w-[55vw]">
                        <h1 className="text-[40px] font-bold underline">Reviews</h1>
                        <div className="flex flex-col gap-3 bg-[#fee8e1] text-black rounded-xl p-5">
                            {paginatedReviews.map((review: Review) => (
                                <div key={review._id}
                                     className="border-b pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0">
                                    <h5 className="font-bold">User ID: {review.userId}</h5>
                                    <div className="flex items-center gap-1 my-1">
                                        {[...Array(5)].map((_, index) => (
                                            <MdOutlineStar
                                                key={index}
                                                className={index < review.rating ? "text-[#e0551b]" : "text-gray-300"}
                                                size={20}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm mt-2">{review.comment}</p>
                                    <p className="text-xs text-gray-500 mt-1">Created: {new Date(review.createdAt).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />

                        {userInfo && (
                            <form onSubmit={handleSubmit} className="mt-5 bg-[#fee8e1] text-black rounded-xl p-5">
                                <h2 className="text-xl font-bold mb-2">Write a Customer Review</h2>
                                <div className="mb-2">
                                    <label htmlFor="rating" className="block mb-1">Rating</label>
                                    <Select onValueChange={(value) => setRating(Number(value))}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a rating..."/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 - Poor</SelectItem>
                                            <SelectItem value="2">2 - Fair</SelectItem>
                                            <SelectItem value="3">3 - Good</SelectItem>
                                            <SelectItem value="4">4 - Very Good</SelectItem>
                                            <SelectItem value="5">5 - Excellent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="comment" className="block mb-1">Comment</label>
                                    <Textarea
                                        id="comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="w-full p-2 border rounded"
                                        rows={3}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={loadingProductReview}
                                    className="bg-[#e0551b] text-white px-4 py-2 rounded hover:bg-[#c94c18] transition-colors"
                                >
                                    {loadingProductReview ? "Submitting..." : "Submit"}
                                </Button>
                            </form>
                        )}
                    </div>

                    <div className="lg:w-[35vw] flex flex-col gap-5">
                        <div className="bg-[#fee8e1] text-black rounded-xl p-5">
                            <h2 className="text-xl font-bold mb-3">Delivery Options</h2>
                            <div className="flex items-center gap-2 mb-2">
                                <LazyImage src={locator} alt="Locator" className="w-6 h-6"/>
                                <span>Deliver to 1234 Main St, Anytown, USA</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <LazyImage src={pickup} alt="Pickup" className="w-6 h-6"/>
                                <span>Pickup available at nearby stores</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <LazyImage src={delivery} alt="Delivery" className="w-6 h-6"/>
                                <span>Usually ready in 24 hours</span>
                            </div>
                        </div>

                        <div className="bg-[#fee8e1] text-black rounded-xl p-5">
                            <h2 className="text-xl font-bold mb-3">Return Policy</h2>
                            <div className="flex items-center gap-2">
                                <LazyImage src={returnPolicy} alt="Return Policy" className="w-6 h-6"/>
                                <span>This item can be returned within 30 days</span>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    );
};

export default ProductReview;
