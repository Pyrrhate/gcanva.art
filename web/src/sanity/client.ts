// @ts-nocheck
import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url"; // Changement ici

export const client = createClient({
  projectId: "l3lfckoz",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// On utilise le nouveau constructeur recommandé
const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}