import { Footer } from './landing/Footer';
import { Nav } from './landing/Nav';
import { BuiltWith } from './landing/sections/BuiltWith';
import { Components } from './landing/sections/Components';
import { FinalCta } from './landing/sections/FinalCta';
import { Hero } from './landing/sections/Hero';
import { Idea } from './landing/sections/Idea';
import { Principles } from './landing/sections/Principles';
import { QuickStart } from './landing/sections/QuickStart';
import { UnderTheSurface } from './landing/sections/UnderTheSurface';

function App() {
  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <Nav />
      <main>
        <Hero />
        <Idea />
        <Principles />
        <BuiltWith />
        <Components />
        <UnderTheSurface />
        <QuickStart />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

export default App;
