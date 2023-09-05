export interface PhonesForm {
    id?: number;
    number: string;
}

export interface ContactForm {
    first_name: string;
    last_name: string;
    phones: PhonesForm[];
}

export interface Phones {
    id: number;
    number: string;
}

export interface Contact extends ContactForm {
    id: number;
    created_at: string;
    phones: Phones[];
}

export interface GetContacts {
    contact: Contact[];
}

export interface GetContact {
    contact_by_pk: Contact;
}

export interface GetCountContact {
    contact_aggregate: {
        aggregate: {
            count: number;
        };
    };
}

export interface PostContact {
    insert_contact: Contact[];
}

export interface PutContact {
    update_contact_by_pk: Contact;
    insert_phone: Phones[];
    delete_phone: Phones[];
}

export interface DeleteContact {
    delete_contact_by_pk: {
        id: number;
        first_name: string;
        last_name: string;
    };
}
