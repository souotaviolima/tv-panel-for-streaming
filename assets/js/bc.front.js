const bc = new BroadcastChannel("frontChannel");

bc.onmessage = ({ data }) => {
  const { type, status, data: payload } = data;

  switch (type) {
    case "identidade":
      renderIdentidade(status, payload);
      break;

    case "logo":
      renderLogo(status, payload);
      break;

    case "lower":
      renderLower(status, payload);
      break;

    case "news":
      renderNews(status, payload);
      break;
  }
};

function renderIdentidade(status, payload) {
  const el = document.getElementById("identidade");
  if (!el) return;

  if (status) {
    el.classList.add("animated-in-identidade");
    el.classList.remove("animated-out-identidade");
    el.innerHTML = `<div class="identidade-content"><img src="images/${payload[0].image}"/></div>`;
  } else {
    el.classList.remove("animated-in-identidade");
    el.classList.add("animated-out-identidade");
  }
}

function renderLogo(status, payload) {
  const container = document.getElementById("logo");
  const img = document.getElementById("logo-image");
  const title = document.getElementById("logo-title");

  if (!container || !img || !title) return;

  if (status) {
    container.classList.add("animated-in-logo");
    container.classList.remove("animated-out-logo");
    img.innerHTML = `<img height="100px" src="images/${payload[0].image}"/>`;
    title.innerHTML = `<h3>${payload[0].title}</h3>`;
  } else {
    container.classList.remove("animated-in-logo");
    container.classList.add("animated-out-logo");
  }
}

function renderLower(status, payload) {
  const banner = document.getElementById("lower");
  const container = banner?.parentElement;
  const title = document.getElementById("headline");
  const subtitle = document.getElementById("subheadline");
  const tag = document.getElementById("tag");
  console.log(status);
  if (!banner || !container || !title || !subtitle || !tag) return;

  const { tagColor, headlineColor, subheadlineColor, headlineImage } =
    payload?.[0]?.identidade?.[0];

    console.log(payload?.[0]?.identidade?.[0]);
  const newTitle = payload?.[0]?.title;
  const newSubtitle = payload?.[0]?.subtitle;
  const newTag = payload?.[0]?.tag;

  // Primeira exibição (sem animação de saída)
  if (!status) {
    tag.textContent = newTag;
    title.textContent = newTitle;
    subtitle.textContent = newSubtitle;

    tag.style.backgroundColor = tagColor;
    title.style.backgroundColor = headlineColor;
    subtitle.style.backgroundColor = subheadlineColor;

    //container.classList.add("animated-in");
    banner.classList.add("animated-in");
  } else {
    // Se já teve uma entrada anterior → faz saída e depois entra com novos dados
    container.classList.remove("animated-in");
    banner.classList.remove("animated-in");

    banner.classList.add("animated-out");
    container.classList.add("animated-out");

    setTimeout(() => {
      tag.textContent = newTag;
      title.textContent = newTitle;
      subtitle.textContent = newSubtitle;

      tag.style.backgroundColor = tagColor;
      title.style.backgroundColor = headlineColor;
      subtitle.style.backgroundColor = subheadlineColor;

      //container.classList.remove("animated-out");
      banner.classList.remove("animated-out");
      container.classList.add("animated-in");
      container.classList.remove("animated-out");

      banner.classList.add("animated-in");
    }, 700); // tempo da anima
  }

  banner.classList.remove("animated-in");
  banner.classList.add("animated-out");

  container.classList.remove("animated-in");
  container.classList.add("animated-out");
}

function renderNews(status, payload) {
  const news = document.getElementById("news");
  const slider = document.getElementById("sliders-news");
  if (!news || !slider) return;

  if (status) {
    news.classList.remove("animated-out-news");
    setTimeout(() => news.classList.add("animated-in-news"), 5000);

    payload.forEach((post) => {
      const li = document.createElement("li");
      li.innerHTML = post.title.rendered;
      slider.appendChild(li);
    });

    let sliders = document.querySelectorAll("#sliders-news li");
    let current = 0;
    let total = sliders.length - 1;

    window.setInterval(() => {
      let prev = current ? current - 1 : total;
      sliders[prev].className = "";
      sliders[current].className = "slider-news-active";
      current = current >= total ? 0 : current + 1;
    }, 5000);
  } else {
    news.classList.add("animated-out-news");
    news.classList.remove("animated-in-news");
    slider.innerHTML = "";
  }
}
