import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import styled from '@emotion/styled';

const Page = styled.div({
  height: '100%',
  width: '100%',
  backgroundColor: '#f8f9fc',
  color: '#323232',
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/create',
    element: <Create />,
  },
]);

function App() {
  return (
    <Page>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
      ,
    </Page>
  );
}

export default App;
