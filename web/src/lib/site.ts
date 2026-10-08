export const CARNET_URL = "https://carnet.gcanva.art";
export const PORTAL_URL = "https://www.gcanva.art";
export const STUDIO_URL = "https://studio.gcanva.art";

/* Même identifiant que sur www.gcanva.art : c'est lui qui relie les trois sites dans le graphe. */
export const PERSON_ID = `${PORTAL_URL}/#guillaume-canva`;

export const AUTHOR = {
  name: "Guillaume Canva",
  jobTitle: "Développeur web et artiste visuel",
  locality: "Tournai",
  country: "BE",
} as const;

export function normalizeSiteUrl(siteUrl?: string | null) {
  const candidate = siteUrl?.trim();
  if (!candidate) return CARNET_URL;
  try {
    return new URL(candidate).origin;
  } catch {
    return CARNET_URL;
  }
}

export function toExcerpt(text?: string | null, maxLength = 160) {
  const normalized = (text || "").replace(/\s+/g, " ").trim();
  if (!normalized) return "";
  if (normalized.length <= maxLength) return normalized;

  const cut = normalized.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

export function hasBody(text?: string | null) {
  return (text || "").trim().length > 0;
}
