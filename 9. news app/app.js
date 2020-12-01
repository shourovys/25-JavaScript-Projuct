// get the news container form DOM
let newsContainer = document.getElementById("newsContainer")

// make a XMLHttpRequest object
const xhr = new XMLHttpRequest();
xhr.open("GET", `data.txt`, true)


xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        let collapse = ""


        Array.from(articles).forEach((element, index) => {
            // console.log(element);
            news = ` <div class="card">
                                <div class="card-header" id="heading${index}">
                                    <h2 class="mb-4">
                                        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#heading${index}" aria-expanded="false" aria-controls="heading${index}">
                                        <b>Breaking News ${index + 1} :</b> ${element.title} 
                                        </button>
                                    </h2>
                                </div>
                                <div id="heading${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsContainer">
                                    <div class="card-body">
                                        ${element.content}<a href="${element['url']}" target="_blank" >Read more here</a>
                                    </div>
                                </div>
                         </div> `
            collapse += news
        });
        newsContainer.innerHTML = collapse;
    }

    else {
        console.log("Some error occurred")
    }

}
xhr.send()