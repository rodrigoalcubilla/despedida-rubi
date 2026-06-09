import { Challenge, formatCardNumber, TOTAL_CARDS } from "@/lib/cards";
import { DogSvg } from "./DogSvg";

type ChallengeCardProps = {
  challenge: Challenge;
  used?: boolean;
  compact?: boolean;
};

export function ChallengeCard({ challenge, used = false, compact = false }: ChallengeCardProps) {
  const number = formatCardNumber(challenge.id);
  const sizeClass =
    challenge.size === "sm" ? "sm" : challenge.size === "xs" ? "xs" : "";

  return (
    <section
      className={`card ${challenge.theme}${used ? " card-used" : ""}${compact ? " card-compact" : ""}`}
      aria-label={`Tarjeta ${number}${used ? ", usada" : ""}`}
    >
      {used && (
        <div className="used-badge" aria-hidden="true">
          USADA
        </div>
      )}
      <div className="frame" />
      <div className="corner tl">♛</div>
      <div className="top">
        <div className="stamp">
          Despedida
          <small>Rubi · Le Roi</small>
        </div>
        <div className="count">
          <b>{number}</b>
          <span>/ {TOTAL_CARDS}</span>
        </div>
      </div>
      <div className="body">
        <div className="ghost-num">{number}</div>
        <div className="kicker">Reto</div>
        <h1
          className={`challenge ${sizeClass}`}
          dangerouslySetInnerHTML={{ __html: challenge.text }}
        />
      </div>
      <div className="foot">
        <DogSvg />
        <div className="tagline">{challenge.tagline}</div>
      </div>
    </section>
  );
}
