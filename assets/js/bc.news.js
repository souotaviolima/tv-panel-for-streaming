(() => {
    $(".select-news-item").click(function() {
        const url = "http://news.rbmidia.com/wp-json/wp/v2/posts";
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