const DEFAULT_SANITY_PROJECT_ID = "y6mzxly0";
const DEFAULT_SANITY_DATASET = "production";
const DEFAULT_SANITY_API_VERSION = "2024-01-01";

function readEnv(value?: string) {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : undefined;
}

const projectId =
  readEnv(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) ??
  readEnv(process.env.SANITY_PROJECT_ID) ??
  DEFAULT_SANITY_PROJECT_ID;

const dataset =
  readEnv(process.env.NEXT_PUBLIC_SANITY_DATASET) ??
  readEnv(process.env.SANITY_DATASET) ??
  DEFAULT_SANITY_DATASET;

const apiVersion =
  readEnv(process.env.NEXT_PUBLIC_SANITY_API_VERSION) ??
  readEnv(process.env.SANITY_API_VERSION) ??
  DEFAULT_SANITY_API_VERSION;

const token = readEnv(process.env.SANITY_API_TOKEN);

export const sanityEnv = {
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: process.env.NODE_ENV === "production" && !token,
};
