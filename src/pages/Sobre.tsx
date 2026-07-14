const Sobre = () => {
  return (
    <section aria-labelledby="sobre-titulo" className="container max-w-3xl py-12 md:py-16">
      <article>
        <h1 id="sobre-titulo" className="mb-3 text-3xl text-primary-dark sm:text-4xl md:text-5xl">
          Sobre a EcoTech
        </h1>
        <div
          aria-hidden="true"
          className="mb-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-primary to-highlight"
        />
        <div className="space-y-4 text-base leading-relaxed text-foreground/85 sm:text-lg">
          <p>
            A EcoTech é uma plataforma desenvolvida para facilitar o descarte correto de resíduos
            eletrônicos e incentivar práticas sustentáveis. Por meio de uma interface simples e
            intuitiva, os usuários podem localizar pontos de coleta próximos, obter informações
            sobre os materiais aceitos e contribuir para a preservação do meio ambiente.
          </p>
          <p>
            Nosso objetivo é conectar pessoas a soluções de reciclagem, reduzindo o impacto
            ambiental causado pelo descarte inadequado de equipamentos eletrônicos, pilhas,
            baterias e outros resíduos tecnológicos. Com a EcoTech, reciclar torna-se mais fácil,
            acessível e eficiente, promovendo a conscientização ambiental e a construção de um
            futuro mais sustentável para todos.
          </p>
          <p>Junte-se a nós e contribua para um planeta mais limpo e eficiente!</p>
        </div>
      </article>
    </section>
  );
};

export default Sobre;
