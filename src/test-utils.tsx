import { render } from '@testing-library/react'
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactNode } from 'react';

const customRender = (component: ReactNode, mocks: ReadonlyArray<MockedResponse>) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router>
        {component}
      </Router>
    </MockedProvider>
  )
}

export * from '@testing-library/react'
export { customRender as render }
