import React, { Component } from 'react';
import Root from './root';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import Home from './screen/Home';
import News from './screen/News';
import NewsDetail from './screen/NewsDetail';

import * as Animatable from 'react-native-animatable';
const {width, height} = Dimensions.get("window");
// import * as firebase from 'firebase';
// const firebaseConfig = {
//   apiKey: "AIzaSyCrbUWDKlBCJCOTlF_D17y4zB7BZFHi-6A",
//   authDomain: "apptele-78fed.firebaseapp.com",
//   databaseURL: "https://apptele-78fed.firebaseio.com",
//   projectId: "apptele-78fed",
//   storageBucket: "apptele-78fed.appspot.com",
//   messagingSenderId: "68342702073"
//   };
// const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class TeaNews extends Root {
    state = {
        scene: 'home',
        webView: {
          postBackground: 'white',
          paddingLeft: 15,
          fontSize: 15,
        },
        textSelected: '',
        openMenuReader: true
    }
    //
    // componentWillMount() {
    //     if(Platform.OS === 'android') {
    //         BackAndroid.addEventListener('hardwareBackPress', () => {
    //             if(typeof this.state.navbar.onPressLeft === 'undefined') return false;
    //             if(typeof this.state.navbar.onPressLeft === 'function') {
    //                 this.state.navbar.onPressLeft();
    //                 return true;
    //             }
    //             return false;
    //         });
    //     }
    // }

    render() {
        let Page;
        const PageProps = {
            style: {flex:1, backgroundColor: 'transparent'}
        };
        switch(this.state.scene) {
            case 'home': Page = <Home {...PageProps} />; break;
            case 'news': Page = <News {...PageProps} />; break;
            case 'detail': Page = <NewsDetail {...PageProps} />; break;
            default: Page = <Home {...PageProps} />;
        }
        return ( this.state.welcomeScreen === true ? <Welcome /> :
        <View style={styles.container}>
              {Page}
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
});
// module.exports.firebaseApp = firebaseApp;
