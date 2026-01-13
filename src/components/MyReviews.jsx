import { View, FlatList } from "react-native";
import Text from "./Text";
import ItemSeparator from "./ItemSeparator";
import Review from "./Review";
import { useQuery } from "@apollo/client/react";
import { GET_ME } from "../graphql/queries";

const MyReviews = () => {
  const { data, loading, error } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Text>Loading...</Text>;

  const reviews = data?.me?.reviews?.edges?.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <Review review={item} myReviews={true} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
