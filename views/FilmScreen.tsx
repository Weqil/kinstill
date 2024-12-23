import * as React from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { createStaticNavigation, ParamListBase, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useRef } from 'react';
import Video from 'react-native-video';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import WebView from 'react-native-webview';
import filmService from '../services/film'

export default function FilmScreen() {
  const styles = StyleSheet.create({
    main: {
        paddingTop: 16,
        paddingHorizontal: 8,
        backgroundColor: 'rgb(42 42 42)',
        height: '100%',
        overflow: 'scroll',
        
      },
     filmContainer:{
      paddingTop:16,
      filter:'filter: invert(93%) sepia(79%) saturate(0%) hue-rotate(200deg) brightness(116%) contrast(101%)',
      flexDirection:'row',
      gap:32,
     },

     video:{
      width:500,
      marginTop:32,
      height:300,
     },
     filmName:{
      color:'#FFF',
      fontSize:28,
      fontWeight:'bold'
     },
     filmInfoLabel:{
      color:'#FFF',
      fontSize:18,
      fontWeight: '500',
      paddingTop:8,
      maxWidth:800,
      flexWrap:'wrap',
     },
     filmImage:{
      width: 200,
      height:300,
     },
     center:{
      paddingHorizontal:200,
      paddingBottom:100,
      
     },
     buttonIcon:{
      width:24,
  
      borderRadius:2,
      height:24,
     },
     buttonContainer:{
      flexDirection:'row',
      gap:16,
     }

  });

  const webViewRef = useRef<any>(null);
  useFocusEffect(
    useCallback(() => {
      setVisibleFrame(true)
      return () => {
        setVisibleFrame(false)
      };
    }, [])
  );
  const route = useRoute();
  const  film : any = route.params || {};
  const filmLink: string = ` <iframe width="1077" height="606" src="https://www.youtube.com/embed/RumyZ-X8V5U" title="Тир Лист 25 Худших Героев [Dota 2]" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>";`
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [srcInVideo,setSrcInVideo] = React.useState('')
  const [visibleFrame,setVisibleFrame] = React.useState(false)
  const image = {uri: film.prewiev};
  useEffect(() => {
    console.log(film);
    if(film.video.match(/src="([^"]+)"/)  ){
      setSrcInVideo(film.video.match(/src="([^"]+)"/)[1])
    }
  }, [film]); 

  function deleteFilm(){
    filmService.delete(film.id).then((res)=>{
      navigation.navigate('Home')
    })
   
  }

    return (
      <ScrollView style={styles.main}>
        <View style={styles.center}>
          <View style={styles.buttonContainer}>
         
              <TouchableOpacity onPress={()=>{
                deleteFilm()
              }}>
                  <Image style = {styles.buttonIcon} source={require('../assets/icons/delete.svg')}></Image>
              </TouchableOpacity>
          </View>
        

              <View style={styles.filmContainer}>
                <ImageBackground source={image} style={styles.filmImage}></ImageBackground>
              <View>
                
                <Text style={styles.filmName}>{(film.name)}</Text>

                <Text style={styles.filmInfoLabel}>Страна производства: {(film.country)}</Text>
                <Text style={styles.filmInfoLabel}>Год выхода: {(film.date_create)}</Text>
                <Text style={styles.filmInfoLabel}>Категории: {(film.categories[0].name)}</Text>
                <Text style={styles.filmInfoLabel}>{(film.description)}</Text>
                
              </View>
            
          </View>
          ({
            visibleFrame ?  <iframe src={srcInVideo} style={styles.video} allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe> : null
          })
        </View>
      </ScrollView>
    );
  }