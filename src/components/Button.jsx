import { StyleSheet, Pressable } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
  },
});

const Button = ({ onPress, children }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text color="tabBar" fontWeight="bold" fontSize="subheading">
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;
