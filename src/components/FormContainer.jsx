import { StyleSheet, View } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: theme.colors.mainBackground,
    padding: 12,
    gap: 12,
  },
});

const FormContainer = ({ children }) => {
  return <View style={styles.formContainer}>{children}</View>;
};

export default FormContainer;
