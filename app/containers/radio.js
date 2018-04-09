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
  SegmentedControlIOS,
  WebView
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
import AudioPlayer from '../components/audioPlayer'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import * as Animatable from 'react-native-animatable'
import { streamingJSRun, dailyJSRun } from '../components/webScript'
import cheerio from 'react-native-cheerio'





class Radio extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      segmentedIndex: 0,
      webLoad: false,
      animation: ''
    }
  }
  _onLoad = () => {
    this.setState({webLoad: false, animation: 'fadeIn'})
    console.log(this.state)
  }
  _onLoadStart = () => {
    this.setState({webLoad: true})
  }
  _onLoadEnd = () => {
    //this.setState({webLoad: false, animation: ''})
  }
  renderProgressContent = () => {
    if (this.state.webLoad) {
      return (
        <View style={styles.spinBox}>
          <Image source={require('../../assets/icons/spin.gif')} style={{width: 30, height: 30}}/>
        </View> )
    } else {
      return null
    }
  }

  showContent = () => {
    let content = null
    if (this.state.segmentedIndex === 1) {
      content = 
        <View style={styles.contentBox}>
         {
            this.state.webLoad ?
            <View style={styles.spinBox}>
              <Image source={require('../../assets/icons/spin.gif')} style={{width: 30, height: 30}}/>
            </View> : null
          }
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
              injectedJavaScript={dailyJSRun}
              onNavigationStateChange={(v) => console.log(v)}
              //injectJavaScript={() => console.log()}
            />
          </Animatable.View>
        </View>  
    } else {
      content = 
      <View style={styles.contentBox}>
      {
        this.state.webLoad ? 
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 5}}>
          <Image source={require('../../assets/icons/spin.gif')} style={{width: 30, height: 30}}/>
        </View> : null
      }
        <Animatable.View style={[styles.scheduleBox, {flex: this.state.webLoad ? 0 : 5}]} animation={this.state.animation}  duration={1000}>
          <WebView 
                source={{uri: this.props.langRedData.currentLang.schedule_url}}
                //onLoad={}
                style={{backgroundColor: '#000000'}}
                onLoad={this._onLoad}
                bounces={false}
                onLoadStart={this._onLoadStart}
                onLoadEnd = {this._onLoadEnd}
                //renderLoading:
                //javaScriptEnabled={false}
                injectedJavaScript={streamingJSRun}
            />

        </Animatable.View>
        <AudioPlayer />

      </View>
    }
    return content
  }

  _onTabPress = (value) => {
    this.setState({segmentedIndex: value, webLoad: false, animation: ''})
  }

  render() {
    //console.log(this.state)
    const $ = cheerio.load('<h2 class="title">Hello world</h2>')

//console.log($('h2.title').text('Hello there!'))
    return (
      <Container style={{backgroundColor: '#2f3640'}}>
        <View style={styles.segmentBox}>
          <SegmentedControlTab
            tabTextStyle={{fontFamily: font.cabin_bold, color: color.wht}}
            activeTabTextStyle={{fontFamily: font.cabin_bold, color: color.bg}}
            tabStyle={{backgroundColor: 'transparent', borderColor: color.wht}}
            activeTabStyle={{backgroundColor: color.wht, borderColor: color.wht}}
            values={['Live Streaming', 'Daily Program']}
            selectedIndex={this.state.segmentedIndex}
            onTabPress={this._onTabPress}/>
        </View>
        {
          this.showContent()
        }

      </Container>
    );
  }
}

const styles=StyleSheet.create({
  // code go here
  segmentBox: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 50,
    marginBottom: 5,
  },
  contentBox: {
    flex: 5
  },
  spinBox: {
    flex: 10000, // do extra
    justifyContent: 'center',
    alignItems: 'center'
  },
  scheduleBox: {
    flex: 5
  }
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

export default connect(mapStateToProps, matchDispatchToProps)(Radio);

