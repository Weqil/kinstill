import * as React from 'react';
import { View, Text, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import { createStaticNavigation, ParamListBase, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import filmService from '../services/film'
import CategoryService from '../services/category'
import { useEffect, useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import Dropdown from 'react-native-input-select';

export default function FilmAddScreen() {

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
    input:{
      backgroundColor:'#FFFFFF',
      padding:6,
      width:350,
      marginBottom:16,
      borderRadius:6,
    },
    description:{
      backgroundColor:'#FFFFFF',
      paddingHorizontal:6,
      width:350,
      marginBottom:16,
      borderRadius:6,
    },
    inputContainer:{
      width:'65%',
      display:'flex',
      margin:'auto',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    },
    categoryModalContainer:{
      paddingHorizontal:16,
      paddingTop:8,
      borderWidth: 5,
      marginTop:-200,
      borderColor:'#000000',
      position:'absolute',
      backgroundColor:'#FFFFFF',
      width:350,
      borderRadius:6,
    },
    disabledButton:{
      backgroundColor:'gray',
    }
  });

  const [categories, setCategories] = useState<any>(null);

  const [filmName, setName] = useState('')
  const [filmCountry, setCountry] = useState('')
  const [filmCategory, setCategory] = useState('')
  const [filmDescription, setDescription] = useState('')
  const [filmYear, setYear] = useState('')
  const [filmLink, setLink] = useState('')
  const [filmPreview, setPreview] = useState('')

  const [categoryInputValue, setCategoryInputValue] = useState('Категория')
  const [openModalCategory, openModalCategoryState] = useState(false)
  const [unabledSybmitButtonValue, setUnabledSybmitButtonValue] = useState(false)

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(()=>{
    CategoryService.getAllCategory().then((res:any)=>{
      setCategories(res.data.content)
    })
  },[])

  //Хук для отслежевания полей формы
  useEffect(() => {
    const isAnyFieldEmpty = !filmName || !filmCountry || !filmCategory || !filmDescription || !filmYear || !filmLink || !filmPreview;
    setUnabledSybmitButtonValue(!isAnyFieldEmpty);
  }, [filmName, filmCountry, filmCategory, filmDescription, filmYear, filmLink, filmPreview]);


  useEffect(()=>{
    if(categories?.length){
      console.log(categories)    
      categories.forEach((category:any) => {
        formatedCategoryObject.push(
          {
            value: category.name,
            key: String(category.id)
          }
        )
      }); 
      console.log(formatedCategoryObject)  
    }
  },[categories])

  //функция генерации кнопки отправки и её валидации
  //12.12.2024: 22 : 24
  function renderButtonInSubmit(){
    
    if (unabledSybmitButtonValue){
      return(
        <Button title='Сохранить' onPress={renderAndSubmitForm}></Button>
      )
    } else{
      return (<Button   color="gray" disabled title='Сохранить' onPress={renderAndSubmitForm}></Button>)
    }
  }



  function openModal(){
    openModalCategoryState(!openModalCategory)
  }

  function setCatgoryAndClose(category: any){
    setCategory(category.id)
    setCategoryInputValue(category.name)
    openModalCategoryState(false)
    
  }

  function renderCategoryModal(){
    if(openModalCategory){
      console.log()
      return(
        
        <View style={styles.categoryModalContainer}>
          {categories.map((category: any) => (
            <TouchableOpacity onPress={()=>{setCatgoryAndClose(category)}} key={category.id}> {/* Добавьте уникальный ключ для каждого элемента */}
                <Text>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      
      )

    }else{
      return null
    }
  }
  //Отправка данных на сервер
  function renderAndSubmitForm(){
    let form = {
      name:filmName,
      country:filmCountry,
      category_id: filmCategory,
      description: filmDescription,
      data_create: filmYear,
      link: filmLink,
      preview: filmPreview,
    }
    filmService.create(form).then((res:any)=>{
      console.log(res)
      navigation.navigate('Home')
    }).catch((err:any)=>{
      console.log(err)      
    })
  }
  const formatedCategoryObject:any = [];

  const formatedCountryObject: any = [
      {
        label:'Россия', value:'Россия'
      },
      {
        label:'США', value:'США'
      },
      {
        label:'Китай', value:'США'
      },


  ]
    return (
      <ScrollView  style={styles.main}>
        <View style={styles.inputContainer}>
          <TextInput onChangeText={setName} placeholder='Введите название фильма' style = {styles.input}></TextInput>
            <TouchableOpacity onPress={()=>{
              openModal()
            }}  style = {styles.input}>
                <Text>{(categoryInputValue)}</Text>
            </TouchableOpacity>
          {renderCategoryModal()}
        
        <TextInput
          editable
          multiline
          onChangeText={setDescription}
          numberOfLines={4}
          placeholder='Введите описание фильма'
          style = {styles.description}
        ></TextInput>
        <TextInput value = {filmYear}  onChangeText={(Text)=>{ setYear(Text.replace(/[^0-9]/g, ''),)
        }} placeholder='Введите год создания фильма' style = {styles.input}></TextInput>
        <TextInput onChangeText = {setCountry} placeholder='Введите страну фильма' style = {styles.input}></TextInput>
        <TextInput onChangeText = {setLink} placeholder='Введите ссылку на видео' style = {styles.input}></TextInput>
        <TextInput onChangeText={setPreview} placeholder='Введите ссылку на превью' style = {styles.input}></TextInput>
        {
              renderButtonInSubmit()
        }
        </View>
      </ScrollView>
    );
  }