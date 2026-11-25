import React from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';
import './confirmation.css';

gsap.registerPlugin(ScrollTrigger);
const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

function Confirmation() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      const scene = gsap.timeline({
        scrollTrigger: {
          trigger: '.print-story',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });
      scene
        .fromTo('.press-art', { yPercent: 7, scale: 0.94 }, { yPercent: 0, scale: 1, ease: 'none', duration: 1 }, 0)
        .fromTo('.print-sheet', { yPercent: 52, opacity: 0, rotate: -2 }, { yPercent: 0, opacity: 1, rotate: 0, ease: 'none', duration: 1.2 }, 0.22)
        .fromTo('.sheet-masthead', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55 }, 0.72)
        .fromTo('.sheet-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55 }, 0.98)
        .fromTo('.sheet-details', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 1.2)
        .fromTo('.story-progress span', { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: 1.6 }, 0);
      gsap.fromTo('.opening-copy > *', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' });
    });
    return () => context.revert();
  }, []);

  return <>
    <header className="confirmation-nav">
      <a href={import.meta.env.BASE_URL} aria-label="For Builders, voltar ao início"><img src={asset('logo-transparent.png')} alt="For Builders" /></a>
      <span>Uma leitura para quem constrói</span>
    </header>
    <main>
      <section className="opening-copy" aria-labelledby="confirmation-title">
        <p className="chapter-label"><span>01</span> O próximo capítulo</p>
        <h1 id="confirmation-title">Sua próxima leitura<br /><em>começa aqui.</em></h1>
        <p className="opening-description">Toda grande ideia começa com alguém que presta atenção. A sua primeira edição está tomando forma.</p>
        <a className="scroll-invitation" href="#edicao">Veja a edição ganhar vida <span aria-hidden="true">↓</span></a>
      </section>
      <section id="edicao" className="print-story" aria-label="A primeira edição se formando">
        <div className="print-sticky">
          <div className="print-stage">
            <div className="press-halo" aria-hidden="true" />
            <div className="print-sheet" aria-hidden="true">
              <div className="sheet-masthead"><img src={asset('logo-transparent.png')} alt="" /><span>EDIÇÃO 001</span></div>
              <div className="sheet-rule" />
              <p className="sheet-kicker sheet-details">IA · STARTUPS · NEGÓCIOS</p>
              <h2 className="sheet-title">A notícia passa.<br /><em>O contexto fica.</em></h2>
              <p className="sheet-deck sheet-details">Brasil e mundo, com ideias para levar ao seu projeto.</p>
              <div className="sheet-columns sheet-details"><span>O QUE MUDOU</span><span>POR QUE IMPORTA</span><span>O QUE FAZER</span></div>
              <div className="sheet-footer sheet-details">FOR BUILDERS <span>PARA QUEM FAZ</span></div>
            </div>
            <img className="press-art" src={asset('confirmation-press.png')} alt="Uma prensa editorial imprimindo uma folha" />
          </div>
          <div className="story-progress" aria-hidden="true"><span /></div>
        </div>
      </section>
      <section className="next-step" aria-labelledby="next-title">
        <p className="chapter-label"><span>02</span> O que vem agora</p>
        <h2 id="next-title">O mundo muda.<br /><em>Você constrói.</em></h2>
        <p>Em cada leitura: o que aconteceu, por que isso importa e uma ideia para colocar em movimento.</p>
        <a href={import.meta.env.BASE_URL}>Voltar à For Builders <span aria-hidden="true">↗</span></a>
      </section>
    </main>
    <footer className="confirmation-footer"><img src={asset('logo-transparent.png')} alt="For Builders" /><span>Para quem está construindo algo.</span></footer>
  </>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><Confirmation /></React.StrictMode>);
