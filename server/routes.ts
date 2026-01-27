import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./replit_integrations/auth";
import { isAuthenticated } from "./replit_integrations/auth/replitAuth";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth first
  await setupAuth(app);

  // Projects API
  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  // Protected Routes
  app.post(api.projects.create.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.projects.create.input.parse(req.body);
      const project = await storage.createProject(input);
      res.status(201).json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.put(api.projects.update.path, isAuthenticated, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const existing = await storage.getProject(id);
      if (!existing) {
        return res.status(404).json({ message: "Project not found" });
      }

      const input = api.projects.update.input.parse(req.body);
      const updated = await storage.updateProject(id, input);
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.projects.delete.path, isAuthenticated, async (req, res) => {
    const id = Number(req.params.id);
    const existing = await storage.getProject(id);
    if (!existing) {
      return res.status(404).json({ message: "Project not found" });
    }
    await storage.deleteProject(id);
    res.status(204).end();
  });

  // Seed data if empty
  const projects = await storage.getProjects();
  if (projects.length === 0) {
    console.log("Seeding database...");
    await storage.createProject({
      title: "AI Image Generator",
      description: "A deep learning model capable of generating photorealistic images from text descriptions. Built with PyTorch and React.",
      imageUrl: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=1000",
      projectUrl: "https://example.com",
      repoUrl: "https://github.com",
      tags: [
        { name: "Python", url: "https://www.python.org/" },
        { name: "PyTorch", url: "https://pytorch.org/" },
        { name: "React", url: "https://react.dev/" }
      ],
    });
    await storage.createProject({
      title: "Neural Network Visualizer",
      description: "Interactive 3D visualization of neural network architectures and activation maps in real-time.",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
      projectUrl: "https://example.com",
      repoUrl: "https://github.com",
      tags: [
        { name: "Three.js", url: "https://threejs.org/" },
        { name: "TypeScript", url: "https://www.typescriptlang.org/" }
      ],
    });
    await storage.createProject({
      title: "Autonomous Drone Swarm",
      description: "Control algorithms for coordinated movement of multiple drones in complex environments.",
      imageUrl: "https://images.unsplash.com/photo-1508614589041-895b8c9d7ef5?auto=format&fit=crop&q=80&w=1000",
      projectUrl: "https://example.com",
      repoUrl: "https://github.com",
      tags: [
        { name: "C++", url: "https://isocpp.org/" },
        { name: "ROS", url: "https://www.ros.org/" }
      ],
    });
    console.log("Database seeded!");
  }

  return httpServer;
}
