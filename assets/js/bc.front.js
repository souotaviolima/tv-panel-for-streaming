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

    if (payload[0].image && payload[0].title) {
      title.innerHTML = `<img height="100px" src="images/${payload[0].image}"/>`;
    } else if (payload[0].image) {
      title.innerHTML = `<img height="100px" src="images/${payload[0].image}"/>`;
    } else if (payload[0].title) {
      title.innerHTML = `<h3>${payload[0].title}</h3>`;
    } else {
      title.innerHTML = ""; // ou um fallback
    }
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

  if (!banner || !container || !title || !subtitle || !tag) return;

  const { primary, secondary, tertiary, quaternary } =
    payload?.[0]?.identidade?.[0];

  const newTitle = payload?.[0]?.title;
  const newSubtitle = payload?.[0]?.subtitle;
  const newTag = payload?.[0]?.tag;

  // Primeira exibição (sem animação de saída)
  if (!status) {
    tag.textContent = newTag;
    title.textContent = newTitle;
    subtitle.textContent = newSubtitle;

    title.style.backgroundColor = primary;
    subtitle.style.backgroundColor = secondary;
    tag.style.backgroundColor = tertiary;

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

      title.style.backgroundColor = primary;
      subtitle.style.backgroundColor = secondary;
      tag.style.backgroundColor = tertiary;

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
  const newsElement = document.getElementById("news");
  const newsContainer = newsElement?.parentElement;
  const marquee = document.getElementById("marquee");

  if (!newsElement || !newsContainer || !marquee) return;

  const news = payload?.[0]?.news;

  if (!status) {
    // Primeira exibição direta
    marquee.textContent = news;
    newsElement.classList.add("animated-in");
    newsContainer.classList.add("animated-in");

    newsElement.classList.remove("animated-out");
    newsContainer.classList.remove("animated-out");
  } else {
    // Anima saída
    newsElement.classList.remove("animated-in");
    newsContainer.classList.remove("animated-in");

    newsElement.classList.add("animated-out");
    newsContainer.classList.add("animated-out");

    // Depois de 700ms, atualiza e reentra
    setTimeout(() => {
      marquee.textContent = news;

      newsElement.classList.remove("animated-out");
      newsContainer.classList.remove("animated-out");

      newsElement.classList.add("animated-in");
      newsContainer.classList.add("animated-in");
    }, 700);
  }
}
