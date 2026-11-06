import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { Project } from "@shared/schema";

type PublicProject = Omit<Project, "createdAt">;
declare const __PORTFOLIO_PROJECTS__: PublicProject[] | null;

// GET /api/projects
export function useProjects() {
  const projects = __PORTFOLIO_PROJECTS__;
  return useQuery({
    queryKey: [api.projects.list.path],
    initialData: projects ?? undefined,
    enabled: projects === null,
    queryFn: async () => {
      const res = await fetch(api.projects.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch projects");
      return api.projects.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/projects/:id
export function useProject(id: number) {
  const projects = __PORTFOLIO_PROJECTS__;
  return useQuery({
    queryKey: [api.projects.get.path, id],
    initialData: projects ? (projects.find((project) => project.id === id) ?? null) : undefined,
    queryFn: async () => {
      const url = buildUrl(api.projects.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch project");
      return api.projects.get.responses[200].parse(await res.json());
    },
    enabled: projects === null && !!id,
  });
}
