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
    let wrapBox = document.getElementsByClassName('t3-wrapper')[0];
    let scheduleBox = document.getElementsByClassName('col-sm-8 schedule')[0];
    let td = document.getElementsByTagName('td');
    let thead = document.getElementsByTagName('thead');
    let h3 = document.getElementsByTagName('h3');
    scheduleBox.setAttribute("style", "color: white; background-color: #2f3640; width: 100%; height: 100%; margin: 0px; fontWeight: bold");
    wrapBox.setAttribute('style', 'margin-top: -60px; backgroundColor: #000');
    thead[0].style.backgroundColor = 'transparent';
    for (let i = 0; i < td.length; i++) {
      td[i].setAttribute('style', 'padding: 10px 0px 10px; font-family:  Trebuchet MS; font-weight: bold; font-size: 13px; border-top: 0.5px solid white')
    }
    
    for (let j = 0; j < h3.length; j++) {
      h3[j].innerHTML = h3[j].innerText.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
      h3[j].setAttribute('style', 'color: #fbc531; font-family: Palatino; font-weight: bold; font-size: 16px');
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
    document.getElementsByTagName('body')[0].style.backgroundColor = '#2f3640'
    let tr = document.getElementsByTagName('tr')
    let td = document.getElementsByTagName('td')
    let item = document.getElementsByClassName('item _blank mp3')
    for (let i = 0; i < tr.length ; i++) {
    	tr[i].setAttribute('style', 'background-color: #2c3e50')
    	item[i].setAttribute('style', 'color: white')
	}
	for (let j = 0; j < td.length; j++) {
		td[j].setAttribute('style', 'border: none; border-bottom: 0.5px solid white')
	}
	for (let k = 0; k < thead.length; k++) {
		thead[k].remove()
	}
	document.getElementsByClassName('table-bordered')[0].style.border = 'none'
	document.getElementsByClassName('container-fluid')[0].style.padding = '0px'

	 document.getElementById('title').remove() 
    `