import { useFormik } from "formik";
import Text from "./Text";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import Button from "./Button";
import TextInput from "./TextInput";
import FormContainer from "./FormContainer";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const usernameError = formik.touched.username && !!formik.errors.username;
  const passwordError = formik.touched.password && !!formik.errors.password;

  return (
    <FormContainer>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        error={usernameError}
      />
      {usernameError && <Text color="error">{formik.errors.username}</Text>}
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
        error={passwordError}
      />
      {passwordError && <Text color="error">{formik.errors.password}</Text>}
      <Button onPress={formik.handleSubmit}>Sign in</Button>
    </FormContainer>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};
export default SignIn;
