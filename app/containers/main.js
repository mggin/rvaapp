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
  TabBarIOS
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
import { setRadio } from '../../redux/actions'


class Main extends Component<{}> {
  

  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Radio'},
      { key: 'second', title: 'Languages' },
    ],
  }

  _renderIcon = (route) => {
    const iconSty = {width: 30, height: 30}
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
    const txtSty = {fontFamily: font.cabin_bold, fontSize: 11}
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
        style={{backgroundColor: color.footer, height: 60}}
        renderIcon={this._renderIcon}
        renderLabel={this._renderLabel}
        labelStyle={{color: color.wht, fontFamily: font.cabin_bold, fontSize: 11}}
        />
    )
  _renderScene = SceneMap({
    first: Radio,
    second: Languages,
  });


  render() {
    return (
      <Container style={{backgroundColor: '#000000'}}>
        <Header hasTabs
                style={{backgroundColor: color.header}}>
          <Body>
            <Title style={{fontFamily: font.righteous, color: color.header}}>RVA Mobile</Title>
          </Body>
        </Header>
        {/*
        <TabBarIOS
          style={{backgroundColor: '#000000'}}
          barTintColor={color.footer}
          unselectedTintColor={color.wht}
          tintColor={color.header}
          itemPositioning={'fill'}
          selected='radio'>
          <TabBarIOS.Item
            style={{marginBottom: 40,}}
            barTintColor={color.wht}
            selected={this.state.selectedTab === 'radio'}
            onPress={() => this.setState({selectedTab: 'radio'})}
            renderAsOriginal={false}
            title='Radio'
            selectedIcon={require('../../assets/icons/wave-y.png')}
            icon={require('../../assets/icons/wave-white.png')}>
            <Radio/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            //barTintColor={color.wht}
            style={{marginBottom: 40}}
            selected={this.state.selectedTab === 'languages'}
            onPress={() => this.setState({selectedTab: 'languages'})}
            title='Languages'
            renderAsOriginal={false}
            selectedIcon={require('../../assets/icons/lang-yellow.png')}
            icon={require('../../assets/icons/lang-white.png')}>
            <Languages />
          </TabBarIOS.Item>
        </TabBarIOS>
      */}
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
   icon_box: {
    //flexDirection: 'column',
    //backgroundColor: color.white
  },
  tabBar_style: {
  //  backgroundColor: color.white_color,
    marginBottom: 0,
  },
  image_size: {
    width: 30,
    height: 30,
    marginTop: 5,
    //backgroundColor: '#000000'
  },
  icon_filled: {
    fontFamily: font.cabin_bold,
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 4,
    textAlign: 'center',
    //color: color.icon_filled
  },
  icon_outline: {
    fontFamily: font.cabin_bold,
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 4,
    textAlign: 'center',
    //color: color.icon_outline,
  }
})

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setRadio,
  }, dispatch);
}

export default connect(null, matchDispatchToProps)(Main);
