import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client/react";

import { GET_REPOSITORY_DATA } from "../graphql/queries";
import { useParams } from "react-router-native";

const RepositoryView = () => {
  const { repositoryId } = useParams();
  console.log("useParams:", repositoryId);

  const { data, loading, error, refetch } = useQuery(GET_REPOSITORY_DATA, {
    variables: { id: repositoryId },
    fetchPolicy: "cache-and-network",
  });
  return data?.repository ? (
    <RepositoryItem repository={data.repository} showButton />
  ) : null;
};

export default RepositoryView;
