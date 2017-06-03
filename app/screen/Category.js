import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image,
} from 'react-native'
import RenderItem from '../common/RenderItem.js'
const { height, width } = Dimensions.get('window')
const Item = [
    { name: 'Thể thao', link: 'http://vnexpress.net/rss/the-thao.rss' },
    { name: 'Thế giới', link: 'http://vnexpress.net/rss/the-gioi.rss' },
    { name: 'Thời sự', link: 'http://vnexpress.net/rss/thoi-su.rss' },
    { name: 'Sức khoẻ', link: 'http://vnexpress.net/rss/suc-khoe.rss' },
    { name: 'Kinh doanh', link: 'http://vnexpress.net/rss/kinh-doanh.rss' },
    { name: 'Pháp luật', link: 'http://vnexpress.net/rss/phap-luat.rss' },
    { name: 'Xe', link: 'http://vnexpress.net/rss/oto-xe-may.rss' },
    { name: 'Khoa học', link: 'http://vnexpress.net/rss/khoa-hoc.rss' },
    { name: 'Du lịch', link: 'http://vnexpress.net/rss/du-lich.rss' },
]
export default class Category extends Component {
    renderItem() {
        var _this = this
        return Item.map(function (item, index) {
            return (
                <RenderItem
                onPress={()=>{}}
                selected={false}
                key={index}
                item={item}
                />
            )
        })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.smallContainer}>
                    <Text style={styles.titleText}>TeaNews</Text>
                    <View style={styles.category}>
                        <Text>Chọn nội dung bạn quan tâm </Text>
                    </View>
                </View>
                <View style={styles.smallContainer}>
                    {this.renderItem()}
                </View>
                <View style={styles.smallContainer}>
                    <View style={[styles.loginButton, { backgroundColor: 'white' }]}>
                        <Text>Lưu</Text>
                    </View>
                </View>
            </View>
        )
    }
}
// <View style={styles.smallContainer}>
//     <View style={[styles.loginButton, { backgroundColor: 'white' }]}>
//         <Text>Login with Google+</Text>
//     </View>
//     <View style={[styles.loginButton, { backgroundColor: 'white' }]}>
//         <Text>Login with Facebook</Text>
//     </View>
// </View>
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    smallContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    titleText: {
        textAlign: 'auto',
        fontFamily: 'Cochin',
        fontSize: 25,
        margin: 25
    },
    category: {
        height: 30,
        width: (width - 100),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10
    },
    item: {
        height: 30,
        width: 100,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 13,
    },
    loginButton: {
        width: width - 100,
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        margin: 5
    },

})
