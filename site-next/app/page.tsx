import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Differentials from '../components/Differentials';
import Process from '../components/Process';
import Technologies from '../components/Technologies';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Loader = dynamic(() => import('../components/Loader'), { ssr: false });
const CustomCursor = dynamic(() => import('../components/CustomCursor'), { ssr: false });
const ScrollAnimations = dynamic(() => import('../components/ScrollAnimations'), { ssr: false });
const LenisProvider = dynamic(() => import('../components/LenisProvider'), { ssr: false });

export default function Home() {
  return (
    <>
      <LenisProvider />
      <Loader />
      <CustomCursor />
      <ScrollAnimations />
      <Navbar />
      <Hero />
      <Services />
      <Differentials />
      <Process />
      <Technologies />
      <Contact />
      <Footer />
    </>
  );
}
