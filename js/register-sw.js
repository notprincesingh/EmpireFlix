if("serviceWorker" in navigator){

window.addEventListener("load",()=>{

navigator.serviceWorker.register("service-worker.js")

.then(()=>{

console.log("EmpireFlix Service Worker Registered");

})

.catch(console.error);

});

}