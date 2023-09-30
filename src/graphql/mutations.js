import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
mutation createUser($credentials: CreateUserInput) {
  createUser(user: $credentials) {
    username
  }
}
`;

export const ADD_REVIEW = gql`
mutation createReview($review: CreateReviewInput) {
  createReview(review: $review) {
    repository {
      id
    }
  }
}
`;

export const DELETE_REVIEW = gql`
mutation deleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`;
