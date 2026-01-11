import { useFormik } from "formik";
import Text from "./Text";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import Button from "./Button";
import TextInput from "./TextInput";
import FormContainer from "./FormContainer";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters")
    .max(30, "Maximum length 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(30, "Maximum length 50 characters"),
  passwordConfirmation: yup
    .string()
    .required("Password confirmationis required")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .min(5, "Password must be at least 5 characters")
    .max(30, "Maximum length 50 characters"),
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const SignUpContainer = ({ onSubmit, error }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const usernameError = formik.touched.username && !!formik.errors.username;
  const passwordError = formik.touched.password && !!formik.errors.password;
  const passwordConfirmationError =
    formik.touched.passwordConfirmation && !!formik.errors.passwordConfirmation;

  return (
    <FormContainer>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {usernameError && <Text color="error">{formik.errors.username}</Text>}

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {passwordError && <Text color="error">{formik.errors.password}</Text>}
      <TextInput
        placeholder="Password confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
        secureTextEntry
      />
      {passwordConfirmationError && (
        <Text color="error">{formik.errors.passwordConfirmation}</Text>
      )}
      {error && <Text color="error">{error.message}</Text>}
      <Button onPress={formik.handleSubmit}>Sign up</Button>
    </FormContainer>
  );
};

const SignUp = () => {
  const [mutate] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    setError(null);
    try {
      const { username, password } = values;

      await mutate({ variables: { username, password } });

      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };
  return <SignUpContainer onSubmit={onSubmit} error={error} />;
};

export default SignUp;
