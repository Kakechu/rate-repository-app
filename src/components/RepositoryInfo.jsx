import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client/react";

import { GET_REPOSITORY } from "../graphql/queries";
import { useParams } from "react-router-native";
import Text from "./Text";
import { View, FlatList } from "react-native";
import ItemSeparator from "./ItemSeparator";
import Review from "./Review";

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem repository={repository} showButton />;
};

const SingleRepository = () => {
  const { repositoryId } = useParams();

  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId },
    fetchPolicy: "cache-and-network",
  });
  if (loading) return <Text>Loading...</Text>;

  const repository = data?.repository;
  const reviews =
    data?.repository?.reviews?.edges?.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <Review review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryInfo repository={repository} />
          <ItemSeparator />
        </View>
      )}
    />
  );
};

export default SingleRepository;
