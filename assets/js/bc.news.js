(() => {
    $(".select-news-item").click(function() {
        const url = "https://blogoalerta.com.br/wp-json/wp/v2/posts?per_page=30";
        const checked = this.checked
        fetch(url)
            .then((resp) => resp.json())
            .then(function(t) {
                toSendFront("news", t, "news", checked);
            })
            .catch(function(error) {
                console.log(error);
            });
    });
})();