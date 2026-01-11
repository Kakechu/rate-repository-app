import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { useQuery } from "@apollo/client/react";
import { GET_ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.tabBar,
  },
  scroll: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  row: {
    flexDirection: "row",
  },
});

const AppBar = () => {
  const { data, error, loading } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
  });
  const isLoggedIn = data && data.me ? true : false;
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scroll}
        showsHorizontalScrollIndicator={false}
      >
        <AppBarTab to="/">Repositories</AppBarTab>
        {isLoggedIn && <AppBarTab to="/review">Create a review</AppBarTab>}
        {!isLoggedIn ? (
          <View style={styles.row}>
            <AppBarTab to="/signin">Sign in</AppBarTab>
            <AppBarTab to="/signup">Sign up</AppBarTab>
          </View>
        ) : (
          <AppBarTab to="/signin" onPress={handleSignOut}>
            LogOut
          </AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
