import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView, Button } from 'react-native';
import FilmCard from '../components/FilmCard';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import filmService from '../services/film';
const FilmInQuryScreen = () => {
  const { width, height } = useWindowDimensions();
  const route = useRoute();
  const [param, setParam] = useState<any>(route.params);

  useEffect(() => {
    setParam(route.params || {});
  }, [route.params]); 

  useEffect(() => {
    if (param) {
      getFilmInQuery(); 
    }
  }, [param]); 

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
    queryTitle:{
        color:'#FFF',
        paddingLeft:16,
        fontSize:24,
        fontWeight:'bold'
    }
  });

  const [allFilms, setAllFilms] = useState([])

   function getFilmInQuery(){
    if(param?.searchText){
        console.log(param.searchText)
        filmService.getAllFilms({searchText:param.searchText}).then((res:any)=>{
            setAllFilms(res.data.content)
      })
    }else{
      console.log(param.category)
      filmService.getAllFilms({categoryId: param.category.id}).then((res:any)=>{
      setAllFilms(res.data.content)
  })
    }
  }

  function renderTitle(){
    if(param.searchText){
        return (<Text style={styles.queryTitle}>Результаты поиска по запросу: {param?.searchText}</Text>)
    } else if(param.category){
        return(  <Text style={styles.queryTitle} >Все фильмы с категорией {param.category.name}</Text>)
    }
  }

   useEffect(()=>{
    getFilmInQuery()
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
        <View>
            {(renderTitle())}
        </View>
    {(renderAllFilms())}
   
    </ScrollView >
  );
};

export default FilmInQuryScreen;
