import React, { useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './confirmation.css';

gsap.registerPlugin(ScrollTrigger);
const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

function Confirmation() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      gsap.fromTo('.confirmation-intro > *', { opacity: 0, y: 18 }, {
        opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power2.out',
      });
      const print = gsap.timeline({
        scrollTrigger: {
          trigger: '.print-story',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
      print
        .fromTo('.press-shadow', { opacity: 0.12, scale: 0.8 }, { opacity: 0.55, scale: 1, duration: 1.7, ease: 'none' }, 0)
        .fromTo('.press-stack', { yPercent: 10, scale: 0.93 }, { yPercent: 0, scale: 1, duration: 1.7, ease: 'none' }, 0)
        .fromTo('.paper-layer', { yPercent: 17 }, { yPercent: 0, duration: 1.5, ease: 'none' }, 0.15)
        .fromTo('.press-wheel', { rotation: -3 }, { rotation: 0, duration: 1.2, ease: 'none' }, 0.15)
        .fromTo('.paper-mark', { opacity: 0, y: 9 }, { opacity: 1, y: 0, duration: 0.42 }, 0.68)
        .fromTo('.paper-headline', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.48 }, 0.9)
        .fromTo('.paper-description', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.42 }, 1.14)
        .fromTo('.ink-glint', { xPercent: -90, opacity: 0 }, { xPercent: 80, opacity: 0.7, duration: 0.45 }, 1.34)
        .to('.ink-glint', { opacity: 0, duration: 0.2 }, 1.78)
        .fromTo('.scene-note', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 }, 1.52)
        .fromTo('.story-progress span', { scaleY: 0 }, { scaleY: 1, duration: 1.8, ease: 'none' }, 0);
    });
    return () => context.revert();
  }, []);

  return <>
    <header className="confirmation-header">
      <a href={import.meta.env.BASE_URL} aria-label="For Builders, voltar ao início"><img src={asset('logo-transparent.png')} alt="For Builders" /></a>
      <span>O próximo capítulo</span>
      <a className="header-return" href={import.meta.env.BASE_URL}>Voltar ao início <span aria-hidden="true">↗</span></a>
    </header>
    <main>
      <section className="confirmation-intro" aria-labelledby="confirmation-title">
        <p className="confirmation-eyebrow">For Builders <span aria-hidden="true">·</span> Uma leitura para quem constrói</p>
        <h1 id="confirmation-title">Sua próxima leitura<br /><em>começa aqui.</em></h1>
        <p className="confirmation-lede">IA, startups e negócios em uma edição que conecta o que aconteceu ao que você pode construir.</p>
        <a className="confirmation-link" href="#edicao">Veja a edição ganhar vida <span aria-hidden="true">↓</span></a>
      </section>
      <section id="edicao" className="print-story" aria-label="Uma edição tomando forma na prensa">
        <div className="print-sticky">
          <div className="press-composition">
            <div className="press-shadow" aria-hidden="true" />
            <div className="press-stack">
              <div className="paper-layer">
                <img className="press-image press-paper" src={asset('confirmation-press.png')} alt="" />
                <div className="paper-ink">
                  <div className="paper-mark"><img src={asset('logo-transparent.png')} alt="" /><span>EDIÇÃO 001</span></div>
                  <div className="paper-rule" />
                  <p className="paper-category paper-description">IA · STARTUPS · NEGÓCIOS</p>
                  <h2 className="paper-headline">A notícia passa.<br /><em>O contexto fica.</em></h2>
                  <p className="paper-summary paper-description">Brasil e mundo, com ideias para levar ao seu projeto.</p>
                </div>
              </div>
              <img className="press-image press-left" src={asset('confirmation-press.png')} alt="" />
              <img className="press-image press-right" src={asset('confirmation-press.png')} alt="" />
              <img className="press-image press-body" src={asset('confirmation-press.png')} alt="Uma prensa editorial imprimindo a primeira edição da For Builders" />
              <img className="press-image press-wheel" src={asset('confirmation-press.png')} alt="" />
              <div className="ink-glint" aria-hidden="true" />
            </div>
          </div>
          <p className="scene-note">Uma edição de cada vez. Uma ideia de cada vez.</p>
          <div className="story-progress" aria-hidden="true"><span /></div>
        </div>
      </section>
      <section className="confirmation-outro" aria-labelledby="outro-title">
        <p className="confirmation-eyebrow">O que vem pela frente</p>
        <h2 id="outro-title">O mundo muda.<br /><em>Você constrói.</em></h2>
        <p>Em cada leitura: o que aconteceu, por que importa e uma ideia para colocar em movimento.</p>
        <a className="confirmation-link" href={import.meta.env.BASE_URL}>Voltar à For Builders <span aria-hidden="true">↗</span></a>
      </section>
    </main>
    <footer className="confirmation-footer"><img src={asset('logo-transparent.png')} alt="For Builders" /><span>Para quem está construindo algo.</span></footer>
  </>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><Confirmation /></React.StrictMode>);
