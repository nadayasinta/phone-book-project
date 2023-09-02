import { gql } from '@apollo/client';

export const POST_CONTACT = gql`
    mutation AddContactWithPhones(
        $first_name: String!
        $last_name: String!
        $phones: [phone_insert_input!]!
    ) {
        insert_contact(
            objects: {
                first_name: $first_name
                last_name: $last_name
                phones: { data: $phones }
            }
        ) {
            returning {
                first_name
                last_name
                id
                phones {
                    number
                }
            }
        }
    }
`;

export const PUT_CONTACT = gql`
    mutation update_article(
        $id: Int!
        $first_name: String!
        $last_name: String!
        $updated_phones: [phone_insert_input!]!
        $deleted_phones_id: [Int!]!
    ) {
        update_contact_by_pk(
            pk_columns: { id: $id }
            _set: { first_name: $first_name, last_name: $last_name }
        ) {
            id
            first_name
            last_name
            phones {
                number
            }
        }
        insert_phone(
            objects: $updated_phones
            on_conflict: { constraint: phone_id_key, update_columns: [number] }
        ) {
            returning {
                id
                number
            }
        }
        delete_phone(where: { id: { _in: $deleted_phones_id } }) {
            returning {
                id
                number
            }
        }
    }
`;

export const DELETE_CONTACT = gql`
    mutation DeleteContactById($id: Int!) {
        delete_contact_by_pk(id: $id) {
            first_name
            last_name
            id
        }
    }
`;
