import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    marginTop: 4,
  },
});
const StatsItem = ({ statNumber, label }) => {
  const handleNumbers = (number) => {
    if (number < 1000) return number.toString();

    const rounded = Math.round(number / 100) / 10;
    return `${rounded}`.replace(".0", "") + "k";
  };

  return (
    <View style={styles.statItem}>
      <Text>{handleNumbers(statNumber)}</Text>
      <Text color="textSecondary" style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
};

export default StatsItem;
