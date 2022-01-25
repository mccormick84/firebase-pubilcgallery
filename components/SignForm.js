import React, {useRef} from 'react';
import BorderedInput from './BorderedInput';

export default function SignForm({
  isSignUp,
  onSubmit,
  form,
  createChangeTextHandler,
}) {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <>
      <BorderedInput
        hasMarginBottom
        placeholder={'이메일'}
        value={form.email}
        onChangeText={createChangeTextHandler('email')}
        autoCapitalize={'none'}
        autoCorrect={false}
        autoCompletetype={'email'}
        keyboardtype={'email-address'}
        returnKeyType={'next'}
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <BorderedInput
        placeholder={'비밀번호'}
        secureTextEntry
        hasMarginBottom={isSignUp}
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        ref={passwordRef}
        returnKeyType={isSignUp ? 'next' : 'done'}
        onSubmitEditing={() => {
          if (isSignUp) {
            confirmPasswordRef.current.focus();
          } else {
            onSubmit();
          }
        }}
      />
      {isSignUp && (
        <BorderedInput
          placeholder={'비밀번호 확인'}
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={createChangeTextHandler('confrimPassword')}
          ref={confirmPasswordRef}
          returnKeyType={'done'}
          onsSubmitEditing={onSubmit}
        />
      )}
    </>
  );
}