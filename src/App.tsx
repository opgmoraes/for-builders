import { BuildersTable } from './components/BuildersTable';
import { Subscribe } from './components/Subscribe';
import { useArtworkMotion } from './hooks/useArtworkMotion';
const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
export function App() {
useArtworkMotion();
return (<>

<header className="header wrap">
<a className="logo" href="#" aria-label="For Builders, início"><img className="brand-image" src={asset('logo-transparent.png')} alt="" /></a>
<nav aria-label="Navegação principal"><a href="#edicao">O que você recebe</a><a href="#builders">Para quem constrói</a></nav>
<a className="nav-cta" href="#inscricao">Quero fazer parte</a>
</header>
<main className="motion-enabled">
<section className="hero" aria-labelledby="titulo">
<div className="hero-copy wrap">
<p className="eyebrow">Uma newsletter de IA, startups e negócios</p>
<h1 id="titulo">O mundo muda.<br />Você constrói.</h1>
<p className="intro">Entenda o que mudou no Brasil e no mundo, por que importa e o que você pode aplicar ao seu projeto.</p>
<Subscribe />
</div>
<div className="hero-scene">
<div className="hero-stage" role="img" aria-label="Uma mão clássica e uma mão robótica se aproximam.">
  <div className="hero-light" />
  <div className="hand-shadow human-shadow" />
  <div className="hand-shadow robot-shadow" />
  <div className="hand hand-human">
    <canvas width="1774" height="407" data-source={asset('hero-human.png')} />
  </div>
  <div className="hand hand-robot">
    <canvas width="1774" height="407" data-source={asset('hero-robot.png')} />
    <div className="metal-shine" />
  </div>
</div>
<div className="hero-quote">
  <figure>
    <blockquote cite="https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says">“Você só consegue ligar os pontos olhando para trás.”</blockquote>
    <figcaption>Steve Jobs · <a href="https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says">Stanford, 2005</a> · tradução livre</figcaption>
  </figure>
  <a className="text-link" href="#inscricao">Quero receber a newsletter</a>
</div>
</div>
</section>
<div className="edition-line wrap"><span>Ideias antigas. Possibilidades novas.</span><a href="#edicao">Conheça sua próxima leitura</a></div>
<section id="edicao" className="edition wrap">
<div className="section-heading"><p className="eyebrow">Dentro da edição</p><h2>Entenda o que mudou.</h2></div>
<div className="edition-layout">
<div className="edition-context"><p>Em cinco minutos, você acompanha as notícias e entende o que elas mudam para quem está criando um produto ou tocando um negócio.</p><a className="text-link" href="#inscricao">Quero receber a primeira edição</a></div>
<div className="paper">
<div className="paper-top"><img className="brand-image" src={asset('logo-transparent.png')} alt="For Builders" /><span>Prévia do formato</span></div>

<h3>A história por trás da manchete</h3>
<p>A história principal vem com o que aconteceu, o que está por trás e por que vale a sua atenção.</p>
<div className="paper-grid"><div><h4>Brasil em foco</h4><p>Quem está criando, lançando e encontrando caminhos por aqui.</p></div><div><h4>Olho no mundo</h4><p>As mudanças lá fora que podem chegar ao seu negócio.</p></div></div>
<div className="practical"><div><h4>Leve para a prática</h4><p>Uma ideia, uma ferramenta ou uma pergunta para testar no seu projeto.</p></div></div>
</div>
</div>
</section>
<section id="builders" className="builders">
<div className="builders-layout wrap">
<div className="builders-copy"><p className="eyebrow">Para quem constrói</p><h2>A próxima cadeira<br />pode ser sua.</h2><p>Inventores de épocas diferentes, reunidos numa mesa imaginária. A última cadeira é para quem está tirando uma ideia do papel hoje.</p><a href="#inscricao" className="dark-link">Encontre sua próxima ideia</a></div>
<BuildersTable />
</div>
</section>
<section className="rhythm wrap">
<div><p className="eyebrow">No seu ritmo</p><h2>Escolha quando ler.</h2></div>
<div className="rhythm-options"><article><div><h3>A edição matinal</h3><p>Uma seleção diária de IA, startups e negócios, com espaço para o Brasil e o mundo.</p></div></article><article><div><h3>O resumão de sábado</h3><p>A semana conectada em uma leitura. Para retomar o que realmente merece atenção.</p></div></article></div>
</section>
<section className="faq wrap" aria-labelledby="faq-title">
<div className="faq-intro">
  <h2 id="faq-title">Antes de entrar na lista</h2>
  <p>O que esperar da For Builders e como escolher o seu ritmo de leitura.</p>
</div>
<div className="faq-questions">
  <details><summary>A newsletter é gratuita?</summary><p>Sim. A edição será gratuita, e eventuais patrocínios terão identificação no e-mail.</p></details>
  <details><summary>Preciso entender de tecnologia?</summary><p>As notícias vêm com o contexto necessário para acompanhar, mesmo que você esteja começando.</p></details>
  <details><summary>Já posso me inscrever?</summary><p>O formulário desta prévia demonstra como será a inscrição. O envio de edições ainda não está conectado.</p></details>
</div>
</section>
<section className="final-scene">
<div className="final-copy"><h2>Receba a For Builders.</h2><a className="dark-link" href="#inscricao">Entrar na lista</a></div>
<div className="landscape" aria-hidden="true"><img src={asset('horizonte.png')} alt="" loading="lazy" /><img src={asset('nuvens.png')} alt="" loading="lazy" /><img src={asset('templo.png')} alt="" loading="lazy" /><img className="landscape-logo" src={asset('logo-transparent.png')} alt="" loading="lazy" /><img src={asset('primeiro-plano.png')} alt="" loading="lazy" /></div>
</section>
</main>
<footer className="footer wrap"><a className="footer-brand" href="#" aria-label="For Builders, início"><img className="brand-image" src={asset('logo-transparent.png')} alt="" /></a><p>Para quem está construindo algo.</p><a href="#inscricao">Voltar ao topo</a></footer>

</>); }
