import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: theme.colors.mainBackground,
    padding: 12,
    gap: 12,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  button: {
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="tabBar" fontWeight="bold" fontSize="subheading">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};
export default SignIn;
