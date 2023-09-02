export interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    created_at: string;
    phones: Phones[];
}
export interface Phones {
    number: string;
}

export interface GetContacts {
    contact: Contact[];
}

export interface GetContact {
    contact_by_pk: Contact;
}
