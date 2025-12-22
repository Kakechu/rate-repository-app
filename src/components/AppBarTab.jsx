import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

const AppBarTab = ({ to, children }) => {
  const navigate = useNavigate();
  return (
    <Pressable
      style={({ pressed }) => [styles.tabButton, pressed && { opacity: 0.6 }]}
      onPress={() => navigate(to)}
    >
      <Text fontSize="subheading" fontWeight="bold" color="tabBar">
        {children}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
