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
  colorDestructive: {
    backgroundColor: theme.colors.error,
  },
  small: {
    flex: 1,
  },
});

const Button = ({ onPress, children, destructive, small }) => {
  const buttonStyle = [
    styles.button,
    destructive && styles.colorDestructive,
    small && styles.small,
  ];
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text color="tabBar" fontWeight="bold" fontSize="subheading">
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;
