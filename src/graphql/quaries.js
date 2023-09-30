import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories($first: Int, $after: String, $orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
    repositories(first: $first, after: $after, orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
      totalCount
      edges {
        node {
          id
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!) {
    repository(id: $id ) {
      ...repositoryFields
    }
  }
  
  ${REPOSITORY_FIELDS}
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_URL = gql`
  query repository($id: ID!) {
    repository(id: $id ) {
      id
      url
    }
  }
`;

export const GET_REVIEWS = gql`
query Reviews($repositoryId: ID!, $first: Int, $after: String) {
  repository(id: $repositoryId) {
    id
    fullName
    reviews(first: $first, after: $after) {
      totalCount
      edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_OWN_REVIEWS = gql`
query Me {
  me {
    reviews {
      edges {
        node {
          id
          createdAt
          repository {
            id
            fullName
          }
          text
          rating
        }
      }
    }
  }
}
`;
