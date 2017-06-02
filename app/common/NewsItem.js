import React, { Component } from 'react';
import { View, Text, Dimensions, Platform, TouchableOpacity, Image,
  TouchableHighlight,
  TextInput,
  WebView,
  Share,
  Linking,
  Clipboard,
  ScrollView,
  AsyncStorage } from 'react-native';
var {height, width} = Dimensions.get('window');

import { RunsItem, Button1 } from '../common';
const cheerio = require('cheerio-without-node-native');
import * as Animatable from 'react-native-animatable';
var Toast = require('react-native-toast');

import { connect } from 'react-redux';
import { changeFontSize, changeModalState } from '../actions';
var WEBVIEW_REF = 'webview';

const patchPostMessageFunction = function() {
  var originalPostMessage = window.postMessage;

  var patchedPostMessage = function(message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };

  patchedPostMessage.toString = function() {
    return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
  };

  window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';

class NewsItem extends Component {
  state = {
    html: '',
    openMenu: false,
    bookMark: [],
    baseHTML: '',
    isSaved: false,
    textSelected: ''
  };
  componentWillMount() {
    this.fetchContent()
  }
  componentWillReceiveProps() {
    this.fetchContent()
    console.log('receiverprops')
  }
  _share() {
    Share.share({
      message: this.props.row.title,
      url: this.props.row.url,
      title: 'From News App'
    }, {
        dialogTitle: 'From News App',
        // excludedActivityTypes: [
        //   'com.apple.UIKit.activity.PostToTwitter'
        // ],
        tintColor: 'green'
      })
      .then(this._showResult)
      .catch((error) => this.setState({ result: 'error: ' + error.message }));
  }
  _showResult(result) {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        this.setState({ result: 'shared with an activityType: ' + result.activityType });
      } else {
        this.setState({ result: 'shared' });
      }
      alert(this.state.result)
    } else if (result.action === Share.dismissedAction) {
      this.setState({ result: 'dismissed' });
      alert(this.state.result)
    }
  }
  _openLink() {
    Linking.canOpenURL(this.props.row.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.row.url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.row.url);
      }
    });
  }
  returnHtml = () => {
    let htmlPlus = `
    <style>
      .cover{
        width: ${width}px;
        max-height: 400px
      }
      .title{
        padding-left: 20px
      }
      a{
        text-decoration: none;
        color: black
      }
      img{
        max-height:400px;
        max-width:${width}px;
      }
      * {
        -webkit-touch-callout: none !important;
      }
      h3, p, .block_timer_share{
        margin-left: ${this.props.paddingLeft}px;
        line-height: 1.3em;
        margin-right: 10px;
        font-size: ${this.props.fontSize}
      }
      noscript , script ,a, iframe,#wrapper_footer ,#box_tinkhac_detail,.box_tintaitro,
       .main_show_comment.width_common,.title_show.txt_666,#box_xemnhieunhat,#col_300,
       .block_tag.width_common.space_bottom_20,.text_xemthem ,#box_col_left,.form-control.change_gmt,
       .tt_2,.back_tt ,#topbar,.box_tinkhac.width_common,#sticky_info_st,.col_fillter.box_sticky_left,
       #menu-box,#header_web,.start.have_cap2,.cap2,.relative_new,.list_news_dot_3x3,.minutes,
       .xemthem_new_ver.width_common,meta,link,.menu_main,.top_3,.number_bgs,.filter_right,
       #live-updates-wrapper,.block_share.right{
        display: none
      }
      html, body{
        width: ${width}px;
        overflow-x:hidden;
        font-family: 'Nunito', sans-serif;
        margin-left: 0px;
        margin-right: 5px;
        margin-top: 0px;
        background-color: ${this.props.postBackground}
      }
    </style>
    <script>
      var link = document.querySelectorAll("a");
      for(var i = 0; i < link.length; i++){
        link[i].setAttribute("href", "javascript:void(0)");
      };

      function getSelectionText() {
          var text = "";
          var activeEl = document.activeElement;
          var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
          if (
            (activeElTagName == "textarea") || (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
            (typeof activeEl.selectionStart == "number")
          ) {
              text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
          } else if (window.getSelection) {
              text = window.getSelection().toString();
          }
          return text;
      }

      document.onmouseup = document.onkeyup = document.onselectionchange = function() {
        window.postMessage(getSelectionText());
      };
    </script>
    `;
    return htmlPlus
  }

  fetchContent() {
    let url = this.props.row.url
    console.log(this.props.row.url)
    fetch(this.props.row.url)
      .then((response) => response.text())
      .then((responseData) => {
        $ = cheerio.load(responseData)
        this.setState({ baseHTML: $('body').html() }, () => {
          this.updateWebview()
        })
      })
  }
  reloadWebview = () => {
    this.refs[WEBVIEW_REF].reload();
  };

  loading() {
    if (true) {
      return (
          <WebView
            ref={WEBVIEW_REF}
            style={{ width: width, height: height, backgroundColor: 'grey' }}
            javaScriptEnabled={true}
            injectedJavaScript={patchPostMessageJsCode}
            onMessage={(event) => { console.log(event) }}
            source={{ html: this.state.html }} />
      )
    } else {
      return (
        <Text style={{ textAlign: 'center', alignSelf: 'center' }}>Loading...
        </Text>
      )
    }
  }
  updateWebview() {
    this.setState({
      html:
      `<div>
          <img class="cover" src=${this.props.row.thumb}/>
          <h1 class="title">${this.props.row.title}</h1>
          ${this.state.baseHTML + this.returnHtml()}
          </div>
        `})
  }
  render() {
    return (
      <View style={{ alignItems: 'center', flex:1}}>
        {this.loading()}
        {this.props.openMenu &&
          <Animatable.View animation="slideInDown" duration={300} style={styles.menuModal}>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => {
                this.props.dispatch(changeFontSize(this.props.fontSize + 2));
                setTimeout(()=>{
                  this.updateWebview()
                  this.props.dispatch(changeModalState(!this.props.openMenu))
                },100)
                if (Platform.OS === 'android') {
                  setTimeout(()=>this.reloadWebview(),200)
                }
              }}
              style={styles.modalItem}>
              <View>
                <Text style={styles.modalText}>A+</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => {
                this.props.dispatch(changeFontSize(this.props.fontSize - 2));
                setTimeout(()=>{
                  this.updateWebview()
                  this.props.dispatch(changeModalState(!this.props.openMenu))
                },100)
                if (Platform.OS === 'android') {
                  setTimeout(()=>this.reloadWebview(),200)
                }
              }}
              style={styles.modalItem}>
              <View>
                <Text style={styles.modalText}>A-</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => {
                this._share();
                this.props.dispatch(changeModalState(!this.props.openMenu))
              }}
              style={styles.modalItem}>
              <View>
                <Text style={styles.modalText}>Share
                      </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => this._openLink()}
              style={styles.modalItem}>
              <View>
                <Text style={styles.modalText}>Mở trình duyệt
                      </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => {this._saveBookmark(); this.props.dispatch(changeModalState(!this.props.openMenu))}}
              style={styles.modalItem}>
              <View>
                <Text style={styles.modalText}>Lưu
                      </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => {
                Clipboard.setString(this.props.row.url);
                Toast.show('Đã sao chép link');
                this.props.dispatch(changeModalState(!this.props.openMenu))
              }}
              style={styles.modalItem}>
              <View>
                <Text style={styles.modalText}>Sao chép
                      </Text>
              </View>
            </TouchableHighlight>
          </Animatable.View>
        }
        {(this.state.textSelected != '') &&
          <Animatable.View animation="slideInUp" duration={300} style={styles.shareModal}>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => {
                Share.share({
                  message: this.state.textSelected,
                  url: this.props.row.url,
                  title: 'From News App'
                }, {
                    dialogTitle: 'From News App',
                    // excludedActivityTypes: [
                    //   'com.apple.UIKit.activity.PostToTwitter'
                    // ],
                    tintColor: 'green'
                  })
                  .then(this._showResult)
                  .catch((error) => this.setState({ result: 'error: ' + error.message }));
              }}
              style={styles.modalItem}>
              <View>
                <Text style={styles.modalText}>Share link kèm trích dẫn
                      </Text>
              </View>
            </TouchableHighlight>
          </Animatable.View>
        }
      </View >

    )
  }
}

const styles={
  container: {

  },
  cover: {
    justifyContent: 'center',
    height: 200,
    width: width
  },
  content: {
    justifyContent: 'flex-start',
    padding: 10,
    width: width
  },
  title: {
    fontWeight: '500',
    fontSize: 15,
    marginRight: 10
  },
  date: {
    fontSize: 13,
    color: 'grey'
  },
  info1: {
    flexDirection: 'row'
  },
  shareModal: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        zIndex: 3,
      },
      android: {
        borderColor: 'rgb(217, 217, 217)',
        borderLeftWidth: 0.5,
        zIndex: 4
      }
    }),
    bottom: 0,
    elevation: 5,
    shadowOpacity: 0.3,
    width: '100%'
  },
  modalItem: {
    height: 35,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'rgb(217, 217, 217)',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuModal: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        zIndex: 3,
      },
      android: {
        borderColor: 'rgb(217, 217, 217)',
        borderLeftWidth: 0.5,
      }
    }),
    top: 40,
    right: 0,
    width: 100,
    elevation: 5,
    shadowOpacity: 0.3
  },
}
const mapStateToProps = state => {
   return {
     openMenu: state.readerModalReducer.modalState,
     fontSize: state.readerModalReducer.fontSize,
     postBackground: state.readerModalReducer.postBackground,
     paddingLeft: state.readerModalReducer.paddingLeft
   }
}
export default connect(mapStateToProps)(NewsItem);
