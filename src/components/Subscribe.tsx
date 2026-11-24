import { useState, type FormEvent } from "react";

export function Subscribe() {
  const [status, setStatus] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Esta é uma prévia. As inscrições ainda não estão conectadas.");
  }
  return <form id="inscricao" className="subscribe" onSubmit={submit}>
    <label className="sr-only" htmlFor="email">Seu melhor e-mail</label>
    <div className="input-row"><input id="email" name="email" type="email" required autoComplete="email" placeholder="Seu melhor e-mail"/><button type="submit">Entrar na lista</button></div>
    <fieldset className="frequency"><legend>Quero receber</legend><label><input type="radio" name="frequency" value="diaria" defaultChecked/> Diária</label><label><input type="radio" name="frequency" value="resumo"/> Resumão</label><label><input type="radio" name="frequency" value="ambas"/> As duas</label></fieldset>
    <p className="form-note">Gratuita. Uma leitura de 5 minutos. Feita para quem faz.</p>
    <p id="form-status" role="status">{status}</p>
  </form>;
}
