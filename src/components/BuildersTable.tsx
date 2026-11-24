const guests = [
  { name: "Arquimedes", field: "Matemática e engenharia" },
  { name: "Al-Jazari", field: "Mecanismos e autômatos" },
  { name: "Leonardo da Vinci", field: "Arte e invenção" },
  { name: "Ada Lovelace", field: "Origens da programação" },
  { name: "Santos Dumont", field: "Aviação" },
  { name: "Grace Hopper", field: "Linguagens de programação" },
  { name: "Katherine Johnson", field: "Matemática e missões espaciais" },
  { name: "Steve Jobs", field: "Computação pessoal e design" },
  { name: "Elon Musk", field: "Tecnologia espacial" },
  { name: "Fei-Fei Li", field: "Visão computacional" },
  { name: "Mark Zuckerberg", field: "Redes sociais" },
  { name: "Você", field: "A próxima cadeira é sua." },
];
const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export function BuildersTable() {
  return (
    <figure className="table-art">
      <div className="table-scene">
        <div className="table-scene-shadow" aria-hidden="true" />
        <div className="table-stage" role="img" aria-label="Uma mesa imaginária reúne inventores de várias épocas.">
          <img src={asset('base-vazia.png')} alt="" />
          {Array.from({ length: 19 }, (_, index) => (
            <img className="object-layer" key={index} src={asset(`table/object-${index + 1}.png`)} alt="" loading="lazy" />
          ))}
          {guests.map(({ name }, index) => (<img className="guest-layer" key={name} src={asset(`table/guest-${index + 1}.png`)} alt="" loading="lazy" />))}
          <img className="table-complete" src={asset('mesa.png')} alt="" />
        </div>
        <div className="guest-labels" aria-hidden="true">
          {guests.map(({ name, field }) => (
            <div className="guest-label" key={name}>
              <h3>{name}</h3>
              <p>{field}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption>Uma mesa imaginária. Uma vontade em comum.</figcaption>
    </figure>
  );
}
