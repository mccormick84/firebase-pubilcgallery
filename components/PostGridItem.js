import React from 'react';
import {StyleSheet, useWindowDimensions, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function PostGridItem({post}) {
  const dimensions = useWindowDimensions();
  const size = (dimensions.width - 3) / 3;
  const navigation = useNavigation();

  const onPress = () => {
    // 단일 포스트 조회 화면 띄우기
    navigation.navigate('Post', {post});
    console.log(post);
  };

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.6 : 1,
          width: size,
          height: size,
        },
        styles.block,
      ]}>
      <Image
        style={styles.image}
        source={{uri: post.photoURL}}
        resizeMode={'cover'}
        resizeMethod={'resize'}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    margin: 0.5,
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    height: '100%',
  },
});
