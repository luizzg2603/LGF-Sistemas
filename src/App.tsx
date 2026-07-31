import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Solutions from '@/components/Solutions';
import WhyChoose from '@/components/WhyChoose';
import ProjectSimulator from '@/components/ProjectSimulator';
import ContactFooter from '@/components/ContactFooter';

export default function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Header />
      <main>
        <Hero />
        <Solutions />
        <WhyChoose />
        <ProjectSimulator />
        <ContactFooter />
      </main>
    </div>
  );
}
