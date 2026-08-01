const CACHE = "empireflix-v1";

const STATIC_FILES = [

"/",

"/index.html",

"/movie.html",

"/player.html",

"/search.html",

"/mylist.html",

"/continue.html",

"/history.html",

"/settings.html",

"/offline.html",

"/404.html",

"/catalog.json",

"/css/global.css",

"/css/layout.css",

"/css/components.css",

"/css/animations.css",

"/css/player.css",

"/css/responsive.css",

"/js/config.js",

"/js/utils.js",

"/js/db.js",

"/js/storage.js",

"/js/app.js",

"/js/ui.js"

];

self.addEventListener("install",event=>{

event.waitUntil(

caches.open(CACHE)

.then(cache=>cache.addAll(STATIC_FILES))

);

});

self.addEventListener("activate",event=>{

event.waitUntil(

caches.keys()

.then(keys=>Promise.all(

keys.map(key=>{

if(key!==CACHE){

return caches.delete(key);

}

})

))

);

});

self.addEventListener("fetch",event=>{

if(event.request.method!=="GET") return;

event.respondWith(

caches.match(event.request)

.then(response=>{

return response||

fetch(event.request)

.catch(()=>caches.match("/offline.html"));

})

);

});