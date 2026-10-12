import { lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useWebGLSupport } from './hooks/useWebGLSupport';
import { cv } from './data/cv';
import styles from './App.module.css';

const Scene = lazy(() => import('./scene/Scene'));

export default function App() {
  const webgl = useWebGLSupport();
  const reducedMotion = useReducedMotion();

  return (
    <>
      {/* Sans WebGL, le fond CSS de la page suffit : le CV reste entièrement lisible. */}
      {webgl && (
        <Suspense fallback={null}>
          <Scene still={reducedMotion} />
        </Suspense>
      )}
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className={`${styles.footer} no-print`}>
        © {new Date().getFullYear()} {cv.profile.name}
      </footer>
    </>
  );
}
