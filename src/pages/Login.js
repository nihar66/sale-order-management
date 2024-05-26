// src/pages/Login.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (data) => {
    if (data.username === 'admin' && data.password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      toast({
        title: 'Invalid credentials',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input {...register('username')} placeholder="Enter your username" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" {...register('password')} placeholder="Enter your password" />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">Login</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
