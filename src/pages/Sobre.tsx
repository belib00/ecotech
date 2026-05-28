const Sobre = () => {
  return (
    <section className="container max-w-3xl py-12 md:py-16">
      <h1 className="mb-5 text-3xl text-primary-dark sm:text-4xl md:mb-6 md:text-5xl">Sobre a EcoTech</h1>
      <div className="space-y-4 text-base leading-relaxed text-foreground/85 sm:text-lg">
        <p>
          A EcoTech é um projeto dedicado à reutilização responsável de eletrônicos, incentivando o consumo consciente e
          sustentável.
        </p>
        <p>
          Nosso marketplace permite que qualquer pessoa anuncie e compre dispositivos e peças eletrônicas recicláveis,
          promovendo a economia circular.
        </p>
        <p>Junte-se a nós e contribua para um planeta mais limpo e eficiente!</p>
      </div>
    </section>
  );
};

export default Sobre;
