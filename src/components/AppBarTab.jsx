import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

const AppBarTab = ({ children }) => {
  return (
    <Pressable style={styles.tabButton} onPress={() => console.log("pressed")}>
      <Text fontSize="subheading" fontWeight="bold" color="tabBar">
        {children}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
