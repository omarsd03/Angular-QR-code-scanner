import { Component, OnInit } from '@angular/core';
import * as Instascan from "instascan";

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})

export class ScannerComponent implements OnInit {

  datasResults:string;
  camStarted = false;
  isAdded:boolean = false;
  isSuccess:boolean = false;
  selectedDevice = undefined;
  qrResult:any;
  camerass:any;
  scanner:any;
  result:any;
  datasResult: string;

  constructor(){}

  ngOnInit() {

    jQuery(document).ready(function($){
  
      window.onload = function (){
        $(".bts-popup").delay(1000).addClass('is-visible');
      }

      $('.bts-popup-trigger').on('click', function(event){
        event.preventDefault();
        $('.bts-popup').addClass('is-visible');
      });

      $(document).keyup(function(event){
          if(event.which=='27'){
            $('.bts-popup').removeClass('is-visible');
          }
        });
    });

    let scan = this;
    scan.scanner = new Instascan.Scanner({ video: document.getElementById('preview'), mirror: false });
    scan.scanner.addListener('scan', function (content) {
      scan.qrResult = content;

        console.log('qrResult', scan.qrResult);
    });

    let that = this;
    Instascan.Camera.getCameras().then(function (cameras) {
        if(cameras.length > 0) {
          that.camerass = cameras;
          that.camerass.reverse();
              console.log("Devices",cameras);
              if(cameras[0] == null){
                that.scanner.start(cameras[1]); 
              }
              else{
                that.scanner.start(cameras[0]);
              }                 
        } 
        else {
          console.error('No cameras found.');
        }
    }).catch(function (e) {
        console.error(e);
    });     
  }

  onChange(selectedCam: number){
    // let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
    console.log("Selection changed",selectedCam);
    this.scanner.start(this.camerass[selectedCam]);
  }

}
