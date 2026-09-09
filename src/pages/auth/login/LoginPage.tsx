import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
// import api from "@/services/api"; // Lo usaremos cuando el backend esté encendido

const formSchema = z.object({
  email: z.string().email({
    message: "Debe ser un correo electrónico válido.",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Aquí es donde normalmente harías:
    // const response = await api.post('/auth/login', values);
    // login(response.data.user, response.data.token);
    
    console.log("Valores enviados al backend:", values);
    
    // SIMULACIÓN: Logueando al usuario sin backend por ahora
    const mockUser = { 
      id: "1", 
      name: "Alfredo Rivera", // Este nombre aparecerá dinámicamente en tu Dashboard
      email: values.email 
    };
    const mockToken = "fake-jwt-token-12345";
    
    login(mockUser, mockToken);
    
    // Redirigir al dashboard protegido
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center items-center p-4">
      <Link to="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Zap className="text-white w-5 h-5" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-zinc-900">TaskFlow</span>
      </Link>

      <Card className="w-full max-w-md shadow-sm border-zinc-200">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-zinc-900">Iniciar Sesión</CardTitle>
          <CardDescription className="text-zinc-600">
            Ingresa tu correo electrónico y contraseña para acceder a tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-900">Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="tu@correo.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-900">Contraseña</FormLabel>
                    <FormControl>
                      <Input placeholder="••••••••" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Ingresar
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-zinc-500">o continúa con</span>
            </div>
          </div>
          <Button variant="outline" className="w-full gap-2">
            Google OAuth2 (Próximamente)
          </Button>
          <div className="text-sm text-zinc-600 mt-2">
            ¿No tienes cuenta?{" "}
            <Link to="/auth/register" className="text-blue-600 hover:underline font-medium">
              Regístrate aquí
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
