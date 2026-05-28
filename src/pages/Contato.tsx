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
    "w-full rounded-md border-2 border-secondary bg-card p-3 text-foreground transition-colors focus:border-primary focus:outline-none";

  return (
    <section className="container max-w-2xl py-12 md:py-16">
      <h1 className="mb-3 text-3xl text-primary-dark sm:text-4xl md:text-5xl">Fale Conosco</h1>
      <p className="mb-6 flex flex-wrap items-center gap-2 text-sm text-foreground/80 sm:text-base md:mb-8">
        <Mail className="h-4 w-4 shrink-0 text-primary" />
        <span>
          Ou envie um e-mail para <strong className="break-all">administracao.ecotech@gmail.com</strong>
        </span>
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl bg-card p-4 shadow-[var(--shadow-soft)] sm:p-6">
        <input type="text" name="name" placeholder="Seu nome" required className={inputCls} />
        <input type="email" name="email" placeholder="Seu e-mail" required className={inputCls} />
        <textarea name="message" placeholder="Sua mensagem" required rows={5} className={inputCls} />

        <div>
          <label htmlFor="file" className="mb-2 block text-sm font-medium text-foreground/80">
            Anexar arquivo (opcional):
          </label>
          <input
            type="file"
            name="file"
            id="file"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            className="block w-full text-sm text-foreground/80 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:font-semibold file:text-primary-foreground hover:file:bg-primary-dark"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-dark disabled:opacity-60"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </section>
  );
};

export default Contato;
