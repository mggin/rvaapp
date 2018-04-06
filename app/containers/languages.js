/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  AsyncStorage,
  FlatList,
  Switch
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import { Container, Header, Tab, Tabs, Body, Title} from 'native-base';
import * as color from '../components/color';
import * as font from '../components/font';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { langData } from '../components/languagesData'
import { setLang } from '../../redux/actions'


class Languages extends Component<{}> {
  state = {
    langData: langData.map((item, index) => ({key: index.toString(), lang: item.lang}))
  }
  _onValueChange = (itemKey) => (event)=> {
    this.props.setLang(itemKey)
  }

  renderItem = (item, index) => {
    return (
      <View style={styles.langBox}>
        <View style={styles.langtxtBox}>
          <Text keys={item.num} style={styles.langtxt} >{item.lang}</Text>
        </View>
        <View style={styles.switchBox}>
          <Switch
            style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
            onValueChange={this._onValueChange(parseInt(item.key))} 
            value={this.props.langRedData.selectedLangIndex === parseInt(item.key)}
           />
        </View>
      </View>
       )

  }

  
  
  render() {
    //console.log(this.state.langData[0].num)
    console.log(this.props.langRedData)
    return (
      <Container style={{backgroundColor: color.bg}}>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{flex: 1, backgroundColor: '#000000'}}
          data={this.state.langData}
          renderItem={({item, index}) => this.renderItem(item)}/>
      </Container>
    );
  }
}

const styles=StyleSheet.create({
  // code go here
  langBox: {
    flexDirection: 'row',
    backgroundColor: '#353b48a7',
    alignItems: 'center',
    paddingVertical: 20,
    margin: StyleSheet.hairlineWidth
  },
  langtxtBox: {
    flex: 4,
    marginHorizontal: 20
    //backgroundColor: 'white'
  },
  switchBox: {
    flex: 1,

  },
  langtxt: {
    color: color.wht,
    fontSize: 15,
    fontFamily: font.cabin_bold,
  }

})

function mapStateToProps(state) {
  return {
    langRedData: state.langRedData,
    //layoutData: state.layoutData
  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setLang,
    //showScore,
    //setFontInfo,
    //storeScore,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Languages);

