import React, {useEffect, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  useWindowDimensions,
} from 'react-native';

export default function UploadScreen() {
  const route = useRoute();
  const {res} = route.params || {};
  const {width} = useWindowDimensions();

  return (
    <View style={styles.block}>
      <Image
        source={{uri: res.assets[0]?.uri}}
        style={[styles.image, {height: width}]}
        resizeMode={'cover'}
      />
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder={'이 사진에 대한 설명을 입력하세용~'}
        textAlignVertical={'top'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  image: {
    width: '100%',
  },
  input: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    fontSize: 16,
  },
});
