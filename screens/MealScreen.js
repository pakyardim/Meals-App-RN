import { StyleSheet, Button, Text, Image, View, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import List from "../components/MealDetail/List";
import Subtitle from "../components/MealDetail/Subtitle";
import { useLayoutEffect } from "react";
import IconButton from "../components/IconButton";

export default function MealScreen({ route, navigation }) {
  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const imgSrc =
    selectedMeal.imageUrl === ""
      ? require("../assets/kisir.png")
      : { uri: selectedMeal.imageUrl };

  function headerButtonPressHandler(){
    console.log("pressed")
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconButton icon="star" color="white" onPress={headerButtonPressHandler}/>
    })
  }, [navigation, headerButtonPressHandler])

  return (
    <ScrollView>
      <Image style={styles.image} source={imgSrc} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
      <Text style={styles.bottomText}>Bon Appétit!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
  },
  detailText:{
    color: "#ccc",
  },
  image: {
    width: "100%",
    height: 200,
  },
  listContainer: {
    width: "80%",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  bottomText: {
    color: "#ccc",
    textAlign: "center",
    margin: 32,
  }
});
