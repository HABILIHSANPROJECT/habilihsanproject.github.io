let articles = [{
    id: "",
    title: "",
    content: "",
    thumbnail: ""
}]
function submit(){
    console.log(articles)
    articles.push({
        id: Number(Number(articles.length) + 1),
        title: $("#titles").val(),
        content: $("#editor").val()
    })
    console.log(JSON.parse(JSON.stringify(articles)))
}