import cheerio from 'react-native-cheerio'

export async function getArchive() {
	let response = await fetch('http://www.rveritas-asia.org/languages/filipino/filipino-archive?dir=mp3files/Filipino/2018%20SW%20Programs/February/&file=http://apps.rveritas-asia.org/mp3files/Filipino/2018%20SW%20Programs/February//FILIPINO%20PROGRAM%2001%20FEB%202018%20PM.mp3&audiofile=FILIPINO%20PROGRAM%2001%20FEB%202018%20PM.mp3')
	if (response.ok) {
		let htmlResponse = await response.text();
		//console.log(htmlResponse)

	}

         

}