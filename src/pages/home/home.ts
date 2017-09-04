import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
// import * as $ from 'jquery'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	items: any[];
	x: any;
	acc: any;


	constructor(public navCtrl: NavController, private deviceMotion: DeviceMotion) {
		console.log('hello');
		console.log(deviceMotion);
		

		deviceMotion.getCurrentAcceleration().then(
		  (acceleration: DeviceMotionAccelerationData) => this.acc = acceleration,
		  (error: any) => console.log(error)
		);
		
	}

	itemSelected(item) {
		this.navCtrl.push(DetailPage, {
			item: item
		});
	}

	ngAfterViewInit() {

		// Listen for device motion
		window.addEventListener('devicemotion', function(event) {
		  let acc = event.acceleration; // returns as meters per second^2
		  let lastSpin = parseFloat(document.getElementById('lastSpin').innerHTML);

		  let svgCanvas = document.getElementById("svgCanvas"); 

		  let logo = document.getElementById("spinLogo");
		  // let logoJ = $('#spinLogo');
		  // console.log(logoJ);
		  console.log(logo.style.height);
		  console.log(logo.style.width);

		  if (acc.x != null){
		  	document.getElementById('x').innerHTML = acc.x.toString();
		  	if (Math.abs(Math.round(acc.x / 9.81)) > lastSpin) {
		  		document.getElementById('lastSpin').innerHTML = Math.abs(Math.round(acc.x / 9.81)).toString() + 'x';
		  	}
		  }
		  if (acc.y != null){
		  	document.getElementById('y').innerHTML = acc.y.toString();
		  	if (Math.abs(Math.round(acc.y / 9.81)) > lastSpin) {
		  		document.getElementById('lastSpin').innerHTML = Math.abs(Math.round(acc.y / 9.81)).toString() + 'y';

		  	}
		  }
		  if (acc.z != null){
		  	document.getElementById('z').innerHTML = acc.z.toString();
		  	if (Math.abs(Math.round(acc.z / 9.81)) > lastSpin) {
		  		document.getElementById('lastSpin').innerHTML = Math.abs(Math.round(acc.z / 9.81)).toString() + 'z';
		  	}
		  }

		  logo.style.height = (100 + (Math.abs(acc.y / 9.81)) * 100).toString() + 'px';
		  logo.style.width = (100 + (Math.abs(acc.y / 9.81)) * 100).toString() + 'px';
		  logo.style.margin = ((100 + (Math.abs(acc.y / 9.81)) * 100)/-2).toString() + 'px';

		  svgCanvas.style.height = document.documentElement.clientHeight.toString() + 'px';
		  svgCanvas.style.width = document.documentElement.clientWidth.toString() + 'px';

		});
	}



}
