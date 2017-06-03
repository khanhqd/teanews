import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image,
} from 'react-native'
export default class RenderItem extends Component {
    saveCateToAsync() {
      if (!this.state.loading) {
        this.setState({ loading: true })
        let list = this.state.listCate;
          if(this.state.isSaved) {
              //delete from Async
              for (var i = list.length - 1; i>=0; i--) {
                if (list[i].name == this.props.row.name) {
                  list.splice(i,1);
                  ToastAndroid.show(
                          'Đã loại khỏi danh sách',
                          ToastAndroid.SHORT
                        )
                }
              }
              this._set('listCate', JSON.stringify(list));
            }
            this.setState({ isSaved: false, loading: false })
          } else {
            var cateInfo = {
              name: this.props.row.name,
              url: this.props.row.url
            }
            list.push(cateInfo)
            this._set('listCate', JSON.stringify(list))
            this.setState({ isSaved: true, loading: false })
            ToastAndroid.show(
                    'Đã lưu vào danh mục yêu thích',
                    ToastAndroid.SHORT
            )
          }
      }
    }
    render() {
        return (
                <TouchableOpacity onPress={this.props.onPress} >
                    <View style={[styles.item, { opacity: (this.props.selected) ? 0.2 : 1 }]}  >
                        <Text>{this.props.item.name}</Text>
                    </View>
                </TouchableOpacity>

        )
    }
}
const styles = StyleSheet.create({
    item: {
        height: 30,
        width: 100,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 13,
    },
})
