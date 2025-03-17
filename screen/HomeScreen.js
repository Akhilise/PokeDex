import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import apiService from "../data/Api";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    try {
      const result = await apiService.getPokemon();
      if (result.success) {
        setProducts(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const renderItems = ({ item }) => (
    <TouchableOpacity style={styles.TouchableOpacity}>
      <Image
        //source={{ uri: item.sprites.front_default }}
        style={styles.Images}
      />
      <Text style={styles.pokemonName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.Container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItems}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={styles.Title}>POKEMON LIST</Text>}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    marginTop:55
  },

  Images: {
    width: 150,
    height: 150,
    //borderWidth: 1,
    resizeMode: "cover",
    shadowOpacity: 0.5,
    shadowOffset: { width: 4, height: 5 },
  },
  TouchableOpacity: {
    flex: 1,
    padding: 20,
    borderRadius: 18,
    margin: 15,
    alignItems: "center",
    //borderWidth: 1,
    backgroundColor: "#d28567",
    shadowOpacity: 0.5,
    shadowOffset: { width: 4, height: 5 },
  },

  pokemonName: {
    textTransform: "capitalize",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18,
    fontStyle: "italic",
    color: "white",
  },
  Title:{
    fontSize:26,


  }
});
