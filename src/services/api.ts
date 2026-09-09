import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

// Crear instancia base de Axios apuntando a tu API Gateway
const api = axios.create({
  // En desarrollo usaremos el puerto 3000 por defecto para el backend, 
  // pero lo hacemos configurable vía variables de entorno.
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Peticiones: 
// Se ejecuta ANTES de que cualquier petición salga de nuestro frontend.
// Aquí inyectamos el Token JWT (si existe) para comprobar quiénes somos.
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Respuestas:
// Podríamos atrapar errores 401 (No autorizado) globalmente 
// para desloguear al usuario automáticamente si su token expiró.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Si el token expira, limpiamos el estado y forzamos re-login
      useAuthStore.getState().logout();
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;
