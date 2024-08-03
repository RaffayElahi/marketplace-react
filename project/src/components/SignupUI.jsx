import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SignupSchema from '../schemas/SignupSchema'; // Adjust the path accordingly
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/src/libs/ui/button';
import { Input } from '@/src/libs/ui/input';
import { Label } from '@/src/libs/ui/label';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axiosConfig from '../lib/axiosConfig';
import { useMutation } from 'react-query';
import { useToast } from "@/src/libs/ui/use-toast";

export default function SignupUI() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState(''); // State for success/error messages
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  const mutation = useMutation(
    (data) => axiosConfig.post('/api/auth/signup', data),
    {
      onSuccess: (data) => {
        toast({
          title: "Account created",
          description: "Your account has been created. Please verify your email before proceeding.",
          variant: "default",
        });
        reset();
        navigate('/verify-email');
      },
      onError: (error) => {
        reset();
        setMessageType('error');
        setMessage(error.response?.data?.message || error.message);
      },
    }
  );

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 w-full h-auto lg:h-[90vh] overflow-hidden">
      <div className="flex flex-col items-center justify-center py-8 lg:h-full lg:py-12 px-4 lg:px-8 lg:max-w-screen-lg mx-auto">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold">Signup</h1>
            <p className="text-sm lg:text-base text-muted-foreground mt-2">
              Create a new account by filling in the details below.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="John Doe"
                {...register('username')}
                error={!!errors.username}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="me@example.com"
                {...register('email')}
                error={!!errors.email}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
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
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                  error={!!errors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={handleToggleConfirmPassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" className="w-full uppercase" disabled={mutation.isLoading}>
              {mutation.isLoading ? 'Signing up ...' : 'Sign up'}
            </Button>
            {message && (
              <div className={`mt-4 text-center text-base ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                {message}
              </div>
            )}
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="relative h-[50vh] overflow-hidden bg-muted border-b border-black lg:border-t-0 lg:border-b-0 lg:border-l lg:h-full">
        <img
          src="/signupimg.jpg"
          alt="Signup Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
