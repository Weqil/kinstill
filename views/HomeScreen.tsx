import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView, Button } from 'react-native';
import FilmCard from '../components/FilmCard';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import filmService from '../services/film';
import Toast from 'react-native-toast-message';

const HomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const styles = StyleSheet.create({
    main: {
      paddingTop: 16,
      paddingHorizontal: 8,
      backgroundColor: 'rgb(42 42 42)',
      height: '100%',
      overflow: 'scroll',
    },
    search: {
      borderRadius: 20,
      backgroundColor: 'rgb(255 255 255)',
      height: 50,
    },
    grid: {
      paddingHorizontal:'16%',
      width:'100%',
      paddingTop: 16,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 28,
      justifyContent: 'center',
    },
  });

  const [allFilms, setAllFilms] = useState([])

   useEffect(()=>{
    filmService.getAllFilms() .then(response => response.json()).then(data => {
      setAllFilms(data.content)
      console.log(data.content)
      Toast.show({
        text1:'Запрос на получение фильмов',
        type: 'success',
        visibilityTime: 3000,
    })
    })
       
    },[])
  
  function renderAllFilms(){
    if(allFilms){
      return (
     
        <View style = {styles.grid}>
            {(
              allFilms.map((film:any)=><FilmCard  key={film.id} film={(film)}></FilmCard>)
            )}
        </View>
      )
    }
   
  }

  return (
    <ScrollView 
    showsVerticalScrollIndicator={false} 
    showsHorizontalScrollIndicator={false}
    style={styles.main}>
    {(renderAllFilms())}
   
    </ScrollView >
  );
};

export default HomeScreen;
