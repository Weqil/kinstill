import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleSheet, Text, View,Image, TouchableOpacity, Dimensions, TextInput, useWindowDimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Navigation } from '../navigator/navigator';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CategoryService from '../services/category'


export default function Header( ) {
  const { width, height } = useWindowDimensions();
  const route = useRoute()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [userMenuState, changeUserMenuState] = useState(false)
  const [searchText,setSearchText] = useState('')
  const [categories, setCategories] = useState<any>([]);
  const [categoryModalVisible,setCategoryModalVisible] = useState(false)
  let data:any = [];
    useEffect(()=>{
      CategoryService.getAllCategory().then((res:any)=>{
        setCategories(res.data.content)
      })
    },[])

    useEffect(()=>{
      categories.forEach((category:any) => {
        data.push({label:category.name, value:category.id})
      });
    },[categories])



    function renderCategoryModal(){
      if(categoryModalVisible){
        return (
          <View style={styles.categoryModal}>
            {
              categories.map((category:any)=>{
                return (
                  <TouchableOpacity key={category.id} onPress={()=>
                      redirectInCategory(category)
                  }>
                      <Text >{(category.name)}</Text>
                  </TouchableOpacity>
                )
              })
            }
      
        </View>
        )
      } else{
          null
      }
    }

  const renderHeader = () => {
    if(width >= 725){
      return(
        <View style={styles.headerMain}>
        <Image
          style = {styles.logo}
          source={require('../assets/icons/logo.jpg')}/>
        <TouchableOpacity >
            <Text onPress={()=>{
                navigation.navigate('Home')
              }} style={styles.category}>Главная</Text>
        </TouchableOpacity>

        <TouchableOpacity >
            <Text onPress={()=>{
                setCategoryModalVisible(!categoryModalVisible)
              }} style={styles.category}>Категория</Text>
              {renderCategoryModal()}
        </TouchableOpacity>
              
        {/* <Dropdown 
          data={data}
          labelField="label"   
          style = {styles.dropdownStyle}   
          valueField="value" 
          placeholder='Категория'
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}       
        onChange={(category)=>{
          redirectInCategory(category)
        }}   
        >
        </Dropdown> */}
  
        <TouchableOpacity  style = {styles.inputWrapper} >
          <TextInput
            onChangeText={setSearchText}
            placeholder='Введите название'
            value={searchText}
            style = {styles.input}
          />
          <Button
            onPress={()=>{
              redirectInSearch()
            }}
            title='поиск'
          ></Button>
        </TouchableOpacity>
        
        <TouchableOpacity
        
        >
          <Text  onPress={()=>{
            changeUserMenuState(!userMenuState)

          }}
          style={styles.category}>Admin</Text>
          {renderMenuText()}
        </TouchableOpacity>
        </View>
      );
    }else{
      return null
    }

  }
  function redirectInSearch(){
   
    if(route.name !== 'FilmInQuery'){
      navigation.navigate('FilmInQuery',{searchText:searchText})
    }else{
      console.log(searchText)
      navigation.setParams({ searchText: searchText });
    }

  }
  function redirectInCategory(category:any){
    setSearchText('')
    navigation.setParams({ searchText: searchText });
    if(route.name !== 'FilmInQuery'){
      navigation.navigate('FilmInQuery',{category:category})
    }else{
      console.log(searchText)
      navigation.setParams({ category: category });
    }
    setCategoryModalVisible(false)
  }
  const renderMenuText = () => {
    if (userMenuState) {
      return (
        <View style = {styles.userMenu}>
              <Text onPress={()=>{
               navigation.navigate('FilmAdd')
              }}>Добавить фильм</Text>
              <Text onPress={()=>{
               navigation.navigate('CategoryAdd')
              }}>Добавить или изменить категорию</Text>
        </View>
      ) ;
    }
    return null;
  };



  return (
    renderHeader()
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor:'#FFFFFF',
    padding:6,
    width:'100%',
    borderRadius:6,
  },
  inputWrapper: {
    width:'40%',
    gap: 8,
    flexDirection:'row',
  },
  placeholderStyle:{
    color:'#FFFFFF'
  },
  dropdownStyle:{
    width:100,
  },
  selectedTextStyle:{
       color:'#FFFFFF'
  },
  categoryModal:{
    position:'absolute',
    backgroundColor:'#FFFFFF',
    padding:8,
    gap:16,
    marginTop:26,
    width:200,
  },
  userMenu:{
    backgroundColor:'#FFFFFF',
    position:'absolute',
    padding:8,
    gap:16,
    marginTop:26,
    width:300,
  },
  inputSearchStyle: {},  
  categoryItemStyle:{
    width:200,
  },
  headerMain: {
      padding:8,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      gap:24,
      display:'flex',
      width:'100%',
      backgroundColor: 'rgb(17 17 17)',
    },
  category: {
    color: '#FFFFFF',
    width:'auto',
    fontSize:16,
    flex:1,
  },
  logo:{
    width:32,
    height:32,
  }
});
