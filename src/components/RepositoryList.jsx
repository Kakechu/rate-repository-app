import { FlatList, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import ItemSeparator from "./ItemSeparator";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

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

export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handlePress = (id) => {
    navigate(`/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <OrderPicker order={order} setOrder={setOrder} />
      )}
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePress(item.id)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState({
    field: "CREATED_AT",
    direction: "DESC",
  });

  const variables = {
    orderBy: order.field,
    orderDirection: order.direction,
  };

  const { repositories } = useRepositories(variables);

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
    />
  );
};

export default RepositoryList;
