import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";

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
  errorInput: { borderColor: theme.colors.error },
  button: {
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
  },
  error: {
    color: theme.colors.error,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const usernameError = formik.touched.username && !!formik.errors.username;
  const passwordError = formik.touched.password && !!formik.errors.password;

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={[styles.input, usernameError && styles.errorInput]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        error={usernameError}
      />
      {usernameError && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[styles.input, passwordError && styles.errorInput]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      {passwordError && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="tabBar" fontWeight="bold" fontSize="subheading">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};
export default SignIn;
