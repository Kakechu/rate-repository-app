import { FlatList, Alert } from "react-native";
import Text from "./Text";
import ItemSeparator from "./ItemSeparator";
import Review from "./Review";
import { useQuery } from "@apollo/client/react";
import { GET_ME } from "../graphql/queries";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const MyReviews = () => {
  const navigate = useNavigate();
  const [mutate] = useMutation(DELETE_REVIEW);

  const { data, loading, error, refetch } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Text>Loading...</Text>;

  const reviews = data?.me?.reviews?.edges?.map((edge) => edge.node) || [];

  const onViewRepository = (id) => {
    navigate(`/${id}`);
  };

  const onDelete = (id) => {
    const deleteReview = async (id) => {
      try {
        await mutate({ variables: { deleteReviewId: id } });
        await refetch();
      } catch (e) {
        console.log(e);
      }
    };

    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [{ text: "Cancel" }, { text: "Delete", onPress: () => deleteReview(id) }]
    );
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Review
          review={item}
          myReviews={true}
          onDelete={onDelete}
          onViewRepository={onViewRepository}
        />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
