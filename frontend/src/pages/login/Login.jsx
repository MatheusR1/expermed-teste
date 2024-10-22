import { gql, useMutation } from '@apollo/client';
import { Box, Button, Heading, Input, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data.login.token) {
        localStorage.setItem('authToken', data.login.token);
        navigate('/kanban');
      }
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    login({ variables: { email, password } });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      bg="gray.100"
    >
      <Box w="sm" p={8} bg="white" boxShadow="lg" borderRadius="md">
        <Heading mb={6} textAlign="center">Login</Heading>
        <form onSubmit={handleLogin}>
          <Stack spacing={4}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <Text color="red.500">Erro ao fazer login: {error.message}</Text>}
            <Button type="submit" colorScheme="teal" isLoading={loading} isDisabled={!email || !password}>
              Entrar
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
