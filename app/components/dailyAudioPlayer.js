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
  Alert,
  View,
  Image,
  TouchableOpacity,
  Slider,
  Dimensions
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import _ from 'lodash'
import Audio from 'react-native-video';
import { langData } from './languagesData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { controlAudio, setDuration, setCurrentTime, setSeekTime, sliding } from '../../redux/actions'
import * as font from './font'
import * as color from './color'

const {height, width} = Dimensions.get('window');
let scaleSize = 0.7
let scaleWidth = 80
let fontSize = 12
let btnSize = 30
let controlSize = 50
let marginLeft = -50
if (width === 768 || height === 1024) {
  marginLeft -= 50
} else if (width >= 768 || height >= 1024) {
  scaleSize += 0.3
  scaleWidth -= 20
  fontSize += 5
  btnSize += 10
  controlSize  += 20
}

class DailyAudioPlayer extends Component<Props> {
  state = {
      loading: false,
    }
  pauseAction = () => {
    //clearInterval(this.state.repeatedBar)
    this.props.controlAudio()
  }
  playAction = () => {
    this.props.controlAudio()
  }
  renderControlBtn = () => {
    const btnSty = {width: btnSize, height: btnSize}
    if (this.state.loading && this.props.dailyRedData.playing) {
      return (
        <View>
          <Image source={require('../../assets/icons/spin.gif')} style={btnSty}/>
        </View> )

    } else if (this.props.dailyRedData.playing) {
      return (
        <TouchableOpacity onPress={this.pauseAction}>
          <Image source={require('../../assets/icons/pause.png')} style={btnSty}/>
        </TouchableOpacity> )
    } else {
      return (
        <TouchableOpacity onPress={this.playAction}>
          <Image source={require('../../assets/icons/play.png')} style={btnSty}/>
        </TouchableOpacity> )
    }
    return <Image source={require('../../assets/icons/play.png')} />
  }

  _onBuffer = (value) => {
    if (!value) {
      this.setState({loading: true})
    } else {
      this.setState({loading: false})
    }
  }
  _onLoadStart = () => {
    this.setState({loading: true})
  }
  _onLoad = () => {
    this.setState({loading: false})
  }
  _onResponderRelease = () => {
    this.player.seek(this.props.dailyRedData.sliderValue)

  }
  _onValueChange = (value) => {
    this.props.sliding(value)
    this.props.setSeekTime(value)
  }
  renderSlider = () => (
    <Slider 
      step={1}
      onResponderRelease={this._onResponderRelease}
      value={this.props.dailyRedData.sliderValue}
      maximumValue={this.props.dailyRedData.playableDuration}
     // onSlidingComplete={this._onSlidingComplete}
      onValueChange={this._onValueChange}
      minimumTrackTintColor={color.header}
      style={{ transform: [{ scaleX: scaleSize }, { scaleY: scaleSize }], width: responsiveWidth(scaleWidth), marginLeft}}/>
  )
  _onProgress = (time) => {
    //console.log(time)
    this.props.setDuration(time.seekableDuration)

    this.props.setCurrentTime(time.currentTime)
  
  }
  render() {
    return (
      <View style={styles.container} ref="playerRef">
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.controlBox}>
            <View style={styles.controlHolder}>
            { this.renderControlBtn() }
            </View>
          </View>
          <View style={styles.nodeBox}>
            { this.renderSlider() }
          </View>
          <View style={styles.timer}>
            <Text style={styles.timerTxt}>{this.props.dailyRedData.hours}:{this.props.dailyRedData.minutes}:{this.props.dailyRedData.seconds}</Text>
          </View>
          <Audio
            controls={true}
            ref={(ref) => this.player = ref} 
            paused={!this.props.dailyRedData.playing}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onBuffer={this._onBuffer} 
            playInBackground={true} 
            ignoreSilentSwitch={"ignore"}
            onProgress={this._onProgress}
            source={{uri: this.props.dailyRedData.audio_url}}
           />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353b48a7',
  },
  controlBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#000000'

  },
  controlHolder: {
    width: controlSize,
    height: controlSize,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeBox: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //backgroundColor: '#F5FCFF',
  },
  timer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerTxt: {
    width: 100,
    fontSize: fontSize,
    fontFamily: font.cabin_regular,
    color: color.header,
    paddingHorizontal: 10,
    lineHeight: fontSize + 10,
    textAlign: 'center'
  }
});

function mapStateToProps(state) {
  return {
    dailyRedData: state.dailyRedData,

  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    controlAudio,
    setDuration,
    setCurrentTime,
    setSeekTime,
    sliding,
    //showScore,
    //setFontInfo,
    //storeScore,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DailyAudioPlayer);

