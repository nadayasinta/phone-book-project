import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import styled from '@emotion/styled';

const Page = styled.div({
  minHeight: '100vh',
  height: '100%',
  backgroundColor: '#F2F4F9',
  color: '#323232',
  '*': {
    boxSizing: 'border-box',
  },
});

const Home = lazy(() => import('./pages/Home'));
const CreateContact = lazy(() => import('./pages/CreateContact'));
const UpdateContact = lazy(() => import('./pages/UpdateContact'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/create',
    element: (
      <Suspense fallback={<Loading />}>
        <CreateContact />{' '}
      </Suspense>
    ),
  },
  {
    path: '/update/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <UpdateContact />{' '}
      </Suspense>
    ),
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
