// let apiKey = 'oRSWc9sK_ydDXHxGuRqEGOz94qzx4CJjCFxf9r9ZQ7M'
let apiKey = 'qYnjAZtToJtJAZfNwxBv6hBQrbP7xRdzqZp9nIGkdUM'
let picCount = 5
const url = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`
const imgContainer = document.querySelector('.img-container')
const loadingSvg = document.querySelector('#loadingSvg')
let ready = false;
let imgLoadPanging = 0
let imgLoaded = 0


const updatePicCount = () => {
    picCount = 30
}

const isImgLoaded = (e) => {
    imgLoaded++
    e.target.style.display = 'block'

    if (imgLoadPanging === imgLoaded) {
        loadingSvg.hidden = true;
        ready = true;
        imgLoaded = 0
        console.log(imgLoadPanging, imgLoaded);
    }
}


const displayData = (imgData) => {
    imgData.map(data => {
        const { urls: { regular } } = data;
        imgContainer.innerHTML += `<img onload="isImgLoaded(event)" src=${regular} alt="">`

    })
}

function fetchData() {
    loadingSvg.hidden = true;
    try {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                imgLoadPanging = data.length;
                console.log(imgLoadPanging);
                displayData(data)
            })

    } catch {

        apiKey = 'qYnjAZtToJtJAZfNwxBv6hBQrbP7xRdzqZp9nIGkdUM';
        fetchData()
        console.log('error');

    }
}

const handelScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if ((scrollTop + clientHeight + 2000 > scrollHeight) && ready) {
        console.log(ready);
        ready = false;
        fetchData()
        updatePicCount()
    }
}
fetchData()
window.addEventListener('scroll', handelScroll)
