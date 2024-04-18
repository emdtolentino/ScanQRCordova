/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    var cameraOptions = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    }

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);


    document.getElementById("boton").addEventListener("click",() =>{
        console.log("Hola grupo 611");
        navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
    })

    let img64 = localStorage.getItem("foto");
    if (img64 != null) {
        var img = document.getElementById("foto");
        img.src = "data:image/jpeg;base64," + img64;
        
    } 
    

    let tituloLocal = localStorage.getItem('textoQR');
    if(tituloLocal!=null){
        var titulo = document.getElementById('textoQR');
        titulo.innerText='QR: '+tituloLocal
    }

    document.getElementById("botonQR").addEventListener("click",() =>{
        console.log("Leyendo QR");
        QRScanner.show();
        QRScanner.scan(qrSuccess);
    })
}


function qrSuccess(err, text){
    if(err){
        console.log('todo mal '+err);
    }else{
        if(text!=null){
            if(cordova.platformId=='android'){
                localStorage.setItem('textoQR', text);
                var titulo = document.getElementById('textoQR');
                titulo.innerText='QR: '+text
                QRScanner.hide();
            }else{
                localStorage.setItem('textoQR', text.result);
                var titulo = document.getElementById('textoQR');
                titulo.innerText='QR: '+text.result;
                QRScanner.hide();
            }
        }
    }
}

function cameraSuccess(img64) {
    var img = document.getElementById("foto");
    img.src = "data:image/jpeg;base64," + img64;

    localStorage.setItem("foto",img64)
}

function cameraError(error) {
    alert("Error: ",error);
}