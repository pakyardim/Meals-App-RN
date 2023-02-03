import { StyleSheet, Text, Image, View } from "react-native";
import { useEffect } from "react";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";

export default function MealScreen({ route }) {
  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return (
    <View>
      <Image source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
      />
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => <Text key={ingredient}>{ingredient}</Text>)}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => <Text key={step}>{step}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 24,
  },
});
