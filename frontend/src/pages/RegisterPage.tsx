import Logo from '../assets/logo.png'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import Loader from '../components/Loader';
import { registerRequest } from '../api/user';
import { useMutation } from "@tanstack/react-query";
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/auth';

const RegisterPage = () => {
  
  const navigate = useNavigate();
  const { isAuth } = useAuthStore()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const registerMutation = useMutation({
    mutationFn:() => registerRequest(email, username, password), 
    onSuccess: () => {
      toast.success("Registro Exitoso!")
      navigate("/login");
    },
    onError: (error:any) => {
      console.error("Error from server:", error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error);
      }else if (error.response && error.response.status === 500) {
        console.error("Server error details:", error.response.data);
        toast.error("Error interno del servidor. Por favor, intenta de nuevo más tarde.");
      } 
       else {
        toast.error("Hubo un error, intenta de nuevo");
      }
    },
  });

  const match = () => {
    if (password !== rePassword) {
      return false;
    } else { 
      return true;
    }
  }


  const isFormValid = () => {
    return email.trim() !== '' && username.trim() !== '' && password.trim() !== '' && rePassword.trim() !== '' && match();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid()) {
      toast.error('Por favor, completa todos los campos correctamente.');
    } else {
      registerMutation.mutate();
    }
  };

  if(registerMutation.isLoading) return <Loader/>
  if(isAuth) return (<Navigate to='/'/>)  

  return (
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[800px] lg:py-0">
        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src={Logo} alt="logo"/>
          <span>CCTV360</span>
        </Link>
        <div className="w-full md:w-[400px] lg:w-[500px] bg-slate-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crear una nueva cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo Electronico </label>
                <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nombre@company.com"/>
              </div>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de Usuario</label>
                <input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre De Usuario"/>
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              </div>
              <div>
                <label htmlFor="re-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar Contraseña</label>
                <input 
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                type="password" name="re-password" id="re-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              </div>
            {match() ? false : <p className="text-sm font-medium text-red-500">Las contraseñas deben coincidir</p>}
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Únete</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              ¿Tienes una cuenta? <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Inicia Sesion</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
  )
}

export default RegisterPage
