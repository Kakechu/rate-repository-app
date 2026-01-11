import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client/react";

import { GET_REPOSITORY } from "../graphql/queries";
import { useParams } from "react-router-native";
import Text from "./Text";
import { View, FlatList, StyleSheet } from "react-native";
import theme from "../theme";
import ItemSeparator from "./ItemSeparator";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.mainBackground,
  },
  reviewRow: {
    flexDirection: "row",
    gap: 16,
    marginVertical: 4,
  },
  review: {
    gap: 4,
    flex: 1,
  },
  rating: {
    width: 40,
    height: 40,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem repository={repository} showButton />;
};

const ReviewItem = ({ review }) => {
  // Single review item
  const date = new Date(review.createdAt).toLocaleDateString("fi-FI", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      <View style={styles.reviewRow}>
        <View style={styles.rating}>
          <Text color="primary" fontWeight="bold" fontSize="subHeading">
            {review.rating}
          </Text>
        </View>

        <View style={styles.review}>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text color="textSecondary">{date}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
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
      renderItem={({ item }) => <ReviewItem review={item} />}
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
