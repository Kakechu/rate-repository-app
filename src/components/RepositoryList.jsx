import { FlatList, Pressable, View, StyleSheet, Platform } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import ItemSeparator from "./ItemSeparator";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Searchbar } from "react-native-paper";
import theme from "../theme";
import React from "react";

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: theme.colors.mainBackground,
    borderRadius: 4,
  },
  header: {
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

const OrderPicker = ({ order, setOrder }) => {
  const pickValue = (pickerValue) => {
    switch (pickerValue) {
      case "CREATED_AT_DESC":
        setOrder({ field: "CREATED_AT", direction: "DESC" });

        break;
      case "RATING_AVERAGE_DESC":
        setOrder({ field: "RATING_AVERAGE", direction: "DESC" });

        break;
      case "RATING_AVERAGE_ASC":
        setOrder({ field: "RATING_AVERAGE", direction: "ASC" });

        break;
    }
  };

  return (
    <Picker
      prompt="Select an item..."
      selectedValue={`${order.field}_${order.direction}`}
      onValueChange={(itemValue) => pickValue(itemValue)}
    >
      <Picker.Item label="Latest repositories" value="CREATED_AT_DESC" />
      <Picker.Item
        label="Highest rated repositories"
        value="RATING_AVERAGE_DESC"
      />
      <Picker.Item
        label="Lowest rated repositories"
        value="RATING_AVERAGE_ASC"
      />
    </Picker>
  );
};

const ListHeader = ({ search, setSearch, order, setOrder }) => {
  return (
    <View style={styles.header}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearch}
        value={search}
        style={styles.searchBar}
        elevation={2}
      />
      <OrderPicker order={order} setOrder={setOrder} />
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <ListHeader
        search={props.search}
        setSearch={props.setSearch}
        order={props.order}
        setOrder={props.setOrder}
      />
    );
  };

  render() {
    return (
      <FlatList
        data={
          this.props.repositories
            ? this.props.repositories.edges.map((edge) => edge.node)
            : []
        }
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <Pressable onPress={() => this.props.onPress(item.id)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
      />
    );
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState({
    field: "CREATED_AT",
    direction: "DESC",
  });
  const [search, setSearch] = useState("");
  const [keyword] = useDebounce(search, 500);
  const navigate = useNavigate();

  const handlePress = (id) => {
    navigate(`/${id}`);
  };

  const variables = {
    orderBy: order.field,
    orderDirection: order.direction,
    keyword: keyword,
  };

  const { repositories } = useRepositories(variables);

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      search={search}
      setSearch={setSearch}
      onPress={handlePress}
    />
  );
};

export default RepositoryList;
