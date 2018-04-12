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
  WebView,
  Alert,
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
import AudioPlayer from '../components/audioPlayer'
import DailyAudioPlayer from '../components/dailyAudioPlayer'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import * as Animatable from 'react-native-animatable'
import { streamingJSRun, dailyJSRun } from '../components/webScript'
import cheerio from 'react-native-cheerio'
import { setAudio, resetControl, controlAudio } from '../../redux/actions'


const {height, width} = Dimensions.get('window');
let marginHorizontal = 50
let marginBottom = 5
let padding = 0
let fontSize = 16
if (width === 768 || height === 1024) {
    marginHorizontal = 200
} else if (width >= 768 || height >= 1024) {
    marginHorizontal = 250
    marginBottom = 10
    padding += 4
    fontSize = 20
}


class Radio extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      segmentedIndex: 0,
      webLoad: false,
      animation: '',
      showPlayer: false,
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
  componenetDidMount() {
    
  }
  _onStateChange = (data) => {
    if (data.url[data.url.length - 1] === '3') {
      let delChar = data.url.substring(data.url.indexOf('&') + 6)
      let delChars1 = delChar.substring(0, delChar.indexOf('&'))
      //console.log(delChars1)
      this.setState({showPlayer: true})
      this.props.resetControl()
      this.props.setAudio(delChars1 )
    } else {
      this.setState({showPlayer: false})
    }
  }
  _onError = (error) => {
    Alert.alert(error)
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
          <Animatable.View animation={this.state.animation} style={{flex: this.state.webLoad ? 0 : 5, marginBottom: -1}} duration={3000}>
            <WebView 
              source={{uri: this.props.langRedData.currentLang.archive_url}}
              style={{backgroundColor: color.bg}}
              onLoad={this._onLoad}
              onLoadStart={this._onLoadStart}
              onLoadEnd = {this._onLoadEnd}
              bounces={false}
              javaScriptEnabled={true}
              injectedJavaScript={dailyJSRun}
              onError={this._onError}
              onNavigationStateChange={this._onStateChange}
            />
          </Animatable.View>
          {
            this.state.showPlayer ? 
            <Animatable.View animation={'fadeInUpBig'} style={{flex: 1}}>
              <DailyAudioPlayer /> 
            </Animatable.View>
            : null
          }
        </View>  
    } else {
      content = 
      <View style={styles.contentBox}>
      {
        this.state.webLoad ? 
        <View style={styles.spinBox}>
          <Image source={require('../../assets/icons/spin.gif')} style={{width: 30, height: 30}}/>
        </View> : null
      }
        <Animatable.View style={{flex: this.state.webLoad ? 0 : 5, marginBottom: -1}} animation={this.state.animation}  duration={3000}>
          <WebView 
                source={{uri: this.props.langRedData.currentLang.schedule_url}}
                style={{backgroundColor: color.bg}}
                onLoad={this._onLoad}
                bounces={false}
                onLoadStart={this._onLoadStart}
                onLoadEnd = {this._onLoadEnd}
                onError={this._onError}
                javaScriptEnabled={true}
                injectedJavaScript={streamingJSRun}
            />

        </Animatable.View>
        <AudioPlayer /> 


      </View>
    }
    return content
  }

  _onTabPress = (value) => {
    this.props.resetControl()
    this.setState({segmentedIndex: value, webLoad: false, animation: ''})
  }

  render() {
    return (
      <Container style={{backgroundColor: '#2f3640'}}>
        <View style={styles.segmentBox}>
          <SegmentedControlTab
            style={{overflow: 'hidden'}}
            tabTextStyle={[styles.textSty, {color: color.wht}]}
            activeTabTextStyle={[styles.textSty, {color: color.bg}]}
            tabStyle={styles.tabStyle}
            activeTabStyle={{backgroundColor: color.wht, borderColor: color.wht,  borderWidth: 1}}
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
    marginHorizontal: marginHorizontal,
    marginBottom: marginBottom,
  },
  contentBox: {
    flex: 5,
  },
  spinBox: {
    flex: 5, // do extra
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabStyle: {
    backgroundColor: 'transparent',
    borderColor: color.wht,
    borderWidth: 1,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    marginRight: -1,
  },
  textSty: {
    fontFamily: font.cabin_bold,
    fontSize,
    padding,
  }
})

function mapStateToProps(state) {
  return {
    langRedData: state.langRedData,

  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setAudio,
    resetControl,
    controlAudio,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Radio);

