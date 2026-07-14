/** Horário de funcionamento semanal. `days` usa 0 = domingo … 6 = sábado. */
export type WeeklyHours = {
  days: number[];
  opens: string; // "HH:MM"
  closes: string; // "HH:MM"
};

export type OpenStatus = {
  isOpen: boolean;
  label: string;
};

const DAY_NAMES = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/**
 * Calcula se o ponto está aberto agora e monta um rótulo amigável:
 * "Aberto agora · fecha às 18:00" ou "Fechado · abre qui às 07:00".
 * Retorna null quando o ponto não tem horário estruturado (ex.: eventos).
 */
export function getOpenStatus(hours: WeeklyHours | undefined, now: Date = new Date()): OpenStatus | null {
  if (!hours || hours.days.length === 0) return null;

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const today = now.getDay();
  const opens = toMinutes(hours.opens);
  const closes = toMinutes(hours.closes);

  if (hours.days.includes(today) && nowMinutes >= opens && nowMinutes < closes) {
    return { isOpen: true, label: `Aberto agora · fecha às ${hours.closes}` };
  }

  // Procura a próxima abertura nos próximos 7 dias (inclui hoje mais cedo/semana que vem)
  for (let offset = 0; offset <= 7; offset++) {
    const day = (today + offset) % 7;
    if (!hours.days.includes(day)) continue;
    if (offset === 0 && nowMinutes >= opens) continue; // hoje já passou do horário

    const dayLabel = offset === 0 ? "hoje" : offset === 1 ? "amanhã" : DAY_NAMES[day];
    return { isOpen: false, label: `Fechado · abre ${dayLabel} às ${hours.opens}` };
  }

  return { isOpen: false, label: "Fechado" };
}
