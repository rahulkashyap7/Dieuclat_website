import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../sections/Hero';
import Products from '../sections/Products';
import DealOfDay from '../sections/DealOfDay';
import WhyChoose from '../sections/WhyChoose';
import Collections from '../sections/Collections';
import Testimonials from '../sections/Testimonials';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    useEffect(() => {
        // Refresh ScrollTrigger after all components mount
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <main className="relative">
            <Hero />
            <Products />
            <DealOfDay />
            <WhyChoose />
            <Collections />
            <Testimonials />
        </main>
    );
}
