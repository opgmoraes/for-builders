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
    const context = gsap.context(() => {
      gsap.fromTo('.welcome-copy > *', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out' });
      gsap.timeline({ scrollTrigger: { trigger: '.courtyard-story', start: 'top top', end: 'bottom bottom', scrub: 1.5, invalidateOnRefresh: true } })
        .fromTo('.temple-distance', { scale: 1.2, yPercent: 5 }, { scale: 1, yPercent: 0, duration: 3, ease: 'none' }, 0)
        .fromTo('.temple-clouds', { xPercent: -9, yPercent: 4, autoAlpha: 0.16 }, { xPercent: 9, yPercent: -4, autoAlpha: 0.48, duration: 3, ease: 'none' }, 0)
        .fromTo('.temple-left', { xPercent: 23, scale: 1.12 }, { xPercent: -20, scale: 1.02, duration: 2.5, ease: 'none' }, 0)
        .fromTo('.temple-right', { xPercent: -23, scale: 1.12 }, { xPercent: 20, scale: 1.02, duration: 2.5, ease: 'none' }, 0)
        .fromTo('.temple-floor', { yPercent: -8, scale: 1.18 }, { yPercent: 8, scale: 1.03, duration: 2.5, ease: 'none' }, 0)
        .fromTo('.temple-rays', { autoAlpha: 0.12, rotation: -9 }, { autoAlpha: 0.42, rotation: 0, duration: 2.3, ease: 'none' }, 0.2)
        .fromTo('.temple-shade', { autoAlpha: 0.42 }, { autoAlpha: 0.2, duration: 2.5, ease: 'none' }, 0)
        .fromTo('.scene-caption', { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power2.out' }, 1.1);
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
      <section id="seu-lugar" className="courtyard-story" aria-label="O templo se abre para sua próxima ideia"><div className="courtyard-sticky">
        <div className="courtyard-art" role="img" aria-label="Colunas de um templo grego se abrem sobre um pátio de pedra sob nuvens iluminadas">
          <img className="temple-distance" src={asset('confirmation-temple-background.jpg')} alt="" />
          <img className="temple-clouds" src={asset('confirmation-clouds.png')} alt="" />
          <div className="temple-rays" aria-hidden="true" />
          <img className="temple-left" src={asset('confirmation-temple-foreground.jpg')} alt="" />
          <img className="temple-right" src={asset('confirmation-temple-foreground.jpg')} alt="" />
          <img className="temple-floor" src={asset('confirmation-temple-foreground.jpg')} alt="" />
          <div className="temple-shade" aria-hidden="true" />
        </div>
        <div className="scene-caption"><span>FOR BUILDERS</span><h2>Tem lugar para<br /><em>a sua próxima ideia.</em></h2><p>Amanhã, às 7h, começa a sua primeira leitura.</p></div>
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
