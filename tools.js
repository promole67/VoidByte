const TOOLS = [
  {
    name: "Xworm Decoder",
    category: "Decoder",
    description: "Base64 Decrypter.",
    tags: ["Decrypt", "Base64", "Xworm"],
    image: "imgs/VoidByteDecoder.png",
    download: "tools/VoidByteDecoder.rar"
  }
];

function renderTools(){
  const grid = document.getElementById("tools-grid");
  if(!grid) return;

  grid.innerHTML = TOOLS.map(tool => `
    <article class="tool-card">
      <span class="corner tl"></span><span class="corner tr"></span>
      <span class="corner bl"></span><span class="corner br"></span>

      <div class="tool-card__img" data-lightbox="${tool.image}" data-caption="${tool.name}">
        <img src="${tool.image}" alt="${tool.name}"
             onerror="this.parentElement.classList.add('img-missing'); this.parentElement.innerHTML='<span class=&quot;img-fallback-text&quot;>${tool.name}.png</span>'">
      </div>

      <div class="tool-card__top">
        <span class="tool-card__name">${tool.name}</span>
        <span class="tool-card__cat">${tool.category}</span>
      </div>

      <p class="tool-card__desc">${tool.description}</p>

      <div class="tool-card__tags">
        ${tool.tags.map(t => `<span class="tag">#${t}</span>`).join("")}
      </div>

      <a class="tool-card__dl" href="${tool.download}" download>↓ Download</a>
    </article>
  `).join("");
}


function initLightbox(){
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxDownload = document.getElementById("lightbox-download");
  const closeBtn = lightbox.querySelector(".lightbox__close");

  function open(src, caption){
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || "";
    lightboxDownload.href = src;
    lightboxDownload.setAttribute("download", "");
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function close(){
    lightbox.classList.remove("is-open");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-lightbox]");
    if (trigger && !trigger.classList.contains("img-missing")) {
      open(trigger.getAttribute("data-lightbox"), trigger.getAttribute("data-caption"));
    }
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTools();
  initLightbox();
});
