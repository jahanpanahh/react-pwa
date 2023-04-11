import React from "react";
import { json } from "react-router-dom";

const Home = (props) => {
  //console.log(props.token);
  const request = () => {
    // Notification.requestPermission().then((result)=>{
    //   console.log("requesting");
    //   if(result === "granted"){
    //     console.log("Permission granted")

    //   const randomItem = Math.floor(10);
    //   const notifTitle = "Test1";
    //   const notifBody = `Created by Hiren Sakaria.`;
    //   const notifImg = `logo.svg`;
    //   const options = {
    //     body: notifBody,
    //     icon: notifImg,
    //   };
    //   //new Notification(notifTitle, options);
    //   //setTimeout(randomNotification, 30000);
    //   }
    // })

    if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register("/sw.js")
              .then((reg) => {
                  if (Notification.permission === "granted") {
                      //$("#form").show();
                      getSubscription(reg);
                  } else if (Notification.permission === "blocked") {
                      //$("#NoSupport").show();
                  } else {
                      //$("#GiveAccess").show();
                      //$("#PromptForAccessBtn").click(() => requestNotificationAccess(reg));
                        Notification.requestPermission().then((result)=>{
                          console.log("requesting");
                          if(result === "granted"){
                            console.log("Permission granted")
                            getSubscription(reg);
                          // const randomItem = Math.floor(10);
                          // const notifTitle = "Test1";
                          // const notifBody = `Created by Hiren Sakaria.`;
                          // const notifImg = `logo.svg`;
                          // const options = {
                          //   body: notifBody,
                          //   icon: notifImg,
                          // };
                          //new Notification(notifTitle, options);
                          //setTimeout(randomNotification, 30000);
                          }
                      })
                  }
              });
            }
  }
// saveSubscription saves the subscription to the backend
const saveSubscription = async (endpoint, p256dh,auth) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "client": "abcd",
  "endpoint": endpoint,
  "auth": auth,
  "p256dh": p256dh
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
console.log(auth, "$$$$", p256dh);
let currentURL = window.location.href;
var url;
console.log(currentURL.indexOf("localhost"));
if(currentURL.indexOf("localhost") >= 0)
{
  url = `http://192.168.1.32:5242/savesub`
}
else
{
  url = `https://localhost:7018/savesub`
}

fetch(url, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  return true;
}
  function getSubscription(reg) {
    reg.pushManager.getSubscription().then(function (sub) {
        if (sub === null) {
          console.log("sub us null");
            reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: "BMkZjZF47g4Tcn2CsV7ddMEWto7tb_kMyypVHYl113BB5eL93cmmdOf9vS_127CfL9xQatcacEjr0--mhKvQZf0"
            }).then(function (sub) {
                fillSubscribeFields(sub);
            }).catch(function (e) {
                console.error("Unable to subscribe to push", e);
            });
        } else {
            fillSubscribeFields(sub);
        }
    });
}

function fillSubscribeFields(sub) {
  console.log(sub);
  
  saveSubscription(sub.endpoint,arrayBufferToBase64(sub.getKey("p256dh")),arrayBufferToBase64(sub.getKey("auth")));
  // document.getElementById("#endpoint").val(sub.endpoint);
  // document.getElementById("#p256dh").val(arrayBufferToBase64(sub.getKey("p256dh")));
  // document.getElementById("#auth").val(arrayBufferToBase64(sub.getKey("auth")));
}

function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}


// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
  return (
    <div>
      {" "}
      <h1>Home</h1>
      <p>{props.token}</p>
      <button onClick={request}>Request</button>
    </div>
  );
};

export default Home;
