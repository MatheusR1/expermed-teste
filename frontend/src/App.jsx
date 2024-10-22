import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import client from './apollo/apolo-client';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
