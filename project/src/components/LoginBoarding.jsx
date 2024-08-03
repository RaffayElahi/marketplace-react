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
import { useToast } from "@/src/libs/ui/use-toast";

export default function LoginUI() {
  const [error, setError] = useState('');
  const { toast } = useToast();
  const { setAuth } = useContext(MyContext);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginSchema)
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => axiosConfig.post('/api/auth/login', data),
    onSuccess: (data) => {
      setAuth(data.data);
      toast({
        title: "Login Successful",
        description: `Welcome back! You can now access your account and start shopping.`,
        variant: "default"
      });
      reset();
      navigate('/', { replace: true });
    },
    onError: (error) => {
      setError(error.response?.data?.message || error.message);
      reset();
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full h-auto  lg:h-[90vh] lg:grid lg:grid-cols-2 lg:gap-8 xl:min-h-[800px]">
      <div className="flex flex-col items-center justify-center py-8 lg:py-12 px-4 lg:px-8">
        <div className="max-w-sm w-full mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold">Login</h1>
            <p className="text-sm lg:text-base text-muted-foreground mt-2">
              Enter your email and password to login to your account.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email')}
                error={!!errors.email}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/" className="text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <div className="relative mt-2">
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
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full uppercase" disabled={mutation.isLoading}>
              {mutation.isLoading ? 'Logging in ...' : 'Log in'}
            </Button>
            {error && <p className="text-red-500 text-base mt-2">{error}</p>}
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="min-h-[50vh]  bg-muted flex items-center justify-center border-t border-b border-black lg:flex-col lg:border-t-0 lg:border-b-0 lg:border-l lg:items-start lg:justify-center p-8">
        <div className="max-w-sm w-full mx-auto">
          <div className="text-center">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">Create an account</h1>
            <p className="text-sm lg:text-base text-muted-foreground mb-4">
              Don&apos;t have an account? By creating an account with our store, you will be able to move through the checkout process faster, view and track your orders, and more.
            </p>
            <Button type="button" onClick={() => navigate('/signup')} className="w-full">
              Create an account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
