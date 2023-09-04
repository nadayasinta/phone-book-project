import { render, screen, within } from '../test-utils';
import Home from '../pages/Home';
import { GET_CONTACTS, GET_TOTAL_CONTACT } from '../graphql/query';
import { contactsSampleData } from './sample'

const favoriteListRequest = {
  request: { query: GET_CONTACTS, variables: { where: { id: { _eq: 0 } } } },
  // request: { query: GET_CONTACTS, variables: { where: { id: { _eq: contactsSampleData[0].id } } } },
};
const contactListVariables = {
  order_by: [{ first_name: 'asc' }],
  limit: 10,
  offset: 0,
  where: { id: { _neq: 0 } },
}
const contactListRequest = {
  request: { query: GET_CONTACTS, variables: contactListVariables },
};
const paginationRequest = { request: { query: GET_TOTAL_CONTACT } };


describe('renders home page', () => {
  test('with data', async () => {
    const mocks = [
      { ...favoriteListRequest, result: { data: { contact: contactsSampleData.slice(0, 1) } } },
      { ...contactListRequest, result: { data: { contact: contactsSampleData.slice(1, 11) } } },
      {
        ...paginationRequest,
        result: { data: { contact_aggregate: { aggregate: { count: contactsSampleData.length - 1 } } } },
      },
    ];
    render(<Home />, mocks);

    const favoriteList = screen.getByLabelText('favorite-container');
    const contactList = screen.getByLabelText('list-container');
    expect(await within(favoriteList).findByLabelText('loading')).toBeTruthy();
    expect(await within(contactList).findByLabelText('loading')).toBeTruthy();
    expect(await within(favoriteList).findAllByLabelText('card')).toHaveLength(1);
    expect(await within(contactList).findAllByLabelText('card')).toHaveLength(10);
    expect(await screen.findByLabelText('pagination')).toBeTruthy();
    expect(await screen.findByLabelText('prev-page')).toBeDisabled();
    expect(await screen.findByLabelText('next-page')).not.toBeDisabled();
  });

  test('empty data', async () => {
    const mocks = [
      { ...favoriteListRequest, result: { data: { contact: [] } } },
      { ...contactListRequest, result: { data: { contact: [] } } },
      {
        ...paginationRequest,
        result: { data: { contact_aggregate: { aggregate: { count: 0 } } } },
      },
    ];
    render(<Home />, mocks);

    const favoriteList = screen.getByLabelText('favorite-container');
    const contactList = screen.getByLabelText('list-container');
    expect(await within(favoriteList).findByLabelText('loading')).toBeTruthy();
    expect(await within(contactList).findByLabelText('loading')).toBeTruthy();
    expect(
      await within(favoriteList).findByText('Your favorite list is empty')
    ).toBeTruthy();
    expect(
      await within(contactList).findByText('Your contact list is empty')
    ).toBeTruthy();
    expect(screen.queryByLabelText('pagination')).toBeFalsy();
  });

  test('error get data', async () => {
    const mocks = [
      { ...favoriteListRequest, error: new Error("An error occurred") },
      { ...contactListRequest, error: new Error("An error occurred") },
      {
        ...paginationRequest, error: new Error("An error occurred")
      },
    ];
    render(<Home />, mocks);

    const favoriteList = screen.getByLabelText('favorite-container');
    const contactList = screen.getByLabelText('list-container');
    expect(await within(favoriteList).findByLabelText('loading')).toBeTruthy();
    expect(await within(contactList).findByLabelText('loading')).toBeTruthy();
    expect(
      await within(favoriteList).findByText('Something went wrong. Please try again later.')
    ).toBeTruthy();
    expect(
      await within(contactList).findByText('Something went wrong. Please try again later.')
    ).toBeTruthy();
    expect(screen.queryByLabelText('pagination')).toBeFalsy();
  });
});
