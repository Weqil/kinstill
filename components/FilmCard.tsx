import React from 'react';
import { TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function FilmCard({ film }: { film: any }) {
  const image = { uri: film.prewiev };
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Film', film);
      }}
      style={styles.cardMain}
    >
      <ImageBackground source={image} style={styles.background}>
        {/* Ваши дочерние компоненты */}
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardMain: {
    width: 159.18,
    height: 239.07,
    backgroundColor: 'gray',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10.78,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
