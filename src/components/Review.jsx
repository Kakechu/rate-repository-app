import { View, StyleSheet, Alert } from "react-native";
import theme from "../theme";
import Text from "./Text";
import Button from "./Button";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

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
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
});

const Review = ({ review, myReviews, onDelete, onViewRepository }) => {
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
          <Text fontWeight="bold">
            {myReviews ? review.repository.fullName : review.user.username}
          </Text>
          <Text color="textSecondary">{date}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>

      {myReviews && (
        <View style={styles.buttonRow}>
          <Button small onPress={() => onViewRepository(review.repository.id)}>
            View repository
          </Button>
          <Button small destructive onPress={() => onDelete(review.id)}>
            Delete review
          </Button>
        </View>
      )}
    </View>
  );
};

export default Review;
