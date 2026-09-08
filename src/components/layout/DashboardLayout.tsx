import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FolderKanban, Bell, LogOut, Menu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout() {
  const location = useLocation();
  
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Mis Proyectos", path: "/projects", icon: FolderKanban },
    { name: "Notificaciones", path: "/notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-zinc-200">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">TaskFlow</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link key={item.name} to={item.path}>
                <span className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}>
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-200">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start text-zinc-600 hover:text-zinc-900">
              <LogOut className="w-5 h-5 mr-3" />
              Cerrar Sesión
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar - Mobile & Header */}
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center md:hidden">
            {/* Aquí luego agregaremos el componente Sheet de shadcn para el menú móvil */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-6 h-6 text-zinc-600" />
            </Button>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center ml-2">
              <Zap className="text-white w-5 h-5" />
            </div>
          </div>
          
          <div className="flex-1" /> {/* Spacer */}
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-zinc-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
              AR
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
