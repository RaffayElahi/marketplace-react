import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import axiosConfig from '../lib/axiosConfig'; // Import your Axios config
import loginSchema from '../schemas/LoginSchema';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { MyContext } from '../context/context';
import { Link } from 'react-router-dom';
import { Button } from '@/src/libs/ui/button';
import { Input } from '@/src/libs/ui/input';
import { Label } from '@/src/libs/ui/label';
import { useNavigate } from 'react-router-dom';


export default function LoginUI() {
  const {setAuth, auth} = useContext(MyContext)
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginSchema)
  });
  const navigate = useNavigate()


  const mutation = useMutation({
    mutationFn: (data) => axiosConfig.post('/api/auth/login', data),
    onSuccess: (data) => {
      setAuth(data.data);
      console.log(auth)
      reset()
      navigate('/', { replace: true });
    },
    onError: (error) => {
      console.error('Login error:', error.response?.data?.message || error.message)
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full grid grid-rows-2 h-[90vh] lg:h-[90vh] lg:grid-rows-none lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email and password to login to your account.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email')}
                error={!!errors.email}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  error={!!errors.password}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full uppercase" disabled={mutation.isLoading}>
              {(mutation.isLoading)? 'Loging in ...': 'Log in'} 
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-muted flex items-center justify-center border-t border-b border-black lg:border-t-0 lg:border-b-0 lg:border-l">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] mb-10 sm:w-[430px]">
            <div className="grid gap-7 text-center">
              <h1 className="text-3xl font-bold text-center sm:text-left">Create an account</h1>
              <p className="text-balance text-center text-muted-foreground sm:text-left">
                Don&apos;t have an account?
              </p>
              <p className="text-balance text-center text-muted-foreground sm:text-left">
                By creating an account with our store, you will be able to move through the checkout process faster, view and track your orders, and more.
              </p>
              <Button type="button" onClick={()=>{navigate('/signup')}} className="w-full">
                Create an account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}