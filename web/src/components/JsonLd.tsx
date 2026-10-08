interface JsonLdProps {
  data: Record<string, unknown>;
}

/* `<` devient \u003c pour qu'une chaîne venant du CMS ne puisse pas fermer la balise script. */
function serialize(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD doit être inséré brut ; le contenu est échappé par serialize().
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(data) }} />
  );
}
