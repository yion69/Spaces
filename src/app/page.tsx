// "use client"

// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export default function Home() {

//   const router = useRouter();

//   return (
//     <div>
//       <nav></nav>
//       <main>
//         <Button onClick={()=>router.push("/login")}>Login</Button>
//       </main>
//       <footer></footer>
//     </div>
//   );
// }
import { Navbar } from "@/components/layout/landingpage/navbar";
import { BenefitsSection } from "../components/layout/landingpage/sections/benefits";
import { CommunitySection } from "../components/layout/landingpage/sections/community";
import { ContactSection } from "../components/layout/landingpage/sections/contact";
import { FAQSection } from "../components/layout/landingpage/sections/faq";
import { FeaturesSection } from "../components/layout/landingpage/sections/features";
import { FooterSection } from "../components/layout/landingpage/sections/footer";
import { HeroSection } from "../components/layout/landingpage/sections/hero";
import { PricingSection } from "../components/layout/landingpage/sections/pricing";
import { ServicesSection } from "../components/layout/landingpage/sections/services";
import { SponsorsSection } from "../components/layout/landingpage/sections/sponsors";
import { TeamSection } from "../components/layout/landingpage/sections/team";
import { TestimonialSection } from "../components/layout/landingpage/sections/testimonial";

export const metadata = {
  title: "Spaces - Student Space",
  description: "A website for students to connect and share resources",
  openGraph: {
    type: "website",
    url: "https://github.com/nobruf/shadcn-landing-page.git",
    title: "Spaces - Student Space",
    description: "A website for students to connect and share resources",
    images: [
      {
        url: "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
        width: 1200,
        height: 630,
        alt: "Shadcn - Landing template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://github.com/nobruf/shadcn-landing-page.git",
    title: "Spaces - Student Space",
    description: "A website for students to connect and share resources",
    images: [
      "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
    ],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center w-10/12 mx-auto">
      <Navbar />
      <HeroSection />
      {/* <SponsorsSection /> */}
      <BenefitsSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialSection />
      <TeamSection />
      <CommunitySection />
      <PricingSection />
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
}
