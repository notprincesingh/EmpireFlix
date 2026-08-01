'use strict';

document.addEventListener("DOMContentLoaded",()=>{

    const loader=document.getElementById("loading-screen");

    if(!loader) return;

    setTimeout(()=>{

        loader.style.opacity="0";

        loader.style.visibility="hidden";

        document.body.classList.remove("is-loading");

        setTimeout(()=>{

            loader.remove();

        },500);

    },3000);

});