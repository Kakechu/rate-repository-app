import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query get_repositories(
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection!
    $keyword: String!
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $keyword
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
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GET_REPOSITORY($id: ID!) {
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
      reviews(first: 10) {
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

export const GET_REVIEWS = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      ownerAvatarUrl
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
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
  query {
    me {
      id
      username
    }
  }
`;

// other queries...
