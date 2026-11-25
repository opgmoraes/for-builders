import React, { useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './confirmation.css';

gsap.registerPlugin(ScrollTrigger);
const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
const home = import.meta.env.BASE_URL;

function Confirmation() {
  const isPreview = new URLSearchParams(window.location.search).has('preview');
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      gsap.fromTo('.welcome-copy > *', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out' });
      gsap.timeline({ scrollTrigger: { trigger: '.courtyard-story', start: 'top top', end: 'bottom bottom', scrub: 1.4, invalidateOnRefresh: true } })
        .fromTo('.scene-horizon', { scale: 1.12, yPercent: 5 }, { scale: 1, yPercent: 0, duration: 2.5, ease: 'none' }, 0)
        .fromTo('.scene-clouds', { xPercent: -5, yPercent: 4 }, { xPercent: 3, yPercent: -4, duration: 2.5, ease: 'none' }, 0)
        .fromTo('.scene-temples', { scale: 1.13, yPercent: 10 }, { scale: 1, yPercent: 0, duration: 2.2, ease: 'none' }, 0)
        .fromTo('.scene-foreground', { scale: 1.2, yPercent: 14 }, { scale: 1, yPercent: 0, duration: 2.2, ease: 'none' }, 0)
        .fromTo('.scene-chair', { autoAlpha: 0, xPercent: -50, yPercent: 28, scale: 0.82 }, { autoAlpha: 1, xPercent: -50, yPercent: 0, scale: 1, duration: 1.55, ease: 'power2.out' }, 0.38)
        .fromTo('.chair-shadow', { autoAlpha: 0, xPercent: -50, scale: 0.45 }, { autoAlpha: 0.45, xPercent: -50, scale: 1, duration: 1.5, ease: 'none' }, 0.42)
        .fromTo('.scene-caption', { autoAlpha: 0, xPercent: -50, y: 30 }, { autoAlpha: 1, xPercent: -50, y: 0, duration: 0.8, ease: 'power2.out' }, 1.55);
    });
    return () => context.revert();
  }, []);

  return <>
    <header className="confirmation-header">
      <a href={home} aria-label="For Builders, voltar ao início"><img src={asset('logo-transparent.png')} alt="For Builders" /></a>
      <span>Seu lugar está reservado</span>
      <a className="header-return" href={home}>Voltar ao início <span aria-hidden="true">↗</span></a>
    </header>
    <main>
      <section className="welcome" aria-labelledby="welcome-title"><div className="welcome-copy">
        <p className="eyebrow">{isPreview ? 'PRÉVIA DA PÁGINA DE CONFIRMAÇÃO' : 'INSCRIÇÃO CONFIRMADA'}</p>
        <h1 id="welcome-title">Bem-vindo<br /><em>à For Builders.</em></h1>
        <p className="welcome-lede">{isPreview ? 'É assim que vamos receber você depois que a inscrição estiver conectada.' : 'Você entrou. Agora, a conversa continua na sua caixa de entrada.'}</p>
        <div className="delivery"><span className="delivery-time">7h</span><span>A partir de amanhã, uma nova edição chega ao seu e-mail todas as manhãs.</span></div>
        <p className="welcome-note">IA, startups e negócios do Brasil e do mundo. Aos sábados, um resumão para ligar os pontos da semana.</p>
        <a className="scroll-link" href="#seu-lugar">Veja o lugar que espera por você <span aria-hidden="true">↓</span></a>
      </div></section>
      <section id="seu-lugar" className="courtyard-story" aria-label="Um lugar para quem constrói"><div className="courtyard-sticky">
        <div className="courtyard-art" role="img" aria-label="Cadeira de mármore vazia em um terraço grego diante do mar">
          <img className="scene-horizon" src={asset('horizonte.png')} alt="" />
          <img className="scene-clouds" src={asset('nuvens.png')} alt="" />
          <img className="scene-temples" src={asset('templo.png')} alt="" />
          <div className="chair-shadow" aria-hidden="true" />
          <img className="scene-chair" src={asset('confirmation-chair.png')} alt="" />
          <img className="scene-foreground" src={asset('primeiro-plano.png')} alt="" />
        </div>
        <div className="scene-caption"><span>FOR BUILDERS</span><h2>Tem lugar para<br /><em>a sua próxima ideia.</em></h2></div>
      </div></section>
      <section className="next-step" aria-labelledby="next-title">
        <p className="eyebrow">ATÉ AMANHÃ</p><h2 id="next-title">O primeiro passo<br /><em>já foi dado.</em></h2>
        <p>Às 7h, procure a For Builders na sua caixa de entrada. Se não encontrar a edição, confira também as abas Promoções e Spam.</p>
        <a className="return-button" href={home}>Voltar à For Builders <span aria-hidden="true">↗</span></a>
      </section>
    </main>
    <footer className="confirmation-footer"><img src={asset('logo-transparent.png')} alt="For Builders" /><span>Para quem está construindo algo.</span></footer>
  </>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><Confirmation /></React.StrictMode>);
