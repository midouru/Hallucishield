import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import FeatureGrid from "../components/landing/FeatureGrid";
import Pipeline from "../components/landing/Pipeline";
import VerificationDemo from "../components/landing/verificationdemo";
import Security from "../components/landing/Security";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">

        <div
          className="
          absolute
          top-[-15rem]
          left-1/2
          h-[32rem]
          w-[32rem]
          -translate-x-1/2
          rounded-full
          bg-indigo-600/20
          blur-[160px]
          "
        />

        <div
          className="
          absolute
          right-0
          top-40
          h-[22rem]
          w-[22rem]
          rounded-full
          bg-cyan-500/10
          blur-[150px]
          "
        />

      </div>

      <Navbar />

      <Hero />
      <div className="relative">

      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent to-slate-950" />

      <section >

      <FeatureGrid />
      <Pipeline />
      <VerificationDemo />
      <Security />
      <CTA />
      <Footer />
      </section>
      </div>
      

    </div>
  );
}