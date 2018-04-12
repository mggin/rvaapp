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
  TabBarIOS,
  Dimensions
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
import Radio from './radio';
import Languages from './languages';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { setRadio, getLang, setLang } from '../../redux/actions'

const {height, width} = Dimensions.get('window');
let iconSize = 30
let tabHeight = 60
let fontSize = 11
let headHeight = 60
if (width === 768 || height === 1024) {
  headHeight += 20
} else if (width === 375 || height === 812) {
   headHeight += 20
} else if (width >= 768 || height >= 1024) {
  iconSize += 25
  tabHeight += 40
  fontSize += 5
  headHeight += 40
}

class Main extends Component<{}> {
  

  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Radio'},
      { key: 'second', title: 'Languages' },
    ],
  }
  componentWillMount() {
    AsyncStorage.getItem('@lang')
      .then(value => {
         this.props.getLang(value)
         this.props.setRadio()
    })
  }

  _renderIcon = (route) => {
    const iconSty = {width: iconSize, height: iconSize}
      if (route.index === 0 && route.focused) {
        return  <Image source={require('../../assets/icons/wave-y.png')} style={iconSty}/>
      } else if (route.index === 0 && !route.focused) {
        return  <Image source={require('../../assets/icons/wave-w.png')} style={iconSty}/>
      } else if (route.index === 1 && route.focused) {
        return  <Image source={require('../../assets/icons/lang-y.png')} style={iconSty}/>
      } else if (route.index === 1 && !route.focused) {
        return <Image source={require('../../assets/icons/lang-w.png')} style={iconSty}/>
      } else {
        return null
      }
    }

  _renderLabel = (route) => {
    const txtSty = {fontFamily: font.cabin_bold, fontSize}
    if (route.index === 0 && route.focused) {
        return  <Text style={[txtSty, {color: color.header}]}>RADIO</Text>
      } else if (route.index === 0 && !route.focused) {
        return  <Text style={[txtSty, {color: color.wht}]}>RADIO</Text>
      } else if (route.index === 1 && route.focused) {
        return  <Text style={[txtSty, {color: color.header}]}>LANGUAGES</Text>
      } else if (route.index === 1 && !route.focused) {
        return <Text style={[txtSty, {color: color.wht}]}>LANGUAGES</Text>
      } else {
        return null
      }
  }

  _handleIndexChange = (index) => {
    console.log('hello')
    this.props.setRadio();
    this.setState({ index });
  }

  _renderHeader = (props) => (
      <TabBar 
        {...props}
        indicatorStyle={{backgroundColor: color.footer}}
        style={{backgroundColor: color.footer, height: tabHeight}}
        renderIcon={this._renderIcon}
        renderLabel={this._renderLabel}
        labelStyle={{color: color.wht, fontFamily: font.cabin_bold, fontSize}}
        />
    )
  _renderScene = SceneMap({
    first: Radio,
    second: Languages,
  });


  render() {
    console.log(`height is ${height} ${width}`)
    return (
      <Container style={{backgroundColor: '#000000'}}>
        <Header hasTabs
                style={{backgroundColor: color.header, height: headHeight}}>
          <Body >
            <Title style={{fontFamily: font.righteous, color: '#353b48', fontSize: fontSize  + 10}}>RVA</Title>
          </Body>
        </Header>

       <TabViewAnimated
        swipeEnabled={false}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
      </Container>
    );
  }
}

const styles=StyleSheet.create({
  content_view: {
    height: responsiveHeight(90),
    //backgroundColor: 'green'
  },
  menu_view: {
    height: responsiveHeight(10),
  },

})

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setRadio,
    getLang,
    setRadio
  }, dispatch);
}

export default connect(null, matchDispatchToProps)(Main);
