import { render } from '@testing-library/react'
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { ReactNode } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Import the necessary components from React Router DOM v6.

const customRender = (component: ReactNode, mocks: ReadonlyArray<MockedResponse>) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={component} />
          <Route path="/create" element={<div>Create Page</div>} />
          <Route path="/update/:id" element={<div>Update Page</div>} />
        </Routes>
      </MemoryRouter>
    </MockedProvider>
  )
}

export * from '@testing-library/react'
export { customRender as render }
