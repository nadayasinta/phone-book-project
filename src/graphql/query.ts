import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
    query GetContactList(
        $distinct_on: [contact_select_column!]
        $limit: Int
        $offset: Int
        $order_by: [contact_order_by!]
        $where: contact_bool_exp
    ) {
        contact(
            distinct_on: $distinct_on
            limit: $limit
            offset: $offset
            order_by: $order_by
            where: $where
        ) {
            created_at
            first_name
            id
            last_name
            phones {
                id
                number
            }
        }
    }
`;

export const GET_CONTACT = gql`
    query GetContactDetail($id: Int!) {
        contact_by_pk(id: $id) {
            created_at
            first_name
            id
            last_name
            phones {
                id
                number
            }
        }
    }
`;

export const GET_TOTAL_CONTACT = gql`
    query GetTotalContact($where: contact_bool_exp) {
        contact_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;

export const GET_EXISTS_CONTACT = gql`
    query GetExistsContact(
        $first_name: String!
        $last_name: String!
        $id: [Int!] = []
    ) {
        contact_aggregate(
            where: {
                first_name: { _ilike: $first_name }
                last_name: { _ilike: $last_name }
                id: { _nin: $id }
            }
        ) {
            aggregate {
                count
            }
        }
    }
`;
