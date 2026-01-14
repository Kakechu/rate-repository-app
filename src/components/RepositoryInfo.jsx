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

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId, first: 3, after: null },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Text>Loading...</Text>;

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        id: repositoryId,
        first: 3,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  const repository = data?.repository;
  const reviews =
    data?.repository?.reviews?.edges?.map((edge) => edge.node) || [];

  const onEndReach = () => {
    console.log("You have reached the end of the list");
    if (!reviews.length) return;
    handleFetchMore();
  };

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
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
