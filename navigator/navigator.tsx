import * as React from 'react';
import { useEffect,useState } from 'react';
import { View, Text, Dimensions, useWindowDimensions } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../views/HomeScreen';
import TapeScreen from '../views/TapeScreen';
import FilmScreen from '../views/FilmScreen';
import FilmAddScreen from '../views/FilmAdd';
import FilmInQuryScreen from '../views/FilmInQuery'
import FilmEditScreen from '../views/EditFilm';
import Header from '../components/Header';
import CategoryAddScreen from '../views/CategoryAdd';


  

const RootStack = createNativeStackNavigator({

    screens: {
      Home:{
        screen:HomeScreen,
        options: {
            title: 'Главная',
          },
      } ,
      Tape:TapeScreen,
      Film:{
        screen: FilmScreen,
        options:{
          title: 'Просмотр фильма',
          header: () => {
            return <Header></Header>
          }
        }
      },
      FilmAdd:{
        screen : FilmAddScreen,
        options:{
          title: 'Добавить фильм',
          header: () => {
            return <Header></Header>
          }
        }
        
        
      },
      FilmInQuery:{
        screen: FilmInQuryScreen,
        options:{
          title: 'Поиск по параметрам',
          header: () => {
            return <Header></Header>
          }
        }
      },
      CategoryAdd: {
        screen : CategoryAddScreen,
        options:{
          title: 'Добавить или изменить категорию',
          header: () => {
            return <Header></Header>
          }
        }
      },
   
      Edit: FilmEditScreen
    },
  });

  
  
  export const Navigation = createStaticNavigation(RootStack);
  