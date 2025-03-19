import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchPokemonData } from "../data/Api";



const HomeScreen = ({navigation}) => {
  const [pokemon, setPokemon] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

const handlePokemonDetailed=()=>{
  navigation.navigate("Detail")
}


  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPokemonData(currentPage);
        setPokemon(data.pokemon);
        setTotalPages(data.totalpages);
      } catch (error) {
        console.log("Failed to fetch pokemon", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPokemon();
  }, [currentPage]);

  const renderItems = ({ item }) => (
    <TouchableOpacity style={styles.TouchableOpacity} onPress={handlePokemonDetailed}>
      <Image
        source={
          {
            //uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${item.id}.gif`,
          }
        }
        style={styles.Images}
      />
      <Text style={styles.pokemonName}>{item.name}</Text>
    </TouchableOpacity>
  );
  if (isloading && pokemon.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  }

  return (
    <View style={styles.Container}>
      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItems}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        ListHeaderComponent={<Text style={styles.Title}>POKEMON LIST</Text>
        
        }
    
      />
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setcurrentPage((prev) => Math.max(prev - 1, 1))}
          style={[styles.Buttons, currentPage === 1 && styles.disabled]}
          disabled={currentPage === 1 || isloading}
        >
          <Text style={styles.ButtonText}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>
          {currentPage}/{totalPages || "?"}
        </Text>
        <TouchableOpacity
          onPress={() =>
            setcurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          style={[
            styles.Buttons,
            currentPage === totalPages && styles.disabled,
          ]}
          disabled={currentPage === totalPages || isloading}
        >
          <Text style={styles.ButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 55,
  },

  Images: {
    width: 150,
    height: 150,
    //borderWidth: 1,
    resizeMode: "contain",
    shadowOpacity: 0.5,
    shadowOffset: { width: 4, height: 5 },
  },
  TouchableOpacity: {
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
  Title: {
    fontSize: 26,
    textAlign: "center",
  },
  loadingContainer: {
    justifyContent: "center",
    flex: 1,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    
    borderWidth:1
  },
  Buttons: {
    backgroundColor: "blue",
    marginBottom: 35,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  ButtonText: {
    fontSize: 20,
  },
  disabled: {
    backgroundColor: "gray",
  },
  pageNumber: {
    fontSize: 20,
  },
});
