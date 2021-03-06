import React, {Component} from 'react';
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
  Animated,
  AsyncStorage
} from 'react-native';
var {height, width} = Dimensions.get('window');
import { Button1 } from '../common';
import NewsItem2 from '../common/NewsItem2';
import NewsList from '../common/NewsList';
const cheerio = require('cheerio-without-node-native');

import { loadListData, selectedPost0, selectedPost1, selectedPost2 } from '../actions';
import { connect } from 'react-redux';
import { replaceListCate, reload } from '../actions';

class Home extends Component {
  static navigationOptions = {
    title: 'Tea News',
    headerTitleStyle: {alignSelf:'center'}
  }
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
      dataSlot0: 0,
      dataSlot1: 1,
      dataSlot2: -1,
      dy: 0,
      listCate: [],
      loading: true,
      bigData: []
    }
    topViewStyle = {
      style:{
        top: paddingTop
      }
    }
    this._get('listCate')
  }
  _updateStyle() {
    topView && topView.setNativeProps(topViewStyle)
  }
  _get = async (key) => {
    try {var value = await AsyncStorage.getItem(key);
      if (value !== null){
        switch (key) {
          case 'listCate':
            this.props.dispatch(replaceListCate(JSON.parse(value)))
            this.setState({ listCate:JSON.parse(value) },()=>{
              let listCate = this.state.listCate;
              if (listCate.length > 0) {
                let newObj = {};
                for(var i=0; i<listCate.length; i++) {
                  newObj["data"+i] = []
                }
                this.setState({...newObj},()=>{
                    let arrPromise = listCate.map((val, index) =>{
                      return new Promise((resolve, reject)=>{
                        this.fetchData(val.link,index, resolve)
                      })
                    })
                    Promise.all(arrPromise).then(()=>{
                      this.arrangeData()
                    })
                })
              } else {
                  this.fetchData('http://vnexpress.net/rss/kinh-doanh.rss')
              }
            })
            break;
        }}}catch (error) {alert(error)}
  };

  arrangeData() {
    let listCate = this.state.listCate;
    var bigData = [];
    function compare(a,b) {
      if (a.date < b.date)
        return 1;
      if (a.date > b.date)
        return -1;
      return 0;
    }
    for (var i=0; i<listCate.length; i++) {
      for (var n=0; n <this.state["data"+i].length; n++) {
        bigData.push(this.state["data"+i][n]);
      }
      this.setState({bigData: bigData.sort(compare), loading: false},()=>{
        this.props.dispatch(loadListData(this.state.bigData))
      })
    }
  }
  componentWillReceiveProps(props){
    console.log(props)
    if(props.reload) {
      this._get('listCate')
      this.props.dispatch(reload(false))
    }
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
                if (this.state.dataSlot0 + 1 < this.state.bigData.length) {
                  this.state.top0.setValue(gestureState.dy)
                }
              }
              break;
          case 3:
              if (gestureState.dy > 0) {
                this.state.top0.setValue(-height+gestureState.dy)
              } else {
                if (this.state.dataSlot0 + 6 < this.state.bigData.length) {
                  this.state.top1.setValue(gestureState.dy)
                }
              }
              break;
          case 1:
              if (gestureState.dy > 0) {
                this.state.top1.setValue(-height+gestureState.dy)
              } else {
                if (this.state.dataSlot0 < this.state.bigData.length) {
                  this.state.top2.setValue(gestureState.dy)
                }
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
                  if (this.state.dataSlot0 +1 < this.state.bigData.length) {
                    this.setState({index2: 1,index1: 2,index0: 3},() => {
                      this.setState({dataSlot2: this.state.dataSlot2 + 7})
                    })
                    Animated.timing(
                      this.state.top0,
                      {toValue: -height, duration: 300}
                    ).start();
                    this.state.top2.setValue(0)
                  }
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
                  if (this.state.dataSlot0 + 6 < this.state.bigData.length) {
                    this.setState({index0: 1,index2: 2,index1: 3},() => {
                      this.setState({dataSlot0: this.state.dataSlot0 + 7})
                    })
                    Animated.timing(
                      this.state.top1,
                      {toValue: -height, duration: 300}
                    ).start();
                    this.state.top0.setValue(0)
                  }
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
                  if (this.state.dataSlot0< this.state.bigData.length) {
                    this.setState({index1: 1,index0: 2,index2: 3},() => {
                      this.setState({dataSlot1: this.state.dataSlot1 + 7})
                    })
                    Animated.timing(
                      this.state.top2,
                      {toValue: -height, duration: 300}
                    ).start();
                    this.state.top1.setValue(0)
                  }
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

  }
  fetchData(linkRSS,i, callback) {
        let data = this.state["data"+i]
        fetch(linkRSS)
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
                  if((url.includes('http://vnexpress.net/projects')== false)&&(CDATA.includes('No Description')==false)){
                      data.push({
                          title:$(this).find('title').text(),
                          thumb : CDATA.slice(vitribatdau +5 , vitriketthuc-1).replace("_180x108",""),
                          des: CDATA.slice(vitribatdauDes+5 , vitriketthucDes),
                          url:url,
                          date: new Date($(this).find('pubDate').text()).getTime()
                      })
                    }
                })
                this.setState({
                  ['data' + i]: data,
                  refreshing:false,
                }, () => callback())
            })
    }
  toDetail(postId) {
    this.props.dispatch(selectedPost0(postId))
    this.props.dispatch(selectedPost1(postId+1))
    this.props.dispatch(selectedPost2(postId-1))
    setTimeout(()=>{this.props.navigation.navigate('Detail_Screen')},300)
  }
  renderLoading() {
    if(this.props.listCate.length == 0) {
      return (
        <View><Text>Hãy chọn Category --></Text></View>
      )
    } else {
      return (
        <View><Text>Loading...</Text></View>
      )
    }
  }
  render() {
    return (
      <View style={{flex:1}}>
        <View style={styles.navBarContainer}>
            <Image
            style={{width: 25, height: 25, marginLeft: 20}}
            source={require('../../img/navicon_menu.png')}/>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Category_Screen')}>
              <View style={{marginRight: 20, height: 30, width: 100, alignItems: 'flex-end', justifyContent: 'center'}}>
                <Text>
                  Chọn Cate
                </Text>
              </View>
            </TouchableOpacity>
        </View>
        {!this.state.loading ?
          <View>
            <Animated.View
            ref={ (view) => topView = view }
            style={{position: 'absolute', top: this.state.top0, zIndex: this.state.index0, backgroundColor: (this.state.index0==1)? 'rgba(232, 232, 232, 0.43)' : 'white'}}
            {...this._panResponder.panHandlers}>
              <NewsItem2
              onPress={()=>this.toDetail(this.state.dataSlot0)}
              data={this.state.bigData[this.state.dataSlot0]}/>
            </Animated.View>

            <Animated.View
            ref={ (view) => topView = view }
            style={{position: 'absolute', top: this.state.top1, zIndex: this.state.index1, backgroundColor: (this.state.index1==1)? 'rgba(232, 232, 232, 0.43)' : 'white'}}
            {...this._panResponder.panHandlers}>
              <NewsList
              navigation={this.props.navigation}
              data={this.state.bigData.slice(this.state.dataSlot1,this.state.dataSlot1+5)}
              dataIndex={this.state.dataSlot1}/>
            </Animated.View>

            <Animated.View
            ref={ (view) => topView = view }
            style={{position: 'absolute', top: this.state.top2, zIndex: this.state.index2, backgroundColor: (this.state.index2==1)? 'rgba(232, 232, 232, 0.43)' : 'white'}}
            {...this._panResponder.panHandlers}>
              <NewsItem2
              onPress={()=>this.toDetail(this.state.dataSlot2)}
              data={this.state.bigData[this.state.dataSlot2]}/>
            </Animated.View>
          </View>
          :
          this.renderLoading()}

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
    justifyContent: 'space-between',
    zIndex: 10,
    borderBottomWidth: 1,
    borderColor: 'grey'
  }
});
const mapStateToProps = state => {
   return {
     listCate: state.listCateReducer.list,
     reload: state.listCateReducer.reload
   }
}
export default connect(mapStateToProps)(Home);
