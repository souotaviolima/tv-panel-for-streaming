(() => {
    $(document).on("click", ".select-news-item", function () {
      const checked = this.checked;
      const url = "http://news.rbmidia.com/wp-json/wp/v2/posts?per_page=30";
  
      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
          return response.json();
        })
        .then(data => {
          toSendFront("news", data, "news", checked);
        })
        .catch(error => {
          console.error("Erro ao buscar notícias:", error);
        });
    });
  })();
  