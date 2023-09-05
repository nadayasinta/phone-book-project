import { render, screen, within, fireEvent } from '../test-utils';
import Home from '../pages/Home';
import { GET_CONTACTS, GET_TOTAL_CONTACT } from '../graphql/query';
import { DELETE_CONTACT } from '../graphql/mutation';
import { contactsSampleData } from './sample';

const favoriteListRequest = {
  request: {
    query: GET_CONTACTS,
    variables: { where: { id: { _eq: contactsSampleData[0].id } } },
  },
  result: { data: { contact: contactsSampleData.slice(0, 1) } },
};
const contactListRequest = {
  request: {
    query: GET_CONTACTS,
    variables: {
      order_by: [{ first_name: 'asc' }],
      limit: 10,
      offset: 0,
      where: { id: { _neq: contactsSampleData[0].id } },
    },
  },
  result: { data: { contact: contactsSampleData.slice(1, 2) } },
};
const paginationRequest = {
  request: {
    query: GET_TOTAL_CONTACT,
    variables: { where: { id: { _neq: contactsSampleData[0].id } } },
  },
  result: { data: { contact_aggregate: { aggregate: { count: 1 } } } },
};

const baseMocks = [favoriteListRequest, contactListRequest, paginationRequest];

const searchValue = 'User';
const searchContactRequest = {
  request: {
    query: GET_CONTACTS,
    variables: {
      order_by: [{ first_name: 'asc' }],
      where: {
        _or: [
          { first_name: { _ilike: `%${searchValue}%` } },
          { last_name: { _ilike: `%${searchValue}%` } },
        ],
      },
    },
  },
  result: { data: { contact: contactsSampleData.slice(0, 2) } },
};

const deleteContactRequest = {
  request: {
    query: DELETE_CONTACT,
    variables: {
      id: contactsSampleData[0].id,
    },
  },
  result: { data: { delete_contact_by_pk: { ...contactsSampleData[0] } } },
};

beforeEach(() => {
  localStorage.setItem('favoriteId', `${contactsSampleData[0].id}`);
});

describe('renders home page', () => {
  test('with data', async () => {
    render(<Home />, baseMocks);

    const favoriteList = screen.getByLabelText('favorite-container');
    const contactList = screen.getByLabelText('list-container');
    expect(
      await within(favoriteList).findByLabelText('loading')
    ).toBeTruthy();
    expect(
      await within(contactList).findByLabelText('loading')
    ).toBeTruthy();
    expect(
      await within(favoriteList).findAllByLabelText('card')
    ).toHaveLength(1);
    expect(
      await within(contactList).findAllByLabelText('card')
    ).toHaveLength(1);
    expect(screen.queryByLabelText('pagination')).toBeFalsy();
  });

  test('empty data', async () => {
    const mocks = [
      { ...favoriteListRequest, result: { data: { contact: [] } } },
      { ...contactListRequest, result: { data: { contact: [] } } },
      {
        ...paginationRequest,
        result: {
          data: { contact_aggregate: { aggregate: { count: 0 } } },
        },
      },
    ];
    render(<Home />, mocks);

    const favoriteList = screen.getByLabelText('favorite-container');
    const contactList = screen.getByLabelText('list-container');
    expect(
      await within(favoriteList).findByLabelText('loading')
    ).toBeTruthy();
    expect(
      await within(contactList).findByLabelText('loading')
    ).toBeTruthy();
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
      { ...favoriteListRequest, error: new Error('An error occurred') },
      { ...contactListRequest, error: new Error('An error occurred') },
      {
        ...paginationRequest,
        error: new Error('An error occurred'),
      },
    ];
    render(<Home />, mocks);

    const favoriteList = screen.getByLabelText('favorite-container');
    const contactList = screen.getByLabelText('list-container');
    expect(
      await within(favoriteList).findByLabelText('loading')
    ).toBeTruthy();
    expect(
      await within(contactList).findByLabelText('loading')
    ).toBeTruthy();
    expect(
      await within(favoriteList).findByText(
        'Something went wrong. Please try again later.'
      )
    ).toBeTruthy();
    expect(
      await within(contactList).findByText(
        'Something went wrong. Please try again later.'
      )
    ).toBeTruthy();
    expect(screen.queryByLabelText('pagination')).toBeFalsy();
  });
});

describe('home page actions', () => {
  test('should redirect to create page when click add button', () => {
    render(<Home />, baseMocks);

    fireEvent.click(screen.getByLabelText('add-button'));

    expect(screen.getByText('Create Page')).toBeTruthy();
  });

  test('should show correct contact list when fill search bar', async () => {
    const mocks = [...baseMocks, searchContactRequest, contactListRequest];
    render(<Home />, mocks);

    const contactList = screen.getByLabelText('list-container');
    expect(
      await within(contactList).findAllByLabelText('card')
    ).toHaveLength(1);

    fireEvent.click(screen.getByLabelText('search-button'));
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: searchValue },
    });

    expect(
      await within(contactList).findAllByLabelText('card')
    ).toHaveLength(2);
    expect(screen.queryByLabelText('favorite-container')).toBeFalsy();
    expect(screen.queryByLabelText('pagination')).toBeFalsy();

    fireEvent.click(screen.getByLabelText('cancel-button'));

    expect(
      await within(contactList).findAllByLabelText('card')
    ).toHaveLength(1);
  });

  test('should redirect to update page when click edit button', async () => {
    render(<Home />, baseMocks);

    const contactList = screen.getByLabelText('list-container');
    expect(
      await within(contactList).findAllByLabelText('card')
    ).toHaveLength(1);

    fireEvent.click(
      within(
        within(contactList).getAllByLabelText('card')[0]
      ).getByLabelText('edit-button')
    );

    expect(screen.getByText('Update Page')).toBeTruthy();
  });

  test('should remove contact when click delete button', async () => {
    const mocks = [
      ...baseMocks,
      deleteContactRequest,
      { ...favoriteListRequest, result: { data: { contact: [] } } },
      contactListRequest,
      paginationRequest,
    ];
    render(<Home />, mocks);

    const favoriteList = screen.getByLabelText('favorite-container');
    expect(
      await within(favoriteList).findAllByLabelText('card')
    ).toHaveLength(1);

    fireEvent.click(
      within(
        within(favoriteList).getAllByLabelText('card')[0]
      ).getByLabelText('delete-button')
    );

    expect(
      await within(favoriteList).findByText('Your favorite list is empty')
    ).toBeTruthy();
  });

  test('should remove contact from favorite when click favorite button on favorite contact', async () => {
    const mocks = [
      ...baseMocks,
      {
        request: {
          query: GET_CONTACTS,
          variables: { where: { id: { _eq: 0 } } },
        },
        result: { data: { contact: [] } },
      },
      {
        request: {
          query: GET_CONTACTS,
          variables: {
            order_by: [{ first_name: 'asc' }],
            limit: 10,
            offset: 0,
            where: { id: { _neq: 0 } },
          },
        },
        result: { data: { contact: contactsSampleData.slice(0, 2) } },
      },
      {
        request: {
          query: GET_TOTAL_CONTACT,
          variables: { where: { id: { _neq: 0 } } },
        },
        result: {
          data: { contact_aggregate: { aggregate: { count: 2 } } },
        },
      },
    ];
    render(<Home />, mocks);

    const favoriteList = screen.getByLabelText('favorite-container');
    const contactList = screen.getByLabelText('list-container');
    expect(
      await within(favoriteList).findAllByLabelText('card')
    ).toHaveLength(1);
    expect(
      await within(contactList).findAllByLabelText('card')
    ).toHaveLength(1);

    fireEvent.click(
      within(
        within(favoriteList).getAllByLabelText('card')[0]
      ).getByLabelText('favorite-button')
    );

    expect(
      await within(favoriteList).findByText('Your favorite list is empty')
    ).toBeTruthy();
    expect(
      await within(contactList).findAllByLabelText('card')
    ).toHaveLength(2);
  });

  test('should add contact to favorite when click favorite button on favorite contact', async () => {
    const mocks = [
      ...baseMocks,
      {
        request: {
          query: GET_CONTACTS,
          variables: {
            where: { id: { _eq: contactsSampleData[1].id } },
          },
        },
        result: { data: { contact: contactsSampleData.slice(1, 2) } },
      },
      {
        request: {
          query: GET_CONTACTS,
          variables: {
            order_by: [{ first_name: 'asc' }],
            limit: 10,
            offset: 0,
            where: { id: { _neq: contactsSampleData[1].id } },
          },
        },
        result: { data: { contact: contactsSampleData.slice(0, 1) } },
      },
      {
        request: {
          query: GET_TOTAL_CONTACT,
          variables: {
            where: { id: { _neq: contactsSampleData[1].id } },
          },
        },
        result: {
          data: { contact_aggregate: { aggregate: { count: 1 } } },
        },
      },
    ];
    render(<Home />, mocks);

    const favoriteList = screen.getByLabelText('favorite-container');
    const contactList = screen.getByLabelText('list-container');
    expect(
      await within(favoriteList).findAllByLabelText('card')
    ).toHaveLength(1);
    expect(
      await within(contactList).findAllByLabelText('card')
    ).toHaveLength(1);

    fireEvent.click(
      within(
        within(contactList).getAllByLabelText('card')[0]
      ).getByLabelText('favorite-button')
    );

    expect(
      await within(favoriteList).findAllByLabelText('card')
    ).toHaveLength(1);
    expect(
      await within(contactList).findAllByLabelText('card')
    ).toHaveLength(1);
  });

  test('should change page when click pagination button', async () => {
    localStorage.clear();
    const contactPage1Request = {
      request: {
        query: GET_CONTACTS,
        variables: {
          order_by: [{ first_name: 'asc' }],
          limit: 10,
          offset: 0,
          where: { id: { _neq: 0 } },
        },
      },
      result: { data: { contact: contactsSampleData.slice(0, 10) } },
    };
    const mocks = [
      {
        request: {
          query: GET_CONTACTS,
          variables: { where: { id: { _eq: 0 } } },
        },
        result: { data: { contact: [] } },
      },
      contactPage1Request,
      {
        request: {
          query: GET_TOTAL_CONTACT,
          variables: { where: { id: { _neq: 0 } } },
        },
        result: {
          data: {
            contact_aggregate: {
              aggregate: { count: contactsSampleData.length },
            },
          },
        },
      },
      {
        request: {
          query: GET_CONTACTS,
          variables: {
            order_by: [{ first_name: 'asc' }],
            limit: 10,
            offset: 10,
            where: { id: { _neq: 0 } },
          },
        },
        result: { data: { contact: contactsSampleData.slice(10, 12) } },
      },
      contactPage1Request,
    ];
    render(<Home />, mocks);

    const contactList = screen.getByLabelText('list-container');
    expect(
      await within(contactList).findAllByLabelText('card')
    ).toHaveLength(10);
    expect(await screen.findByLabelText('pagination')).toBeTruthy();
    expect(await screen.findByLabelText('prev-page')).toBeDisabled();
    expect(await screen.findByLabelText('next-page')).not.toBeDisabled();

    fireEvent.click(screen.getByLabelText('next-page'));

    expect(
      await within(contactList).findAllByLabelText('card')
    ).toHaveLength(2);
    expect(await screen.findByLabelText('prev-page')).not.toBeDisabled();
    expect(await screen.findByLabelText('next-page')).toBeDisabled();

    fireEvent.click(screen.getByLabelText('prev-page'));

    expect(
      await within(contactList).findAllByLabelText('card')
    ).toHaveLength(10);
  });
});
