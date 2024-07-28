import Container from "@/Container.tsx";

const AboutHero = () => {
    return (
        <div className="about-hero">
            <Container>
                <div>
                    <div className="flex flex-col gap-5 items-center justify-center lg:min-h-screen py-40">
                        <h1 className="lg:text-7xl md:text-5xl text-3xl font-bold text-center md:leading-10 leading-6">
                            Your one-stop shop for <br/> top quality sneakers
                        </h1>
                        <p className="md:text-lg text-sm text-center leading-5 font-bold">
                            At Trendy Shoes, we offer only the best quality of shoes.
                            Ensuring<br/> that our customers are provided with the best of qualities and value.
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AboutHero;
