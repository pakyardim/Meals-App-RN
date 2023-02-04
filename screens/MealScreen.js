import { StyleSheet, Text, Image, View, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import List from "../components/MealDetail/List";
import Subtitle from "../components/MealDetail/Subtitle";
import { useLayoutEffect, useContext } from "react";
import IconButton from "../components/IconButton";
import { FavouritesContext } from "../store/context/favourites-context";

export default function MealScreen({ route, navigation }) {
  const favMealContext = useContext(FavouritesContext);
  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavourite = favMealContext.ids.includes(mealId);

  const imgSrc =
    selectedMeal.imageUrl === ""
      ? require("../assets/kisir.png")
      : { uri: selectedMeal.imageUrl };

  function changeFavouriteStatusHandler() {
    if(mealIsFavourite){
      favMealContext.removeFavourite(mealId);
    } else{
      favMealContext.addFavourite(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={mealIsFavourite ? 'star' : 'star-outline'}
          color="white"
          onPress={changeFavouriteStatusHandler}
        />
      ),
    });
  }, [navigation, changeFavouriteStatusHandler]);

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
  detailText: {
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
  },
});
