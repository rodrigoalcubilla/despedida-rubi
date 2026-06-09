export type ChallengeSize = "" | "sm" | "xs";

export type Challenge = {
  id: number;
  text: string;
  size: ChallengeSize;
  theme: "theme-blue" | "theme-red" | "theme-cream";
  tagline: string;
};

const RETOS: { text: string; size: ChallengeSize }[] = [
  { text: "Consigue el <span class='hl'>número de una chica soltera</span>", size: "" },
  { text: "Hazte un <span class='hl'>selfie con un policía</span> (con cara de inocente)", size: "sm" },
  { text: "Que un <span class='hl'>camarero te invite a un chupito</span>", size: "" },
  { text: "Súbete a algo alto y proclama que eres <span class='hl'>el rey del mundo</span>", size: "sm" },
  { text: "Baila <span class='hl'>agarrado</span> una canción entera con una desconocida", size: "sm" },
  { text: "Consigue que una mesa entera <span class='hl'>brinde por Rubi</span>", size: "" },
  { text: "Declárale tu amor a una desconocida <span class='hl'>en francés</span> (invéntatelo)", size: "sm" },
  { text: "Que <span class='hl'>5 personas te llamen «Su Majestad»</span> el resto de la noche", size: "sm" },
  { text: "Enseña la foto más cuqui de <span class='hl'>tu teckel</span> y consigue 3 «oooh»", size: "sm" },
  { text: "Pide al camarero <span class='hl'>el plato con más pescado</span>… y grita que eres alérgico", size: "xs" },
  { text: "Consigue <span class='hl'>5 abrazos</span> de desconocidos", size: "" },
  { text: "Convence a alguien para que te lleve <span class='hl'>a caballito</span> por el local", size: "sm" },
  { text: "Imita a tu <span class='hl'>teckel persiguiéndose la cola</span> en la pista", size: "sm" },
  { text: "Que alguien te haga un <span class='hl'>baile sexy</span>", size: "" },
  { text: "Encuentra a otro <span class='hl'>«Rubi»</span> o alguien con tu mismo nombre", size: "sm" },
  { text: "Pídele a una pareja mayor su <span class='hl'>mejor consejo de boda</span>", size: "sm" },
  { text: "Hazte una <span class='hl'>corona</span> con lo que encuentres y llévala una hora", size: "sm" },
  { text: "Canta <span class='hl'>una canción en francés</span> (inventado) en mitad de la calle", size: "sm" },
  { text: "Hazte una foto con una <span class='hl'>mujer casada</span> enseñando su anillo", size: "sm" },
  { text: "Dale un <span class='hl'>susto a un desconocido</span> y pide perdón con acento francés", size: "sm" },
];

const TAGS = [
  "Le roi du monde",
  "Por orden real",
  "Vive le Rubi",
  "Avec amour, le teckel",
  "Cuidado: alérgico al pescado",
  "Lo ordena Su Majestad",
];

const THEMES = ["theme-blue", "theme-red", "theme-cream"] as const;

export const TOTAL_CARDS = RETOS.length;

export const CHALLENGES: Challenge[] = RETOS.map((reto, index) => ({
  id: index + 1,
  text: reto.text,
  size: reto.size,
  theme: THEMES[index % THEMES.length],
  tagline: TAGS[index % TAGS.length],
}));

export function formatCardNumber(id: number): string {
  return String(id).padStart(2, "0");
}

export function pickRandomUnused(usedIds: Set<number>): Challenge | null {
  const available = CHALLENGES.filter((c) => !usedIds.has(c.id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}
