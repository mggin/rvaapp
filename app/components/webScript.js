import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions'
import * as color from './color';
import { Dimensions } from 'react-native'

const {height, width} = Dimensions.get('window');
let margin = 0
let padding = 0
let fontSize = 15
let scheduleWidth = 'width: 100%'
let schedulePadding = ''
let row = ''
console.log(`height is ${height} ${width}`)
if (width === 768 || height === 1024) {
 
  scheduleWidth = `width: ${responsiveWidth(100)}px`
  padding += 40
  margin -= 24
  schedulePadding = `padding: ${padding}px`
  row = `document.getElementsByClassName('row')[0].setAttribute('style', 'width: ${responsiveWidth(100)}px; margin-right: ${margin}px; margin-left: ${margin}px; ')`
} else if (width >= 768 || height >= 1024) {
  margin -= 42
  padding += 40
  fontSize += 5
  schedulePadding = `padding: ${padding}px`
  scheduleWidth = `width: ${responsiveWidth(100)}px`
  row = `document.getElementsByClassName('row')[0].setAttribute('style', 'width: ${responsiveWidth(100)}px; margin-right: ${margin}px; margin-left: ${margin}px; ')`
} 
export const streamingJSRun = `function removeElement(classList){
      for (let index = 0; index < classList.length; index++) {
        let elements = document.getElementsByClassName(classList[index]);
        while(elements.length > 0){
          elements[0].parentNode.removeChild(elements[0]);
        }
      }
    } 
    let elementList = ['col-lg-12 col-md-12 col-sm-12 col-xs-12', 'bg-rva', 't3-spotlight t3-spotlight-1  row',
    'wrap t3-footer', 'col-sm-4', 'module-title yellow', 'container t3-mainbody', 'bg_whiteyellow' ];
    removeElement(elementList);
    document.getElementById('t3-mainnav').remove();
    document.getElementsByTagName('body')[0].setAttribute('style', 'backgroundColor: red;')
    let wrapBox = document.getElementsByClassName('t3-wrapper')[0];
    let scheduleBox = document.getElementsByClassName('schedule')[0];
    let td = document.getElementsByTagName('td');
    let thead = document.getElementsByTagName('thead');
    let h3 = document.getElementsByTagName('h3');
    ${row}
    scheduleBox.setAttribute("style", "${schedulePadding}; color: white; background-color: #2f3640; width: 100%; height: 100%;fontWeight: bold;");
    wrapBox.setAttribute('style', 'margin-top: -60px; ');
    thead[0].style.backgroundColor = 'transparent';
    for (let i = 0; i < td.length; i++) {
      td[i].setAttribute('style', 'padding: 10px 0px 10px; font-family:  Trebuchet MS; font-weight: bold; font-size: ${fontSize}px; border-top: 0px solid white')
    }
    
    for (let j = 0; j < h3.length; j++) {
      h3[j].innerHTML = h3[j].innerText.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
      h3[j].setAttribute('style', 'color: #fbc531; font-family: Palatino; font-weight: bold; font-size: ${fontSize+5}px');
    }
    
     `


export const dailyJSRun = `function removeElement(classList){
      for (let index = 0; index < classList.length; index++) {
        let elements = document.getElementsByClassName(classList[index]);
        while(elements.length > 0){
          elements[0].parentNode.removeChild(elements[0]);
        }
      }
    } 
    let elementList = ['text-center', 'alert alert-info text-center', 'prototype-wrapper']
    removeElement(elementList)
    document.getElementsByTagName('body')[0].setAttribute('style', 'margin-bottom: 0px; background-color: #2f3640; font-size: ${fontSize + 3}px; font-family: Trebuchet MS')
    let tr = document.getElementsByTagName('tr')
    let td = document.getElementsByTagName('td')
    document.getElementsByTagName('thead')[0].remove()
    let a = document.getElementsByTagName('a')
    let item = document.getElementsByClassName('item _blank mp3')
    let table = document.getElementsByClassName('table')
    let li = document.getElementsByTagName('li')
    document.getElementsByClassName('breadcrumb')[0].setAttribute('style', 'background-color: ${color.segment}')
    for (let n = 0; n < li.length; n++) {
      li[n].setAttribute('style', 'color: black; font-family: verdana')
   }
    for (let i = 0; i < tr.length ; i++) {
      tr[i].setAttribute('style', 'background-color: transparent; ')
   }
   for (let j = 0; j < td.length; j++) {
    td[j].setAttribute('style', 'background-color: transparent; border: none')
   }
   for (let k = 0; k < table.length; k++) {
   }
   for (let l = 0; l < a.length; l++) {
      a[l].setAttribute('style', 'color: white; font-size: ${fontSize}px; font-family: Trebuchet MS')
   }
   let menu = document.getElementsByClassName('breadcrumb')[0].getElementsByTagName('a')
    for (let index = 0; index < menu.length; index++) {
      menu[index].setAttribute('style', 'color: ${color.wht}; ')
    }
    let lil = document.getElementsByClassName('breadcrumb')[0].getElementsByTagName('li')
   for (let m = 0; m < lil.length; m++) {
      lil[m].setAttribute('style', 'color: white')
   }
   let borderBox = document.getElementsByClassName('table table-striped table-bordered')
   for (let m = 0; m < a.length; m++) {
      borderBox[m].setAttribute('style', 'border: none')
   }
   

    

	 document.getElementById('title').remove() 
    `