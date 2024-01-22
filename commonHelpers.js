import{S as u,i as h}from"./assets/vendor-46aac873.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const f=document.querySelector(".search-form"),a=document.querySelector(".gallery-list"),l=document.querySelector("#loader");f.addEventListener("submit",p);let c;function p(i){i.preventDefault(),a.innerHTML="",l.classList.add("loader");const o=document.querySelector(".search-input");m(o.value).then(r=>{if(r.hits.length===0)throw new Error("Sorry, there are no images matching your search query. Please try again!");a.innerHTML=g(r.hits),c=new u(".gallery-link",{captionsData:"alt",captionDelay:250})}).catch(r=>h.error({title:"",message:r.message,position:"topRight"})).finally(()=>{f.reset(),l.classList.remove("loader"),c.refresh()})}function m(i){const o="14812482-32fb1dc9e3056dda489954fb4",r="https://pixabay.com/api/",s=new URLSearchParams({key:o,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${r}?${s}`).then(e=>{if(!e.ok)throw new Error(`Error: ${e.status}`);return e.json()})}function g(i){return i.map(({webformatURL:o,largeImageURL:r,tags:s,likes:e,views:t,comments:n,downloads:d})=>`
          <li class="gallery-item">
        <div class="img-wrapper">
          <a class="gallery-link" href="${r}">
            <img
            class="gallery-img"
            src="${o}"
            alt="${s}"
            width="360"
            height="200"
          />
          </a>
        </div>
        <div class="info-wrapper">
          <div class="info-block">
            <h3 class="info-caption">Likes</h3>
            <p class="info-text">${e}</p>
          </div>
          <div class="info-block">
            <h3 class="info-caption">Views</h3>
            <p class="info-text">${t}</p>
          </div>
          <div class="info-block">
            <h3 class="info-caption">Comments</h3>
            <p class="info-text">${n}</p>
          </div>
          <div class="info-block">
            <h3 class="info-caption">Downloads</h3>
            <p class="info-text">${d}</p>
          </div>
        </div>
      </li>`).join("")}
//# sourceMappingURL=commonHelpers.js.map
