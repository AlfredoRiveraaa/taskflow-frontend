import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Layout, MessageSquare, Zap, ArrowRight, Github } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">TaskFlow</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/auth/login">
              <Button variant="ghost" className="font-medium">Iniciar Sesión</Button>
            </Link>
            <Link to="/auth/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">Crear Cuenta</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm font-medium text-zinc-600 mb-4 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            TaskFlow v1.0 Ya Disponible
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 max-w-4xl leading-tight">
            Gestión ágil para equipos que <span className="text-blue-600">no pierden el tiempo</span>
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl">
            Centraliza proyectos, asigna tareas y visualiza el progreso en tiempo real. 
            La alternativa moderna y rápida a Jira o Trello.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link to="/auth/register">
              <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 gap-2">
                Comenzar gratis <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg gap-2">
              <Github className="w-5 h-5" /> Ver en GitHub
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white border-t border-zinc-200 py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Todo lo que necesitas para tu equipo</h2>
              <p className="text-lg text-zinc-600 mt-4">Construido con una arquitectura moderna de microservicios.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Layout className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Tableros Kanban</h3>
                <p className="text-zinc-600">Mueve tareas en tiempo real. Sincronización instantánea gracias a WebSockets.</p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Colaboración Activa</h3>
                <p className="text-zinc-600">Comentarios en vivo, subtareas y etiquetas personalizadas por proyecto.</p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Control de Sprints</h3>
                <p className="text-zinc-600">Planifica tus iteraciones, mide la velocidad del equipo y exporta reportes en PDF.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-400 py-12 text-center">
        <p>© 2026 TaskFlow. Proyecto de Portafolio - Arquitectura de Microservicios.</p>
      </footer>
    </div>
  );
}
