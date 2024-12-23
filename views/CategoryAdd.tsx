import * as React from 'react';
import { View, Text, ScrollView, TextInput, Button, TouchableOpacity, Modal } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import filmService from '../services/film'
import CategoryService from '../services/category'
import { useEffect, useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import Dropdown from 'react-native-input-select';

export default function CategoryAddScreen() {

  const styles = StyleSheet.create({
    main: {
        paddingTop: 16,
        paddingHorizontal: 8,
        backgroundColor: 'rgb(42 42 42)',
        height: '100%',
        overflow: 'scroll',
      },
      categoryItem:{
        backgroundColor:'#FFF',
        padding: 6,
        borderRadius:6,
        display:'flex',
      },
      buttonsContainer:{
        flexDirection:'row',
        justifyContent:'center',
        padding:8,
        gap:5,
        marginTop:16,
      },
      button:{
        width:200,
        backgroundColor:'blue',
        justifyContent:'center',
        display:'flex',
        borderRadius:6,
        padding:8,
      },
      buttonCancel:{
        width:200,
        backgroundColor:'gray',
        borderRadius:6,
        justifyContent:'center',
        display:'flex',
        padding:8,
      },
      buttonText:{
        color:'#FFF',
        textAlign:'center',
      },
      categoryGrid:{
        display:'flex',
        justifyContent:'center',
        flexDirection:"row",
        gap:16,
      },
      modalMain:{
        backgroundColor: 'rgb(42 42 42)',
        width:450,
        height:150,
        paddingHorizontal:16,
      },

      centeredView: {
        flex: 1,
        backgroundColor:'rgba(0, 0, 0, 0.65)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      categoryText: {
        marginTop:32,
        width:'80%',
        padding:8,
        marginHorizontal:'auto',
        backgroundColor:'#FFF',
      }
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategories, setSelectedCategories] = useState<any>({
    name:''
  })
  const [categoryInputText, setCategoryInputText] = useState<any>('')

  function openCategoryModal(category?:any){
    if (category){
        setSelectedCategories(category)
        setCategoryInputText(category.name)
    }else{
        setCategoryInputText('')
        setSelectedCategories('')
        
    }
    setModalVisible(true)
  }
  function getCategories(){
    CategoryService.getAllCategory().then((res:any)=>{
        console.log(res)
        setCategories(res.data.content)
      })
  }
    useEffect(()=>{
        getCategories()
    },[])

    function submitCategory(){
        if(selectedCategories.id){
            CategoryService.edit(
                {
                    id:selectedCategories.id,
                    name:categoryInputText
                }
            ).then((res:any)=>{
                getCategories()
                setModalVisible(false)
                console.log(res)
            }).catch((err:any)=>{
                console.log(err)
            })
        }else{
            console.log('запрос на добавление')
            console.log(categoryInputText)
            CategoryService.create({
                name:categoryInputText
            }).
            then((res:any)=>{    
                getCategories()
                setModalVisible(false)
                console.log(res)
            }).catch((err:any)=>{
                console.log(err)
            })
        }
    }

    function renderCategories() {
        return (
            categories.map( (category:any) => (
                <TouchableOpacity style={styles.categoryItem} onPress={() => openCategoryModal(category)} key={category.id}>
                    <Text>{category.name}</Text>
                </TouchableOpacity>
            ))            
        )
    }
    

  return (
        <ScrollView  style={styles.main}>
            <View style={styles.categoryGrid}>

                {renderCategories()}
                <Button title='Добавить' onPress={()=>{
                    openCategoryModal()
                }}></Button>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                    <View style = {styles.centeredView}>
                        <View style = {styles.modalMain}>
                            <TextInput onChangeText={setCategoryInputText} placeholder='Введите название категории' value={categoryInputText} style={styles.categoryText} ></TextInput>

                            <View style = {styles.buttonsContainer}>
                                <TouchableOpacity onPress={()=>{
                                    setModalVisible(false)
                                }} style={styles.buttonCancel}>
                                        <Text style={styles.buttonText}>Отмена</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>{
                                    submitCategory()
                                }} style={styles.button}>
                                        <Text style={styles.buttonText}>Сохранить</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
             
            </Modal>
        </ScrollView>

  )
  
  }