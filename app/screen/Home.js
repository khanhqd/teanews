import React, {Component} from 'react';
import Child from '../child';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
var {height, width} = Dimensions.get('window');
import { Button1 } from '../common';

export default class Home extends Child {

  render() {
    return (
      <View style={{flex:1}}>
        <Image
        style={styles.background}
        source={require('../../img/login_background.png')}/>
        <View >
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={()=> this.context.appState({ scene: 'news' })}>
                <View style={styles.itemContainer}>
                    <Image
                    style={styles.icon}
                    source={require('../../img/ic_news.png')}/>
                    <Text style={styles.title}>
                        Tin mới
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={[styles.itemContainer,{marginLeft: 0}]}>
                    <Image
                    style={styles.icon}
                    source={require('../../img/ic_list.png')}/>
                    <Text style={styles.title}>
                        Văn hóa - xã hội
                    </Text>
                </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity>
                <View style={styles.itemContainer}>
                    <Image
                    style={styles.icon}
                    source={require('../../img/ic_medal.png')}/>
                    <Text style={styles.title}>
                        Thể thao
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={[styles.itemContainer,{marginLeft: 0}]}>
                    <Image
                    style={styles.icon}
                    source={require('../../img/ic_schedule.png')}/>
                    <Text style={styles.title}>
                        Điện ảnh
                    </Text>
                </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity>
                <View style={styles.itemContainer}>
                    <Image
                    style={styles.icon}
                    source={require('../../img/ic_sign.png')}/>
                    <Text style={styles.title}>
                        Thời trang
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={[styles.itemContainer,{marginLeft: 0}]}>
                    <Image
                    style={styles.icon}
                    source={require('../../img/ic_profile.png')}/>
                    <Text style={styles.title}>
                        Tài khoản
                    </Text>
                </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
              <View style={[styles.itemContainer,{height: 100, width: width - 10}]}>
                  <Image
                  style={styles.icon}
                  source={require('../../img/ic_logout.png')}/>
                  <Text style={styles.title}>
                      Đăng xuất
                  </Text>
              </View>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  rowContainer: {
    flexDirection: 'row',
    width: width,
    height: 155
  },
  itemContainer: {
    margin: 5,
    marginBottom: 0,
    backgroundColor: 'rgba(77, 77, 77, 0.52)',
    width: width/2 - 7.5 ,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: 'white'
  },
  title: {
    paddingTop: 10,
    fontSize: 17,
    color: 'white'
  },
  button: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center'
  },
});
