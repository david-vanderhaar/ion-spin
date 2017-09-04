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


		  let svgCanvas = document.getElementById("svgCanvas");
		  svgCanvas.style.height = (document.documentElement.clientHeight - 50).toString() + 'px';
		  svgCanvas.style.width = document.documentElement.clientWidth.toString() + 'px';

		  //Finding devices bottom tab height for use in calculating svgCanvase height
		  // let tabbar = document.getElementsByClassName("tabbar");
		  // let tabbarH = tabbar[0].offsetHeight;

		  // console.log(tabbar); 
		  // console.log(tabbarH); 

		  let logo = document.getElementById("spinLogo");
		  let logoCX = '0'; //logo center x-axis
		  let logoCY = '0'; //logo center y-axis

		  let logoR = '0'; //logo radius

		  logo.setAttributeNS(null, "cx", (document.documentElement.clientWidth / 2).toString());
		  logo.setAttributeNS(null, "cy", (document.documentElement.clientHeight / 2).toString());

		// Listen for device motion
		window.addEventListener('devicemotion', function(event) {
		  let acc = event.acceleration; // returns as meters per second^2
		  let lastSpin = parseFloat(document.getElementById('lastSpin').innerHTML);

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

		  // logo.style.height = (100 + (Math.abs(acc.y / 9.81)) * 100).toString() + 'px';
		  // logo.style.width = (100 + (Math.abs(acc.y / 9.81)) * 100).toString() + 'px';
		  // logo.style.margin = ((100 + (Math.abs(acc.y / 9.81)) * 100)/-2).toString() + 'px';

		  logoR = (100 + (Math.abs(acc.y / 9.81)) * 100).toString();
		  logo.setAttributeNS(null, "r", logoR);

		});
	}



}
