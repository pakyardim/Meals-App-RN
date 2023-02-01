import { StyleSheet, Text, View, FlatList } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import { CATEGORIES } from "../data/dummy-data";

function renderCategoriesItem(itemData) {
  return <CategoryGridTile title={itemData.item.title} color={itemData.item.color} />;
}

export default function CategoriesScreen() {
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoriesItem}
      numColumns={2}
    />
  );
}

const styles = StyleSheet.create({});
