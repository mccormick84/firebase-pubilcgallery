import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
<<<<<<< HEAD
import SetupProfile from '../components/SetupProfile';
=======
>>>>>>> c9fab224d76f4baf8a4d7422f238767e7b5e6d87

export default function WelcomeScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.block}>
        <Text style={styles.title}>환영합니다!</Text>
        <Text style={styles.description}>프로필을 설정하세요.</Text>
<<<<<<< HEAD
        <SetupProfile />
=======
>>>>>>> c9fab224d76f4baf8a4d7422f238767e7b5e6d87
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
  },
  description: {
    marginTop: 16,
    fontSize: 21,
    color: '#757575',
  },
});
