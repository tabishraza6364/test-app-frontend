import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
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

const Login = () => {
  const { setToken, signin } = useAPI();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    signin({ email, password })
      .then((response) => {
        const data = response.data;
        setToken(data.token);
        setUser(data.user);
        showToast('Logged In.', '', 'success');
      })
      .catch((error) => {
        setError(error?.response?.data?.error || error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box maxW="md" mx="auto" mt="8" borderWidth='1px' borderRadius='lg' p='6'>
      <Heading as='h4' size='md' mb={30}>
        Login
      </Heading>
      <form onSubmit={handleSubmit} style={{ minWidth: 300 }}>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormControl>
        <FormControl id="password" mt="4" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        {error && (
          <Box color="red.500" mt="4">
            <Heading as='h5' size='sm'>
              {error}
            </Heading>
          </Box>
        )}
        <Button
          type="submit"
          colorScheme="blue"
          mt="8"
          isLoading={isLoading}
          loadingText="Logging in..."
        >
          Login
        </Button>
        <Box mt="5">
          <Text fontSize='md'>
            Don't have an account?{' '}
            <Link as={RouterLink} color='teal.500' to='/register'>
              Sign Up Here
            </Link>
          </Text>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
