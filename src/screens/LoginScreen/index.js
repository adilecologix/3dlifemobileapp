/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {Text, View, Image, Alert, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Input} from 'react-native-elements';
import {Formik} from 'formik';

import Icon from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';

import styles from './styles';
import {TouchableOpacity} from 'react-native';
import {login} from '../../api/methods/auth';

const initialValues = {
  email: '',
  password: '',
  globalErr: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email Address'),
  password: Yup.string()
    .required()
    .min(5, 'Minimum 5 characters required')
    .label('Password'),
});

const LoginScreen = ({navigation}) => {
  const passwordInput = useRef(null);
  const [isSecure, setIsSecure] = useState(true);

  const handleLogin = async values => {
    try {
      const model = {
        email: values.email,
        password: values.password,
      };
      await login(model);
      navigation.navigate('Scan');
    } catch (err) {
      console.error(err);
      Alert.alert('Try Again. Kindly Login with the valid Account!');
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        scrollEnabled
        extraScrollHeight={Platform.OS === 'android' ? 70 : 30}
        style={styles.screen}>
        <Image
          style={styles.image}
          source={require('../../../assets/logo.png')}
        />
        <View style={styles.seperator} />
        <View style={styles.header}>
          <Text style={styles.subText}>Login</Text>
        </View>

        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
          validationSchema={validationSchema}>
          {({
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            handleSubmit,
          }) => (
            <>
              <View style={styles.inputs}>
                <Input
                  placeholder={'Email Address'}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  textContentType={'emailAddress'}
                  autoCapitalize={'none'}
                  keyboardType={'email-address'}
                  autoCorrect={false}
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
                  onSubmitEditing={() => passwordInput.current.focus()}
                />
                <Text style={styles.errorText}>
                  {touched.email && errors.email ? errors.email : ''}
                </Text>
                <Input
                  ref={passwordInput}
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={isSecure}
                  autoCapitalize={'none'}
                  rightIcon={
                    <Icon
                      style={{paddingRight: 15}}
                      name={isSecure ? 'eye' : 'eye-off-outline'}
                      size={20}
                      color="#C8C7C7"
                      onPress={() => setIsSecure(!isSecure)}
                    />
                  }
                />
                <Text style={styles.errorText}>
                  {touched.password && errors.password ? errors.password : ''}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleSubmit}>
                <Text style={styles.buttonT}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </>
  );
};

export default LoginScreen;
