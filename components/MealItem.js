import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  View,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MealDetails from "./MealDetails";

export default function MealItem({ id, title, imageUrl, duration, complexity, affordability}) {
  const navigation = useNavigation();

  function selectMealItemHandler() {
    navigation.navigate("MealScreen", {
      mealId: id,
    });
  }

  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={selectMealItemHandler}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <MealDetails duration={duration} complexity={complexity} affordability={affordability} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
