import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';
import { useAPI } from '../providers/APIProvider';
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from '../providers/AuthProvider';
import { showToast } from '../services/helper';

const Register = () => {
  const { setToken, signup } = useAPI();
  const { setUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    signup({ name, email, password, password_confirmation: passwordConfirmation })
      .then((response) => {
        const data = response.data;
        setToken(data.token);
        setUser(data.user);
        showToast('Account created.', "We've created your account for you.", 'success');
      })
      .catch((error) => {
        setErrors(error?.response?.data?.errors || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const hasError = (key) => {
    let hasError = false;
    let errorMessage = null;
    if (errors?.length) {
      const error = Array.from(errors).find(e => e.param === key);
      if (error?.msg?.length) {
        hasError = true;
        errorMessage = error.msg;
      }
    }
    return { hasError, errorMessage };
  };

  return (
    <Box maxW="md" mx="auto" mt="8" borderWidth='1px' borderRadius='lg' p='6'>
      <Heading as='h4' size='md' mb={30}>
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit} style={{ minWidth: 300 }}>
        <FormControl id="name" isRequired isInvalid={hasError('name').hasError}>
          <FormLabel>Full Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {hasError('name').hasError ? (
            <FormErrorMessage>{hasError('name').errorMessage}</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl id="email" isRequired isInvalid={hasError('email').hasError}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {hasError('email').hasError ? (
            <FormErrorMessage>{hasError('email').errorMessage}</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl id="password" mt="4" isRequired isInvalid={hasError('password').hasError || hasError('password_confirmation').hasError}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {!(hasError('password').hasError || hasError('password_confirmation').hasError) ? (
            <FormHelperText>
              Password must be 8 characters long
            </FormHelperText>
          ) : (
            <FormErrorMessage>{hasError('password').errorMessage || hasError('password_confirmation').errorMessage}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="password_confirmation" mt="4" isRequired isInvalid={hasError('password_confirmation').hasError}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          mt="8"
          isLoading={isLoading}
          loadingText="Signing Up..."
        >
          Sign Up
        </Button>
        <Box mt="5">
          <Text fontSize='md'>
            Already have an account?{' '}
            <Link as={RouterLink} color='teal.500' to='/login'>
              Log in Here
            </Link>
          </Text>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
