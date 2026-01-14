import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query get_repositories(
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection!
    $keyword: String!
    $first: Int!
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $keyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          createdAt
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
  query GET_REPOSITORY($id: ID!, $first: Int!, $after: String) {
    repository(id: $id) {
      id
      fullName
      ownerAvatarUrl
      description
      language
      stargazersCount
      forksCount
      ratingAverage
      reviewCount
      url
      reviews(first: $first, after: $after) {
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

export const GET_REPOSITORY_DATA = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      fullName
      reviews {
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
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      edges {
        node {
          username
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
