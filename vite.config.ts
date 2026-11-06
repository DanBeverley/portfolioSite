import { readFileSync } from "node:fs";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { z } from "zod";

const publicUrl = z.string().url().refine(
  (value) => /^https?:\/\//i.test(value),
  "Expected a public HTTP or HTTPS URL",
);
const projectsSchema = z.array(z.object({
  id: z.number().int().positive(),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  imageUrl: z.union([publicUrl, z.string().regex(/^\/(?![/\\])/)]),
  projectUrl: publicUrl.nullable(),
  repoUrl: publicUrl.nullable(),
  tags: z.array(z.object({ name: z.string().trim().min(1), url: publicUrl })).nullable(),
})).nonempty().refine(
  (projects) => new Set(projects.map(({ id }) => id)).size === projects.length,
  "Expected unique project IDs",
);

function portfolioHosting(): Plugin {
  let projects: z.infer<typeof projectsSchema> | null = null;
  return {
    name: "portfolio-hosting",
    config(_, { mode }) {
      const isAmplify = mode === "amplify";
      const projectRoot = import.meta.dirname;
      projects = isAmplify
        ? projectsSchema.parse(JSON.parse(readFileSync(
          path.join(projectRoot, "portfolio-projects.json"),
          "utf8",
        )))
        : null;
      const configuredEndpoint = isAmplify
        ? loadEnv(mode, projectRoot).VITE_CONTACT_ENDPOINT
        : undefined;
      const contactEndpoint = isAmplify
        ? (configuredEndpoint ? z.string().url().startsWith("https://").parse(configuredEndpoint) : null)
        : "/api/contact";

      return {
        define: {
          __PORTFOLIO_PROJECTS__: JSON.stringify(projects),
          __CONTACT_ENDPOINT__: JSON.stringify(contactEndpoint),
        },
      };
    },
    generateBundle: {
      order: "post",
      handler(_, bundle) {
        if (!projects) return;
        const index = bundle["index.html"];
        if (!index || index.type !== "asset") this.error("Portfolio entry HTML is missing");
        for (const { id } of projects) {
          this.emitFile({ type: "asset", fileName: `project/${id}.html`, source: index.source });
        }
      },
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    portfolioHosting(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
