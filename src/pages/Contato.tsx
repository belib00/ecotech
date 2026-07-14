import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Contato = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      toast.error("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("contact_messages")
      .insert({ name, email, message });
    setLoading(false);

    if (error) {
      toast.error("Não foi possível enviar a mensagem. Tente novamente.");
      return;
    }

    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    form.reset();
  };

  const inputCls =
    "w-full rounded-md border-2 border-secondary bg-card p-3 text-foreground transition-colors duration-300 hover:border-highlight/50 focus:border-primary focus:outline-none";
  const labelCls = "mb-1.5 block text-sm font-medium text-foreground/80";

  return (
    <section aria-labelledby="contato-titulo" className="container max-w-2xl py-12 md:py-16">
      <h1 id="contato-titulo" className="mb-3 text-3xl text-primary-dark sm:text-4xl md:text-5xl">
        Fale Conosco
      </h1>
      <div
        aria-hidden="true"
        className="mb-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-primary to-highlight"
      />
      <p className="mb-6 flex flex-wrap items-center gap-2 text-sm text-foreground/80 sm:text-base md:mb-8">
        <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <span>
          Ou envie um e-mail para{" "}
          <a
            href="mailto:administracao.ecotech@gmail.com"
            className="break-all font-bold transition-colors hover:text-primary hover:underline"
          >
            administracao.ecotech@gmail.com
          </a>
        </span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-xl bg-card p-4 shadow-[var(--shadow-soft)] sm:p-6"
      >
        <div>
          <label htmlFor="nome" className={labelCls}>
            Nome
          </label>
          <input
            type="text"
            name="name"
            id="nome"
            placeholder="Seu nome"
            required
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelCls}>
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Seu e-mail"
            required
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="mensagem" className={labelCls}>
            Mensagem
          </label>
          <textarea
            name="message"
            id="mensagem"
            placeholder="Sua mensagem"
            required
            rows={5}
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="file" className={labelCls}>
            Anexar arquivo (opcional):
          </label>
          <input
            type="file"
            name="file"
            id="file"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            className="block w-full text-sm text-foreground/80 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:font-semibold file:text-primary-foreground file:transition-colors hover:file:bg-primary-dark"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:bg-highlight hover:text-highlight-foreground hover:shadow-[var(--shadow-glow)] disabled:pointer-events-none disabled:opacity-60"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </section>
  );
};

export default Contato;
