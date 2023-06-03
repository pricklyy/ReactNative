import { Alert, Button, Image, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'
import Logo from '../assets/images/logo.png'
import log from '../Log'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignInScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // hàm điều hướng
  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  // hàm lấy dữ liệu từ API
  const fetchData = async() => {
    try {
      const API_URL = "http://192.168.1.109:3000/users";
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log('Lỗi lấy dữ liệu! ' + error);
      return null;
    }
  };


  // hàm Validate 
  const validateAuthInfo = (authInfo) => {
      if(authInfo.username ===''){
        setUsernameError('Username field cannot be empty');
        return false;
      } else if(authInfo.password === ''){
        setUsernameError('');
        setPasswordError('Password field cannot be empty');
        return false;
      }
      return true;
  }
   // hàm clear mess lỗi
   const clearError = (usernameError, passwordError) => {
    if(usernameError) setUsernameError('');
    if(passwordError) setPasswordError('');
   };


   // 
   const storeAuthInfo = async(value) => {
    try {
      const authInfo = JSON.stringify(value);
      await AsyncStorage.setItem('authInfo', authInfo);
    } catch (error) {
      log.info(error);
    }
   };

   // hàm đăng nhập
  const onPressSignIn = () => {
    // let request = { username: username, password: password };
    // // ToastAndroid.show('Xin chào '+request.username,ToastAndroid.SHORT);
    // Alert.alert('Thông báo!', 'Xin chào ' + request.username, [
    //   { text: 'Cancel', onPress: () => { console.log('Cancel Pressed') }, style: 'cancel' },
    //   { text: 'Ok', onPress: () => { console.log('OK Pressed') } }
    // ])

    // if (username.length == 0) {
    //   alert('Tài khoản trống!');
    //   return;
    // }

    // if (password.length == 0) {
    //   alert('Mật khẩu trống!');
    //   return;

    // }

    let request = { username: username, password: password };
    log.info('authInfo : '+JSON.stringify(request));
    if (users) {
      const authInfo = users.find((user) => user.userName === request.username);

      if (users) {
        const validateResult = validateAuthInfo(request);
        if(validateResult === true) {
          const authInfo = users.find((user) => request.username === user.userName);
          if(!authInfo) {
            clearError(usernameError,passwordError);
            Alert.alert('Thông báo!', 'Không tìm thấy tài khoản', [{ text: 'Cancel', onPress: () => console.log('Không tìm thấy user:  ' + request.username) }])
          } else {
            if(!(authInfo.password === request.password)) {
              clearError(usernameError,passwordError);
              setPasswordError('Password không đúng');
              return;
            }else {
              clearError(usernameError,passwordError);
              storeAuthInfo(authInfo);
              Alert.alert('Thông báo', 'Đăng nhập thành công! ' + request.username, [
                { text: 'OK', onPress: () => navigateToHome() },
                { text: 'Cancel', onPress: () => console.log('Press Cancel') }
              ]);
            }
          }
        }
      } 
      
    };



  };
  useEffect(() => {
    fetchData();
  },[]);

  return (
    <View style={styles.root}>
      <Image source={Logo} style={styles.logo}></Image>
      <Text style={styles.banner}>HEY APP... </Text>
      <CustomInput placeholder='Username' value={username} setValue={setUsername} secureTextEntry={false} />
      <Text style={styles.errorTxt} >{usernameError}</Text>
      <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} />
      <Text style={styles.errorTxt} >{passwordError}</Text>
      <CustomButton title={'Sign In'} onPress={onPressSignIn} />

      


    </View>
  )
}

export default SignInScreen;

const styles = StyleSheet.create({
  root: {
    
    padding: 20,
    backgroundColor: 'white',
  },
  logo: {
    width: '20%',
    marginTop: 10,
    height: '20%',
  },
  banner: {
    fontWeight: 'bold',
    color: 'orange',
    fontSize: 50,
    width: 400,
    textAlign: 'center',
    marginTop: 30,
    backgroundColor: 'white'
  },
  input: {
    width: 400,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  // button: {
  //   marginTop: 10,
  //   color: 'orange',
  //   padding: 10,
  //   backgroundColor: "orange",
  //   width: 400,
  //   height: 50,
  //   margin: 12,
  //   borderWidth: 1,
  //   borderRadius: 10,
  // },
  errorTxt: {
    color:'red',
    marginVertical:5
  }





})


// IPv4 Address. . . . . . . . . . . : 192.168.1.109