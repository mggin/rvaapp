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
import * as Animatable from 'react-native-animatable'
import cheerio from 'react-native-cheerio'





class DailyProgram extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      webLoad: false
    }
  }

  render() {
    return (
      <Container style={{backgroundColor: '#2f3640'}}>
        <Animatable.View animation={this.state.animation} style={{flex: 1}} duration={3000}>
            <WebView 
              source={{uri: this.props.langRedData.currentLang.archive_url}}
              //onLoad={}
              //style={{marginTop: -100}}
              onLoad={this._onLoad}
              onLoadStart={this._onLoadStart}
              onLoadEnd = {this._onLoadEnd}
              bounces={false}
              //renderLoading:
              javaScriptEnabled={false}
              onNavigationStateChange={(v) => console.log(v)}
              //injectJavaScript={() => console.log()}
            />
          </Animatable.View>

      </Container>
    );
  }
}

const styles=StyleSheet.create({
  // code go here
})

function mapStateToProps(state) {
  return {
    langRedData: state.langRedData,

  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    //changeTab,
    //showScore,
    //setFontInfo,
    //storeScore,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DailyProgram);

