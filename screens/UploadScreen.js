import React, {useEffect, useRef, useState, useCallback} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  TextInput,
  useWindowDimensions,
  Animated,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import IconRightButton from '../components/IconRightButton';
import storage from '@react-native-firebase/storage';
import {useUserContext} from '../contexts/UserContext';
import {v4} from 'uuid';
import {createPost} from '../lib/posts';

export default function UploadScreen() {
  const route = useRoute();
  const {res} = route.params || {};
  const {width} = useWindowDimensions();
  const animation = useRef(new Animated.Value(width)).current;
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const {user} = useUserContext();

  const onSubmit = useCallback(async () => {
    navigation.pop();

    const asset = res.assets[0];
    const extension = asset.fileName.split('.').pop();
    const reference = storage().ref(`/photo/${user.id}/${v4()}.${extension}`);

    // const task = reference.putFile(asset.uri);
    //
    // try {
    //   console.log(user);
    //   await task;
    // } catch (e) {
    //   console.log(e);
    // }
    if (Platform.OS === 'android') {
      await reference.putString(asset.base64, 'base64', {
        contentType: asset.type,
      });
    } else {
      await reference.putFile(asset.uri);
    }

    const photoURL = await reference.getDownloadURL();
    await createPost({user, photoURL, description});

    // TODO : 포스트 목록 새로 고침
  }, [res, user, description, navigation]);

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardOpen(true),
    );
    const didHide = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardOpen(false),
    );
    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isKeyboardOpen ? 0 : width,
      useNativeDriver: false,
      duration: 150,
      delay: 100,
    }).start();
  }, [isKeyboardOpen, width, animation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={onSubmit} name={'send'} />,
    });
  }, [navigation, onSubmit]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})}
      style={styles.block}
      keyboardVerticalOffset={Platform.select({
        ios: 180,
      })}>
      <View style={styles.block}>
        <Animated.Image
          source={{uri: res.assets[0]?.uri}}
          style={[styles.image, {height: animation}]}
          resizeMode={'cover'}
        />
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder={'⌨ 이 사진에 대한 설명을 입력하세요️'}
          textAlignVertical={'top'}
          value={description}
          onChangeText={setDescription}
        />
      </View>
    </KeyboardAvoidingView>
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
