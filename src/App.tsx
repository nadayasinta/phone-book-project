import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import CreateContact from './pages/CreateContact';
import UpdateContact from './pages/UpdateContact';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import styled from '@emotion/styled';

const Page = styled.div({
  height: '100vh',
  backgroundColor: '#f8f9fc',
  color: '#323232',
  '*': {
    boxSizing: 'border-box',
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/create',
    element: <CreateContact />,
  },
  {
    path: '/update/:id',
    element: <UpdateContact />,
  },
]);

function App() {
  return (
    <Page>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </Page>
  );
}

export default App;
