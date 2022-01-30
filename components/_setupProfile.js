import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  ActivityIndicator,
  StyleSheet,
  View,
  Pressable,
  Platform,
} from 'react-native';
import {signOut} from '../lib/auth';
import {createUser} from '../lib/users';
import {useUserContext} from '../contexts/UserContext';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import CustomButton from './CustomButton';
import BorderedInput from './BorderedInput';

export default function SetupProfile() {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();
  const {setUser} = useUserContext();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const {params} = useRoute();
  // console.log('params : ', params);
  const {uid} = params || {};

  const onCancel = () => {
    signOut();
    navigation.goBack();
  };

  const onSelectImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 512,
      maxHeight: 512,
      includeBase64: Platform.OS === 'android',
    };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        return;
      }
      const source = {uri: res.assets[0]?.uri};
      setResponse(source);
      // console.log(res.assets[0].uri); // 파일명
      // console.log(response.assets[0]);
      // const asset = response.assets[0];
      // console.log(asset);
      // const extension = asset.fileName.split('.').pop(); // 확장자 추출
      // console.log(extension);
      // const reference = storage().ref(`/profile/${uid}.${extension}`);
      // console.log(reference);
      // console.log(asset.uri);
    });
  };

  const onSubmit = async () => {
    const {uri} = response;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    // let photoURL: any = null;
    // const photoURL = response ? await filename.getDownloadURL() : null;

    const task = storage().ref(filename).putFile(uploadUri);

    setLoading(true);

    try {
      await task;
    } catch (e) {
      console.error(e);
    }

    // if (response) {
    // const asset = response.assets[0];
    // const extension = asset.fileName.split('.').pop(); // 확장자 추출
    // const reference = storage().ref(`/profile/${uid}.${extension}`);
    // const Uri = asset.uri;
    // const filename = Uri.substring(Uri.lastIndexOf('/') + 1);
    // const uploadUri =
    //   Platform.OS === 'ios' ? Uri.replace('file://', '') : Uri;
    //
    // const task = storage().ref(filename).putFile(uploadUri);
    // if (Platform.OS === 'android') {
    //   await reference.putString(asset.base64, 'base64', {
    //     contentType: asset.type,
    //   });
    // } else {
    //   await reference.putFile(uploadUri);
    // }

    // photoURL = response ? await filename.getDownloadURL() : null;
    // }

    const user = {
      id: uid,
      displayName,
      photoURL,
    };

    createUser(user);
    setUser(user);
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={onSelectImage}>
        <Image
          style={styles.circle}
          source={
            response ? {uri: response.uri} : require('../assets/user.png')
          }
        />
      </Pressable>
      <View style={styles.form}>
        <BorderedInput
          placeholder={'닉네임'}
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType={'next'}
        />
        {loading ? (
          <ActivityIndicator
            size={32}
            color={'#6200ee'}
            style={styles.spinner}
          />
        ) : (
          <View style={styles.buttons}>
            <CustomButton title={'다음'} onPress={onSubmit} hasMarginBottom />
            <CustomButton
              title={'취소'}
              onPress={onCancel}
              theme={'secondary'}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  circle: {
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
});
