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
import { controlAudio, setDuration, setCurrentTime, setSeekTime } from '../../redux/actions'
import * as font from './font'
import * as color from './color'

//type Props = {};
//const audio = new Player('http://stream.rveritas-asia.org:8000/Myanmar.mp3')
//audio.play()

class DailyAudioPlayer extends Component<Props> {
  state = {
      //currentLang: langData[this.props.langRedData.selectedLangIndex],
      //buffering: false,
      ms: 0,
      loading: false,
      sliderValue: 0,
    }
    //this.setTimeInterval = this.setTimeInterval.bind(this)
  pauseAction = () => {
    //clearInterval(this.state.repeatedBar)
    this.props.controlAudio()
  }
  playAction = () => {
    this.props.controlAudio()
  }
  renderControlBtn = () => {
    const btnSty = {width: 30, height: 30}
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
    //this.setState({buffering: true})
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
    //console.log(value)
    //this.props.setSeekTime(this.state.sliderValue)
    this.player.seek(this.state.sliderValue)

  }
  _onValueChange = (value) => {
    this.setState({sliderValue: value})
    this.props.setSeekTime(value)
  }
  renderSlider = () => (
    <Slider 
      step={1}
      onResponderRelease={this._onResponderRelease}
      value={this.state.sliderValue}
      maximumValue={this.props.dailyRedData.playableDuration}
     // onSlidingComplete={this._onSlidingComplete}
      onValueChange={this._onValueChange}
      minimumTrackTintColor={'white'}
      style={{ transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }], width: responsiveWidth(110), marginLeft: -110 }}/>
  )
  _onProgress = (time) => {
    //console.log(time)
    //if (this.props.dailyRedData.currentTime < 1) {
     // console.log(time)
      this.props.setDuration(time.seekableDuration)
      //console.log('setDuration')
    //
   //console.log('heloo')
    this.props.setCurrentTime(time.currentTime)
  
  }
  render() {
    //const height = this.props.height
    //console.log(this.props.langRedData.currentLang)
    console.disableYellowBox = true;
    //console.log(this.props.dailyRedData.playableDuration)
    //console.log(this.props.dailyRedData.currentTime)
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
    //justifyContent: 'center',
    //flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#353b48a7',
  },
  controlBox: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#000000'

  },
  controlHolder: {
    width: 50,
    height: 50,
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
    fontSize: 12,
    fontFamily: font.cabin_regular,
    color: color.header,
    paddingHorizontal: 10,
    lineHeight: 20,
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
    //showScore,
    //setFontInfo,
    //storeScore,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DailyAudioPlayer);

