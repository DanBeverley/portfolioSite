import { useCreateProject } from "@/hooks/use-projects";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Loader2 } from "lucide-react";
import { AdminProjectForm } from "@/components/AdminProjectForm";
import { InsertProject } from "@shared/schema";
import { useEffect } from "react";

export default function CreateProject() {
  const { mutateAsync: createProject, isPending } = useCreateProject();
  const { user, isLoading: isAuthLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      window.location.href = "/api/login";
    }
  }, [user, isAuthLoading]);

  if (isAuthLoading || !user) {
    return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  }

  const handleSubmit = async (data: InsertProject) => {
    try {
      await createProject(data);
      setLocation("/admin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        
        <div className="bg-card border border-border rounded-xl shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-bold mb-6">Create New Project</h1>
          <AdminProjectForm onSubmit={handleSubmit} isSubmitting={isPending} />
        </div>
      </div>
    </div>
  );
}
