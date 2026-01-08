import { useMutation } from "@apollo/client";

import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const result = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(result.data.authenticate.accessToken);
    apolloClient.resetStore();
    return result;
  };

  return [signIn, result];
};
export default useSignIn;
