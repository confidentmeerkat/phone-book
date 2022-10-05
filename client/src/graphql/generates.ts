import { endpointUrl, fetchParams } from '../config';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpointUrl as string, {
    method: "POST",
    ...(fetchParams),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Contact = {
  __typename?: 'Contact';
  firstname: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  lastname: Scalars['String'];
  number: Scalars['String'];
};

export type ContactInput = {
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  number: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createContact?: Maybe<Contact>;
  deleteContact?: Maybe<Scalars['String']>;
  updateContact?: Maybe<Contact>;
};


export type MutationCreateContactArgs = {
  input: ContactInput;
};


export type MutationDeleteContactArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateContactArgs = {
  id: Scalars['ID'];
  input: ContactInput;
};

export type Query = {
  __typename?: 'Query';
  contacts?: Maybe<Array<Maybe<Contact>>>;
  test?: Maybe<Scalars['String']>;
};

export type ContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type ContactsQuery = { __typename?: 'Query', contacts?: Array<{ __typename?: 'Contact', id?: string | null, firstname: string, lastname: string, number: string } | null> | null };

export type CreateContactMutationVariables = Exact<{
  input: ContactInput;
}>;


export type CreateContactMutation = { __typename?: 'Mutation', createContact?: { __typename?: 'Contact', id?: string | null, firstname: string, lastname: string, number: string } | null };

export type UpdateContactMutationVariables = Exact<{
  id: Scalars['ID'];
  input: ContactInput;
}>;


export type UpdateContactMutation = { __typename?: 'Mutation', updateContact?: { __typename?: 'Contact', id?: string | null, firstname: string, lastname: string, number: string } | null };

export type DeleteContactMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteContactMutation = { __typename?: 'Mutation', deleteContact?: string | null };


export const ContactsDocument = `
    query Contacts {
  contacts {
    id
    firstname
    lastname
    number
  }
}
    `;
export const useContactsQuery = <
      TData = ContactsQuery,
      TError = unknown
    >(
      variables?: ContactsQueryVariables,
      options?: UseQueryOptions<ContactsQuery, TError, TData>
    ) =>
    useQuery<ContactsQuery, TError, TData>(
      variables === undefined ? ['Contacts'] : ['Contacts', variables],
      fetcher<ContactsQuery, ContactsQueryVariables>(ContactsDocument, variables),
      options
    );
export const CreateContactDocument = `
    mutation CreateContact($input: ContactInput!) {
  createContact(input: $input) {
    id
    firstname
    lastname
    number
  }
}
    `;
export const useCreateContactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateContactMutation, TError, CreateContactMutationVariables, TContext>) =>
    useMutation<CreateContactMutation, TError, CreateContactMutationVariables, TContext>(
      ['CreateContact'],
      (variables?: CreateContactMutationVariables) => fetcher<CreateContactMutation, CreateContactMutationVariables>(CreateContactDocument, variables)(),
      options
    );
export const UpdateContactDocument = `
    mutation UpdateContact($id: ID!, $input: ContactInput!) {
  updateContact(id: $id, input: $input) {
    id
    firstname
    lastname
    number
  }
}
    `;
export const useUpdateContactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateContactMutation, TError, UpdateContactMutationVariables, TContext>) =>
    useMutation<UpdateContactMutation, TError, UpdateContactMutationVariables, TContext>(
      ['UpdateContact'],
      (variables?: UpdateContactMutationVariables) => fetcher<UpdateContactMutation, UpdateContactMutationVariables>(UpdateContactDocument, variables)(),
      options
    );
export const DeleteContactDocument = `
    mutation DeleteContact($id: ID!) {
  deleteContact(id: $id)
}
    `;
export const useDeleteContactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteContactMutation, TError, DeleteContactMutationVariables, TContext>) =>
    useMutation<DeleteContactMutation, TError, DeleteContactMutationVariables, TContext>(
      ['DeleteContact'],
      (variables?: DeleteContactMutationVariables) => fetcher<DeleteContactMutation, DeleteContactMutationVariables>(DeleteContactDocument, variables)(),
      options
    );