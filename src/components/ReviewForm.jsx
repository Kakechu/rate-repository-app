import { StyleSheet, View } from "react-native";
import theme from "../theme";
import TextInput from "./TextInput";
import Button from "./Button";
import * as yup from "yup";
import { useFormik } from "formik";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../graphql/mutations";
import { useState } from "react";

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
  error: {
    color: theme.colors.error,
  },
});

const validationSchema = yup.object().shape({
  repositoryOwner: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number("Rating must be a number")
    .integer("Rating must be an integer")
    .required("Rating is required")
    .min(0, "Minimum rating is 0")
    .max(100, "Maximum rating is 100"),
  review: yup.string().max(2000, "Maximum length 2000 characters").trim(),
});

const initialValues = {
  repositoryOwner: "",
  repositoryName: "",
  rating: "",
  review: "",
};

const ReviewFormContainer = ({ onSubmit, error }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const ownerError =
    formik.touched.repositoryOwner && !!formik.errors.repositoryOwner;
  const nameError =
    formik.touched.repositoryName && !!formik.errors.repositoryName;
  const ratingError = formik.touched.rating && !!formik.errors.rating;

  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Repository owner name"
        value={formik.values.repositoryOwner}
        onChangeText={formik.handleChange("repositoryOwner")}
        error={ownerError}
      />
      {ownerError && <Text color="error">{formik.errors.repositoryOwner}</Text>}
      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        error={nameError}
      />
      {nameError && <Text color="error">{formik.errors.repositoryName}</Text>}
      <TextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        keyboardType="numeric"
        error={ratingError}
      />
      {ratingError && <Text color="error">{formik.errors.rating}</Text>}
      <TextInput
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange("review")}
        multiline
      />
      {error && <Text color="error">{error.message}</Text>}
      <Button onPress={formik.handleSubmit}>Create a review</Button>
    </View>
  );
};

const ReviewForm = () => {
  const navigate = useNavigate();
  const [mutate] = useMutation(ADD_REVIEW);
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    setError(null);
    const repositoryId = `${values.repositoryOwner}.${values.repositoryName}`;

    const variables = {
      ownerName: values.repositoryOwner,
      repositoryName: values.repositoryName,
      rating: parseInt(values.rating, 10),
      text: values.review,
    };
    try {
      await mutate({ variables });
      navigate(`/${repositoryId}`);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };
  return <ReviewFormContainer onSubmit={onSubmit} error={error} />;
};

export default ReviewForm;
