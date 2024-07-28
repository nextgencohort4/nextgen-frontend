import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Container from "@/Container.tsx";
import {GoChevronLeft} from "react-icons/go";
import {Separator} from "@/components/ui/separator.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import LazyImage from "@/components/LazyImage.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {BsTruck} from "react-icons/bs";
import {MdOutlineStoreMallDirectory} from "react-icons/md";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {IoLocationOutline} from "react-icons/io5";
import {GiPadlock} from "react-icons/gi";
import ProgressSteps from "@/components/ProgressSteps.tsx";
import {RootState} from "@/redux/store.ts";
import {useProcessCartMutation} from "@/redux/api/paymentApiSlice.ts";
import {toast} from "react-toastify";
import {toastConfig} from "@/components/toastConfig.ts";
import {clearCartItems} from "@/redux/features/cartSlice.ts";
import RevelOnScroll from "@/components/RevealOnScroll.tsx";

const Checkout = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [address, setAddress] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");
    const [deliveryType, setDeliveryType] = useState("door delivery");
    const [voucherCode, setVoucherCode] = useState("");

    const {cartItems} = useSelector((state: RootState) => state.cart);
    const {userInfo} = useSelector((state: RootState) => state.auth);
    const [processCart] = useProcessCartMutation();
    const dispatch = useDispatch();

    const subtotal = cartItems.reduce(
        (acc, item) => acc + (item.discount_price || item.price) * item.quantity,
        0
    );

    const shippingCost = 700; // 700 NGN
    const dutiesPercentage = 0.233; // 23.3%
    const taxesPercentage = 0.137; // 13.7%

    const duties = subtotal * dutiesPercentage;
    const taxes = subtotal * taxesPercentage;
    const total = subtotal + shippingCost + duties + taxes;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        const deliveryAddress = `${address}, ${apartment}, ${city}, ${state}, ${zip}`;

        try {
            const res = await processCart({
                deliveryAddress,
                deliveryType,
                paymentMethod: "credit_card",
                voucherCode,
                currency: "NGN",
                smallestUnitCurrency: 100,
                totalAmount: Math.round(total * 100)
            }).unwrap();

            if (res.status === "payment link generated successfully") {
                // Construct the Paystack URL with the token
                const paystackUrl = new URL(res.paymentlink);
                paystackUrl.searchParams.append("token", userInfo?.user?.token || "");
                console.log(`User payment token: ${userInfo?.user?.token}`);

                // Clear the cart
                dispatch(clearCartItems());

                // Redirect to Paystack
                window.location.href = paystackUrl.toString();
            } else {
                setIsProcessing(false);
                toast.error("Failed to generate payment link. Please try again.", toastConfig);
            }
        } catch (err) {
            setIsProcessing(false);
            toast.error("An error occurred. Please try again.", toastConfig);
            console.error("Payment processing error:", err);
        }
    };

    return (
        <RevelOnScroll>
            <Container>
                <ProgressSteps step1={true} step2={true} step3={false}/>
                <div>
                    <h1 className="flex flex-col gap-1">
                        Review your order before checkout
                        <Link className="flex items-center capitalize font-bold hover:underline" to="/cart">
                            <GoChevronLeft/>
                            go to back to cart
                        </Link>
                    </h1>
                </div>

                <div className="flex lg:flex-row flex-col-reverse gap-5 my-10">
                    <div className="flex flex-col items-center gap-5 lg:w-3/5 w-full">
                        <h1 className="font-bold">Express Checkout</h1>
                        <div
                            className="flex justify-center items-center gap-2 font-bold bg-[#FF773E] capitalize rounded-xl shadow-md w-[350px] h-[70px] text-white">
                            <Link to="/shop">
                                <p>shop</p>
                            </Link>
                            <Link to="">
                                <p className="bg-white text-[#3F52FC] px-3 py-1 rounded-lg">pay</p>
                            </Link>
                        </div>

                        <div className="flex items-center justify-center w-full my-4">
                            <Separator className="flex-grow max-w-[30%]"/>
                            <span className="flex-shrink-0 px-2 sm:px-4 uppercase font-bold">or</span>
                            <Separator className="flex-grow max-w-[30%]"/>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full">
                            {/* Contact Information */}
                            <div className="flex flex-col gap-2 w-full">
                                <Label className="font-bold">Contact</Label>
                                <div className="w-full">
                                    <Input
                                        className="border border-gray-500 w-full"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div className="flex items-center gap-1">
                                    <Checkbox/>
                                    <p>Email me with news and offers</p>
                                </div>
                            </div>

                            {/* Delivery Information */}
                            <div className="flex flex-col gap-2 w-full mt-4">
                                <Label className="font-bold">Delivery</Label>
                                <RadioGroup value={deliveryType} onValueChange={setDeliveryType}>
                                    <div
                                        className="flex items-center justify-between border border-gray-500 p-3 rounded-lg w-full">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="door delivery" id="door-delivery"/>
                                            <Label htmlFor="door-delivery">Door Delivery</Label>
                                        </div>
                                        <BsTruck/>
                                    </div>
                                    <div
                                        className="flex items-center justify-between border border-gray-500 p-3 rounded-lg w-full">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="pickup" id="pickup"/>
                                            <Label htmlFor="pickup">Pickup in store</Label>
                                        </div>
                                        <MdOutlineStoreMallDirectory/>
                                    </div>
                                </RadioGroup>

                                <Select onValueChange={(value) => setState(value)}>
                                    <SelectTrigger className="border border-gray-500 w-full">
                                        <SelectValue placeholder="Select your Country/Region"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="nigeria">Nigeria</SelectItem>
                                        <SelectItem value="ghana">Ghana</SelectItem>
                                        <SelectItem value="angola">Angola</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="flex items-center gap-2">
                                    <Input
                                        className="border border-gray-500 w-full"
                                        name="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Enter your first name"
                                        required
                                    />
                                    <Input
                                        className="border border-gray-500 w-full"
                                        name="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Enter your last name"
                                        required
                                    />
                                </div>

                                <Input
                                    className="border border-gray-500 w-full"
                                    name="company"
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="Company (optional)"
                                />

                                <div className="relative">
                                    <Input
                                        className="border border-gray-500 w-full"
                                        name="address"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Enter your Address"
                                        required
                                    />
                                    <IoLocationOutline className="absolute top-3 right-2"/>
                                </div>

                                <Input
                                    className="border border-gray-500 w-full"
                                    name="apartment"
                                    type="text"
                                    value={apartment}
                                    onChange={(e) => setApartment(e.target.value)}
                                    placeholder="Apartment, suite, etc. (optional)"
                                />

                                <div className="flex items-center gap-2">
                                    <Input
                                        className="border border-gray-500 w-full"
                                        name="city"
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="City"
                                        required
                                    />
                                    <Select onValueChange={(value) => setState(value)}>
                                        <SelectTrigger className="border border-gray-500 w-full">
                                            <SelectValue placeholder="State"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="enugu">Enugu</SelectItem>
                                            <SelectItem value="delta">Delta</SelectItem>
                                            <SelectItem value="lagos">Lagos</SelectItem>
                                            <SelectItem value="abuja">Abuja</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        className="border border-gray-500 w-full"
                                        name="zip"
                                        type="text"
                                        value={zip}
                                        onChange={(e) => setZip(e.target.value)}
                                        placeholder="Zip code"
                                        required
                                    />
                                </div>

                                <Input
                                    className="border border-gray-500 w-full"
                                    name="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter your Phone number"
                                    required
                                />
                            </div>

                            {/* Remember Me */}
                            <div className="flex flex-col gap-2 w-full mt-4">
                                <Label className="font-bold">Remember me</Label>
                                <div className="flex items-center gap-2 border border-gray-500 rounded-lg p-5">
                                    <Checkbox/>
                                    <Label>Save my information for a faster checkout</Label>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex flex-col gap-2 mt-4">
                                <p className="text-sm font-bold">
                                    By clicking below and completing your order, you agree to purchase your item(s) from
                                    Global-e as merchant of record of this transaction, on Global-e's Terms of
                                    Conditions and Privacy Policy. Global-e is an international service provider to
                                    Trendy Shoes.
                                </p>

                                <Button
                                    type="submit"
                                    className="flex items-center justify-center gap-1 bg-[#FF773E] hover:bg-[#FF773E] text-white font-bold w-full"
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <>
                                            <span className="spinner"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <GiPadlock/>
                                            Pay now
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Cart Summary */}
                    <div
                        className="flex flex-col gap-3 bg-[#472810] text-white rounded-xl md:p-4 p-2 lg:w-2/5 w-full md:min-h-96 md:max-h-[calc(70vh-2rem)] overflow-y-auto">
                        <div className="flex flex-col gap-2">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex flex-row justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <LazyImage
                                            className="w-[70px] h-[70px] object-cover min-w-[70px] min-h-[70px]"
                                            src={item.images[0]}
                                            alt={item.name}
                                        />
                                        <div>
                                            <p className="capitalize md:text-base text-xs font-bold">{item.name}</p>
                                            <p className="capitalize text-xs">
                                                {item.selectedColor} / {item.selectedSize}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="md:text-base text-xs">
                                        ₦{((item.discount_price || item.price) * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex md:flex-row flex-col gap-1">
                            <Input
                                className="border border-gray-500 w-full text-black"
                                type="text"
                                value={voucherCode}
                                onChange={(e) => setVoucherCode(e.target.value)}
                                placeholder="Discount code or gift card"
                            />
                            <Button className="bg-[#ADB0B0] hover:bg-[#ADB0B0] font-bold">
                                Apply
                            </Button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <p className="capitalize text-xs">Subtotal</p>
                                <p className="capitalize text-sm">₦{subtotal.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="capitalize text-xs">Shipping</p>
                                <p className="capitalize text-sm">₦{shippingCost.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="capitalize text-xs">Duties</p>
                                <p className="capitalize text-sm">₦{duties.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="capitalize text-xs">Taxes</p>
                                <p className="capitalize text-sm">₦{taxes.toFixed(2)}</p>
                            </div>
                            <Separator/>
                            <div className="flex items-center justify-between">
                                <p className="capitalize text-lg font-bold">Total</p>
                                <p className="capitalize font-bold">₦{total.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </RevelOnScroll>
    );
};

export default Checkout;
