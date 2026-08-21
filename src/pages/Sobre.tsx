const equipe = [
  {
    nome: "Isabela Brandão",
    funcao: "Desenvolvimento e organização do projeto",
    foto: "src/assets/Equipe-1.jpeg",
  },
  {
    nome: "Pedro Lucas Gonçalves",
    funcao: "Desenvolvimento do projeto",
    foto: "src/assets/equipe-2.jepg",
  },
  {
    nome: "Maria Luíza Tavares",
    funcao: "Desenvolvimento e organização do projeto",
    foto: "src/assets/equipe-3.jepg",
  },
];

const Sobre = () => {
  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="bg-primary-dark px-6 py-16 text-center text-primary-foreground md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-light">
            Sobre o EcoTech
          </p>

          <h1 className="mb-5 text-4xl font-bold md:text-5xl">
            Tecnologia para um futuro mais sustentável
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed opacity-90 md:text-lg">
            O EcoTech nasceu com o objetivo de unir tecnologia, sustentabilidade
            e conscientização para ajudar no descarte e na reutilização de
            equipamentos eletrônicos.
          </p>
        </div>
      </section>

      {/* Sobre o projeto */}
      <section className="container px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Nosso projeto
            </p>

            <h2 className="mb-5 text-3xl font-bold text-primary-dark md:text-4xl">
              O que é o EcoTech?
            </h2>

            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                O EcoTech é uma plataforma desenvolvida para incentivar o
                descarte correto de resíduos eletrônicos e facilitar o acesso
                a informações sobre sustentabilidade.
              </p>

              <p>
                A proposta também inclui um marketplace de eletrônicos
                recicláveis, permitindo que equipamentos que ainda possuem
                utilidade possam ser reutilizados em vez de simplesmente
                descartados.
              </p>

              <p>
                Dessa forma, o projeto busca contribuir para a redução do lixo
                eletrônico e incentivar práticas mais conscientes de consumo,
                reutilização e descarte.
              </p>
            </div>
          </div>

          {/* Destaque visual */}
          <div className="flex min-h-[280px] items-center justify-center rounded-2xl bg-primary/10 p-8 shadow-[var(--shadow-soft)]">
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-4xl">
                ♻️
              </div>

              <h3 className="mb-2 text-2xl font-bold text-primary-dark">
                Tecnologia + Sustentabilidade
              </h3>

              <p className="mx-auto max-w-sm text-sm text-muted-foreground">
                Pequenas atitudes podem contribuir para um futuro mais
                sustentável.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objetivo */}
      <section className="bg-muted/40 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Nosso objetivo
          </p>

          <h2 className="mb-5 text-3xl font-bold text-primary-dark md:text-4xl">
            Por que criamos o EcoTech?
          </h2>

          <p className="text-base leading-relaxed text-foreground/80 md:text-lg">
            A tecnologia está cada vez mais presente no nosso dia a dia, mas o
            descarte inadequado de equipamentos eletrônicos continua sendo um
            problema. Pensando nisso, criamos o EcoTech como uma solução
            digital para aproximar as pessoas de práticas mais sustentáveis e
            incentivar a reutilização e o descarte responsável.
          </p>
        </div>
      </section>

      {/* Equipe */}
      <section className="container px-6 py-16 md:py-20">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Nossa equipe
          </p>

          <h2 className="mb-4 text-3xl font-bold text-primary-dark md:text-4xl">
            Quem está por trás do EcoTech?
          </h2>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            O projeto foi desenvolvido em equipe, unindo diferentes ideias,
            conhecimentos e habilidades para transformar uma proposta em uma
            aplicação funcional.
          </p>
        </div>

        {/* Cards da equipe */}
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {equipe.map((integrante) => (
            <article
              key={integrante.nome}
              className="overflow-hidden rounded-2xl bg-card text-center shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-elevated)]"
            >
              {/* Espaço para a foto */}
              <div className="flex h-72 w-full items-center justify-center overflow-hidden bg-primary/10">
                <img
                  src={integrante.foto}
                  alt={`Foto de ${integrante.nome}`}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Informações */}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-primary-dark">
                  {integrante.nome}
                </h3>

                <p className="text-sm font-medium text-primary">
                  {integrante.funcao}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Encerramento */}
      <section className="bg-primary-dark px-6 py-16 text-center text-primary-foreground md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-5 text-3xl font-bold md:text-4xl">
            Nosso propósito
          </h2>

          <p className="text-base leading-relaxed opacity-90 md:text-lg">
            Mais do que desenvolver uma aplicação, queremos mostrar como a
            tecnologia pode ser utilizada para criar soluções que contribuam
            para a sociedade e para o meio ambiente.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Sobre;
