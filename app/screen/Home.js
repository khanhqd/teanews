import React, {Component} from 'react';
import Child from '../child';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  PanResponder,
  Animated
} from 'react-native';
var {height, width} = Dimensions.get('window');
import { Button1 } from '../common';
import NewsItem2 from '../common/NewsItem2';
import NewsList from '../common/NewsList';
const cheerio = require('cheerio-without-node-native');

import { loadListData, selectedPost0, selectedPost1, selectedPost2 } from '../actions';
import { connect } from 'react-redux';

class Home extends Child {
  constructor(props) {
    super(props);
    topView = null;
    paddingTop = 0;
    this.state = {
      data: [],
      top0: new Animated.Value(0),
      top1: new Animated.Value(0),
      top2: new Animated.Value(-height),
      index0: 2,
      index1: 1,
      index2: 3,
      dataSlot0: 1,
      dataSlot1: 2,
      dataSlot2: 0,
      dy: 0,
    }
    topViewStyle = {
      style:{
        top: paddingTop
      }
    }
  }
  _updateStyle() {
    topView && topView.setNativeProps(topViewStyle)
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderGrant: (event, gestureState) => {},
      onPanResponderMove: (event, gestureState) => {
        switch (this.state.index0) {
          case 2:
              if (gestureState.dy > 0) {
                if (this.state.dataSlot0 >0) {
                  this.state.top2.setValue(-height+gestureState.dy)
                }
              } else {
                this.state.top0.setValue(gestureState.dy)
              }
              break;
          case 3:
              if (gestureState.dy > 0) {
                this.state.top0.setValue(-height+gestureState.dy)
              } else {
                this.state.top1.setValue(gestureState.dy)
              }
              break;
          case 1:
              if (gestureState.dy > 0) {
                this.state.top1.setValue(-height+gestureState.dy)
              } else {
                this.state.top2.setValue(gestureState.dy)
              }
              break;
        }
        this.setState({ dy: gestureState.dy})
      },
      onPanResponderRelease: (event, gestureState) => {
        console.log(gestureState.vy)
        switch (this.state.index0) {
          case 2:
              if(this.state.dy > 0) {
                if ((this.state.dy > height/3)||(gestureState.vy > 1.5)) {
                  if (this.state.dataSlot0 >0) {
                    this.setState({index2: 2,index1: 3,index0: 1},() => {
                      if(this.state.dataSlot1>7) {
                        this.setState({dataSlot1: this.state.dataSlot1 - 7})
                      }
                    })
                    Animated.timing(
                      this.state.top2,
                      {toValue: 0, duration: 300}
                    ).start();
                    this.state.top1.setValue(-height)
                  }
                } else {
                  Animated.timing(
                    this.state.top2,
                    {toValue: -height, duration: 300}
                  ).start();
                }
              } else {
                if ((this.state.dy < -height/3)||(gestureState.vy< -1.5)) {
                  this.setState({index2: 1,index1: 2,index0: 3},() => {
                    this.setState({dataSlot2: this.state.dataSlot2 + 7})
                  })
                  Animated.timing(
                    this.state.top0,
                    {toValue: -height, duration: 300}
                  ).start();
                  this.state.top2.setValue(0)
                } else {
                  Animated.timing(
                    this.state.top0,
                    {toValue: 0, duration: 300}
                  ).start();
                }
              }
              break;
          case 3:
              if(this.state.dy > 0) {
                if ((this.state.dy > height/3)||(gestureState.vy > 1.5)) {
                  this.setState({index0: 2,index2: 3,index1: 1},() => {
                    if(this.state.dataSlot2>7) {
                      this.setState({dataSlot2: this.state.dataSlot2 - 7})
                    }
                  })
                  Animated.timing(
                    this.state.top0,
                    {toValue: 0, duration: 300}
                  ).start();
                  this.state.top2.setValue(-height)
                } else {
                  Animated.timing(
                    this.state.top0,
                    {toValue: -height, duration: 300}
                  ).start();
                }
              } else {
                if ((this.state.dy < -height/3)||(gestureState.vy< -1.5)) {
                  this.setState({index0: 1,index2: 2,index1: 3},() => {
                    this.setState({dataSlot0: this.state.dataSlot0 + 7})
                  })
                  Animated.timing(
                    this.state.top1,
                    {toValue: -height, duration: 300}
                  ).start();
                  this.state.top0.setValue(0)
                } else {
                  Animated.timing(
                    this.state.top1,
                    {toValue: 0, duration: 300}
                  ).start();
                }
              }
              break;
          case 1:
              if(this.state.dy > 0) {
                if ((this.state.dy > height/3)||(gestureState.vy > 1.5)) {
                  this.setState({index1: 2,index0: 3,index2: 1},() => {
                    if(this.state.dataSlot0>7) {
                      this.setState({dataSlot0: this.state.dataSlot0 - 7})
                    }
                  })
                  Animated.timing(
                    this.state.top1,
                    {toValue: 0, duration: 300}
                  ).start();
                  this.state.top0.setValue(-height)
                } else {
                  Animated.timing(
                    this.state.top1,
                    {toValue: -height, duration: 300}
                  ).start();
                }
              } else {
                if ((this.state.dy < -height/3)||(gestureState.vy< -1.5)) {
                  this.setState({index1: 1,index0: 2,index2: 3},() => {
                    this.setState({dataSlot1: this.state.dataSlot1 + 7})
                  })
                  Animated.timing(
                    this.state.top2,
                    {toValue: -height, duration: 300}
                  ).start();
                  this.state.top1.setValue(0)
                } else {
                  Animated.timing(
                    this.state.top2,
                    {toValue: 0, duration: 300}
                  ).start();
                }
              }
              break;
          default:

        }

        // if ((0 > this.state["top"+this.state.itemIndex%3]._value)&&(this.state["top"+this.state.itemIndex%3]._value < -height/3)) {
        //   Animated.timing(
        //     this.state["top"+this.state.itemIndex%3],
        //     {toValue: -height, duration: 300}
        //   ).start();
        // } else {
        //   Animated.timing(
        //     this.state.top3,
        //     {toValue: 0, duration: 300}
        //   ).start();
        // }
      }
    });
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData() {
        let data = this.state.data
        fetch(`http://vnexpress.net/rss/the-thao.rss`)
            .then((response) => response.text())
            .then((responseData) => {
                $ = cheerio.load(responseData, {
                    xmlMode: true,
                    decodeEntities: true
                })
                $('channel>item').each(function(){
                  CDATA =$(this).find('description').text()
                  let vitribatdau = CDATA.search('src=')
                  let vitriketthuc = CDATA.search(' ></a>')
                  let vitribatdauDes = CDATA.search('</br>')
                  let vitriketthucDes = CDATA.search(']]>')
                  let url = $(this).find('link').text()
                  if(url.includes('http://vnexpress.net/projects')== false){
                      data.push({
                          title:$(this).find('title').text(),
                          thumb : CDATA.slice(vitribatdau +5 , vitriketthuc-1).replace("_180x108",""),
                          des: CDATA.slice(vitribatdauDes+5 , vitriketthucDes),
                          url:url,
                          date: $(this).find('pubDate').text()
                      })
                    }
                })
                this.setState({
                  data:data,
                  refreshing:false,
                },()=>{
                  this.props.dispatch(loadListData(data))
                })
            })
    }
  toDetail(postId) {
    this.props.dispatch(selectedPost0(postId))
    this.props.dispatch(selectedPost1(postId+1))
    this.props.dispatch(selectedPost2(postId-1))
    this.context.appState({ scene: 'detail' })
  }
  render() {
    return (
      <View style={{flex:1}}>
        <View style={styles.navBarContainer} {...this._panResponder.panHandlers}>
            <Image
            style={{width: 25, height: 25, marginLeft: 20}}
            source={require('../../img/navicon_menu.png')}/>
        </View>
        <View>
          <Animated.View
          ref={ (view) => topView = view }
          style={{position: 'absolute', top: this.state.top0, zIndex: this.state.index0, backgroundColor: (this.state.index0==1)? 'rgba(232, 232, 232, 0.43)' : 'white'}}
          {...this._panResponder.panHandlers}>
            <NewsItem2
            onPress={()=>this.toDetail(this.state.dataSlot0)}
            data={this.state.data[this.state.dataSlot0]}/>
          </Animated.View>

          <Animated.View
          ref={ (view) => topView = view }
          style={{position: 'absolute', top: this.state.top1, zIndex: this.state.index1, backgroundColor: (this.state.index1==1)? 'rgba(232, 232, 232, 0.43)' : 'white'}}
          {...this._panResponder.panHandlers}>
            <NewsList
            data={this.state.data.slice(this.state.dataSlot1,this.state.dataSlot1+5)}
            dataIndex={this.state.dataSlot1}/>
          </Animated.View>

          <Animated.View
          ref={ (view) => topView = view }
          style={{position: 'absolute', top: this.state.top2, zIndex: this.state.index2, backgroundColor: (this.state.index2==1)? 'rgba(232, 232, 232, 0.43)' : 'white'}}
          {...this._panResponder.panHandlers}>
            <NewsItem2
            onPress={()=>this.toDetail(this.state.dataSlot2)}
            data={this.state.data[this.state.dataSlot2]}/>
          </Animated.View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  navBarContainer: {
    ...Platform.select({
      ios: {
        height: 65,
        paddingTop: 15
      },
      android: {
        height: 50
      }
    }),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    borderBottomWidth: 1,
    borderColor: 'grey'
  }
});
const mapStateToProps = state => {
   return {
   }
}
export default connect(mapStateToProps)(Home);
