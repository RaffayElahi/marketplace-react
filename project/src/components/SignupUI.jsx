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
import axiosConfig from '../lib/axiosConfig'
import { useMutation } from 'react-query';


export default function SignupUI() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState(''); // State for success/error messages
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate()
  const mutation = useMutation(data => {
    return axiosConfig.post('/api/auth/signup', data);
  }, {
    onSuccess: (data) => {
        reset()
        console.log('Signup successful:', data);
        navigate('/verify-email')
    },
    onError: (error) => {
        reset()
        setMessageType('error')
        setMessage(error.response.data.message)
        console.error('Signup error:', error);
    }
  });

  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(SignupSchema)
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
    <div className="w-full flex flex-col h-[90vh] lg:grid lg:h-[90vh] lg:grid-cols-2">
      <div className="flex h-full items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Signup</h1>
            <p className="text-balance text-muted-foreground">
              Create a new account by filling in the details below.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register('name')}
                error={!!errors.name}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="me@example.com"
                {...register('email')}
                error={!!errors.email}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
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
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div className="grid gap-2">
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
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" className="w-full uppercase" disabled={mutation.isLoading}>
              {(mutation.isLoading)? 'Signing up ...': 'Sign up'} 
            </Button>
            {message && (
              <div className={`mt-4 text-center text-sm ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>
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
      
      <div className="bg-muted h-[40vh] flex items-center justify-center border-t border-b border-black lg:h-[90vh] lg:border-t-0 lg:border-b-0 lg:border-l">
        <img
          src="/signupimg.jpg"
          alt="Signup Background"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}