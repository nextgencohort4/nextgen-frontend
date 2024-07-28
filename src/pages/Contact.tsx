import Container from "@/Container.tsx";
import {Input} from "@/components/ui/input.tsx";
import {SkeletonDemo} from "@/components/Loader.tsx";
import React, {useState} from "react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import RevelOnScroll from "@/components/RevealOnScroll.tsx";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [enquiry, setEnquiry] = useState("");
    const [orderNumber, setOrderNumber] = useState("");
    const [message, setMessage] = useState("");

    const isLoading = false;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <Container>
            <RevelOnScroll>
                <section className="flex flex-col items-center justify-center min-h-screen px-4">
                    <h2 className="text-2xl font-bold mb-8">Get In Touch</h2>

                    <form onSubmit={handleSubmit} className="w-full max-w-lg">
                        <div className="flex flex-col md:flex-row md:gap-4 gap-5 mb-6">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="name" className="block text-sm font-bold">
                                    Name
                                </label>
                                <Input
                                    className="border border-gray-500 p-2 w-full"
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name}
                                    id="name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col flex-1">
                                <label htmlFor="email" className="block text-sm font-bold">
                                    Email
                                </label>
                                <Input
                                    className="border border-gray-500 p-2 w-full"
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 mb-6">
                            <label htmlFor="enquiry" className="block text-sm font-bold">
                                Type of Enquiry
                            </label>
                            <Input
                                className="border border-gray-500 p-2 w-full"
                                type="text"
                                placeholder="Enter Type of Enquiry"
                                value={enquiry}
                                id="enquiry"
                                onChange={(e) => setEnquiry(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1 mb-6">
                            <label htmlFor="orderNumber" className="block text-sm font-bold">
                                Order Number
                            </label>
                            <Input
                                className="border border-gray-500 p-2 w-full"
                                type="text"
                                placeholder="Enter Order Number"
                                value={orderNumber}
                                id="orderNumber"
                                onChange={(e) => setOrderNumber(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1 mb-6">
                            <label htmlFor="message" className="block text-sm font-bold">
                                Message
                            </label>
                            <Textarea
                                className="border border-gray-500 p-2 w-full"
                                placeholder="Enter complete message"
                                value={message}
                                id="message"
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>

                        <Button className="bg-[#ff6b2d] hover:bg-[#ff6b2d] w-full text-white font-bold mb-4">
                            SEND
                        </Button>

                        {isLoading && <SkeletonDemo/>}
                    </form>
                </section>
            </RevelOnScroll>
        </Container>
    );
};

export default Contact;
