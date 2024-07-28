import Container from "@/Container.tsx";
import SmallAboutNav from "@/pages/about/SmallAboutNav.tsx";
import AboutHero from "@/pages/about/AboutHero.tsx";
import SectionAfterHero from "@/pages/about/SectionAfterHero.tsx";
import ActionPurpose from "@/pages/about/ActionPurpose.tsx";
import GlobalReach from "@/pages/about/GlobalReach.tsx";
import OurLeader from "@/pages/about/OurLeader.tsx";
import Technologies from "@/pages/about/Technologies.tsx";
import RevelOnScroll from "@/components/RevealOnScroll.tsx";

const AboutMain = () => {
    return (
        <div className="flex flex-col">
            <SmallAboutNav/>
            <RevelOnScroll>
                <AboutHero/>
            </RevelOnScroll>
            <Container>
                <RevelOnScroll>
                    <SectionAfterHero/>
                </RevelOnScroll>
                <RevelOnScroll>
                    <ActionPurpose/>
                </RevelOnScroll>
                <RevelOnScroll>
                    <GlobalReach/>
                </RevelOnScroll>
                <RevelOnScroll>
                    <OurLeader/>
                </RevelOnScroll>
                <RevelOnScroll>
                    <Technologies/>
                </RevelOnScroll>
            </Container>
        </div>
    );
};

export default AboutMain;
