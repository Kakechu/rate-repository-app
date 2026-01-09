import { View, StyleSheet, Image, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import StatsItem from "./StatsItem";
import Button from "./Button";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.mainBackground,
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
    paddingVertical: 16,
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

const RepositoryItem = ({ repository, showButton }) => {
  const handleNavigate = (repositoryUrl) => {
    if (repositoryUrl) {
      Linking.openURL(repositoryUrl);
    }
  };

  return (
    <View testID="repositoryItem" style={styles.container}>
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
        <StatsItem statNumber={repository.stargazersCount} label="Stars" />
        <StatsItem statNumber={repository.forksCount} label="Forks" />
        <StatsItem statNumber={repository.reviewCount} label="Reviews" />
        <StatsItem statNumber={repository.ratingAverage} label="Rating" />
      </View>
      {showButton && (
        <Button onPress={() => handleNavigate(repository.url)}>
          Open in GitHub
        </Button>
      )}
    </View>
  );
};

export default RepositoryItem;
