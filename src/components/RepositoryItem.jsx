import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  topRow: {
    flexDirection: "row",
  },
  mainInfo: {
    flex: 1,
    paddingLeft: 16,
    gap: 8,
    paddingRight: 4,
  },
  statisticsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    marginTop: 4,
  },
  language: {
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  image: {
    width: 50,
    height: 50,
  },
});

const RepositoryItem = ({ repository }) => {
  const handleNumbers = (number) => {
    if (number < 1000) return number.toString();

    const rounded = Math.round(number / 100) / 10;
    return `${rounded}`.replace(".0", "") + "k";
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.image}
          borderRadius={4}
        />
        <View style={styles.mainInfo}>
          <Text color="textPrimary" fontSize="subheading" fontWeight="bold">
            {repository.fullName}
          </Text>
          <Text color="textSecondary">{repository.description}</Text>
          <View style={styles.language}>
            <Text color="tabBar">{repository.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statisticsRow}>
        <View style={styles.statItem}>
          <Text>{handleNumbers(repository.stargazersCount)}</Text>
          <Text color="textSecondary" style={styles.statLabel}>
            Stars
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text>{handleNumbers(repository.forksCount)}</Text>
          <Text color="textSecondary" style={styles.statLabel}>
            Forks
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text>{handleNumbers(repository.reviewCount)}</Text>
          <Text color="textSecondary" style={styles.statLabel}>
            Reviews
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text>{handleNumbers(repository.ratingAverage)}</Text>
          <Text color="textSecondary" style={styles.statLabel}>
            {" "}
            Rating
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
