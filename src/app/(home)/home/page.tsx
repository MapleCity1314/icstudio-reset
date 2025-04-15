import CreativeSection from "./_sections/creative-section";
import { Footer } from "./_components/footer";
import { HeroSection } from "./_sections/hero-section";
import { CurvedNavigation } from "./_components/navigation";
import { ProjectsSection } from "./_sections/projects-section";


const Page = () => {
      return (
            <main className="relative">
                  <CurvedNavigation />
                  <HeroSection />
                  <CreativeSection />
                  <ProjectsSection />

                  {/* 添加其他部分的占位符，以便导航可以正常工作 */}
                  <section id="about" className="min-h-screen bg-background flex items-center justify-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground">关于我们</h2>
                  </section>

                  <section id="contact" className="min-h-screen bg-background flex items-center justify-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground">联系方式</h2>
                  </section>

                  <section id="footer" className="bg-background">
                        <Footer />
                  </section>
            </main>
      );
};

export default Page;
