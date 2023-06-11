
const paginationLimit = 5, searchUrl = 'http://api.giphy.com/v1/gifs/search', trendingUrl = 'http://api.giphy.com/v1/gifs/trending', apiKey = 'qyRKL57iO755Nz2a82c4UuijL2Hb9CgX';
let search = '', paginationOffset = 0, lastSearchedText = '', dataSource = [], isEndOfList = false;     

function searchGifs(event) {
    search = event.target.value;
    debouncedSearchGifs();
}

const debouncedSearchGifs = debounce();

function debounce () { 
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => getGifs.apply(this, []), 500);
    }
}

async function fetchGifs(text) {
    const params = {
        limit: paginationLimit,
        api_key: apiKey,
        offset: paginationOffset,
    };
    if (text)
        params['q'] = text

    console.log(params);
    paginationOffset += paginationLimit;

    let url = text? searchUrl: trendingUrl;
    url += '?';
    Object.keys(params).forEach((key) => url = url+key+'='+params[key]+'&');
    console.log(url);
    return fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        return data;
    }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
    // return responseDummy;
}

function setApiParams(text = null, isNewHit = true) {
    if (text != null && text != lastSearchedText) {
        paginationOffset = 0;
        lastSearchedText = text;
    } else if (isNewHit) {
        paginationOffset = 0;
    }
    const clearPrevData = (paginationOffset == 0)
    return clearPrevData;
}

async function getGifs(isInitialLoad = false) {
    const clearPrevData = setApiParams(search, isInitialLoad);
    const res = await fetchGifs(search);
    const newData = processGifData(res);
    if (clearPrevData)
        dataSource = [];
    dataSource = dataSource.concat(newData);
    populateGifs(dataSource);
}

function processGifData(response) {
    if (!response && !(data in response))
        return;
    let data = response.data;
    setTimeout(() => {
        checkTotalCount(response); 
    }, 500);
    data = data.map(row => row.images.downsized_medium);
    return data;
}

function checkTotalCount(response) {
    if (response && response.pagination && response.pagination.total_count)
        setScrollStatusDiv('You are all set!!!')
    else 
        setScrollStatusDiv('')

}

function populateGifs(data) {
    const container = document.getElementById('gifs-container');
    container.innerHTML = '';
    for (const item of data) {
        const imgContainer = document.createElement('div');
        imgContainer.setAttribute('class', 'image-container')

        const img = document.createElement('img');
        img.setAttribute('src', item.url);
        img.setAttribute('width', item.width);
        img.setAttribute('height', item.height);
        img.setAttribute('class', 'image')
        imgContainer.appendChild(img);    
        container.appendChild(imgContainer);    
    }
    setScrollStatusDiv ('');
}

function setScrollStatusDiv (message) {
    const scrollStatusDiv = document.getElementById('loading-status-text');
    scrollStatusDiv.innerHTML = '';

}

window.onload =  (() => {
    getGifs(true);
    window.addEventListener('scroll', () => {
        // console.log(document.documentElement.scrollHeight, window.scrollY + window.innerHeight);
        if (window.scrollY + window.innerHeight +1 >= document.documentElement.scrollHeight) {
            setScrollStatusDiv('Fetching more data .....');
            console.log('inside');
            getGifs();
        }
    })
})



// dummy response for development
const responseDummy = {
    "data": [
        {
            "type": "gif",
            "id": "vxJr0fLhR54ztY3YEJ",
            "url": "https://giphy.com/gifs/xbox-game-xbox-series-x-s-vxJr0fLhR54ztY3YEJ",
            "slug": "xbox-game-xbox-series-x-s-vxJr0fLhR54ztY3YEJ",
            "bitly_gif_url": "https://gph.is/g/aN3K8wd",
            "bitly_url": "https://gph.is/g/aN3K8wd",
            "embed_url": "https://giphy.com/embed/vxJr0fLhR54ztY3YEJ",
            "username": "xbox",
            "source": "",
            "title": "Shocked Pixel GIF by Xbox",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2023-06-07 16:44:01",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "300",
                    "width": "533",
                    "size": "1480678",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "124114",
                    "mp4": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "270812",
                    "webp": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "38",
                    "hash": "bdecb21771ea8e08588e9672ebb06712"
                },
                "downsized": {
                    "height": "300",
                    "width": "533",
                    "size": "1480678",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "300",
                    "width": "533",
                    "size": "1480678",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "300",
                    "width": "533",
                    "size": "1480678",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "300",
                    "width": "532",
                    "mp4_size": "170403",
                    "mp4": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "300",
                    "width": "533",
                    "size": "1480678",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "355",
                    "size": "595441",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "73122",
                    "mp4": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "139468",
                    "webp": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "355",
                    "size": "133859",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "74222",
                    "webp": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "178",
                    "size": "236008",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "29906",
                    "mp4": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "58326",
                    "webp": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "178",
                    "size": "7936",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "355",
                    "size": "18626",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "113",
                    "width": "200",
                    "size": "253021",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "32278",
                    "mp4": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "64738",
                    "webp": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "113",
                    "width": "200",
                    "size": "61916",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "32654",
                    "webp": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "57",
                    "width": "100",
                    "size": "87699",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "15227",
                    "mp4": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "28176",
                    "webp": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "57",
                    "width": "100",
                    "size": "3551",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "113",
                    "width": "200",
                    "size": "9706",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "1327145",
                    "mp4": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "300",
                    "width": "533",
                    "size": "59214",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "270",
                    "width": "480",
                    "mp4_size": "124114",
                    "mp4": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "162",
                    "width": "287",
                    "mp4_size": "24031",
                    "mp4": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "57",
                    "width": "101",
                    "size": "49145",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "130",
                    "width": "230",
                    "size": "48488",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "270",
                    "width": "480",
                    "size": "1480678",
                    "url": "https://media3.giphy.com/media/vxJr0fLhR54ztY3YEJ/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media4.giphy.com/avatars/xbox/rgsPy6c93KaO.png",
                "banner_image": "https://media4.giphy.com/channel_assets/xbox/d0hcjt4RoTlW.png",
                "banner_url": "https://media4.giphy.com/channel_assets/xbox/d0hcjt4RoTlW.png",
                "profile_url": "https://giphy.com/xbox/",
                "username": "xbox",
                "display_name": "Xbox",
                "description": "The official Xbox GIFs page—now with 100% more meta!",
                "instagram_url": "https://instagram.com/xbox",
                "website_url": "http://www.xbox.com",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPXZ4SnIwZkxoUjU0enRZM1lFSiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXZ4SnIwZkxoUjU0enRZM1lFSiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXZ4SnIwZkxoUjU0enRZM1lFSiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXZ4SnIwZkxoUjU0enRZM1lFSiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "SwIMZUJE3ZPpHAfTC4",
            "url": "https://giphy.com/gifs/mumbaiindians-happy-birthday-mi-ipl-SwIMZUJE3ZPpHAfTC4",
            "slug": "mumbaiindians-happy-birthday-mi-ipl-SwIMZUJE3ZPpHAfTC4",
            "bitly_gif_url": "https://gph.is/g/ZywWQ8e",
            "bitly_url": "https://gph.is/g/ZywWQ8e",
            "embed_url": "https://giphy.com/embed/SwIMZUJE3ZPpHAfTC4",
            "username": "mumbaiindians",
            "source": "www.mumbaiindians.com",
            "title": "Happy Birthday GIF by Mumbai Indians",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "www.mumbaiindians.com",
            "is_sticker": 0,
            "import_datetime": "2020-02-12 07:46:06",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "480",
                    "width": "480",
                    "size": "1482088",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "836921",
                    "mp4": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "774422",
                    "webp": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "63",
                    "hash": "b720f79633adf2cab4efd09f0afef538"
                },
                "downsized": {
                    "height": "480",
                    "width": "480",
                    "size": "1482088",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "480",
                    "size": "1482088",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "480",
                    "width": "480",
                    "size": "1482088",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "180",
                    "width": "180",
                    "mp4_size": "174974",
                    "mp4": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "480",
                    "width": "480",
                    "size": "1482088",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "426061",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "299499",
                    "mp4": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "664180",
                    "webp": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "43964",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "56560",
                    "webp": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "207918",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "116544",
                    "mp4": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "274886",
                    "webp": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "3787",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "10586",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "426061",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "299499",
                    "mp4": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "664180",
                    "webp": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "43964",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "56560",
                    "webp": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "207918",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "49536",
                    "mp4": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "274886",
                    "webp": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "3787",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "10586",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "5085759",
                    "mp4": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "480",
                    "size": "85652",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "836921",
                    "mp4": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "150",
                    "width": "150",
                    "mp4_size": "41961",
                    "mp4": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "155",
                    "width": "155",
                    "size": "49439",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "74",
                    "width": "74",
                    "size": "47932",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "1482088",
                    "url": "https://media3.giphy.com/media/SwIMZUJE3ZPpHAfTC4/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media1.giphy.com/avatars/mumbaiindians/9VQ4z40SRQVM.gif",
                "banner_image": "https://media1.giphy.com/channel_assets/mumbaiindians/N69D86LnzIMg.gif",
                "banner_url": "https://media1.giphy.com/channel_assets/mumbaiindians/N69D86LnzIMg.gif",
                "profile_url": "https://giphy.com/mumbaiindians/",
                "username": "mumbaiindians",
                "display_name": "Mumbai Indians",
                "description": "#OneFamily",
                "instagram_url": "https://instagram.com/mumbaiindians",
                "website_url": "http://www.mumbaiindians.com",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPVN3SU1aVUpFM1pQcEhBZlRDNCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVN3SU1aVUpFM1pQcEhBZlRDNCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVN3SU1aVUpFM1pQcEhBZlRDNCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVN3SU1aVUpFM1pQcEhBZlRDNCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "SFrqhxC6yKUQJXnVEL",
            "url": "https://giphy.com/gifs/SantaCruzWarriors-excited-lets-go-gui-SFrqhxC6yKUQJXnVEL",
            "slug": "SantaCruzWarriors-excited-lets-go-gui-SFrqhxC6yKUQJXnVEL",
            "bitly_gif_url": "https://gph.is/g/ajKpM0Y",
            "bitly_url": "https://gph.is/g/ajKpM0Y",
            "embed_url": "https://giphy.com/embed/SFrqhxC6yKUQJXnVEL",
            "username": "SantaCruzWarriors",
            "source": "",
            "title": "Excited Lets Go GIF by Santa Cruz Warriors",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2023-06-08 00:34:58",
            "trending_datetime": "2023-06-08 19:00:08",
            "images": {
                "original": {
                    "height": "480",
                    "width": "270",
                    "size": "2113461",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "748580",
                    "mp4": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "766934",
                    "webp": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "26",
                    "hash": "8154ea631092db3785b837f8ad399151"
                },
                "downsized": {
                    "height": "480",
                    "width": "270",
                    "size": "1341500",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "270",
                    "size": "2113461",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "480",
                    "width": "270",
                    "size": "2113461",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "248",
                    "width": "139",
                    "mp4_size": "141114",
                    "mp4": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "480",
                    "width": "270",
                    "size": "52768",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "113",
                    "size": "499109",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "202672",
                    "mp4": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "214478",
                    "webp": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "113",
                    "size": "112538",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "55044",
                    "webp": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "57",
                    "size": "113962",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "75244",
                    "mp4": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "71646",
                    "webp": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "57",
                    "size": "5144",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "113",
                    "size": "17727",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "356",
                    "width": "200",
                    "size": "964951",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "465960",
                    "mp4": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "517116",
                    "webp": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "356",
                    "width": "200",
                    "size": "237542",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "149904",
                    "webp": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "178",
                    "width": "100",
                    "size": "382443",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "48908",
                    "mp4": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "181286",
                    "webp": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "178",
                    "width": "100",
                    "size": "14296",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "356",
                    "width": "200",
                    "size": "37851",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "5727105",
                    "mp4": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "270",
                    "size": "81526",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "270",
                    "mp4_size": "748580",
                    "mp4": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "152",
                    "width": "85",
                    "mp4_size": "44675",
                    "mp4": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "89",
                    "width": "50",
                    "size": "49935",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "122",
                    "width": "68",
                    "size": "37830",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "1920",
                    "width": "1080",
                    "mp4_size": "5529153",
                    "mp4": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "853",
                    "width": "480",
                    "size": "2113461",
                    "url": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                },
                "4k": {
                    "height": "3840",
                    "width": "2160",
                    "mp4_size": "17685669",
                    "mp4": "https://media3.giphy.com/media/SFrqhxC6yKUQJXnVEL/giphy-4k.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-4k.mp4&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media4.giphy.com/avatars/Santa_Cruz_Warriors/hu2xEByvpFD0.png",
                "banner_image": "",
                "banner_url": "",
                "profile_url": "https://giphy.com/SantaCruzWarriors/",
                "username": "SantaCruzWarriors",
                "display_name": "Santa Cruz Warriors",
                "description": "The NBA G League affiliate of the Golden State Warriors",
                "instagram_url": "https://instagram.com/gleaguewarriors",
                "website_url": "http://santacruz.gleague.nba.com/",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPVNGcnFoeEM2eUtVUUpYblZFTCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVNGcnFoeEM2eUtVUUpYblZFTCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVNGcnFoeEM2eUtVUUpYblZFTCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVNGcnFoeEM2eUtVUUpYblZFTCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "egamicDQMdJRDN0mix",
            "url": "https://giphy.com/gifs/snl-saturday-night-live-season-46-egamicDQMdJRDN0mix",
            "slug": "snl-saturday-night-live-season-46-egamicDQMdJRDN0mix",
            "bitly_gif_url": "https://gph.is/g/ZlMByzg",
            "bitly_url": "https://gph.is/g/ZlMByzg",
            "embed_url": "https://giphy.com/embed/egamicDQMdJRDN0mix",
            "username": "snl",
            "source": "",
            "title": "Elon Musk Snl GIF by Saturday Night Live",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2021-05-09 03:45:10",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "269",
                    "width": "480",
                    "size": "1728838",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "185979",
                    "mp4": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "453696",
                    "webp": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "37",
                    "hash": "8a8d808212dbe694e58d411992ccbaf1"
                },
                "downsized": {
                    "height": "269",
                    "width": "480",
                    "size": "1728838",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "269",
                    "width": "480",
                    "size": "1728838",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "269",
                    "width": "480",
                    "size": "1728838",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "240",
                    "width": "429",
                    "mp4_size": "55755",
                    "mp4": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "269",
                    "width": "480",
                    "size": "1728838",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "357",
                    "size": "957222",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "86686",
                    "mp4": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "288948",
                    "webp": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "357",
                    "size": "186595",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "126652",
                    "webp": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "179",
                    "size": "301114",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "25863",
                    "mp4": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "97344",
                    "webp": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "179",
                    "size": "11419",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "357",
                    "size": "29271",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "112",
                    "width": "200",
                    "size": "325563",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "28835",
                    "mp4": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "115960",
                    "webp": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "112",
                    "width": "200",
                    "size": "71312",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "47668",
                    "webp": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "56",
                    "width": "100",
                    "size": "104368",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "10453",
                    "mp4": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "37744",
                    "webp": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "56",
                    "width": "100",
                    "size": "4155",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "112",
                    "width": "200",
                    "size": "14263",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2376518",
                    "mp4": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "269",
                    "width": "480",
                    "size": "73627",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "268",
                    "width": "480",
                    "mp4_size": "185979",
                    "mp4": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "122",
                    "width": "218",
                    "mp4_size": "16066",
                    "mp4": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "58",
                    "width": "103",
                    "size": "49323",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "82",
                    "width": "146",
                    "size": "36336",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "269",
                    "width": "480",
                    "size": "1728838",
                    "url": "https://media2.giphy.com/media/egamicDQMdJRDN0mix/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media2.giphy.com/avatars/snl/eX6bfO3GejHA.jpg",
                "banner_image": "",
                "banner_url": "",
                "profile_url": "https://giphy.com/snl/",
                "username": "snl",
                "display_name": "Saturday Night Live",
                "description": "The official GIPHY channel for Saturday Night Live. Saturdays at 11:30/10:30c! #SNL",
                "instagram_url": "https://instagram.com/nbcsnl",
                "website_url": "http://www.nbc.com/saturday-night-live",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPWVnYW1pY0RRTWRKUkROMG1peCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWVnYW1pY0RRTWRKUkROMG1peCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWVnYW1pY0RRTWRKUkROMG1peCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWVnYW1pY0RRTWRKUkROMG1peCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "l2Jhok92mZ2PZHjDG",
            "url": "https://giphy.com/gifs/minion-kiss-l2Jhok92mZ2PZHjDG",
            "slug": "minion-kiss-l2Jhok92mZ2PZHjDG",
            "bitly_gif_url": "http://gph.is/2fIs7kM",
            "bitly_url": "http://gph.is/2fIs7kM",
            "embed_url": "https://giphy.com/embed/l2Jhok92mZ2PZHjDG",
            "username": "",
            "source": "",
            "title": "I Love You Kiss GIF by MOODMAN",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2016-11-13 03:54:02",
            "trending_datetime": "2021-01-09 07:45:06",
            "images": {
                "original": {
                    "height": "267",
                    "width": "500",
                    "size": "705787",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "61436",
                    "mp4": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "222384",
                    "webp": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "12",
                    "hash": "90b75f6ec58f0c1a7dc8406dd2b1f249"
                },
                "downsized": {
                    "height": "267",
                    "width": "500",
                    "size": "705787",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "267",
                    "width": "500",
                    "size": "705787",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "267",
                    "width": "500",
                    "size": "705787",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "266",
                    "width": "500",
                    "mp4_size": "69832",
                    "mp4": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "267",
                    "width": "500",
                    "size": "705787",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "375",
                    "size": "384212",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "41652",
                    "mp4": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "125858",
                    "webp": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "375",
                    "size": "198413",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "64056",
                    "webp": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "188",
                    "size": "115045",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "18070",
                    "mp4": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "46300",
                    "webp": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "188",
                    "size": "20465",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "375",
                    "size": "38446",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "107",
                    "width": "200",
                    "size": "125798",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "19359",
                    "mp4": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "49022",
                    "webp": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "107",
                    "width": "200",
                    "size": "69402",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "25426",
                    "webp": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "54",
                    "width": "100",
                    "size": "49604",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "9085",
                    "mp4": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "22160",
                    "webp": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "54",
                    "width": "100",
                    "size": "15772",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "107",
                    "width": "200",
                    "size": "21223",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "757089",
                    "mp4": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "267",
                    "width": "500",
                    "size": "57285",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "256",
                    "width": "480",
                    "mp4_size": "61436",
                    "mp4": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "224",
                    "width": "422",
                    "mp4_size": "47290",
                    "mp4": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "80",
                    "width": "150",
                    "size": "49594",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "131",
                    "width": "245",
                    "size": "49482",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "256",
                    "width": "480",
                    "size": "705787",
                    "url": "https://media3.giphy.com/media/l2Jhok92mZ2PZHjDG/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "analytics_response_payload": "e=Z2lmX2lkPWwySmhvazkybVoyUFpIakRHJmV2ZW50X3R5cGU9R0lGX1RSRU5ESU5HJmNpZD1mNDk4NGZkZG1vaDl4NHRkaThsNDZiOGV1YWN0d2xtbnJhZTA1d2Zqc2l6bnZuMWomY3Q9Zw",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWwySmhvazkybVoyUFpIakRHJmV2ZW50X3R5cGU9R0lGX1RSRU5ESU5HJmNpZD1mNDk4NGZkZG1vaDl4NHRkaThsNDZiOGV1YWN0d2xtbnJhZTA1d2Zqc2l6bnZuMWomY3Q9Zw&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWwySmhvazkybVoyUFpIakRHJmV2ZW50X3R5cGU9R0lGX1RSRU5ESU5HJmNpZD1mNDk4NGZkZG1vaDl4NHRkaThsNDZiOGV1YWN0d2xtbnJhZTA1d2Zqc2l6bnZuMWomY3Q9Zw&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWwySmhvazkybVoyUFpIakRHJmV2ZW50X3R5cGU9R0lGX1RSRU5ESU5HJmNpZD1mNDk4NGZkZG1vaDl4NHRkaThsNDZiOGV1YWN0d2xtbnJhZTA1d2Zqc2l6bnZuMWomY3Q9Zw&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "PBaO5ivn7JVk5qZiv2",
            "url": "https://giphy.com/gifs/helloall-sob-its-okay-to-not-be-ok-PBaO5ivn7JVk5qZiv2",
            "slug": "helloall-sob-its-okay-to-not-be-ok-PBaO5ivn7JVk5qZiv2",
            "bitly_gif_url": "https://gph.is/g/aeVVr68",
            "bitly_url": "https://gph.is/g/aeVVr68",
            "embed_url": "https://giphy.com/embed/PBaO5ivn7JVk5qZiv2",
            "username": "helloall",
            "source": "",
            "title": "Sad Oh No GIF by Hello All",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2022-03-22 20:40:45",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "480",
                    "width": "480",
                    "size": "2458922",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "584647",
                    "mp4": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "1061842",
                    "webp": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "62",
                    "hash": "2065d9a951d426b287a498c43c3ea57f"
                },
                "downsized": {
                    "height": "480",
                    "width": "480",
                    "size": "1585817",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "480",
                    "size": "2458922",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "480",
                    "width": "480",
                    "size": "2458922",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "264",
                    "width": "264",
                    "mp4_size": "128035",
                    "mp4": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "480",
                    "width": "480",
                    "size": "30922",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "511884",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "155905",
                    "mp4": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "309730",
                    "webp": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "62611",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "40132",
                    "webp": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "173977",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "60065",
                    "mp4": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "117204",
                    "webp": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "4160",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "10259",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "511884",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "155905",
                    "mp4": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "309730",
                    "webp": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "62611",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "40132",
                    "webp": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "173977",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "48282",
                    "mp4": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "117204",
                    "webp": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "4160",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "10259",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "1962025",
                    "mp4": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "480",
                    "size": "62391",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "584647",
                    "mp4": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "294",
                    "width": "294",
                    "mp4_size": "36850",
                    "mp4": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "98",
                    "width": "98",
                    "size": "48104",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "190",
                    "width": "190",
                    "size": "48682",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "1000",
                    "width": "1000",
                    "mp4_size": "2557783",
                    "mp4": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "2458922",
                    "url": "https://media4.giphy.com/media/PBaO5ivn7JVk5qZiv2/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media0.giphy.com/avatars/helloall/hGrSqJDMUajv.gif",
                "banner_image": "https://media0.giphy.com/headers/helloall/YF5eJMrkcjmM.gif",
                "banner_url": "https://media0.giphy.com/headers/helloall/YF5eJMrkcjmM.gif",
                "profile_url": "https://giphy.com/helloall/",
                "username": "helloall",
                "display_name": "Hello All",
                "description": "Hello All is an initiative to bring diversity and representation into conversational content.",
                "instagram_url": "https://instagram.com/HelloAllArt",
                "website_url": "https://helloall.co",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPVBCYU81aXZuN0pWazVxWml2MiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVBCYU81aXZuN0pWazVxWml2MiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVBCYU81aXZuN0pWazVxWml2MiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVBCYU81aXZuN0pWazVxWml2MiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "Bl10664xbIVkk",
            "url": "https://giphy.com/gifs/dancing-funny-gif-reaction-Bl10664xbIVkk",
            "slug": "dancing-funny-gif-reaction-Bl10664xbIVkk",
            "bitly_gif_url": "http://gph.is/1kugSJz",
            "bitly_url": "http://gph.is/1kugSJz",
            "embed_url": "https://giphy.com/embed/Bl10664xbIVkk",
            "username": "",
            "source": "http://fmlawschool.tumblr.com/post/41475192905/oh-hey-its-friday",
            "title": "Dancing Happy Dance GIF",
            "rating": "g",
            "content_url": "",
            "source_tld": "fmlawschool.tumblr.com",
            "source_post_url": "http://fmlawschool.tumblr.com/post/41475192905/oh-hey-its-friday",
            "is_sticker": 0,
            "import_datetime": "2013-12-21 23:16:28",
            "trending_datetime": "2020-11-07 22:15:15",
            "images": {
                "original": {
                    "height": "188",
                    "width": "250",
                    "size": "392605",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "295738",
                    "mp4": "https://media1.giphy.com/media/Bl10664xbIVkk/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "146876",
                    "webp": "https://media1.giphy.com/media/Bl10664xbIVkk/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "16",
                    "hash": "346ffdd53fec8cdd994c8b3ec20c25e2"
                },
                "downsized": {
                    "height": "188",
                    "width": "250",
                    "size": "392605",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "188",
                    "width": "250",
                    "size": "392605",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "188",
                    "width": "250",
                    "size": "392605",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "188",
                    "width": "250",
                    "mp4_size": "113157",
                    "mp4": "https://media1.giphy.com/media/Bl10664xbIVkk/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "188",
                    "width": "250",
                    "size": "392605",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "266",
                    "size": "308358",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "84475",
                    "mp4": "https://media1.giphy.com/media/Bl10664xbIVkk/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "147622",
                    "webp": "https://media1.giphy.com/media/Bl10664xbIVkk/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "266",
                    "size": "127389",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "79538",
                    "webp": "https://media1.giphy.com/media/Bl10664xbIVkk/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "133",
                    "size": "94373",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "29820",
                    "mp4": "https://media1.giphy.com/media/Bl10664xbIVkk/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "52688",
                    "webp": "https://media1.giphy.com/media/Bl10664xbIVkk/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "133",
                    "size": "6673",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "266",
                    "size": "21583",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "150",
                    "width": "200",
                    "size": "184333",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "54028",
                    "mp4": "https://media1.giphy.com/media/Bl10664xbIVkk/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "95444",
                    "webp": "https://media1.giphy.com/media/Bl10664xbIVkk/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "150",
                    "width": "200",
                    "size": "73623",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "48920",
                    "webp": "https://media1.giphy.com/media/Bl10664xbIVkk/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "75",
                    "width": "100",
                    "size": "60894",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "19403",
                    "mp4": "https://media1.giphy.com/media/Bl10664xbIVkk/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "34966",
                    "webp": "https://media1.giphy.com/media/Bl10664xbIVkk/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "75",
                    "width": "100",
                    "size": "4441",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "150",
                    "width": "200",
                    "size": "12054",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2742593",
                    "mp4": "https://media1.giphy.com/media/Bl10664xbIVkk/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "188",
                    "width": "250",
                    "size": "34764",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "360",
                    "width": "480",
                    "mp4_size": "295738",
                    "mp4": "https://media1.giphy.com/media/Bl10664xbIVkk/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "124",
                    "width": "164",
                    "mp4_size": "22361",
                    "mp4": "https://media1.giphy.com/media/Bl10664xbIVkk/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "58",
                    "width": "77",
                    "size": "47150",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "116",
                    "width": "154",
                    "size": "41542",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "361",
                    "width": "480",
                    "size": "392605",
                    "url": "https://media1.giphy.com/media/Bl10664xbIVkk/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "analytics_response_payload": "e=Z2lmX2lkPUJsMTA2NjR4YklWa2smZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUJsMTA2NjR4YklWa2smZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUJsMTA2NjR4YklWa2smZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUJsMTA2NjR4YklWa2smZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "BPJmthQ3YRwD6QqcVD",
            "url": "https://giphy.com/gifs/HBOMax-hbomax-the-great-gatsby-2013-thegreatgatsbyonhbomax-BPJmthQ3YRwD6QqcVD",
            "slug": "HBOMax-hbomax-the-great-gatsby-2013-thegreatgatsbyonhbomax-BPJmthQ3YRwD6QqcVD",
            "bitly_gif_url": "https://gph.is/g/4boyNLR",
            "bitly_url": "https://gph.is/g/4boyNLR",
            "embed_url": "https://giphy.com/embed/BPJmthQ3YRwD6QqcVD",
            "username": "streamonmax",
            "source": "",
            "title": "Celebrate In Love GIF by Max",
            "rating": "pg",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2022-02-11 21:55:45",
            "trending_datetime": "2023-01-01 05:00:07",
            "images": {
                "original": {
                    "height": "270",
                    "width": "480",
                    "size": "3478892",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "396920",
                    "mp4": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "550602",
                    "webp": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "52",
                    "hash": "9a3e0d5bb97951fa1cf020c158bc571e"
                },
                "downsized": {
                    "height": "270",
                    "width": "480",
                    "size": "1893669",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "270",
                    "width": "480",
                    "size": "3478892",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "270",
                    "width": "480",
                    "size": "3478892",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "190",
                    "width": "337",
                    "mp4_size": "102774",
                    "mp4": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "270",
                    "width": "480",
                    "size": "38393",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "356",
                    "size": "1495414",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "198913",
                    "mp4": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "313580",
                    "webp": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "356",
                    "size": "185119",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "109676",
                    "webp": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "178",
                    "size": "476799",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "80377",
                    "mp4": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "128486",
                    "webp": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "178",
                    "size": "12487",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "356",
                    "size": "32215",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "113",
                    "width": "200",
                    "size": "547513",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "89902",
                    "mp4": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "145912",
                    "webp": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "113",
                    "width": "200",
                    "size": "70958",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "44460",
                    "webp": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "57",
                    "width": "100",
                    "size": "179940",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "38190",
                    "mp4": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "60166",
                    "webp": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "57",
                    "width": "100",
                    "size": "4630",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "113",
                    "width": "200",
                    "size": "15510",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "3398659",
                    "mp4": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "270",
                    "width": "480",
                    "size": "76395",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "270",
                    "width": "480",
                    "mp4_size": "396920",
                    "mp4": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "108",
                    "width": "192",
                    "mp4_size": "39351",
                    "mp4": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "52",
                    "width": "92",
                    "size": "48970",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "74",
                    "width": "132",
                    "size": "37208",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "270",
                    "width": "480",
                    "size": "3478892",
                    "url": "https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media1.giphy.com/avatars/streamonmax/m0aOjjt7E6X5.jpg",
                "banner_image": "https://media1.giphy.com/channel_assets/streamonmax/UVfmcWMe6Pg8.jpg",
                "banner_url": "https://media1.giphy.com/channel_assets/streamonmax/UVfmcWMe6Pg8.jpg",
                "profile_url": "https://giphy.com/streamonmax/",
                "username": "streamonmax",
                "display_name": "Max",
                "description": "",
                "instagram_url": "https://instagram.com/HBOMax",
                "website_url": "https://bit.ly/HBOMaxGiphy",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPUJQSm10aFEzWVJ3RDZRcWNWRCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUJQSm10aFEzWVJ3RDZRcWNWRCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUJQSm10aFEzWVJ3RDZRcWNWRCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUJQSm10aFEzWVJ3RDZRcWNWRCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "HHljKdrD2eoaKDYhMw",
            "url": "https://giphy.com/gifs/helloall-best-friends-friend-day-happy-HHljKdrD2eoaKDYhMw",
            "slug": "helloall-best-friends-friend-day-happy-HHljKdrD2eoaKDYhMw",
            "bitly_gif_url": "https://gph.is/g/ZPjgNk7",
            "bitly_url": "https://gph.is/g/ZPjgNk7",
            "embed_url": "https://giphy.com/embed/HHljKdrD2eoaKDYhMw",
            "username": "helloall",
            "source": "",
            "title": "Best Friends Love GIF by Hello All",
            "rating": "pg",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2021-06-07 19:50:26",
            "trending_datetime": "2021-07-31 04:07:10",
            "images": {
                "original": {
                    "height": "480",
                    "width": "480",
                    "size": "399023",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "115668",
                    "mp4": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "295444",
                    "webp": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "44",
                    "hash": "5f5b0061f2c961782981bf738687f536"
                },
                "downsized": {
                    "height": "480",
                    "width": "480",
                    "size": "399023",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "480",
                    "size": "399023",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "480",
                    "width": "480",
                    "size": "399023",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "122795",
                    "mp4": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "480",
                    "width": "480",
                    "size": "399023",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "108100",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "47003",
                    "mp4": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "98696",
                    "webp": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "22325",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "20330",
                    "webp": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "46675",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "22157",
                    "mp4": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "41308",
                    "webp": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "175",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "322",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "108100",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "47003",
                    "mp4": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "98696",
                    "webp": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "22325",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "20330",
                    "webp": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "46675",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "22157",
                    "mp4": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "41308",
                    "webp": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "175",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "322",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "515680",
                    "mp4": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "480",
                    "size": "820",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "115668",
                    "mp4": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "47423",
                    "mp4": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "148",
                    "width": "148",
                    "size": "49725",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "284",
                    "width": "284",
                    "size": "49184",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "1080",
                    "width": "1080",
                    "mp4_size": "486788",
                    "mp4": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "399023",
                    "url": "https://media1.giphy.com/media/HHljKdrD2eoaKDYhMw/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media0.giphy.com/avatars/helloall/hGrSqJDMUajv.gif",
                "banner_image": "https://media0.giphy.com/headers/helloall/YF5eJMrkcjmM.gif",
                "banner_url": "https://media0.giphy.com/headers/helloall/YF5eJMrkcjmM.gif",
                "profile_url": "https://giphy.com/helloall/",
                "username": "helloall",
                "display_name": "Hello All",
                "description": "Hello All is an initiative to bring diversity and representation into conversational content.",
                "instagram_url": "https://instagram.com/HelloAllArt",
                "website_url": "https://helloall.co",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPUhIbGpLZHJEMmVvYUtEWWhNdyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUhIbGpLZHJEMmVvYUtEWWhNdyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUhIbGpLZHJEMmVvYUtEWWhNdyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUhIbGpLZHJEMmVvYUtEWWhNdyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "spfi6nabVuq5y",
            "url": "https://giphy.com/gifs/no-nope-tracy-morgan-spfi6nabVuq5y",
            "slug": "no-nope-tracy-morgan-spfi6nabVuq5y",
            "bitly_gif_url": "http://gph.is/1maPhed",
            "bitly_url": "http://gph.is/1maPhed",
            "embed_url": "https://giphy.com/embed/spfi6nabVuq5y",
            "username": "",
            "source": "http://motionlmags.tumblr.com/post/55519269232/awesome-ms-james-started-following-you",
            "title": "No No No GIF",
            "rating": "pg",
            "content_url": "",
            "source_tld": "motionlmags.tumblr.com",
            "source_post_url": "http://motionlmags.tumblr.com/post/55519269232/awesome-ms-james-started-following-you",
            "is_sticker": 0,
            "import_datetime": "2014-01-17 13:54:17",
            "trending_datetime": "2021-04-13 15:30:15",
            "images": {
                "original": {
                    "height": "129",
                    "width": "158",
                    "size": "898607",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "2713317",
                    "mp4": "https://media4.giphy.com/media/spfi6nabVuq5y/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "798420",
                    "webp": "https://media4.giphy.com/media/spfi6nabVuq5y/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "144",
                    "hash": "1cf26e8e682e6ff5423483650a16a57f"
                },
                "downsized": {
                    "height": "129",
                    "width": "158",
                    "size": "898607",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "129",
                    "width": "158",
                    "size": "898607",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "129",
                    "width": "158",
                    "size": "898607",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "120",
                    "width": "148",
                    "mp4_size": "179606",
                    "mp4": "https://media4.giphy.com/media/spfi6nabVuq5y/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "129",
                    "width": "158",
                    "size": "898607",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "245",
                    "size": "2718543",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "891714",
                    "mp4": "https://media4.giphy.com/media/spfi6nabVuq5y/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "1272388",
                    "webp": "https://media4.giphy.com/media/spfi6nabVuq5y/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "245",
                    "size": "155323",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "79916",
                    "webp": "https://media4.giphy.com/media/spfi6nabVuq5y/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "123",
                    "size": "878019",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "230665",
                    "mp4": "https://media4.giphy.com/media/spfi6nabVuq5y/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "479468",
                    "webp": "https://media4.giphy.com/media/spfi6nabVuq5y/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "123",
                    "size": "7295",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "245",
                    "size": "21168",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "163",
                    "width": "200",
                    "size": "2010470",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "640963",
                    "mp4": "https://media4.giphy.com/media/spfi6nabVuq5y/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "1014274",
                    "webp": "https://media4.giphy.com/media/spfi6nabVuq5y/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "163",
                    "width": "200",
                    "size": "114149",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "58088",
                    "webp": "https://media4.giphy.com/media/spfi6nabVuq5y/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "82",
                    "width": "100",
                    "size": "623834",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "46584",
                    "mp4": "https://media4.giphy.com/media/spfi6nabVuq5y/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "348654",
                    "webp": "https://media4.giphy.com/media/spfi6nabVuq5y/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "82",
                    "width": "100",
                    "size": "5203",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "163",
                    "width": "200",
                    "size": "15427",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "3599308",
                    "mp4": "https://media4.giphy.com/media/spfi6nabVuq5y/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "129",
                    "width": "158",
                    "size": "9914",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "390",
                    "width": "480",
                    "mp4_size": "2713317",
                    "mp4": "https://media4.giphy.com/media/spfi6nabVuq5y/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "120",
                    "width": "148",
                    "mp4_size": "40733",
                    "mp4": "https://media4.giphy.com/media/spfi6nabVuq5y/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "129",
                    "width": "158",
                    "size": "46969",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "114",
                    "width": "140",
                    "size": "44920",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "392",
                    "width": "480",
                    "size": "898607",
                    "url": "https://media4.giphy.com/media/spfi6nabVuq5y/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "analytics_response_payload": "e=Z2lmX2lkPXNwZmk2bmFiVnVxNXkmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXNwZmk2bmFiVnVxNXkmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXNwZmk2bmFiVnVxNXkmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXNwZmk2bmFiVnVxNXkmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "zBqaukCE3oM1vW6twP",
            "url": "https://giphy.com/gifs/HBOMax-hbomax-gordita-chronicles-on-zBqaukCE3oM1vW6twP",
            "slug": "HBOMax-hbomax-gordita-chronicles-on-zBqaukCE3oM1vW6twP",
            "bitly_gif_url": "https://gph.is/g/aXzWxNe",
            "bitly_url": "https://gph.is/g/aXzWxNe",
            "embed_url": "https://giphy.com/embed/zBqaukCE3oM1vW6twP",
            "username": "streamonmax",
            "source": "",
            "title": "Get Away Woman GIF by Max",
            "rating": "pg",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2022-06-27 14:32:23",
            "trending_datetime": "2023-06-08 18:45:15",
            "images": {
                "original": {
                    "height": "480",
                    "width": "480",
                    "size": "5208294",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "889686",
                    "mp4": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "1146788",
                    "webp": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "58",
                    "hash": "e3b1a2cc0dafb4f02b0becc697042044"
                },
                "downsized": {
                    "height": "311",
                    "width": "311",
                    "size": "1523476",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "480",
                    "size": "5208294",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "480",
                    "width": "480",
                    "size": "3455222",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/giphy-downsized-medium.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-medium.gif&ct=g"
                },
                "downsized_small": {
                    "height": "226",
                    "width": "226",
                    "mp4_size": "125675",
                    "mp4": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "311",
                    "width": "311",
                    "size": "27470",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "862534",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "191131",
                    "mp4": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "347490",
                    "webp": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "99739",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "55264",
                    "webp": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "283783",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "69140",
                    "mp4": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "131042",
                    "webp": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "5627",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "15613",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "862534",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "191131",
                    "mp4": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "347490",
                    "webp": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "99739",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "55264",
                    "webp": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "283783",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "48832",
                    "mp4": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "131042",
                    "webp": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "5627",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "15613",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "3172848",
                    "mp4": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "480",
                    "size": "89550",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "889686",
                    "mp4": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "234",
                    "width": "234",
                    "mp4_size": "37834",
                    "mp4": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "70",
                    "width": "70",
                    "size": "47283",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "158",
                    "width": "158",
                    "size": "41748",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "1080",
                    "width": "1080",
                    "mp4_size": "8211298",
                    "mp4": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "5208294",
                    "url": "https://media0.giphy.com/media/zBqaukCE3oM1vW6twP/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media2.giphy.com/avatars/streamonmax/m0aOjjt7E6X5.jpg",
                "banner_image": "https://media2.giphy.com/channel_assets/streamonmax/UVfmcWMe6Pg8.jpg",
                "banner_url": "https://media2.giphy.com/channel_assets/streamonmax/UVfmcWMe6Pg8.jpg",
                "profile_url": "https://giphy.com/streamonmax/",
                "username": "streamonmax",
                "display_name": "Max",
                "description": "",
                "instagram_url": "https://instagram.com/HBOMax",
                "website_url": "https://bit.ly/HBOMaxGiphy",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPXpCcWF1a0NFM29NMXZXNnR3UCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXpCcWF1a0NFM29NMXZXNnR3UCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXpCcWF1a0NFM29NMXZXNnR3UCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXpCcWF1a0NFM29NMXZXNnR3UCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "dAU0lqnhoZdcydsvgs",
            "url": "https://giphy.com/gifs/uefa-sports-sport-europa-league-final-dAU0lqnhoZdcydsvgs",
            "slug": "uefa-sports-sport-europa-league-final-dAU0lqnhoZdcydsvgs",
            "bitly_gif_url": "https://gph.is/g/46xxmbw",
            "bitly_url": "https://gph.is/g/46xxmbw",
            "embed_url": "https://giphy.com/embed/dAU0lqnhoZdcydsvgs",
            "username": "uefa",
            "source": "",
            "title": "Europa League Wow GIF by UEFA",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2023-05-31 22:03:10",
            "trending_datetime": "2023-06-06 18:00:03",
            "images": {
                "original": {
                    "height": "288",
                    "width": "480",
                    "size": "1145246",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "150289",
                    "mp4": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "317904",
                    "webp": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "15",
                    "hash": "ccd8cf1bf6663fea7ee89dab8dc2eded"
                },
                "downsized": {
                    "height": "288",
                    "width": "480",
                    "size": "1145246",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "288",
                    "width": "480",
                    "size": "1145246",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "288",
                    "width": "480",
                    "size": "1145246",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "288",
                    "width": "480",
                    "mp4_size": "189321",
                    "mp4": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "288",
                    "width": "480",
                    "size": "1145246",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "333",
                    "size": "440167",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "79312",
                    "mp4": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "185042",
                    "webp": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "333",
                    "size": "189987",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "108702",
                    "webp": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "167",
                    "size": "147607",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "32447",
                    "mp4": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "74576",
                    "webp": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "167",
                    "size": "11736",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "333",
                    "size": "30142",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "120",
                    "width": "200",
                    "size": "203847",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "40877",
                    "mp4": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "95094",
                    "webp": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "120",
                    "width": "200",
                    "size": "81082",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "47308",
                    "webp": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "60",
                    "width": "100",
                    "size": "62310",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "16262",
                    "mp4": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "36896",
                    "webp": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "60",
                    "width": "100",
                    "size": "4775",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "120",
                    "width": "200",
                    "size": "17014",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2702510",
                    "mp4": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "288",
                    "width": "480",
                    "size": "100782",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "286",
                    "width": "480",
                    "mp4_size": "150289",
                    "mp4": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "146",
                    "width": "243",
                    "mp4_size": "30834",
                    "mp4": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "50",
                    "width": "83",
                    "size": "46106",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "92",
                    "width": "154",
                    "size": "44966",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "288",
                    "width": "480",
                    "size": "1145246",
                    "url": "https://media4.giphy.com/media/dAU0lqnhoZdcydsvgs/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media0.giphy.com/avatars/uefa/CtlONIU0BbPt.png",
                "banner_image": "https://media0.giphy.com/headers/uefa/IdHUPkD73XM1.gif",
                "banner_url": "https://media0.giphy.com/headers/uefa/IdHUPkD73XM1.gif",
                "profile_url": "https://giphy.com/uefa/",
                "username": "uefa",
                "display_name": "UEFA",
                "description": "The official home of the UEFA competitions on GIPHY",
                "instagram_url": "https://instagram.com/uefachampionsleague",
                "website_url": "http://www.uefa.com",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPWRBVTBscW5ob1pkY3lkc3ZncyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWRBVTBscW5ob1pkY3lkc3ZncyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWRBVTBscW5ob1pkY3lkc3ZncyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWRBVTBscW5ob1pkY3lkc3ZncyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "2WQxr4SkNaeDpkHiAd",
            "url": "https://giphy.com/gifs/Capcom-capcom-street-fighter-6-sf6-2WQxr4SkNaeDpkHiAd",
            "slug": "Capcom-capcom-street-fighter-6-sf6-2WQxr4SkNaeDpkHiAd",
            "bitly_gif_url": "https://gph.is/g/Zl0PNLk",
            "bitly_url": "https://gph.is/g/Zl0PNLk",
            "embed_url": "https://giphy.com/embed/2WQxr4SkNaeDpkHiAd",
            "username": "Capcom",
            "source": "https://news.capcomusa.com/",
            "title": "Video Game Sf6 GIF by CAPCOM",
            "rating": "g",
            "content_url": "",
            "source_tld": "news.capcomusa.com",
            "source_post_url": "https://news.capcomusa.com/",
            "is_sticker": 0,
            "import_datetime": "2023-05-30 21:47:06",
            "trending_datetime": "2023-06-08 18:38:59",
            "images": {
                "original": {
                    "height": "270",
                    "width": "480",
                    "size": "1250359",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "182836",
                    "mp4": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "301608",
                    "webp": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "24",
                    "hash": "913f08e520d00c3f475862699eb826a4"
                },
                "downsized": {
                    "height": "270",
                    "width": "480",
                    "size": "1250359",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "270",
                    "width": "480",
                    "size": "1250359",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "270",
                    "width": "480",
                    "size": "1250359",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "242",
                    "width": "430",
                    "mp4_size": "73768",
                    "mp4": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "270",
                    "width": "480",
                    "size": "1250359",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "356",
                    "size": "566752",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "102942",
                    "mp4": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "186798",
                    "webp": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "356",
                    "size": "146849",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "83524",
                    "webp": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "178",
                    "size": "192545",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "40762",
                    "mp4": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "75052",
                    "webp": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "178",
                    "size": "8036",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "356",
                    "size": "19631",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "113",
                    "width": "200",
                    "size": "232421",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "45147",
                    "mp4": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "85046",
                    "webp": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "113",
                    "width": "200",
                    "size": "61244",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "35398",
                    "webp": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "57",
                    "width": "100",
                    "size": "75661",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "18539",
                    "mp4": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "33736",
                    "webp": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "57",
                    "width": "100",
                    "size": "3423",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "113",
                    "width": "200",
                    "size": "9679",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2814004",
                    "mp4": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "270",
                    "width": "480",
                    "size": "60679",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "270",
                    "width": "480",
                    "mp4_size": "182836",
                    "mp4": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "126",
                    "width": "224",
                    "mp4_size": "26478",
                    "mp4": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "55",
                    "width": "98",
                    "size": "49187",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "92",
                    "width": "164",
                    "size": "39060",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "270",
                    "width": "480",
                    "size": "1250359",
                    "url": "https://media3.giphy.com/media/2WQxr4SkNaeDpkHiAd/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media1.giphy.com/avatars/Capcom/xKo4mwoKlUQ0.jpg",
                "banner_image": "https://media1.giphy.com/headers/Capcom/XpgWltFl2tvl.jpg",
                "banner_url": "https://media1.giphy.com/headers/Capcom/XpgWltFl2tvl.jpg",
                "profile_url": "https://giphy.com/Capcom/",
                "username": "Capcom",
                "display_name": "CAPCOM",
                "description": "Official Capcom USA account. Visit http://capcomusa.com for the latest news. ESRB ratings vary from E (Everyone) to M (Mature).",
                "instagram_url": "https://instagram.com/capcomusa",
                "website_url": "https://news.capcomusa.com/",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPTJXUXhyNFNrTmFlRHBrSGlBZCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTJXUXhyNFNrTmFlRHBrSGlBZCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTJXUXhyNFNrTmFlRHBrSGlBZCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTJXUXhyNFNrTmFlRHBrSGlBZCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "0OgdJVNjbcIifqSb7U",
            "url": "https://giphy.com/gifs/cat-hug-phone-0OgdJVNjbcIifqSb7U",
            "slug": "cat-hug-phone-0OgdJVNjbcIifqSb7U",
            "bitly_gif_url": "https://gph.is/g/4zG9WMA",
            "bitly_url": "https://gph.is/g/4zG9WMA",
            "embed_url": "https://giphy.com/embed/0OgdJVNjbcIifqSb7U",
            "username": "NGcorpvtc",
            "source": "",
            "title": "Cat Love GIF by NGcorpvtc",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2021-06-02 08:56:14",
            "trending_datetime": "2022-03-08 00:15:11",
            "images": {
                "original": {
                    "height": "328",
                    "width": "382",
                    "size": "1054682",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "314889",
                    "mp4": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "392008",
                    "webp": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "45",
                    "hash": "160293c2518225f0aa57cf7242f1cd95"
                },
                "downsized": {
                    "height": "328",
                    "width": "382",
                    "size": "1054682",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "328",
                    "width": "382",
                    "size": "1054682",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "328",
                    "width": "382",
                    "size": "1054682",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "292",
                    "width": "340",
                    "mp4_size": "75038",
                    "mp4": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "328",
                    "width": "382",
                    "size": "1054682",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "233",
                    "size": "371605",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "80554",
                    "mp4": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "211158",
                    "webp": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "233",
                    "size": "55048",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "31734",
                    "webp": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "117",
                    "size": "131860",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "37564",
                    "mp4": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "93028",
                    "webp": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "117",
                    "size": "4025",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "233",
                    "size": "13008",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "172",
                    "width": "200",
                    "size": "279771",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "67654",
                    "mp4": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "182416",
                    "webp": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "172",
                    "width": "200",
                    "size": "42309",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "27412",
                    "webp": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "86",
                    "width": "100",
                    "size": "103918",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "31610",
                    "mp4": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "77378",
                    "webp": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "86",
                    "width": "100",
                    "size": "3320",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "172",
                    "width": "200",
                    "size": "8774",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "915739",
                    "mp4": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "328",
                    "width": "382",
                    "size": "37158",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "412",
                    "width": "480",
                    "mp4_size": "314889",
                    "mp4": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "328",
                    "width": "382",
                    "mp4_size": "49887",
                    "mp4": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "80",
                    "width": "93",
                    "size": "48874",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "220",
                    "width": "256",
                    "size": "48792",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "412",
                    "width": "480",
                    "size": "1054682",
                    "url": "https://media4.giphy.com/media/0OgdJVNjbcIifqSb7U/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media2.giphy.com/avatars/NGcorpvtc/DMGgluOLCK1D.png",
                "banner_image": "",
                "banner_url": "",
                "profile_url": "https://giphy.com/NGcorpvtc/",
                "username": "NGcorpvtc",
                "display_name": "NGcorpvtc",
                "description": "NGcorpVTC is a fashion Brand, and we create this account to make our own gifs and share them the world ;)",
                "instagram_url": "https://instagram.com/ng_corpvtc",
                "website_url": "http://ngcorpvtc.com",
                "is_verified": false
            },
            "analytics_response_payload": "e=Z2lmX2lkPTBPZ2RKVk5qYmNJaWZxU2I3VSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTBPZ2RKVk5qYmNJaWZxU2I3VSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTBPZ2RKVk5qYmNJaWZxU2I3VSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTBPZ2RKVk5qYmNJaWZxU2I3VSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "xUOrw4tlQfCTGmD5Kw",
            "url": "https://giphy.com/gifs/latenightseth-seth-meyers-birthday-cake-xUOrw4tlQfCTGmD5Kw",
            "slug": "latenightseth-seth-meyers-birthday-cake-xUOrw4tlQfCTGmD5Kw",
            "bitly_gif_url": "http://gph.is/2thdAFj",
            "bitly_url": "http://gph.is/2thdAFj",
            "embed_url": "https://giphy.com/embed/xUOrw4tlQfCTGmD5Kw",
            "username": "latenightseth",
            "source": "extinguisher",
            "title": "Happy Birthday GIF by Late Night with Seth Meyers",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "extinguisher",
            "is_sticker": 0,
            "import_datetime": "2017-07-05 16:08:48",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "500",
                    "width": "500",
                    "size": "5213024",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "2662666",
                    "mp4": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "3056518",
                    "webp": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "45",
                    "hash": "c66a2e20b68b1460de135ff863941726"
                },
                "downsized": {
                    "height": "278",
                    "width": "278",
                    "size": "1126448",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "500",
                    "width": "500",
                    "size": "5213024",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "500",
                    "width": "500",
                    "size": "4465759",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/giphy-downsized-medium.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-medium.gif&ct=g"
                },
                "downsized_small": {
                    "height": "200",
                    "width": "200",
                    "mp4_size": "106878",
                    "mp4": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "278",
                    "width": "278",
                    "size": "28277",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "728084",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "197678",
                    "mp4": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "479264",
                    "webp": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "114725",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "67342",
                    "webp": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "226830",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "61202",
                    "mp4": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "143356",
                    "webp": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "6513",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "18523",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "728084",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "197678",
                    "mp4": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "479264",
                    "webp": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "114725",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "67342",
                    "webp": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "226830",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "49193",
                    "mp4": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "143356",
                    "webp": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "6513",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "18523",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "6714164",
                    "mp4": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "500",
                    "width": "500",
                    "size": "134623",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "2662666",
                    "mp4": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "150",
                    "width": "150",
                    "mp4_size": "39825",
                    "mp4": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "100",
                    "width": "100",
                    "size": "48723",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "80",
                    "width": "80",
                    "size": "20774",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "5213024",
                    "url": "https://media1.giphy.com/media/xUOrw4tlQfCTGmD5Kw/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media4.giphy.com/avatars/latenightwithsethmeyers/wDIHpL5y74cm.jpg",
                "banner_image": "",
                "banner_url": "",
                "profile_url": "https://giphy.com/latenightseth/",
                "username": "latenightseth",
                "display_name": "Late Night with Seth Meyers",
                "description": "The official GIPHY channel for Late Night with Seth Meyers, airing weeknights at 12:35/11:35c on NBC. #LNSM",
                "instagram_url": "https://instagram.com/LateNightSeth",
                "website_url": "http://www.nbc.com/late-night-with-seth-meyers",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPXhVT3J3NHRsUWZDVEdtRDVLdyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXhVT3J3NHRsUWZDVEdtRDVLdyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXhVT3J3NHRsUWZDVEdtRDVLdyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXhVT3J3NHRsUWZDVEdtRDVLdyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "YN1eB6slBDeNHr1gjs",
            "url": "https://giphy.com/gifs/moodman-YN1eB6slBDeNHr1gjs",
            "slug": "moodman-YN1eB6slBDeNHr1gjs",
            "bitly_gif_url": "https://gph.is/g/EJmm1Wx",
            "bitly_url": "https://gph.is/g/EJmm1Wx",
            "embed_url": "https://giphy.com/embed/YN1eB6slBDeNHr1gjs",
            "username": "",
            "source": "",
            "title": "Elon Musk GIF by MOODMAN",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2020-09-13 22:38:44",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "256",
                    "width": "480",
                    "size": "4150043",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "1138062",
                    "mp4": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "1556476",
                    "webp": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "61",
                    "hash": "9b915aeb6735eb0b508869cf5499a92d"
                },
                "downsized": {
                    "height": "204",
                    "width": "384",
                    "size": "1719360",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "256",
                    "width": "480",
                    "size": "4150043",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "256",
                    "width": "480",
                    "size": "2781525",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/giphy-downsized-medium.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-medium.gif&ct=g"
                },
                "downsized_small": {
                    "height": "106",
                    "width": "198",
                    "mp4_size": "88028",
                    "mp4": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "204",
                    "width": "384",
                    "size": "31178",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "375",
                    "size": "1956151",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "511757",
                    "mp4": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "922228",
                    "webp": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "375",
                    "size": "203891",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "121372",
                    "webp": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "188",
                    "size": "689171",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "150127",
                    "mp4": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "320580",
                    "webp": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "188",
                    "size": "12703",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "375",
                    "size": "35505",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "107",
                    "width": "200",
                    "size": "788549",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "171169",
                    "mp4": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "352116",
                    "webp": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "107",
                    "width": "200",
                    "size": "78004",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "41364",
                    "webp": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "54",
                    "width": "100",
                    "size": "217540",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "48280",
                    "mp4": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "128268",
                    "webp": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "54",
                    "width": "100",
                    "size": "4434",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "107",
                    "width": "200",
                    "size": "14571",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "4008539",
                    "mp4": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "256",
                    "width": "480",
                    "size": "84438",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "256",
                    "width": "480",
                    "mp4_size": "1138062",
                    "mp4": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "122",
                    "width": "228",
                    "mp4_size": "41358",
                    "mp4": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "49",
                    "width": "92",
                    "size": "46943",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "74",
                    "width": "138",
                    "size": "34328",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "256",
                    "width": "480",
                    "size": "4150043",
                    "url": "https://media3.giphy.com/media/YN1eB6slBDeNHr1gjs/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "analytics_response_payload": "e=Z2lmX2lkPVlOMWVCNnNsQkRlTkhyMWdqcyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVlOMWVCNnNsQkRlTkhyMWdqcyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVlOMWVCNnNsQkRlTkhyMWdqcyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVlOMWVCNnNsQkRlTkhyMWdqcyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "euj9nimDuQYDkiHUVB",
            "url": "https://giphy.com/gifs/mickey90-friends-birthday-mickey-90-euj9nimDuQYDkiHUVB",
            "slug": "mickey90-friends-birthday-mickey-90-euj9nimDuQYDkiHUVB",
            "bitly_gif_url": "https://gph.is/2RXZMcS",
            "bitly_url": "https://gph.is/2RXZMcS",
            "embed_url": "https://giphy.com/embed/euj9nimDuQYDkiHUVB",
            "username": "MickeyMouse",
            "source": "",
            "title": "I Love You Kiss GIF by Mickey Mouse",
            "rating": "pg",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2018-10-19 19:59:54",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "320",
                    "width": "480",
                    "size": "1382569",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "350122",
                    "mp4": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "434454",
                    "webp": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "21",
                    "hash": "dcea2886637c5ba26d48d81329e13f48"
                },
                "downsized": {
                    "height": "320",
                    "width": "480",
                    "size": "1382569",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "320",
                    "width": "480",
                    "size": "1382569",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "320",
                    "width": "480",
                    "size": "1382569",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "220",
                    "width": "330",
                    "mp4_size": "90604",
                    "mp4": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "320",
                    "width": "480",
                    "size": "1382569",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "300",
                    "size": "464279",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "148096",
                    "mp4": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "277380",
                    "webp": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "300",
                    "size": "140444",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "88386",
                    "webp": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "150",
                    "size": "154852",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "47911",
                    "mp4": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "95284",
                    "webp": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "150",
                    "size": "9184",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "300",
                    "size": "23378",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "133",
                    "width": "200",
                    "size": "249069",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "77275",
                    "mp4": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "149926",
                    "webp": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "133",
                    "width": "200",
                    "size": "71517",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "45422",
                    "webp": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "67",
                    "width": "100",
                    "size": "82656",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "25357",
                    "mp4": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "50474",
                    "webp": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "67",
                    "width": "100",
                    "size": "4682",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "133",
                    "width": "200",
                    "size": "16922",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2973410",
                    "mp4": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "320",
                    "width": "480",
                    "size": "129890",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "318",
                    "width": "480",
                    "mp4_size": "350122",
                    "mp4": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "176",
                    "width": "264",
                    "mp4_size": "46788",
                    "mp4": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "84",
                    "width": "126",
                    "size": "48491",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "124",
                    "width": "186",
                    "size": "49034",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "320",
                    "width": "480",
                    "size": "1382569",
                    "url": "https://media1.giphy.com/media/euj9nimDuQYDkiHUVB/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media0.giphy.com/avatars/MickeyMouse/k0OoCaSwYAPp.gif",
                "banner_image": "https://media0.giphy.com/headers/MickeyMouse/tQZptRramWb7.gif",
                "banner_url": "https://media0.giphy.com/headers/MickeyMouse/tQZptRramWb7.gif",
                "profile_url": "https://giphy.com/MickeyMouse/",
                "username": "MickeyMouse",
                "display_name": "Mickey Mouse",
                "description": "Celebrate all styles of friendship with Mickey in honor of International Friendship Day on July 30!",
                "instagram_url": "https://instagram.com/mickeymouse",
                "website_url": "https://www.disney.com/",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPWV1ajluaW1EdVFZRGtpSFVWQiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWV1ajluaW1EdVFZRGtpSFVWQiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWV1ajluaW1EdVFZRGtpSFVWQiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWV1ajluaW1EdVFZRGtpSFVWQiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "1BXa2alBjrCXC",
            "url": "https://giphy.com/gifs/1BXa2alBjrCXC",
            "slug": "1BXa2alBjrCXC",
            "bitly_gif_url": "http://gph.is/1IF8ykO",
            "bitly_url": "http://gph.is/1IF8ykO",
            "embed_url": "https://giphy.com/embed/1BXa2alBjrCXC",
            "username": "",
            "source": "http://reddit.com/r/reactiongifs/comments/30j2d2/mrw_i_get_home_on_friday/",
            "title": "Sad Happy Hour GIF",
            "rating": "pg",
            "content_url": "",
            "source_tld": "reddit.com",
            "source_post_url": "http://reddit.com/r/reactiongifs/comments/30j2d2/mrw_i_get_home_on_friday/",
            "is_sticker": 0,
            "import_datetime": "2015-03-27 20:15:38",
            "trending_datetime": "2020-08-29 01:15:03",
            "images": {
                "original": {
                    "height": "300",
                    "width": "300",
                    "size": "1137274",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "735645",
                    "mp4": "https://media0.giphy.com/media/1BXa2alBjrCXC/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "530410",
                    "webp": "https://media0.giphy.com/media/1BXa2alBjrCXC/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "39",
                    "hash": "17f35a782e4620eefd61b50a090e2930"
                },
                "downsized": {
                    "height": "300",
                    "width": "300",
                    "size": "1137274",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "300",
                    "width": "300",
                    "size": "1137274",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "300",
                    "width": "300",
                    "size": "1137274",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "210",
                    "width": "210",
                    "mp4_size": "61998",
                    "mp4": "https://media0.giphy.com/media/1BXa2alBjrCXC/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "300",
                    "width": "300",
                    "size": "1137274",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "558289",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "115497",
                    "mp4": "https://media0.giphy.com/media/1BXa2alBjrCXC/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "238856",
                    "webp": "https://media0.giphy.com/media/1BXa2alBjrCXC/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "88487",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "53890",
                    "webp": "https://media0.giphy.com/media/1BXa2alBjrCXC/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "184156",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "39806",
                    "mp4": "https://media0.giphy.com/media/1BXa2alBjrCXC/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "95210",
                    "webp": "https://media0.giphy.com/media/1BXa2alBjrCXC/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "5453",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "17576",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "558289",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "115497",
                    "mp4": "https://media0.giphy.com/media/1BXa2alBjrCXC/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "238856",
                    "webp": "https://media0.giphy.com/media/1BXa2alBjrCXC/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "88487",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "53890",
                    "webp": "https://media0.giphy.com/media/1BXa2alBjrCXC/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "184156",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "39806",
                    "mp4": "https://media0.giphy.com/media/1BXa2alBjrCXC/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "95210",
                    "webp": "https://media0.giphy.com/media/1BXa2alBjrCXC/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "5453",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "17576",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2953792",
                    "mp4": "https://media0.giphy.com/media/1BXa2alBjrCXC/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "300",
                    "width": "300",
                    "size": "30742",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "735645",
                    "mp4": "https://media0.giphy.com/media/1BXa2alBjrCXC/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "208",
                    "width": "208",
                    "mp4_size": "38936",
                    "mp4": "https://media0.giphy.com/media/1BXa2alBjrCXC/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "72",
                    "width": "72",
                    "size": "49814",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "144",
                    "width": "144",
                    "size": "37594",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "1137274",
                    "url": "https://media0.giphy.com/media/1BXa2alBjrCXC/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "analytics_response_payload": "e=Z2lmX2lkPTFCWGEyYWxCanJDWEMmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTFCWGEyYWxCanJDWEMmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTFCWGEyYWxCanJDWEMmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTFCWGEyYWxCanJDWEMmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "vVzH2XY3Y0Ar6",
            "url": "https://giphy.com/gifs/dancing-dog-vVzH2XY3Y0Ar6",
            "slug": "dancing-dog-vVzH2XY3Y0Ar6",
            "bitly_gif_url": "http://gph.is/12yXYLP",
            "bitly_url": "http://gph.is/12yXYLP",
            "embed_url": "https://giphy.com/embed/vVzH2XY3Y0Ar6",
            "username": "",
            "source": "http://prguitarman.tumblr.com/post/49120705046",
            "title": "Dog Dancing GIF",
            "rating": "g",
            "content_url": "",
            "source_tld": "prguitarman.tumblr.com",
            "source_post_url": "http://prguitarman.tumblr.com/post/49120705046",
            "is_sticker": 0,
            "import_datetime": "2013-06-09 03:09:49",
            "trending_datetime": "2020-11-07 21:45:07",
            "images": {
                "original": {
                    "height": "320",
                    "width": "240",
                    "size": "1510591",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "2068219",
                    "mp4": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "1018954",
                    "webp": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "70",
                    "hash": "0d49933f795c4f61d231ecc96a9eb20e"
                },
                "downsized": {
                    "height": "320",
                    "width": "240",
                    "size": "1510591",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "320",
                    "width": "240",
                    "size": "1510591",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "320",
                    "width": "240",
                    "size": "1510591",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "152",
                    "width": "114",
                    "mp4_size": "68415",
                    "mp4": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "320",
                    "width": "240",
                    "size": "1510591",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "150",
                    "size": "786980",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "243972",
                    "mp4": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "394136",
                    "webp": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "150",
                    "size": "73899",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "48664",
                    "webp": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "75",
                    "size": "267883",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "61883",
                    "mp4": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "130692",
                    "webp": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "75",
                    "size": "4310",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "150",
                    "size": "14664",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "267",
                    "width": "200",
                    "size": "1257843",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "431750",
                    "mp4": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "670178",
                    "webp": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "267",
                    "width": "200",
                    "size": "129259",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "81970",
                    "webp": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "134",
                    "width": "100",
                    "size": "422594",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "46763",
                    "mp4": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "200934",
                    "webp": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "134",
                    "width": "100",
                    "size": "6052",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "267",
                    "width": "200",
                    "size": "16228",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2311279",
                    "mp4": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "320",
                    "width": "240",
                    "size": "41411",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "640",
                    "width": "480",
                    "mp4_size": "2068219",
                    "mp4": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "218",
                    "width": "163",
                    "mp4_size": "47116",
                    "mp4": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "86",
                    "width": "65",
                    "size": "48917",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "176",
                    "width": "132",
                    "size": "33344",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "640",
                    "width": "480",
                    "size": "1510591",
                    "url": "https://media1.giphy.com/media/vVzH2XY3Y0Ar6/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "analytics_response_payload": "e=Z2lmX2lkPXZWekgyWFkzWTBBcjYmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXZWekgyWFkzWTBBcjYmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXZWekgyWFkzWTBBcjYmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXZWekgyWFkzWTBBcjYmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "ely3apij36BJhoZ234",
            "url": "https://giphy.com/gifs/good-job-congratulations-otter-ely3apij36BJhoZ234",
            "slug": "good-job-congratulations-otter-ely3apij36BJhoZ234",
            "bitly_gif_url": "https://gph.is/2JY2vir",
            "bitly_url": "https://gph.is/2JY2vir",
            "embed_url": "https://giphy.com/embed/ely3apij36BJhoZ234",
            "username": "justin",
            "source": "https://media.giphy.com/media/NSY5PMSdamewjHkt14/giphy.gif",
            "title": "Way To Go Good Job GIF by Justin",
            "rating": "g",
            "content_url": "",
            "source_tld": "media.giphy.com",
            "source_post_url": "https://media.giphy.com/media/NSY5PMSdamewjHkt14/giphy.gif",
            "is_sticker": 0,
            "import_datetime": "2018-04-18 19:39:22",
            "trending_datetime": "2020-08-09 07:30:01",
            "images": {
                "original": {
                    "height": "480",
                    "width": "480",
                    "size": "20787503",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "5588410",
                    "mp4": "https://media1.giphy.com/media/ely3apij36BJhoZ234/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "6947124",
                    "webp": "https://media1.giphy.com/media/ely3apij36BJhoZ234/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "184",
                    "hash": "bee3263486cc4c0be39231231c08d448"
                },
                "downsized": {
                    "height": "240",
                    "width": "240",
                    "size": "1246494",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "480",
                    "size": "7302607",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/giphy-downsized-large.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-large.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "379",
                    "width": "379",
                    "size": "4257222",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/giphy-downsized-medium.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-medium.gif&ct=g"
                },
                "downsized_small": {
                    "height": "150",
                    "width": "150",
                    "mp4_size": "175696",
                    "mp4": "https://media1.giphy.com/media/ely3apij36BJhoZ234/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "240",
                    "width": "240",
                    "size": "22031",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "3525944",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "965894",
                    "mp4": "https://media1.giphy.com/media/ely3apij36BJhoZ234/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "1806448",
                    "webp": "https://media1.giphy.com/media/ely3apij36BJhoZ234/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "137771",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "78552",
                    "webp": "https://media1.giphy.com/media/ely3apij36BJhoZ234/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "1101017",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "325316",
                    "mp4": "https://media1.giphy.com/media/ely3apij36BJhoZ234/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "627720",
                    "webp": "https://media1.giphy.com/media/ely3apij36BJhoZ234/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "7146",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "20942",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "3525944",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "965894",
                    "mp4": "https://media1.giphy.com/media/ely3apij36BJhoZ234/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "1806448",
                    "webp": "https://media1.giphy.com/media/ely3apij36BJhoZ234/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "137771",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "78552",
                    "webp": "https://media1.giphy.com/media/ely3apij36BJhoZ234/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "1101017",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "43446",
                    "mp4": "https://media1.giphy.com/media/ely3apij36BJhoZ234/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "627720",
                    "webp": "https://media1.giphy.com/media/ely3apij36BJhoZ234/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "7146",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "20942",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "6478905",
                    "mp4": "https://media1.giphy.com/media/ely3apij36BJhoZ234/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "480",
                    "size": "123167",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "5588410",
                    "mp4": "https://media1.giphy.com/media/ely3apij36BJhoZ234/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "162",
                    "width": "162",
                    "mp4_size": "43477",
                    "mp4": "https://media1.giphy.com/media/ely3apij36BJhoZ234/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "97",
                    "width": "97",
                    "size": "48527",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "98",
                    "width": "98",
                    "size": "34172",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "20787503",
                    "url": "https://media1.giphy.com/media/ely3apij36BJhoZ234/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media0.giphy.com/avatars/justin/Ym9RjQrTsFKT.gif",
                "banner_image": "https://media0.giphy.com/channel_assets/justino/c3v3Q6fKnSeR.gif",
                "banner_url": "https://media0.giphy.com/channel_assets/justino/c3v3Q6fKnSeR.gif",
                "profile_url": "https://giphy.com/justin/",
                "username": "justin",
                "display_name": "Justin",
                "description": "Don't tell it to me, GIF it to me!",
                "instagram_url": "",
                "website_url": "",
                "is_verified": false
            },
            "analytics_response_payload": "e=Z2lmX2lkPWVseTNhcGlqMzZCSmhvWjIzNCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWVseTNhcGlqMzZCSmhvWjIzNCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWVseTNhcGlqMzZCSmhvWjIzNCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWVseTNhcGlqMzZCSmhvWjIzNCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "M37gTB7BMaSKWfOwwT",
            "url": "https://giphy.com/gifs/happy-sally-dinosally-M37gTB7BMaSKWfOwwT",
            "slug": "happy-sally-dinosally-M37gTB7BMaSKWfOwwT",
            "bitly_gif_url": "https://gph.is/g/ZkL2dMO",
            "bitly_url": "https://gph.is/g/ZkL2dMO",
            "embed_url": "https://giphy.com/embed/M37gTB7BMaSKWfOwwT",
            "username": "dinosally",
            "source": "",
            "title": "Happy Best Friends GIF by DINOSALLY",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2023-06-05 03:06:52",
            "trending_datetime": "2023-06-08 18:33:10",
            "images": {
                "original": {
                    "height": "480",
                    "width": "480",
                    "size": "177631",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "148437",
                    "mp4": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "204456",
                    "webp": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "20",
                    "hash": "34ffaadc2d59ef4da17d455186fa8ff1"
                },
                "downsized": {
                    "height": "480",
                    "width": "480",
                    "size": "177631",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "480",
                    "size": "177631",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "480",
                    "width": "480",
                    "size": "177631",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "148437",
                    "mp4": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "480",
                    "width": "480",
                    "size": "177631",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "79274",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "53430",
                    "mp4": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "81116",
                    "webp": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "27557",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "27480",
                    "webp": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "37733",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "25586",
                    "mp4": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "39738",
                    "webp": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "3196",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "6209",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "79274",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "53430",
                    "mp4": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "81116",
                    "webp": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "27557",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "27480",
                    "webp": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "37733",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "25586",
                    "mp4": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "39738",
                    "webp": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "3196",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "6209",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "1328754",
                    "mp4": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "480",
                    "size": "14153",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "148437",
                    "mp4": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "278",
                    "width": "278",
                    "mp4_size": "47959",
                    "mp4": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "144",
                    "width": "144",
                    "size": "48826",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "318",
                    "width": "318",
                    "size": "48998",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "177631",
                    "url": "https://media0.giphy.com/media/M37gTB7BMaSKWfOwwT/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media2.giphy.com/avatars/mostapesstudio/AfdnP317Swop.png",
                "banner_image": "https://media2.giphy.com/headers/mostapesstudio/Fa2uO8Uw5lPf.png",
                "banner_url": "https://media2.giphy.com/headers/mostapesstudio/Fa2uO8Uw5lPf.png",
                "profile_url": "https://giphy.com/dinosally/",
                "username": "dinosally",
                "display_name": "DINOSALLY",
                "description": "Stomp into adventure with Sally, the pink young dinosaur, and her beastie besties Blambi and Tibo!",
                "instagram_url": "https://instagram.com/dinosally_official",
                "website_url": "http://mostapes.com/dinosally",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPU0zN2dUQjdCTWFTS1dmT3d3VCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPU0zN2dUQjdCTWFTS1dmT3d3VCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPU0zN2dUQjdCTWFTS1dmT3d3VCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPU0zN2dUQjdCTWFTS1dmT3d3VCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "kFIfiwvzJjbUsNbIg5",
            "url": "https://giphy.com/gifs/PermissionIO-best-friends-besties-did-we-just-become-kFIfiwvzJjbUsNbIg5",
            "slug": "PermissionIO-best-friends-besties-did-we-just-become-kFIfiwvzJjbUsNbIg5",
            "bitly_gif_url": "https://gph.is/g/EBN5KxQ",
            "bitly_url": "https://gph.is/g/EBN5KxQ",
            "embed_url": "https://giphy.com/embed/kFIfiwvzJjbUsNbIg5",
            "username": "PermissionIO",
            "source": "",
            "title": "Best Friends Friend GIF by PermissionIO",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2021-10-05 20:44:33",
            "trending_datetime": "2021-10-05 21:44:23",
            "images": {
                "original": {
                    "height": "268",
                    "width": "400",
                    "size": "1938525",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "517924",
                    "mp4": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "593226",
                    "webp": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "94",
                    "hash": "e21b8718a4e44c50c24afe0417e6e482"
                },
                "downsized": {
                    "height": "268",
                    "width": "400",
                    "size": "1938525",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "268",
                    "width": "400",
                    "size": "1938525",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "268",
                    "width": "400",
                    "size": "1938525",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "174",
                    "width": "259",
                    "mp4_size": "61276",
                    "mp4": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "268",
                    "width": "400",
                    "size": "1938525",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "299",
                    "size": "1214652",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "147331",
                    "mp4": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "277146",
                    "webp": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "299",
                    "size": "141424",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "78212",
                    "webp": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "150",
                    "size": "434725",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "55309",
                    "mp4": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "117544",
                    "webp": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "150",
                    "size": "7464",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "299",
                    "size": "19683",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "134",
                    "width": "200",
                    "size": "716974",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "78821",
                    "mp4": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "158910",
                    "webp": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "134",
                    "width": "200",
                    "size": "89328",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "39346",
                    "webp": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "67",
                    "width": "100",
                    "size": "229910",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "35632",
                    "mp4": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "75640",
                    "webp": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "67",
                    "width": "100",
                    "size": "4193",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "134",
                    "width": "200",
                    "size": "13467",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "1713715",
                    "mp4": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "268",
                    "width": "400",
                    "size": "37932",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "320",
                    "width": "480",
                    "mp4_size": "517924",
                    "mp4": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "198",
                    "width": "295",
                    "mp4_size": "36798",
                    "mp4": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "68",
                    "width": "101",
                    "size": "48840",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "130",
                    "width": "194",
                    "size": "37680",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "322",
                    "width": "480",
                    "size": "1938525",
                    "url": "https://media1.giphy.com/media/kFIfiwvzJjbUsNbIg5/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media4.giphy.com/avatars/PermissionIO/ibdCfqgoXKlZ.png",
                "banner_image": "",
                "banner_url": "",
                "profile_url": "https://giphy.com/PermissionIO/",
                "username": "PermissionIO",
                "display_name": "PermissionIO",
                "description": "Permission.io has created ASK to serve as the digital reward for individuals to share their data and engage with brands.",
                "instagram_url": "https://instagram.com/PermissionIO",
                "website_url": "http://www.permission.io",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPWtGSWZpd3Z6SmpiVXNOYklnNSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWtGSWZpd3Z6SmpiVXNOYklnNSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWtGSWZpd3Z6SmpiVXNOYklnNSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWtGSWZpd3Z6SmpiVXNOYklnNSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "Gqr5KZnC5C8Usr0qvl",
            "url": "https://giphy.com/gifs/outkast-bob-andre-3000-stankonia-Gqr5KZnC5C8Usr0qvl",
            "slug": "outkast-bob-andre-3000-stankonia-Gqr5KZnC5C8Usr0qvl",
            "bitly_gif_url": "https://gph.is/g/aR6xvJd",
            "bitly_url": "https://gph.is/g/aR6xvJd",
            "embed_url": "https://giphy.com/embed/Gqr5KZnC5C8Usr0qvl",
            "username": "outkast",
            "source": "https://open.spotify.com/track/3WibbMr6canxRJXhNtAvLU?si=a425aabe1b6f4e84",
            "title": "Happy Big Boy GIF by Outkast",
            "rating": "g",
            "content_url": "",
            "source_tld": "open.spotify.com",
            "source_post_url": "https://open.spotify.com/track/3WibbMr6canxRJXhNtAvLU?si=a425aabe1b6f4e84",
            "is_sticker": 0,
            "import_datetime": "2020-10-08 20:13:28",
            "trending_datetime": "2023-06-08 18:30:11",
            "images": {
                "original": {
                    "height": "480",
                    "width": "436",
                    "size": "1099267",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "291485",
                    "mp4": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "266448",
                    "webp": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "16",
                    "hash": "c1f59e85644cff0c5ced8b9ef31ee6af"
                },
                "downsized": {
                    "height": "480",
                    "width": "436",
                    "size": "1099267",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "436",
                    "size": "1099267",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "480",
                    "width": "436",
                    "size": "1099267",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "396",
                    "width": "359",
                    "mp4_size": "98313",
                    "mp4": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "480",
                    "width": "436",
                    "size": "1099267",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "182",
                    "size": "199868",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "66915",
                    "mp4": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "91718",
                    "webp": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "182",
                    "size": "77165",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "43380",
                    "webp": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "91",
                    "size": "65204",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "25365",
                    "mp4": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "37240",
                    "webp": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "91",
                    "size": "4859",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "182",
                    "size": "13291",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "220",
                    "width": "200",
                    "size": "232548",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "76088",
                    "mp4": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "102874",
                    "webp": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "220",
                    "width": "200",
                    "size": "92408",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "48520",
                    "webp": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "110",
                    "width": "100",
                    "size": "74528",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "28340",
                    "mp4": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "41878",
                    "webp": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "110",
                    "width": "100",
                    "size": "5483",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "220",
                    "width": "200",
                    "size": "15505",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "3639762",
                    "mp4": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "436",
                    "size": "70368",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "436",
                    "mp4_size": "291485",
                    "mp4": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "198",
                    "width": "179",
                    "mp4_size": "29136",
                    "mp4": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "81",
                    "width": "74",
                    "size": "47712",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "160",
                    "width": "146",
                    "size": "41560",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "720",
                    "width": "654",
                    "mp4_size": "887947",
                    "mp4": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "528",
                    "width": "480",
                    "size": "1099267",
                    "url": "https://media2.giphy.com/media/Gqr5KZnC5C8Usr0qvl/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media3.giphy.com/avatars/outkast/BJ2aA1Tf1D2q.jpg",
                "banner_image": "https://media3.giphy.com/headers/outkast/d33ewyiJYAz5.jpg",
                "banner_url": "https://media3.giphy.com/headers/outkast/d33ewyiJYAz5.jpg",
                "profile_url": "https://giphy.com/outkast/",
                "username": "outkast",
                "display_name": "Outkast",
                "description": "And we are…the coolest motherfunkers on the planet ❄️ Listen to the Outkast:",
                "instagram_url": "https://instagram.com/outkast",
                "website_url": "https://OutKast.lnk.to/TheHitsGP",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPUdxcjVLWm5DNUM4VXNyMHF2bCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUdxcjVLWm5DNUM4VXNyMHF2bCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUdxcjVLWm5DNUM4VXNyMHF2bCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUdxcjVLWm5DNUM4VXNyMHF2bCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            },
            "cta": {
                "link": "https://open.spotify.com/track/3WibbMr6canxRJXhNtAvLU?si=a425aabe1b6f4e84&utm_campaign=giphy.com",
                "text": "Listen to Outkast on Spotify"
            }
        },
        {
            "type": "gif",
            "id": "48M4FVK5UeRNglWAyk",
            "url": "https://giphy.com/gifs/reaction-mood-48M4FVK5UeRNglWAyk",
            "slug": "reaction-mood-48M4FVK5UeRNglWAyk",
            "bitly_gif_url": "https://gph.is/2JxzXem",
            "bitly_url": "https://gph.is/2JxzXem",
            "embed_url": "https://giphy.com/embed/48M4FVK5UeRNglWAyk",
            "username": "",
            "source": "https://www.reddit.com/r/reactiongifs/",
            "title": "Never Mind Reaction GIF by MOODMAN",
            "rating": "g",
            "content_url": "",
            "source_tld": "www.reddit.com",
            "source_post_url": "https://www.reddit.com/r/reactiongifs/",
            "is_sticker": 0,
            "import_datetime": "2018-07-17 22:50:46",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "480",
                    "width": "270",
                    "size": "13875830",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "3201072",
                    "mp4": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "6332264",
                    "webp": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "181",
                    "hash": "d7bd83fc84c7a672890139164c9b0c2c"
                },
                "downsized": {
                    "height": "341",
                    "width": "192",
                    "size": "1448857",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "270",
                    "size": "4831021",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/giphy-downsized-large.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-large.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "480",
                    "width": "270",
                    "size": "4278366",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/giphy-downsized-medium.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-medium.gif&ct=g"
                },
                "downsized_small": {
                    "height": "152",
                    "width": "85",
                    "mp4_size": "173576",
                    "mp4": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "341",
                    "width": "192",
                    "size": "20942",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "113",
                    "size": "3310623",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "713758",
                    "mp4": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "1260212",
                    "webp": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "113",
                    "size": "108331",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "45156",
                    "webp": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "57",
                    "size": "541343",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "178941",
                    "mp4": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "329402",
                    "webp": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "57",
                    "size": "3694",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "113",
                    "size": "13370",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "356",
                    "width": "200",
                    "size": "5783285",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "2011066",
                    "mp4": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "3886460",
                    "webp": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "356",
                    "width": "200",
                    "size": "200339",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "143614",
                    "webp": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "178",
                    "width": "100",
                    "size": "2191588",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "45209",
                    "mp4": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "1015084",
                    "webp": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "178",
                    "width": "100",
                    "size": "9962",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "356",
                    "width": "200",
                    "size": "27142",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "3532331",
                    "mp4": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "270",
                    "size": "64037",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "270",
                    "mp4_size": "3201072",
                    "mp4": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "222",
                    "width": "124",
                    "mp4_size": "42171",
                    "mp4": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "96",
                    "width": "54",
                    "size": "49631",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "128",
                    "width": "72",
                    "size": "25984",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "1280",
                    "width": "720",
                    "mp4_size": "7209082",
                    "mp4": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "853",
                    "width": "480",
                    "size": "13875830",
                    "url": "https://media3.giphy.com/media/48M4FVK5UeRNglWAyk/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "analytics_response_payload": "e=Z2lmX2lkPTQ4TTRGVks1VWVSTmdsV0F5ayZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTQ4TTRGVks1VWVSTmdsV0F5ayZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTQ4TTRGVks1VWVSTmdsV0F5ayZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTQ4TTRGVks1VWVSTmdsV0F5ayZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "fpXxIjftmkk9y",
            "url": "https://giphy.com/gifs/fpXxIjftmkk9y",
            "slug": "fpXxIjftmkk9y",
            "bitly_gif_url": "http://gph.is/1Br7IXD",
            "bitly_url": "http://gph.is/1Br7IXD",
            "embed_url": "https://giphy.com/embed/fpXxIjftmkk9y",
            "username": "",
            "source": "http://reddit.com/r/reactiongifs/comments/2ymolt/mrw_im_stuck_in_the_car_with_my_friends_and_i/",
            "title": "Oh My God Wow GIF",
            "rating": "g",
            "content_url": "",
            "source_tld": "reddit.com",
            "source_post_url": "http://reddit.com/r/reactiongifs/comments/2ymolt/mrw_im_stuck_in_the_car_with_my_friends_and_i/",
            "is_sticker": 0,
            "import_datetime": "2015-03-11 01:34:23",
            "trending_datetime": "2021-07-07 23:00:06",
            "images": {
                "original": {
                    "height": "267",
                    "width": "250",
                    "size": "812717",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "997290",
                    "mp4": "https://media3.giphy.com/media/fpXxIjftmkk9y/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "370532",
                    "webp": "https://media3.giphy.com/media/fpXxIjftmkk9y/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "27",
                    "hash": "1bcfa5d9946fe2a468e4ec799b9b554d"
                },
                "downsized": {
                    "height": "267",
                    "width": "250",
                    "size": "812717",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "267",
                    "width": "250",
                    "size": "812717",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "267",
                    "width": "250",
                    "size": "812717",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "200",
                    "width": "187",
                    "mp4_size": "65543",
                    "mp4": "https://media3.giphy.com/media/fpXxIjftmkk9y/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "267",
                    "width": "250",
                    "size": "812717",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "187",
                    "size": "442100",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "142462",
                    "mp4": "https://media3.giphy.com/media/fpXxIjftmkk9y/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "210278",
                    "webp": "https://media3.giphy.com/media/fpXxIjftmkk9y/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "187",
                    "size": "103352",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "63814",
                    "webp": "https://media3.giphy.com/media/fpXxIjftmkk9y/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "94",
                    "size": "133860",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "38599",
                    "mp4": "https://media3.giphy.com/media/fpXxIjftmkk9y/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "75616",
                    "webp": "https://media3.giphy.com/media/fpXxIjftmkk9y/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "94",
                    "size": "5820",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "187",
                    "size": "22083",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "214",
                    "width": "200",
                    "size": "500116",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "166193",
                    "mp4": "https://media3.giphy.com/media/fpXxIjftmkk9y/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "234154",
                    "webp": "https://media3.giphy.com/media/fpXxIjftmkk9y/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "214",
                    "width": "200",
                    "size": "117704",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "71772",
                    "webp": "https://media3.giphy.com/media/fpXxIjftmkk9y/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "107",
                    "width": "100",
                    "size": "147970",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "44882",
                    "mp4": "https://media3.giphy.com/media/fpXxIjftmkk9y/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "83456",
                    "webp": "https://media3.giphy.com/media/fpXxIjftmkk9y/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "107",
                    "width": "100",
                    "size": "6525",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "214",
                    "width": "200",
                    "size": "19912",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "3683622",
                    "mp4": "https://media3.giphy.com/media/fpXxIjftmkk9y/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "267",
                    "width": "250",
                    "size": "32099",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "512",
                    "width": "480",
                    "mp4_size": "997290",
                    "mp4": "https://media3.giphy.com/media/fpXxIjftmkk9y/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "190",
                    "width": "178",
                    "mp4_size": "39729",
                    "mp4": "https://media3.giphy.com/media/fpXxIjftmkk9y/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "68",
                    "width": "64",
                    "size": "46976",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "128",
                    "width": "120",
                    "size": "39300",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "513",
                    "width": "480",
                    "size": "812717",
                    "url": "https://media3.giphy.com/media/fpXxIjftmkk9y/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "analytics_response_payload": "e=Z2lmX2lkPWZwWHhJamZ0bWtrOXkmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWZwWHhJamZ0bWtrOXkmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWZwWHhJamZ0bWtrOXkmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWZwWHhJamZ0bWtrOXkmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "UuB5lh1bL1Dl6svihe",
            "url": "https://giphy.com/gifs/love-hug-potato-UuB5lh1bL1Dl6svihe",
            "slug": "love-hug-potato-UuB5lh1bL1Dl6svihe",
            "bitly_gif_url": "https://gph.is/g/a9nk5K9",
            "bitly_url": "https://gph.is/g/a9nk5K9",
            "embed_url": "https://giphy.com/embed/UuB5lh1bL1Dl6svihe",
            "username": "lifeofapotato",
            "source": "http://www.instagram.com/daylightpotato",
            "title": "Happy I Love You GIF by Life of a Potato",
            "rating": "g",
            "content_url": "",
            "source_tld": "www.instagram.com",
            "source_post_url": "http://www.instagram.com/daylightpotato",
            "is_sticker": 0,
            "import_datetime": "2020-05-21 08:14:35",
            "trending_datetime": "2020-09-10 14:15:09",
            "images": {
                "original": {
                    "height": "480",
                    "width": "480",
                    "size": "148326",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "70607",
                    "mp4": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "83558",
                    "webp": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "5",
                    "hash": "25666aa893063e640897d8701bd1a9f8"
                },
                "downsized": {
                    "height": "480",
                    "width": "480",
                    "size": "148326",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "480",
                    "size": "148326",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "480",
                    "width": "480",
                    "size": "148326",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "74490",
                    "mp4": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "480",
                    "width": "480",
                    "size": "148326",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "36151",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "24607",
                    "mp4": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "31144",
                    "webp": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "36151",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "34612",
                    "webp": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "15943",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "11598",
                    "mp4": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "13586",
                    "webp": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "2929",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "5585",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "36151",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "24607",
                    "mp4": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "31144",
                    "webp": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "36151",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "34612",
                    "webp": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "15943",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "11598",
                    "mp4": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "13586",
                    "webp": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "2929",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "5585",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "1613872",
                    "mp4": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "480",
                    "size": "24315",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "70607",
                    "mp4": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "392",
                    "width": "392",
                    "mp4_size": "33534",
                    "mp4": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "163",
                    "width": "163",
                    "size": "49946",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "308",
                    "width": "308",
                    "size": "49686",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "1000",
                    "width": "1000",
                    "mp4_size": "312703",
                    "mp4": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "148326",
                    "url": "https://media3.giphy.com/media/UuB5lh1bL1Dl6svihe/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media1.giphy.com/avatars/lifeofapotato/G6ZQeWNVAecF.jpg",
                "banner_image": "",
                "banner_url": "",
                "profile_url": "https://giphy.com/lifeofapotato/",
                "username": "lifeofapotato",
                "display_name": "Life of a Potato",
                "description": "",
                "instagram_url": "https://instagram.com/daylightpotato",
                "website_url": "https://facebook.com/daylightpotato",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPVV1QjVsaDFiTDFEbDZzdmloZSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVV1QjVsaDFiTDFEbDZzdmloZSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVV1QjVsaDFiTDFEbDZzdmloZSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVV1QjVsaDFiTDFEbDZzdmloZSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "LOEnWrLmWitdEStHel",
            "url": "https://giphy.com/gifs/birthday-happy-b-day-LOEnWrLmWitdEStHel",
            "slug": "birthday-happy-b-day-LOEnWrLmWitdEStHel",
            "bitly_gif_url": "https://gph.is/g/46GvBY9",
            "bitly_url": "https://gph.is/g/46GvBY9",
            "embed_url": "https://giphy.com/embed/LOEnWrLmWitdEStHel",
            "username": "toddrocheford",
            "source": "www.rochefordmedia.com",
            "title": "Happy Birthday GIF by Todd Rocheford",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "www.rochefordmedia.com",
            "is_sticker": 0,
            "import_datetime": "2020-07-01 18:50:33",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "480",
                    "width": "480",
                    "size": "198128",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "102327",
                    "mp4": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "101368",
                    "webp": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "9",
                    "hash": "e4f7f0e7a26d2914a0d1615e4115bd46"
                },
                "downsized": {
                    "height": "480",
                    "width": "480",
                    "size": "198128",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "480",
                    "size": "198128",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "480",
                    "width": "480",
                    "size": "198128",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "102327",
                    "mp4": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "480",
                    "width": "480",
                    "size": "198128",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "41855",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "26843",
                    "mp4": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "30038",
                    "webp": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "31663",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "30914",
                    "webp": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "15102",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "9783",
                    "mp4": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "11596",
                    "webp": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "5093",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "15562",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "41855",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "26843",
                    "mp4": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "30038",
                    "webp": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "31663",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "30914",
                    "webp": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "15102",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "9783",
                    "mp4": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "11596",
                    "webp": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "5093",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "15562",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2564804",
                    "mp4": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "480",
                    "size": "71317",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "102327",
                    "mp4": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "334",
                    "width": "334",
                    "mp4_size": "38424",
                    "mp4": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "161",
                    "width": "161",
                    "size": "49558",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "344",
                    "width": "344",
                    "size": "47126",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "1080",
                    "width": "1080",
                    "mp4_size": "354487",
                    "mp4": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "198128",
                    "url": "https://media2.giphy.com/media/LOEnWrLmWitdEStHel/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media3.giphy.com/avatars/toddrocheford/u08jgR0VFFSj.gif",
                "banner_image": "",
                "banner_url": "",
                "profile_url": "https://giphy.com/toddrocheford/",
                "username": "toddrocheford",
                "display_name": "Todd Rocheford",
                "description": "Hello, i like to make gif art and i do motion graphics for a living.",
                "instagram_url": "https://instagram.com/toddrochefordart",
                "website_url": "http://www.toddrocheford.com",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPUxPRW5XckxtV2l0ZEVTdEhlbCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUxPRW5XckxtV2l0ZEVTdEhlbCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUxPRW5XckxtV2l0ZEVTdEhlbCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUxPRW5XckxtV2l0ZEVTdEhlbCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "3odxXG6oUNRVhsdcLK",
            "url": "https://giphy.com/gifs/love-romance-romantic-3odxXG6oUNRVhsdcLK",
            "slug": "love-romance-romantic-3odxXG6oUNRVhsdcLK",
            "bitly_gif_url": "https://gph.is/g/GaXBLe4",
            "bitly_url": "https://gph.is/g/GaXBLe4",
            "embed_url": "https://giphy.com/embed/3odxXG6oUNRVhsdcLK",
            "username": "drawingintheforest",
            "source": "miapage.me",
            "title": "I Love You Hearts GIF by Mia Page",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "miapage.me",
            "is_sticker": 0,
            "import_datetime": "2019-02-12 20:10:01",
            "trending_datetime": "2021-02-09 19:00:13",
            "images": {
                "original": {
                    "height": "360",
                    "width": "480",
                    "size": "162465",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "95931",
                    "mp4": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "139282",
                    "webp": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "35",
                    "hash": "16ac692eaf64a3946d96743361e20749"
                },
                "downsized": {
                    "height": "360",
                    "width": "480",
                    "size": "162465",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "360",
                    "width": "480",
                    "size": "162465",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "360",
                    "width": "480",
                    "size": "162465",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "360",
                    "width": "480",
                    "mp4_size": "101120",
                    "mp4": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "360",
                    "width": "480",
                    "size": "162465",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "267",
                    "size": "71459",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "48964",
                    "mp4": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "73464",
                    "webp": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "267",
                    "size": "14519",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "13578",
                    "webp": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "134",
                    "size": "30260",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "21331",
                    "mp4": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "32540",
                    "webp": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "134",
                    "size": "2110",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "267",
                    "size": "3902",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "150",
                    "width": "200",
                    "size": "49609",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "34810",
                    "mp4": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "53084",
                    "webp": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "150",
                    "width": "200",
                    "size": "10393",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "9764",
                    "webp": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "75",
                    "width": "100",
                    "size": "21297",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "14712",
                    "mp4": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "23980",
                    "webp": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "75",
                    "width": "100",
                    "size": "1711",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "150",
                    "width": "200",
                    "size": "2960",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "506519",
                    "mp4": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "360",
                    "width": "480",
                    "size": "12625",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "360",
                    "width": "480",
                    "mp4_size": "95931",
                    "mp4": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "360",
                    "width": "480",
                    "mp4_size": "44850",
                    "mp4": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "360",
                    "width": "480",
                    "size": "42112",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "360",
                    "width": "480",
                    "size": "47992",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "360",
                    "width": "480",
                    "size": "162465",
                    "url": "https://media2.giphy.com/media/3odxXG6oUNRVhsdcLK/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media1.giphy.com/avatars/drawingintheforest/TIzsubKQ0pjJ.gif",
                "banner_image": "",
                "banner_url": "",
                "profile_url": "https://giphy.com/drawingintheforest/",
                "username": "drawingintheforest",
                "display_name": "Mia Page",
                "description": "Hello!  I like making little animations.  Thanks for checking out my page  :^)\r\n\r\ncontact me at miasakurapage@gmail.com",
                "instagram_url": "",
                "website_url": "https://www.miapage.art/",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPTNvZHhYRzZvVU5SVmhzZGNMSyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTNvZHhYRzZvVU5SVmhzZGNMSyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTNvZHhYRzZvVU5SVmhzZGNMSyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTNvZHhYRzZvVU5SVmhzZGNMSyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "l1KVaj5UcbHwrBMqI",
            "url": "https://giphy.com/gifs/lifetimetv-adorable-babies-l1KVaj5UcbHwrBMqI",
            "slug": "lifetimetv-adorable-babies-l1KVaj5UcbHwrBMqI",
            "bitly_gif_url": "http://gph.is/2nqvsIF",
            "bitly_url": "http://gph.is/2nqvsIF",
            "embed_url": "https://giphy.com/embed/l1KVaj5UcbHwrBMqI",
            "username": "lifetimetv",
            "source": "http://giphydiscover2017",
            "title": "Sad Family Time GIF by Lifetime",
            "rating": "g",
            "content_url": "",
            "source_tld": "giphydiscover2017",
            "source_post_url": "http://giphydiscover2017",
            "is_sticker": 0,
            "import_datetime": "2017-03-15 01:45:50",
            "trending_datetime": "2021-02-19 16:00:12",
            "images": {
                "original": {
                    "height": "281",
                    "width": "500",
                    "size": "2773282",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "451863",
                    "mp4": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "820156",
                    "webp": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "32",
                    "hash": "f383c54e1e0632ccab3dd6abefb0af2b"
                },
                "downsized": {
                    "height": "281",
                    "width": "500",
                    "size": "1388536",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "281",
                    "width": "500",
                    "size": "2773282",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "281",
                    "width": "500",
                    "size": "2773282",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "162",
                    "width": "289",
                    "mp4_size": "73980",
                    "mp4": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "281",
                    "width": "500",
                    "size": "49784",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "356",
                    "size": "969013",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "196610",
                    "mp4": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "515678",
                    "webp": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "356",
                    "size": "194426",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "114274",
                    "webp": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "178",
                    "size": "294971",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "64601",
                    "mp4": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "153324",
                    "webp": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "178",
                    "size": "11580",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "356",
                    "size": "32494",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "112",
                    "width": "200",
                    "size": "390792",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "70980",
                    "mp4": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "182854",
                    "webp": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "112",
                    "width": "200",
                    "size": "74675",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "40056",
                    "webp": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "56",
                    "width": "100",
                    "size": "109171",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "25672",
                    "mp4": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "58126",
                    "webp": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "56",
                    "width": "100",
                    "size": "4334",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "112",
                    "width": "200",
                    "size": "14577",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2423625",
                    "mp4": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "281",
                    "width": "500",
                    "size": "94672",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "268",
                    "width": "480",
                    "mp4_size": "451863",
                    "mp4": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "112",
                    "width": "200",
                    "mp4_size": "36491",
                    "mp4": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "76",
                    "width": "135",
                    "size": "48168",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "84",
                    "width": "150",
                    "size": "33324",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "270",
                    "width": "480",
                    "size": "2773282",
                    "url": "https://media1.giphy.com/media/l1KVaj5UcbHwrBMqI/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media3.giphy.com/avatars/lifetimetv/OzcKdlqmEKau.jpg",
                "banner_image": "",
                "banner_url": "",
                "profile_url": "https://giphy.com/lifetimetv/",
                "username": "lifetimetv",
                "display_name": "Lifetime",
                "description": "Official Lifetime Giphy. Your destination for critically acclaimed & award-winning original programming that spans movies, dramas, comedies & reality series.",
                "instagram_url": "https://instagram.com/lifetimetv",
                "website_url": "http://mylifetime.com",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPWwxS1ZhajVVY2JId3JCTXFJJmV2ZW50X3R5cGU9R0lGX1RSRU5ESU5HJmNpZD1mNDk4NGZkZG1vaDl4NHRkaThsNDZiOGV1YWN0d2xtbnJhZTA1d2Zqc2l6bnZuMWomY3Q9Zw",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWwxS1ZhajVVY2JId3JCTXFJJmV2ZW50X3R5cGU9R0lGX1RSRU5ESU5HJmNpZD1mNDk4NGZkZG1vaDl4NHRkaThsNDZiOGV1YWN0d2xtbnJhZTA1d2Zqc2l6bnZuMWomY3Q9Zw&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWwxS1ZhajVVY2JId3JCTXFJJmV2ZW50X3R5cGU9R0lGX1RSRU5ESU5HJmNpZD1mNDk4NGZkZG1vaDl4NHRkaThsNDZiOGV1YWN0d2xtbnJhZTA1d2Zqc2l6bnZuMWomY3Q9Zw&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWwxS1ZhajVVY2JId3JCTXFJJmV2ZW50X3R5cGU9R0lGX1RSRU5ESU5HJmNpZD1mNDk4NGZkZG1vaDl4NHRkaThsNDZiOGV1YWN0d2xtbnJhZTA1d2Zqc2l6bnZuMWomY3Q9Zw&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "TluN63Wgq3ivIqpeqa",
            "url": "https://giphy.com/gifs/storyful-dance-dancing-stars-and-stripes-honor-flight-via-storyful-TluN63Wgq3ivIqpeqa",
            "slug": "storyful-dance-dancing-stars-and-stripes-honor-flight-via-storyful-TluN63Wgq3ivIqpeqa",
            "bitly_gif_url": "https://gph.is/g/ZYWWG3e",
            "bitly_url": "https://gph.is/g/ZYWWG3e",
            "embed_url": "https://giphy.com/embed/TluN63Wgq3ivIqpeqa",
            "username": "storyful",
            "source": "https://twitter.com/SSHonorFlight/status/1336117152991096838?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1336117152991096838%7Ctwgr%5E5f4dea0f727484f8870766c7ae22bfb81ae5424e%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fnewswire.storyful.com%2Fstorylines%",
            "title": "Happy Birthday Dancing GIF by Storyful",
            "rating": "g",
            "content_url": "",
            "source_tld": "twitter.com",
            "source_post_url": "https://twitter.com/SSHonorFlight/status/1336117152991096838?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1336117152991096838%7Ctwgr%5E5f4dea0f727484f8870766c7ae22bfb81ae5424e%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fnewswire.storyful.com%2Fstorylines%",
            "is_sticker": 0,
            "import_datetime": "2022-12-30 00:36:40",
            "trending_datetime": "2023-02-28 11:24:03",
            "images": {
                "original": {
                    "height": "480",
                    "width": "480",
                    "size": "8874705",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "1040631",
                    "mp4": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "1805548",
                    "webp": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "72",
                    "hash": "42a92608e618eef1a0bdc9e808de0bd7"
                },
                "downsized": {
                    "height": "240",
                    "width": "240",
                    "size": "1374713",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "480",
                    "size": "6100171",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/giphy-downsized-large.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-large.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "384",
                    "width": "384",
                    "size": "4296739",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/giphy-downsized-medium.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-medium.gif&ct=g"
                },
                "downsized_small": {
                    "height": "210",
                    "width": "210",
                    "mp4_size": "167071",
                    "mp4": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "240",
                    "width": "240",
                    "size": "24127",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "1458162",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "311274",
                    "mp4": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "610390",
                    "webp": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "140396",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "71936",
                    "webp": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "447681",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "118484",
                    "mp4": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "235500",
                    "webp": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "7711",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "21900",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "1458162",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "311274",
                    "mp4": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "610390",
                    "webp": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "140396",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "71936",
                    "webp": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "447681",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "48783",
                    "mp4": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "235500",
                    "webp": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "7711",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "21900",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2896050",
                    "mp4": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "480",
                    "size": "126177",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "1040631",
                    "mp4": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "248",
                    "width": "248",
                    "mp4_size": "37420",
                    "mp4": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "75",
                    "width": "75",
                    "size": "48850",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "114",
                    "width": "114",
                    "size": "37374",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "720",
                    "width": "720",
                    "mp4_size": "1444009",
                    "mp4": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "8874705",
                    "url": "https://media1.giphy.com/media/TluN63Wgq3ivIqpeqa/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media3.giphy.com/avatars/storyful/LwI0Rff6bmhf.jpg",
                "banner_image": "https://media3.giphy.com/channel_assets/storyful/PPwM1bSJVMhr.png",
                "banner_url": "https://media3.giphy.com/channel_assets/storyful/PPwM1bSJVMhr.png",
                "profile_url": "https://giphy.com/storyful/",
                "username": "storyful",
                "display_name": "Storyful",
                "description": "",
                "instagram_url": "",
                "website_url": "",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPVRsdU42M1dncTNpdklxcGVxYSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVRsdU42M1dncTNpdklxcGVxYSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVRsdU42M1dncTNpdklxcGVxYSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVRsdU42M1dncTNpdklxcGVxYSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "d0XZW5hrvfdA3bllxW",
            "url": "https://giphy.com/gifs/blackvotersmatterfund-black-voters-matter-fund-bvmf-d0XZW5hrvfdA3bllxW",
            "slug": "blackvotersmatterfund-black-voters-matter-fund-bvmf-d0XZW5hrvfdA3bllxW",
            "bitly_gif_url": "https://gph.is/g/4weGzqD",
            "bitly_url": "https://gph.is/g/4weGzqD",
            "embed_url": "https://giphy.com/embed/d0XZW5hrvfdA3bllxW",
            "username": "blackvotersmatterfund",
            "source": "",
            "title": "Happy We Got The Power GIF by Black Voters Matter Fund",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2020-09-29 21:02:24",
            "trending_datetime": "2023-06-08 18:15:14",
            "images": {
                "original": {
                    "height": "392",
                    "width": "480",
                    "size": "788810",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "124282",
                    "mp4": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "160326",
                    "webp": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "12",
                    "hash": "de6dcdc726570e4709ed29a5b17b4545"
                },
                "downsized": {
                    "height": "392",
                    "width": "480",
                    "size": "788810",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "392",
                    "width": "480",
                    "size": "788810",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "392",
                    "width": "480",
                    "size": "788810",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "392",
                    "width": "480",
                    "mp4_size": "124282",
                    "mp4": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "392",
                    "width": "480",
                    "size": "788810",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "245",
                    "size": "185787",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "40547",
                    "mp4": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "69432",
                    "webp": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "245",
                    "size": "141611",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "60468",
                    "webp": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "123",
                    "size": "62317",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "14182",
                    "mp4": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "27378",
                    "webp": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "123",
                    "size": "6021",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "245",
                    "size": "16451",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "163",
                    "width": "200",
                    "size": "154197",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "29818",
                    "mp4": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "53368",
                    "webp": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "163",
                    "width": "200",
                    "size": "76076",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "44668",
                    "webp": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "82",
                    "width": "100",
                    "size": "46436",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "10974",
                    "mp4": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "20862",
                    "webp": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "82",
                    "width": "100",
                    "size": "4711",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "163",
                    "width": "200",
                    "size": "12768",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2097648",
                    "mp4": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "392",
                    "width": "480",
                    "size": "65354",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "392",
                    "width": "480",
                    "mp4_size": "124282",
                    "mp4": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "248",
                    "width": "303",
                    "mp4_size": "27204",
                    "mp4": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "73",
                    "width": "89",
                    "size": "49764",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "190",
                    "width": "232",
                    "size": "42088",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "1080",
                    "width": "1320",
                    "mp4_size": "792148",
                    "mp4": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "392",
                    "width": "480",
                    "size": "788810",
                    "url": "https://media2.giphy.com/media/d0XZW5hrvfdA3bllxW/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media4.giphy.com/avatars/blackvotersmatterfund/DQXuVlRsVShf.png",
                "banner_image": "https://media4.giphy.com/headers/blackvotersmatterfund/SQBlwyt4o8nH.png",
                "banner_url": "https://media4.giphy.com/headers/blackvotersmatterfund/SQBlwyt4o8nH.png",
                "profile_url": "https://giphy.com/blackvotersmatterfund/",
                "username": "blackvotersmatterfund",
                "display_name": "Black Voters Matter Fund",
                "description": "Black Voters Matter Fund is a 501c4 dedicated to expanding Black voter engagement and increasing progressive power through movement-building and engagement. Working with grassroots organizations, specifically in key states in the South, BVMF seeks to increase voter registration and turnout, advocate for policies to expand voting rights/access, and help develop infrastructure where little or none exists to support a power-building movement that keeps Black voters and their issues at the forefront of our election process.",
                "instagram_url": "https://instagram.com/blackvotersmtr",
                "website_url": "https://www.blackvotersmatterfund.org/",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPWQwWFpXNWhydmZkQTNibGx4VyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWQwWFpXNWhydmZkQTNibGx4VyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWQwWFpXNWhydmZkQTNibGx4VyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWQwWFpXNWhydmZkQTNibGx4VyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "TCF8SU2k59162v7UQM",
            "url": "https://giphy.com/gifs/DefyTVNetwork-magic-criss-angel-mindfreak-TCF8SU2k59162v7UQM",
            "slug": "DefyTVNetwork-magic-criss-angel-mindfreak-TCF8SU2k59162v7UQM",
            "bitly_gif_url": "https://gph.is/g/aQbgepO",
            "bitly_url": "https://gph.is/g/aQbgepO",
            "embed_url": "https://giphy.com/embed/TCF8SU2k59162v7UQM",
            "username": "DefyTVNetwork",
            "source": "",
            "title": "Criss Angel Wow GIF by DefyTV",
            "rating": "pg",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2021-10-07 18:44:39",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "360",
                    "width": "480",
                    "size": "2528845",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "782943",
                    "mp4": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "739824",
                    "webp": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "23",
                    "hash": "dad43439cb490661ff213ab9f8758b16"
                },
                "downsized": {
                    "height": "360",
                    "width": "480",
                    "size": "1547685",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "360",
                    "width": "480",
                    "size": "2528845",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "360",
                    "width": "480",
                    "size": "2528845",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "180",
                    "width": "240",
                    "mp4_size": "150725",
                    "mp4": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "360",
                    "width": "480",
                    "size": "66362",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "267",
                    "size": "675968",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "313150",
                    "mp4": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "356368",
                    "webp": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "267",
                    "size": "191307",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "110906",
                    "webp": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "134",
                    "size": "211147",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "109620",
                    "mp4": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "126958",
                    "webp": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "134",
                    "size": "10780",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "267",
                    "size": "29947",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "150",
                    "width": "200",
                    "size": "417406",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "205545",
                    "mp4": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "234506",
                    "webp": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "150",
                    "width": "200",
                    "size": "116228",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "69924",
                    "webp": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "75",
                    "width": "100",
                    "size": "125260",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "49037",
                    "mp4": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "79874",
                    "webp": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "75",
                    "width": "100",
                    "size": "6205",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "150",
                    "width": "200",
                    "size": "18830",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "7247741",
                    "mp4": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "360",
                    "width": "480",
                    "size": "112389",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "360",
                    "width": "480",
                    "mp4_size": "782943",
                    "mp4": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "114",
                    "width": "152",
                    "mp4_size": "46827",
                    "mp4": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "58",
                    "width": "77",
                    "size": "49442",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "84",
                    "width": "112",
                    "size": "40112",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "1080",
                    "width": "1440",
                    "mp4_size": "3987527",
                    "mp4": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "360",
                    "width": "480",
                    "size": "2528845",
                    "url": "https://media3.giphy.com/media/TCF8SU2k59162v7UQM/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media2.giphy.com/avatars/DefyTVNetwork/11MNNUs6zhUJ.jpeg",
                "banner_image": "https://media2.giphy.com/headers/DefyTVNetwork/GzPG1kByzkQV.jpeg",
                "banner_url": "https://media2.giphy.com/headers/DefyTVNetwork/GzPG1kByzkQV.jpeg",
                "profile_url": "https://giphy.com/DefyTVNetwork/",
                "username": "DefyTVNetwork",
                "display_name": "DefyTV",
                "description": "A celebration of audacious individualism, DEFYTV is a network that immerses viewers in the originality and eccentricity of those who cut against the grain.",
                "instagram_url": "",
                "website_url": "",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPVRDRjhTVTJrNTkxNjJ2N1VRTSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVRDRjhTVTJrNTkxNjJ2N1VRTSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVRDRjhTVTJrNTkxNjJ2N1VRTSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVRDRjhTVTJrNTkxNjJ2N1VRTSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "4cF1oNfAtjfkK2XQSB",
            "url": "https://giphy.com/gifs/Roland-Garros-happy-clapping-iga-swiatek-4cF1oNfAtjfkK2XQSB",
            "slug": "Roland-Garros-happy-clapping-iga-swiatek-4cF1oNfAtjfkK2XQSB",
            "bitly_gif_url": "https://gph.is/g/ZnD7ovA",
            "bitly_url": "https://gph.is/g/ZnD7ovA",
            "embed_url": "https://giphy.com/embed/4cF1oNfAtjfkK2XQSB",
            "username": "Roland-Garros",
            "source": "",
            "title": "Happy French Open GIF by Roland-Garros",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2020-10-08 15:14:19",
            "trending_datetime": "2023-06-08 18:06:36",
            "images": {
                "original": {
                    "height": "270",
                    "width": "480",
                    "size": "10988015",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "2119972",
                    "mp4": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "2323506",
                    "webp": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "173",
                    "hash": "1dc3998ddf872aebde33a8d3d02b678e"
                },
                "downsized": {
                    "height": "216",
                    "width": "384",
                    "size": "1697145",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "270",
                    "width": "480",
                    "size": "7528820",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/giphy-downsized-large.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-large.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "270",
                    "width": "480",
                    "size": "3054802",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/giphy-downsized-medium.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-medium.gif&ct=g"
                },
                "downsized_small": {
                    "height": "108",
                    "width": "192",
                    "mp4_size": "125403",
                    "mp4": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "216",
                    "width": "384",
                    "size": "28550",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "356",
                    "size": "4711877",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "638369",
                    "mp4": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "1056642",
                    "webp": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "356",
                    "size": "189548",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "103018",
                    "webp": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "178",
                    "size": "1726408",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "228692",
                    "mp4": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "404780",
                    "webp": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "178",
                    "size": "10456",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "356",
                    "size": "28088",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "113",
                    "width": "200",
                    "size": "2204106",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "241027",
                    "mp4": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "448604",
                    "webp": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "113",
                    "width": "200",
                    "size": "77710",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "38862",
                    "webp": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "57",
                    "width": "100",
                    "size": "612776",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "46809",
                    "mp4": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "204666",
                    "webp": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "57",
                    "width": "100",
                    "size": "4262",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "113",
                    "width": "200",
                    "size": "13055",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "4563645",
                    "mp4": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "270",
                    "width": "480",
                    "size": "75793",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "270",
                    "width": "480",
                    "mp4_size": "2119972",
                    "mp4": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "144",
                    "width": "256",
                    "mp4_size": "36505",
                    "mp4": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "52",
                    "width": "92",
                    "size": "49253",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "92",
                    "width": "164",
                    "size": "36692",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "270",
                    "width": "480",
                    "size": "10988015",
                    "url": "https://media2.giphy.com/media/4cF1oNfAtjfkK2XQSB/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media4.giphy.com/avatars/Roland-Garros/9ztB7JZL1WCt.gif",
                "banner_image": "https://media4.giphy.com/headers/Roland-Garros/qGSHfw6PzKqO.jpg",
                "banner_url": "https://media4.giphy.com/headers/Roland-Garros/qGSHfw6PzKqO.jpg",
                "profile_url": "https://giphy.com/Roland-Garros/",
                "username": "Roland-Garros",
                "display_name": "Roland-Garros",
                "description": "Roland-Garros / French Open / Internationaux de France From Sunday 27th September to Sunday 11 October 2020. #RolandGarros http://rolandgarros.com",
                "instagram_url": "https://instagram.com/rolandgarros",
                "website_url": "https://www.rolandgarros.com/fr-fr/",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPTRjRjFvTmZBdGpma0syWFFTQiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTRjRjFvTmZBdGpma0syWFFTQiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTRjRjFvTmZBdGpma0syWFFTQiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTRjRjFvTmZBdGpma0syWFFTQiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "iHgznkhwC6XYs",
            "url": "https://giphy.com/gifs/hug-friendship-iHgznkhwC6XYs",
            "slug": "hug-friendship-iHgznkhwC6XYs",
            "bitly_gif_url": "http://gph.is/10FfUBu",
            "bitly_url": "http://gph.is/10FfUBu",
            "embed_url": "https://giphy.com/embed/iHgznkhwC6XYs",
            "username": "rockymovie",
            "source": "http://www.reddit.com/r/whitepeoplegifs/comments/19c086/the_day_rblackpeoplegifs_and_rwhitepeoplegifs/",
            "title": "Best Friends Hug GIF by Rocky",
            "rating": "g",
            "content_url": "",
            "source_tld": "www.reddit.com",
            "source_post_url": "http://www.reddit.com/r/whitepeoplegifs/comments/19c086/the_day_rblackpeoplegifs_and_rwhitepeoplegifs/",
            "is_sticker": 0,
            "import_datetime": "2013-05-31 18:52:50",
            "trending_datetime": "2022-06-08 17:33:03",
            "images": {
                "original": {
                    "height": "146",
                    "width": "195",
                    "size": "1775415",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "1797249",
                    "mp4": "https://media4.giphy.com/media/iHgznkhwC6XYs/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "382006",
                    "webp": "https://media4.giphy.com/media/iHgznkhwC6XYs/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "139",
                    "hash": "384fb69b594851b52f3ae73beac993ba"
                },
                "downsized": {
                    "height": "146",
                    "width": "195",
                    "size": "1775415",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "146",
                    "width": "195",
                    "size": "1775415",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "146",
                    "width": "195",
                    "size": "1775415",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "112",
                    "width": "148",
                    "mp4_size": "88951",
                    "mp4": "https://media4.giphy.com/media/iHgznkhwC6XYs/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "146",
                    "width": "195",
                    "size": "1775415",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "267",
                    "size": "2156116",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "491560",
                    "mp4": "https://media4.giphy.com/media/iHgznkhwC6XYs/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "504454",
                    "webp": "https://media4.giphy.com/media/iHgznkhwC6XYs/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "267",
                    "size": "104777",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "57972",
                    "webp": "https://media4.giphy.com/media/iHgznkhwC6XYs/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "134",
                    "size": "613174",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "146654",
                    "mp4": "https://media4.giphy.com/media/iHgznkhwC6XYs/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "160178",
                    "webp": "https://media4.giphy.com/media/iHgznkhwC6XYs/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "134",
                    "size": "6174",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "267",
                    "size": "19879",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "150",
                    "width": "200",
                    "size": "1619137",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "298195",
                    "mp4": "https://media4.giphy.com/media/iHgznkhwC6XYs/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "349934",
                    "webp": "https://media4.giphy.com/media/iHgznkhwC6XYs/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "150",
                    "width": "200",
                    "size": "73027",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "36256",
                    "webp": "https://media4.giphy.com/media/iHgznkhwC6XYs/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "75",
                    "width": "100",
                    "size": "391095",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "48844",
                    "mp4": "https://media4.giphy.com/media/iHgznkhwC6XYs/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "106308",
                    "webp": "https://media4.giphy.com/media/iHgznkhwC6XYs/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "75",
                    "width": "100",
                    "size": "4278",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "150",
                    "width": "200",
                    "size": "15657",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "3778847",
                    "mp4": "https://media4.giphy.com/media/iHgznkhwC6XYs/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "146",
                    "width": "195",
                    "size": "16290",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "358",
                    "width": "480",
                    "mp4_size": "1797249",
                    "mp4": "https://media4.giphy.com/media/iHgznkhwC6XYs/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "114",
                    "width": "151",
                    "mp4_size": "39887",
                    "mp4": "https://media4.giphy.com/media/iHgznkhwC6XYs/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "62",
                    "width": "83",
                    "size": "48850",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "142",
                    "width": "190",
                    "size": "40380",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "359",
                    "width": "480",
                    "size": "1775415",
                    "url": "https://media4.giphy.com/media/iHgznkhwC6XYs/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media4.giphy.com/avatars/rockymovie/yhLEHU3QygyL.jpg",
                "banner_image": "https://media4.giphy.com/headers/rockymovie/XEEcRlg1SmWX.jpg",
                "banner_url": "https://media4.giphy.com/headers/rockymovie/XEEcRlg1SmWX.jpg",
                "profile_url": "https://giphy.com/rockymovie/",
                "username": "rockymovie",
                "display_name": "Rocky",
                "description": "Go the distance with the Rocky Heavyweight collection, featuring all six of the original knockout Rocky films including the first film with a stunning new master. Sylvester Stallone stars in the greatest boxing saga of all time and triumphs as one of the most inspirational characters in cinematic history. Witness every epic, action-packed fight and unforgettable moment as Rocky strives for greatness through sheer determination against impossible odds. This collection contains over three hours of bonus features including a new featurette “8mm Home Movies of Rocky” narrated by Director John Avildsen and Production Manager Lloyd Kaufman. TM & © MGM",
                "instagram_url": "https://instagram.com/mgm_studios",
                "website_url": "http://bit.ly/RockyHeavyweightCollection",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPWlIZ3pua2h3QzZYWXMmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWlIZ3pua2h3QzZYWXMmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWlIZ3pua2h3QzZYWXMmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWlIZ3pua2h3QzZYWXMmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "2yxerVWk5569SXu0BR",
            "url": "https://giphy.com/gifs/2yxerVWk5569SXu0BR",
            "slug": "2yxerVWk5569SXu0BR",
            "bitly_gif_url": "https://gph.is/2CKUbQv",
            "bitly_url": "https://gph.is/2CKUbQv",
            "embed_url": "https://giphy.com/embed/2yxerVWk5569SXu0BR",
            "username": "",
            "source": "https://www.reddit.com/r/nononono/comments/9hr5yp/nope_fuck_that/",
            "title": "dog oops GIF",
            "rating": "g",
            "content_url": "",
            "source_tld": "www.reddit.com",
            "source_post_url": "https://www.reddit.com/r/nononono/comments/9hr5yp/nope_fuck_that/",
            "is_sticker": 0,
            "import_datetime": "2019-01-24 19:34:22",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "480",
                    "width": "270",
                    "size": "14204778",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "2223859",
                    "mp4": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "3498768",
                    "webp": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "210",
                    "hash": "5e4fa0501522eb12a0d20ef4ef4ca19f"
                },
                "downsized": {
                    "height": "284",
                    "width": "159",
                    "size": "1548155",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "270",
                    "size": "6796169",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/giphy-downsized-large.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-large.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "480",
                    "width": "270",
                    "size": "4752742",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/giphy-downsized-medium.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-medium.gif&ct=g"
                },
                "downsized_small": {
                    "height": "152",
                    "width": "85",
                    "mp4_size": "163256",
                    "mp4": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "284",
                    "width": "159",
                    "size": "38050",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "113",
                    "size": "3195929",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "621341",
                    "mp4": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "1124536",
                    "webp": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "113",
                    "size": "92276",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "35850",
                    "webp": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "57",
                    "size": "1016148",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "229473",
                    "mp4": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "408416",
                    "webp": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "57",
                    "size": "6673",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "113",
                    "size": "20117",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "356",
                    "width": "200",
                    "size": "8541064",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "1482149",
                    "mp4": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "2505700",
                    "webp": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "356",
                    "width": "200",
                    "size": "246803",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "86682",
                    "webp": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "178",
                    "width": "100",
                    "size": "2646069",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "43274",
                    "mp4": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "968840",
                    "webp": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "178",
                    "width": "100",
                    "size": "16709",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "356",
                    "width": "200",
                    "size": "53669",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2196646",
                    "mp4": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "270",
                    "size": "90136",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "270",
                    "mp4_size": "2223859",
                    "mp4": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "266",
                    "width": "149",
                    "mp4_size": "41075",
                    "mp4": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "85",
                    "width": "48",
                    "size": "48189",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "140",
                    "width": "78",
                    "size": "43054",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "854",
                    "width": "482",
                    "mp4_size": "3910827",
                    "mp4": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "853",
                    "width": "480",
                    "size": "14204778",
                    "url": "https://media3.giphy.com/media/2yxerVWk5569SXu0BR/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "analytics_response_payload": "e=Z2lmX2lkPTJ5eGVyVldrNTU2OVNYdTBCUiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTJ5eGVyVldrNTU2OVNYdTBCUiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTJ5eGVyVldrNTU2OVNYdTBCUiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTJ5eGVyVldrNTU2OVNYdTBCUiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "vQqeT3AYg8S5O",
            "url": "https://giphy.com/gifs/gets-smart-question-vQqeT3AYg8S5O",
            "slug": "gets-smart-question-vQqeT3AYg8S5O",
            "bitly_gif_url": "http://gph.is/1kw5oF6",
            "bitly_url": "http://gph.is/1kw5oF6",
            "embed_url": "https://giphy.com/embed/vQqeT3AYg8S5O",
            "username": "",
            "source": "http://www.gifbay.com/gif/when_i_get_a_question_right_and_the_smart_kid_gets_it_wrong-129325/",
            "title": "No Way Wow GIF",
            "rating": "g",
            "content_url": "",
            "source_tld": "www.gifbay.com",
            "source_post_url": "http://www.gifbay.com/gif/when_i_get_a_question_right_and_the_smart_kid_gets_it_wrong-129325/",
            "is_sticker": 0,
            "import_datetime": "2014-05-01 08:01:51",
            "trending_datetime": "2019-11-10 00:00:14",
            "images": {
                "original": {
                    "height": "220",
                    "width": "320",
                    "size": "279206",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "106122",
                    "mp4": "https://media4.giphy.com/media/vQqeT3AYg8S5O/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "60484",
                    "webp": "https://media4.giphy.com/media/vQqeT3AYg8S5O/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "26",
                    "hash": "9fb7fe427a6787e7eb0eb0625b8e8839"
                },
                "downsized": {
                    "height": "220",
                    "width": "320",
                    "size": "279206",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "220",
                    "width": "320",
                    "size": "279206",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "220",
                    "width": "320",
                    "size": "279206",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "220",
                    "width": "320",
                    "mp4_size": "59082",
                    "mp4": "https://media4.giphy.com/media/vQqeT3AYg8S5O/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "220",
                    "width": "320",
                    "size": "279206",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "291",
                    "size": "216254",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "52575",
                    "mp4": "https://media4.giphy.com/media/vQqeT3AYg8S5O/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "53476",
                    "webp": "https://media4.giphy.com/media/vQqeT3AYg8S5O/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "291",
                    "size": "54012",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "31376",
                    "webp": "https://media4.giphy.com/media/vQqeT3AYg8S5O/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "146",
                    "size": "85811",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "20368",
                    "mp4": "https://media4.giphy.com/media/vQqeT3AYg8S5O/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "26588",
                    "webp": "https://media4.giphy.com/media/vQqeT3AYg8S5O/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "146",
                    "size": "3262",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "291",
                    "size": "6663",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "138",
                    "width": "200",
                    "size": "125399",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "30930",
                    "mp4": "https://media4.giphy.com/media/vQqeT3AYg8S5O/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "36648",
                    "webp": "https://media4.giphy.com/media/vQqeT3AYg8S5O/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "138",
                    "width": "200",
                    "size": "30891",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "17972",
                    "webp": "https://media4.giphy.com/media/vQqeT3AYg8S5O/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "69",
                    "width": "100",
                    "size": "51227",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "12787",
                    "mp4": "https://media4.giphy.com/media/vQqeT3AYg8S5O/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "17770",
                    "webp": "https://media4.giphy.com/media/vQqeT3AYg8S5O/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "69",
                    "width": "100",
                    "size": "2286",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "138",
                    "width": "200",
                    "size": "4414",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "618004",
                    "mp4": "https://media4.giphy.com/media/vQqeT3AYg8S5O/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "220",
                    "width": "320",
                    "size": "21228",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "330",
                    "width": "480",
                    "mp4_size": "106122",
                    "mp4": "https://media4.giphy.com/media/vQqeT3AYg8S5O/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "220",
                    "width": "320",
                    "mp4_size": "31060",
                    "mp4": "https://media4.giphy.com/media/vQqeT3AYg8S5O/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "70",
                    "width": "102",
                    "size": "49053",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "220",
                    "width": "320",
                    "size": "19614",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "330",
                    "width": "480",
                    "size": "279206",
                    "url": "https://media4.giphy.com/media/vQqeT3AYg8S5O/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "analytics_response_payload": "e=Z2lmX2lkPXZRcWVUM0FZZzhTNU8mZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXZRcWVUM0FZZzhTNU8mZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXZRcWVUM0FZZzhTNU8mZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXZRcWVUM0FZZzhTNU8mZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "6E5UgTuvUR0b3OLgWV",
            "url": "https://giphy.com/gifs/good-morning-coffee-tea-6E5UgTuvUR0b3OLgWV",
            "slug": "good-morning-coffee-tea-6E5UgTuvUR0b3OLgWV",
            "bitly_gif_url": "https://gph.is/g/4DWV58j",
            "bitly_url": "https://gph.is/g/4DWV58j",
            "embed_url": "https://giphy.com/embed/6E5UgTuvUR0b3OLgWV",
            "username": "michellekirsch",
            "source": "http://michellekirschcreative.com",
            "title": "Good Morning Hugs GIF",
            "rating": "g",
            "content_url": "",
            "source_tld": "michellekirschcreative.com",
            "source_post_url": "http://michellekirschcreative.com",
            "is_sticker": 0,
            "import_datetime": "2021-02-27 18:33:19",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "480",
                    "width": "480",
                    "size": "45646",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "26628",
                    "mp4": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "38844",
                    "webp": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "12",
                    "hash": "4844d007f0c9ba8d6ac3b47fbe142cae"
                },
                "downsized": {
                    "height": "480",
                    "width": "480",
                    "size": "45646",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "480",
                    "size": "45646",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "480",
                    "width": "480",
                    "size": "45646",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "26387",
                    "mp4": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "480",
                    "width": "480",
                    "size": "45646",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "16769",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "10416",
                    "mp4": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "17504",
                    "webp": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "11472",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "11598",
                    "webp": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "9267",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "5737",
                    "mp4": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "9718",
                    "webp": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "2637",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "4760",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "16769",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "10416",
                    "mp4": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "17504",
                    "webp": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "11472",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "11598",
                    "webp": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "9267",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "5737",
                    "mp4": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "9718",
                    "webp": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "2637",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "4760",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "224318",
                    "mp4": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "480",
                    "size": "19271",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "26628",
                    "mp4": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "26387",
                    "mp4": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "480",
                    "width": "480",
                    "size": "36597",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "480",
                    "width": "480",
                    "size": "38844",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "1920",
                    "width": "1920",
                    "mp4_size": "112062",
                    "mp4": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "45646",
                    "url": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                },
                "4k": {
                    "height": "2400",
                    "width": "2400",
                    "mp4_size": "144698",
                    "mp4": "https://media0.giphy.com/media/6E5UgTuvUR0b3OLgWV/giphy-4k.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-4k.mp4&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media4.giphy.com/avatars/michellekirsch/OOM7DrBedq8c.jpeg",
                "banner_image": "",
                "banner_url": "",
                "profile_url": "https://giphy.com/channel/michellekirsch/",
                "username": "michellekirsch",
                "display_name": "Michelle Kirsch",
                "description": "Cute illustrations just for fun. :)\r\n\r\nVisit The Little Burbs on Instagram: \r\nhttps://www.instagram.com/thelittleburbs/",
                "instagram_url": "https://instagram.com/Michellekirschcreative",
                "website_url": "http://michellekirschcreative.com",
                "is_verified": false
            },
            "analytics_response_payload": "e=Z2lmX2lkPTZFNVVnVHV2VVIwYjNPTGdXViZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTZFNVVnVHV2VVIwYjNPTGdXViZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTZFNVVnVHV2VVIwYjNPTGdXViZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTZFNVVnVHV2VVIwYjNPTGdXViZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "80p9CFwf1vyw",
            "url": "https://giphy.com/gifs/rapunzel-hugh-grant-birthday-gif-80p9CFwf1vyw",
            "slug": "rapunzel-hugh-grant-birthday-gif-80p9CFwf1vyw",
            "bitly_gif_url": "http://gph.is/1knEVtq",
            "bitly_url": "http://gph.is/1knEVtq",
            "embed_url": "https://giphy.com/embed/80p9CFwf1vyw",
            "username": "",
            "source": "http://theamytucker.tumblr.com/post/61407634467/birthdaytastic",
            "title": "Happy Birthday Disney GIF",
            "rating": "g",
            "content_url": "",
            "source_tld": "theamytucker.tumblr.com",
            "source_post_url": "http://theamytucker.tumblr.com/post/61407634467/birthdaytastic",
            "is_sticker": 0,
            "import_datetime": "2013-12-20 00:51:30",
            "trending_datetime": "2017-09-08 14:58:05",
            "images": {
                "original": {
                    "height": "173",
                    "width": "230",
                    "size": "461839",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "931614",
                    "mp4": "https://media2.giphy.com/media/80p9CFwf1vyw/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "257350",
                    "webp": "https://media2.giphy.com/media/80p9CFwf1vyw/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "26",
                    "hash": "7ed5acf4766d3dbd333313d85be7e2ce"
                },
                "downsized": {
                    "height": "173",
                    "width": "230",
                    "size": "461839",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "173",
                    "width": "230",
                    "size": "461839",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "173",
                    "width": "230",
                    "size": "461839",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "154",
                    "width": "205",
                    "mp4_size": "71924",
                    "mp4": "https://media2.giphy.com/media/80p9CFwf1vyw/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "173",
                    "width": "230",
                    "size": "461839",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "266",
                    "size": "571790",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "234359",
                    "mp4": "https://media2.giphy.com/media/80p9CFwf1vyw/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "286950",
                    "webp": "https://media2.giphy.com/media/80p9CFwf1vyw/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "266",
                    "size": "135384",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "78228",
                    "webp": "https://media2.giphy.com/media/80p9CFwf1vyw/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "133",
                    "size": "140683",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "58824",
                    "mp4": "https://media2.giphy.com/media/80p9CFwf1vyw/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "80982",
                    "webp": "https://media2.giphy.com/media/80p9CFwf1vyw/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "133",
                    "size": "5718",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "266",
                    "size": "21180",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "150",
                    "width": "200",
                    "size": "332324",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "129626",
                    "mp4": "https://media2.giphy.com/media/80p9CFwf1vyw/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "170618",
                    "webp": "https://media2.giphy.com/media/80p9CFwf1vyw/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "150",
                    "width": "200",
                    "size": "75812",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "46406",
                    "webp": "https://media2.giphy.com/media/80p9CFwf1vyw/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "75",
                    "width": "100",
                    "size": "88283",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "37181",
                    "mp4": "https://media2.giphy.com/media/80p9CFwf1vyw/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "54606",
                    "webp": "https://media2.giphy.com/media/80p9CFwf1vyw/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "75",
                    "width": "100",
                    "size": "3880",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "150",
                    "width": "200",
                    "size": "15911",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "3975411",
                    "mp4": "https://media2.giphy.com/media/80p9CFwf1vyw/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "173",
                    "width": "230",
                    "size": "18750",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "360",
                    "width": "480",
                    "mp4_size": "931614",
                    "mp4": "https://media2.giphy.com/media/80p9CFwf1vyw/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "136",
                    "width": "181",
                    "mp4_size": "42460",
                    "mp4": "https://media2.giphy.com/media/80p9CFwf1vyw/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "63",
                    "width": "84",
                    "size": "48948",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "108",
                    "width": "144",
                    "size": "31600",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "361",
                    "width": "480",
                    "size": "461839",
                    "url": "https://media2.giphy.com/media/80p9CFwf1vyw/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "analytics_response_payload": "e=Z2lmX2lkPTgwcDlDRndmMXZ5dyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTgwcDlDRndmMXZ5dyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTgwcDlDRndmMXZ5dyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTgwcDlDRndmMXZ5dyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "R6gvnAxj2ISzJdbA63",
            "url": "https://giphy.com/gifs/warnerbrosde-R6gvnAxj2ISzJdbA63",
            "slug": "warnerbrosde-R6gvnAxj2ISzJdbA63",
            "bitly_gif_url": "https://gph.is/g/ZYbwj3n",
            "bitly_url": "https://gph.is/g/ZYbwj3n",
            "embed_url": "https://giphy.com/embed/R6gvnAxj2ISzJdbA63",
            "username": "warnerbrosde",
            "source": "",
            "title": "Happy I Love You GIF by Warner Bros. Deutschland",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2021-10-26 12:40:40",
            "trending_datetime": "2022-01-25 16:00:11",
            "images": {
                "original": {
                    "height": "450",
                    "width": "450",
                    "size": "10373415",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "972741",
                    "mp4": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "1741572",
                    "webp": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "112",
                    "hash": "bd1c05198077b29e330877f8ac8c56c4"
                },
                "downsized": {
                    "height": "360",
                    "width": "360",
                    "size": "1933973",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "450",
                    "width": "450",
                    "size": "5544168",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy-downsized-large.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-large.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "450",
                    "width": "450",
                    "size": "3967123",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy-downsized-medium.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-medium.gif&ct=g"
                },
                "downsized_small": {
                    "height": "180",
                    "width": "180",
                    "mp4_size": "75041",
                    "mp4": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "360",
                    "width": "360",
                    "size": "36128",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "1659862",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "178830",
                    "mp4": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "458698",
                    "webp": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "107672",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "61724",
                    "webp": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "570451",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "68844",
                    "mp4": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "173532",
                    "webp": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "5822",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "15654",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "1659862",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "178830",
                    "mp4": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "458698",
                    "webp": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "107672",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "61724",
                    "webp": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "570451",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "50390",
                    "mp4": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "173532",
                    "webp": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "5822",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "15654",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2195951",
                    "mp4": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "450",
                    "width": "450",
                    "size": "119571",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "972741",
                    "mp4": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "208",
                    "width": "208",
                    "mp4_size": "38858",
                    "mp4": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "74",
                    "width": "74",
                    "size": "48190",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "144",
                    "width": "144",
                    "size": "41512",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "10373415",
                    "url": "https://media2.giphy.com/media/R6gvnAxj2ISzJdbA63/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media4.giphy.com/avatars/warnerbrosde/iL0YFIHzBvuh.gif",
                "banner_image": "https://media4.giphy.com/headers/warnerbrosde/Xs9AA4cRaH2z.png",
                "banner_url": "https://media4.giphy.com/headers/warnerbrosde/Xs9AA4cRaH2z.png",
                "profile_url": "https://giphy.com/warnerbrosde/",
                "username": "warnerbrosde",
                "display_name": "Warner Bros. Deutschland",
                "description": "Willkommen auf dem offiziellen Warner Bros. Giphy-Kanal. Hier findest du alle Antworten. Natürlich mit Szenen aus den neuesten Kinofilmen von Warner Bros. Entertainment!",
                "instagram_url": "https://instagram.com/warnerbrosde",
                "website_url": "http://www.warnerbros.de",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPVI2Z3ZuQXhqMklTekpkYkE2MyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVI2Z3ZuQXhqMklTekpkYkE2MyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVI2Z3ZuQXhqMklTekpkYkE2MyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVI2Z3ZuQXhqMklTekpkYkE2MyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "jnQYWZ0T4mkhCmkzcn",
            "url": "https://giphy.com/gifs/sad-baby-crying-jnQYWZ0T4mkhCmkzcn",
            "slug": "sad-baby-crying-jnQYWZ0T4mkhCmkzcn",
            "bitly_gif_url": "https://gph.is/g/ZPVGgrE",
            "bitly_url": "https://gph.is/g/ZPVGgrE",
            "embed_url": "https://giphy.com/embed/jnQYWZ0T4mkhCmkzcn",
            "username": "",
            "source": "",
            "title": "Sad Baby GIF",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2019-05-01 18:45:27",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "280",
                    "width": "374",
                    "size": "1681390",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "728042",
                    "mp4": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "523450",
                    "webp": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "30",
                    "hash": "4e8137510a4946cf466359fa83cb7293"
                },
                "downsized": {
                    "height": "280",
                    "width": "374",
                    "size": "1681390",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "280",
                    "width": "374",
                    "size": "1681390",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "280",
                    "width": "374",
                    "size": "1681390",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "166",
                    "width": "221",
                    "mp4_size": "49066",
                    "mp4": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "280",
                    "width": "374",
                    "size": "1681390",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "267",
                    "size": "578390",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "144060",
                    "mp4": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "215628",
                    "webp": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "267",
                    "size": "133550",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "73790",
                    "webp": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "134",
                    "size": "179241",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "42430",
                    "mp4": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "77806",
                    "webp": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "134",
                    "size": "6900",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "267",
                    "size": "20333",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "150",
                    "width": "200",
                    "size": "408474",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "84455",
                    "mp4": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "136606",
                    "webp": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "150",
                    "width": "200",
                    "size": "93397",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "44550",
                    "webp": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "75",
                    "width": "100",
                    "size": "115334",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "27059",
                    "mp4": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "51848",
                    "webp": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "75",
                    "width": "100",
                    "size": "4594",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "150",
                    "width": "200",
                    "size": "16240",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2381090",
                    "mp4": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "280",
                    "width": "374",
                    "size": "61219",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "358",
                    "width": "480",
                    "mp4_size": "728042",
                    "mp4": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "182",
                    "width": "243",
                    "mp4_size": "37610",
                    "mp4": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "61",
                    "width": "81",
                    "size": "48881",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "110",
                    "width": "146",
                    "size": "30520",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "359",
                    "width": "480",
                    "size": "1681390",
                    "url": "https://media0.giphy.com/media/jnQYWZ0T4mkhCmkzcn/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "analytics_response_payload": "e=Z2lmX2lkPWpuUVlXWjBUNG1raENta3pjbiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWpuUVlXWjBUNG1raENta3pjbiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWpuUVlXWjBUNG1raENta3pjbiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWpuUVlXWjBUNG1raENta3pjbiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "21GmfgafQTNPL9oqD5",
            "url": "https://giphy.com/gifs/hulu-shrill-hulu-show-21GmfgafQTNPL9oqD5",
            "slug": "hulu-shrill-hulu-show-21GmfgafQTNPL9oqD5",
            "bitly_gif_url": "https://gph.is/g/4bqJnn3",
            "bitly_url": "https://gph.is/g/4bqJnn3",
            "embed_url": "https://giphy.com/embed/21GmfgafQTNPL9oqD5",
            "username": "hulu",
            "source": "",
            "title": "Lolly Adefope Smile GIF by HULU",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2021-05-03 15:58:53",
            "trending_datetime": "2023-06-08 18:00:10",
            "images": {
                "original": {
                    "height": "480",
                    "width": "480",
                    "size": "5249377",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "393017",
                    "mp4": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "590782",
                    "webp": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "68",
                    "hash": "91a6f3837c735e04acea3e9ea45df47d"
                },
                "downsized": {
                    "height": "351",
                    "width": "351",
                    "size": "1708940",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "480",
                    "size": "3420473",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/giphy-downsized-large.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-large.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "480",
                    "width": "480",
                    "size": "3420473",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/giphy-downsized-medium.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-medium.gif&ct=g"
                },
                "downsized_small": {
                    "height": "326",
                    "width": "326",
                    "mp4_size": "96173",
                    "mp4": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "351",
                    "width": "351",
                    "size": "29928",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "843783",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "90752",
                    "mp4": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "169498",
                    "webp": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "91865",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "54282",
                    "webp": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "293924",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "32984",
                    "mp4": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "66652",
                    "webp": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "5292",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "16124",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "843783",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "90752",
                    "mp4": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "169498",
                    "webp": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "91865",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "54282",
                    "webp": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "293924",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "32984",
                    "mp4": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "66652",
                    "webp": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "5292",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "16124",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2876432",
                    "mp4": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "480",
                    "size": "164040",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "393017",
                    "mp4": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "278",
                    "width": "278",
                    "mp4_size": "39588",
                    "mp4": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "71",
                    "width": "71",
                    "size": "49884",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "160",
                    "width": "160",
                    "size": "37388",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "5249377",
                    "url": "https://media2.giphy.com/media/21GmfgafQTNPL9oqD5/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media2.giphy.com/avatars/hulu/fHTyFuGiOkNq.jpg",
                "banner_image": "",
                "banner_url": "",
                "profile_url": "https://giphy.com/hulu/",
                "username": "hulu",
                "display_name": "HULU",
                "description": "Come TV With Us.",
                "instagram_url": "https://instagram.com/hulu",
                "website_url": "",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPTIxR21mZ2FmUVROUEw5b3FENSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTIxR21mZ2FmUVROUEw5b3FENSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTIxR21mZ2FmUVROUEw5b3FENSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTIxR21mZ2FmUVROUEw5b3FENSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "ZtMkorgeyRu5q",
            "url": "https://giphy.com/gifs/dancing-dance-woo-ZtMkorgeyRu5q",
            "slug": "dancing-dance-woo-ZtMkorgeyRu5q",
            "bitly_gif_url": "http://gph.is/YBu8Py",
            "bitly_url": "http://gph.is/YBu8Py",
            "embed_url": "https://giphy.com/embed/ZtMkorgeyRu5q",
            "username": "",
            "source": "http://forever-sea.tumblr.com/post/37302192011/having-a-dance-party-by-myself-cause-i-cant-go",
            "title": "Dance Party Dancing GIF",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "http://forever-sea.tumblr.com/post/37302192011/having-a-dance-party-by-myself-cause-i-cant-go",
            "is_sticker": 0,
            "import_datetime": "1970-01-01 00:00:00",
            "trending_datetime": "1970-01-01 00:00:00",
            "images": {
                "original": {
                    "height": "345",
                    "width": "253",
                    "size": "438446",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "643394",
                    "mp4": "https://media3.giphy.com/media/ZtMkorgeyRu5q/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "249436",
                    "webp": "https://media3.giphy.com/media/ZtMkorgeyRu5q/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "10",
                    "hash": "06fb7ea19ae1ee0f53f8ecb852b30a6b"
                },
                "downsized": {
                    "height": "345",
                    "width": "253",
                    "size": "438446",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "345",
                    "width": "253",
                    "size": "438446",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "345",
                    "width": "253",
                    "size": "438446",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "308",
                    "width": "225",
                    "mp4_size": "65510",
                    "mp4": "https://media3.giphy.com/media/ZtMkorgeyRu5q/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "345",
                    "width": "253",
                    "size": "438446",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "147",
                    "size": "158644",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "57064",
                    "mp4": "https://media3.giphy.com/media/ZtMkorgeyRu5q/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "85348",
                    "webp": "https://media3.giphy.com/media/ZtMkorgeyRu5q/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "147",
                    "size": "104584",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "57376",
                    "webp": "https://media3.giphy.com/media/ZtMkorgeyRu5q/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "74",
                    "size": "46800",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "15871",
                    "mp4": "https://media3.giphy.com/media/ZtMkorgeyRu5q/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "25142",
                    "webp": "https://media3.giphy.com/media/ZtMkorgeyRu5q/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "74",
                    "size": "5370",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "147",
                    "size": "16425",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "273",
                    "width": "200",
                    "size": "287842",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "104366",
                    "mp4": "https://media3.giphy.com/media/ZtMkorgeyRu5q/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "148456",
                    "webp": "https://media3.giphy.com/media/ZtMkorgeyRu5q/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "273",
                    "width": "200",
                    "size": "212884",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "100522",
                    "webp": "https://media3.giphy.com/media/ZtMkorgeyRu5q/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "137",
                    "width": "100",
                    "size": "86634",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "26850",
                    "mp4": "https://media3.giphy.com/media/ZtMkorgeyRu5q/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "42848",
                    "webp": "https://media3.giphy.com/media/ZtMkorgeyRu5q/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "137",
                    "width": "100",
                    "size": "10112",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "273",
                    "width": "200",
                    "size": "29075",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "4009855",
                    "mp4": "https://media3.giphy.com/media/ZtMkorgeyRu5q/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "345",
                    "width": "253",
                    "size": "41635",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "654",
                    "width": "480",
                    "mp4_size": "643394",
                    "mp4": "https://media3.giphy.com/media/ZtMkorgeyRu5q/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "166",
                    "width": "121",
                    "mp4_size": "21343",
                    "mp4": "https://media3.giphy.com/media/ZtMkorgeyRu5q/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "77",
                    "width": "56",
                    "size": "47041",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "110",
                    "width": "80",
                    "size": "28546",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "655",
                    "width": "480",
                    "size": "438446",
                    "url": "https://media3.giphy.com/media/ZtMkorgeyRu5q/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "analytics_response_payload": "e=Z2lmX2lkPVp0TWtvcmdleVJ1NXEmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVp0TWtvcmdleVJ1NXEmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVp0TWtvcmdleVJ1NXEmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVp0TWtvcmdleVJ1NXEmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "j9FBdwvdQbkGYoGzid",
            "url": "https://giphy.com/gifs/j9FBdwvdQbkGYoGzid",
            "slug": "j9FBdwvdQbkGYoGzid",
            "bitly_gif_url": "https://gph.is/g/amjR1YZ",
            "bitly_url": "https://gph.is/g/amjR1YZ",
            "embed_url": "https://giphy.com/embed/j9FBdwvdQbkGYoGzid",
            "username": "",
            "source": "",
            "title": "Woman Thank You GIF",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2019-03-26 23:39:48",
            "trending_datetime": "2023-06-08 17:45:14",
            "images": {
                "original": {
                    "height": "410",
                    "width": "480",
                    "size": "1279924",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "321996",
                    "mp4": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "354532",
                    "webp": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "25",
                    "hash": "4c3e6f955ed9fa2ebcdd87307c779368"
                },
                "downsized": {
                    "height": "410",
                    "width": "480",
                    "size": "1279924",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "410",
                    "width": "480",
                    "size": "1279924",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "410",
                    "width": "480",
                    "size": "1279924",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "322",
                    "width": "376",
                    "mp4_size": "122356",
                    "mp4": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "410",
                    "width": "480",
                    "size": "1279924",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "234",
                    "size": "316792",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "116496",
                    "mp4": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "152310",
                    "webp": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "234",
                    "size": "87988",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "55352",
                    "webp": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "117",
                    "size": "105777",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "46734",
                    "mp4": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "63234",
                    "webp": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "117",
                    "size": "5635",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "234",
                    "size": "14989",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "171",
                    "width": "200",
                    "size": "278114",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "93703",
                    "mp4": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "125586",
                    "webp": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "171",
                    "width": "200",
                    "size": "74876",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "44594",
                    "webp": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "86",
                    "width": "100",
                    "size": "85640",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "37690",
                    "mp4": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "52726",
                    "webp": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "86",
                    "width": "100",
                    "size": "4653",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "171",
                    "width": "200",
                    "size": "12447",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2687062",
                    "mp4": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "410",
                    "width": "480",
                    "size": "61236",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "410",
                    "width": "480",
                    "mp4_size": "321996",
                    "mp4": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "164",
                    "width": "192",
                    "mp4_size": "41839",
                    "mp4": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "87",
                    "width": "102",
                    "size": "49390",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "164",
                    "width": "192",
                    "size": "46628",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "922",
                    "width": "1080",
                    "mp4_size": "1941262",
                    "mp4": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "410",
                    "width": "480",
                    "size": "1279924",
                    "url": "https://media3.giphy.com/media/j9FBdwvdQbkGYoGzid/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "analytics_response_payload": "e=Z2lmX2lkPWo5RkJkd3ZkUWJrR1lvR3ppZCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWo5RkJkd3ZkUWJrR1lvR3ppZCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWo5RkJkd3ZkUWJrR1lvR3ppZCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWo5RkJkd3ZkUWJrR1lvR3ppZCZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "3o7aDfgPSAJY6Qd8pW",
            "url": "https://giphy.com/gifs/rainbow-bright-brite-3o7aDfgPSAJY6Qd8pW",
            "slug": "rainbow-bright-brite-3o7aDfgPSAJY6Qd8pW",
            "bitly_gif_url": "http://gph.is/2y04Ru4",
            "bitly_url": "http://gph.is/2y04Ru4",
            "embed_url": "https://giphy.com/embed/3o7aDfgPSAJY6Qd8pW",
            "username": "RainbowBrite",
            "source": "https://www.facebook.com/RainbowBrite",
            "title": "Rainbow Brite GIF",
            "rating": "pg",
            "content_url": "",
            "source_tld": "www.facebook.com",
            "source_post_url": "https://www.facebook.com/RainbowBrite",
            "is_sticker": 0,
            "import_datetime": "2017-10-07 14:45:54",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "408",
                    "width": "408",
                    "size": "309046",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "211200",
                    "mp4": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "231608",
                    "webp": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "22",
                    "hash": "dbe83f8d80ef139f3621dfe0b97221bf"
                },
                "downsized": {
                    "height": "408",
                    "width": "408",
                    "size": "309046",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "408",
                    "width": "408",
                    "size": "309046",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "408",
                    "width": "408",
                    "size": "309046",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "408",
                    "width": "408",
                    "mp4_size": "185836",
                    "mp4": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "408",
                    "width": "408",
                    "size": "309046",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "98405",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "67624",
                    "mp4": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "91636",
                    "webp": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "33726",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "29596",
                    "webp": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "36135",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "25171",
                    "mp4": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "37542",
                    "webp": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "4539",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "10428",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "98405",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "67624",
                    "mp4": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "91636",
                    "webp": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "33726",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "29596",
                    "webp": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "36135",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "25171",
                    "mp4": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "37542",
                    "webp": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "4539",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "10428",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "1584109",
                    "mp4": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "408",
                    "width": "408",
                    "size": "36368",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "211200",
                    "mp4": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "210",
                    "width": "210",
                    "mp4_size": "48485",
                    "mp4": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "167",
                    "width": "167",
                    "size": "49174",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "246",
                    "width": "246",
                    "size": "49682",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "309046",
                    "url": "https://media3.giphy.com/media/3o7aDfgPSAJY6Qd8pW/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media2.giphy.com/avatars/RainbowBrite/R9n6nzxEyzJv.gif",
                "banner_image": "",
                "banner_url": "",
                "profile_url": "https://giphy.com/channel/RainbowBrite/",
                "username": "RainbowBrite",
                "display_name": "RainbowBrite",
                "description": "Unofficial website for Hallmark's Rainbow Brite!",
                "instagram_url": "https://instagram.com/RainbowBriteNet",
                "website_url": "http://www.rainbowbrite.net",
                "is_verified": false
            },
            "analytics_response_payload": "e=Z2lmX2lkPTNvN2FEZmdQU0FKWTZRZDhwVyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTNvN2FEZmdQU0FKWTZRZDhwVyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTNvN2FEZmdQU0FKWTZRZDhwVyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTNvN2FEZmdQU0FKWTZRZDhwVyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "8LAxVZBoqyvC0",
            "url": "https://giphy.com/gifs/animation-sunday-dopeness-8LAxVZBoqyvC0",
            "slug": "animation-sunday-dopeness-8LAxVZBoqyvC0",
            "bitly_gif_url": "http://gph.is/29mbAiQ",
            "bitly_url": "http://gph.is/29mbAiQ",
            "embed_url": "https://giphy.com/embed/8LAxVZBoqyvC0",
            "username": "",
            "source": "http://sneakhype.com/dopeness/2016/07/sunday-animation-dopeness-21-gifs-5.html",
            "title": "Best Friends Animation GIF",
            "rating": "pg",
            "content_url": "",
            "source_tld": "sneakhype.com",
            "source_post_url": "http://sneakhype.com/dopeness/2016/07/sunday-animation-dopeness-21-gifs-5.html",
            "is_sticker": 0,
            "import_datetime": "2016-07-07 23:06:31",
            "trending_datetime": "2017-06-03 00:00:01",
            "images": {
                "original": {
                    "height": "261",
                    "width": "400",
                    "size": "1484037",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "948143",
                    "mp4": "https://media1.giphy.com/media/8LAxVZBoqyvC0/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "701816",
                    "webp": "https://media1.giphy.com/media/8LAxVZBoqyvC0/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "29",
                    "hash": "073ae64029b5e82cce8f3b9ab81cf3c6"
                },
                "downsized": {
                    "height": "261",
                    "width": "400",
                    "size": "1484037",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "261",
                    "width": "400",
                    "size": "1484037",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "261",
                    "width": "400",
                    "size": "1484037",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "132",
                    "width": "203",
                    "mp4_size": "82662",
                    "mp4": "https://media1.giphy.com/media/8LAxVZBoqyvC0/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "261",
                    "width": "400",
                    "size": "1484037",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "307",
                    "size": "890543",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "317617",
                    "mp4": "https://media1.giphy.com/media/8LAxVZBoqyvC0/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "393456",
                    "webp": "https://media1.giphy.com/media/8LAxVZBoqyvC0/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "307",
                    "size": "194224",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "107238",
                    "webp": "https://media1.giphy.com/media/8LAxVZBoqyvC0/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "154",
                    "size": "300842",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "95301",
                    "mp4": "https://media1.giphy.com/media/8LAxVZBoqyvC0/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "143810",
                    "webp": "https://media1.giphy.com/media/8LAxVZBoqyvC0/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "154",
                    "size": "11251",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "307",
                    "size": "32890",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "131",
                    "width": "200",
                    "size": "421381",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "147684",
                    "mp4": "https://media1.giphy.com/media/8LAxVZBoqyvC0/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "206138",
                    "webp": "https://media1.giphy.com/media/8LAxVZBoqyvC0/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "131",
                    "width": "200",
                    "size": "94304",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "53568",
                    "webp": "https://media1.giphy.com/media/8LAxVZBoqyvC0/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "66",
                    "width": "100",
                    "size": "132093",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "48015",
                    "mp4": "https://media1.giphy.com/media/8LAxVZBoqyvC0/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "76630",
                    "webp": "https://media1.giphy.com/media/8LAxVZBoqyvC0/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "66",
                    "width": "100",
                    "size": "5317",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "131",
                    "width": "200",
                    "size": "15171",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "2721698",
                    "mp4": "https://media1.giphy.com/media/8LAxVZBoqyvC0/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "261",
                    "width": "400",
                    "size": "51505",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "312",
                    "width": "480",
                    "mp4_size": "948143",
                    "mp4": "https://media1.giphy.com/media/8LAxVZBoqyvC0/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "140",
                    "width": "215",
                    "mp4_size": "46788",
                    "mp4": "https://media1.giphy.com/media/8LAxVZBoqyvC0/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "65",
                    "width": "100",
                    "size": "47732",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "110",
                    "width": "168",
                    "size": "38446",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "313",
                    "width": "480",
                    "size": "1484037",
                    "url": "https://media1.giphy.com/media/8LAxVZBoqyvC0/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "analytics_response_payload": "e=Z2lmX2lkPThMQXhWWkJvcXl2QzAmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPThMQXhWWkJvcXl2QzAmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPThMQXhWWkJvcXl2QzAmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPThMQXhWWkJvcXl2QzAmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "q49YSnLzrvghiyKBAR",
            "url": "https://giphy.com/gifs/mousestopmo-no-nope-greggvalentine-q49YSnLzrvghiyKBAR",
            "slug": "mousestopmo-no-nope-greggvalentine-q49YSnLzrvghiyKBAR",
            "bitly_gif_url": "https://gph.is/g/aKp69xX",
            "bitly_url": "https://gph.is/g/aKp69xX",
            "embed_url": "https://giphy.com/embed/q49YSnLzrvghiyKBAR",
            "username": "mousestopmo",
            "source": "",
            "title": "Stop Motion No GIF by Mouse",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2023-05-10 15:22:53",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "480",
                    "width": "480",
                    "size": "2378623",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "253065",
                    "mp4": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "472186",
                    "webp": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "60",
                    "hash": "a83b30eb1071b53d44a2e78496259ec4"
                },
                "downsized": {
                    "height": "480",
                    "width": "480",
                    "size": "1675061",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "480",
                    "size": "2378623",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "480",
                    "width": "480",
                    "size": "2378623",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "426",
                    "width": "426",
                    "mp4_size": "97240",
                    "mp4": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "480",
                    "width": "480",
                    "size": "45468",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "475975",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "54885",
                    "mp4": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "173682",
                    "webp": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "89427",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "50562",
                    "webp": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "192098",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "17806",
                    "mp4": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "71400",
                    "webp": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "5334",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "13464",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "475975",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "54885",
                    "mp4": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "173682",
                    "webp": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "89427",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "50562",
                    "webp": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "192098",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "17806",
                    "mp4": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "71400",
                    "webp": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "5334",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "13464",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "950042",
                    "mp4": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "480",
                    "size": "70063",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "253065",
                    "mp4": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "384",
                    "width": "384",
                    "mp4_size": "26953",
                    "mp4": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "82",
                    "width": "82",
                    "size": "48573",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "210",
                    "width": "210",
                    "size": "44272",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "1080",
                    "width": "1080",
                    "mp4_size": "2170448",
                    "mp4": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "2378623",
                    "url": "https://media2.giphy.com/media/q49YSnLzrvghiyKBAR/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media0.giphy.com/avatars/mousestopmo/LZjTOtyHrGtZ.gif",
                "banner_image": "https://media0.giphy.com/channel_assets/mousestopmo/8bTnko4KDvZI.gif",
                "banner_url": "https://media0.giphy.com/channel_assets/mousestopmo/8bTnko4KDvZI.gif",
                "profile_url": "https://giphy.com/mousestopmo/",
                "username": "mousestopmo",
                "display_name": "Mouse",
                "description": "",
                "instagram_url": "",
                "website_url": "",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPXE0OVlTbkx6cnZnaGl5S0JBUiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXE0OVlTbkx6cnZnaGl5S0JBUiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXE0OVlTbkx6cnZnaGl5S0JBUiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXE0OVlTbkx6cnZnaGl5S0JBUiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "8DUxtTxFntY7lpJnzy",
            "url": "https://giphy.com/gifs/HBOMax-hbomax-satcthemovie-sex-and-the-city-movie-8DUxtTxFntY7lpJnzy",
            "slug": "HBOMax-hbomax-satcthemovie-sex-and-the-city-movie-8DUxtTxFntY7lpJnzy",
            "bitly_gif_url": "https://gph.is/g/4L8Xgx0",
            "bitly_url": "https://gph.is/g/4L8Xgx0",
            "embed_url": "https://giphy.com/embed/8DUxtTxFntY7lpJnzy",
            "username": "streamonmax",
            "source": "",
            "title": "Samantha Jones Wow GIF by Max",
            "rating": "pg",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2022-03-10 17:20:40",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "480",
                    "width": "480",
                    "size": "4237052",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "564658",
                    "mp4": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "780980",
                    "webp": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "43",
                    "hash": "6ebe1ee3b5156f8dfddba8c736984abc"
                },
                "downsized": {
                    "height": "384",
                    "width": "384",
                    "size": "1846141",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "480",
                    "size": "4237052",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "480",
                    "width": "480",
                    "size": "4237052",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "286",
                    "width": "286",
                    "mp4_size": "59573",
                    "mp4": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "384",
                    "width": "384",
                    "size": "42025",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "615053",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "77231",
                    "mp4": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "177034",
                    "webp": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "111070",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "66428",
                    "webp": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "213889",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "29687",
                    "mp4": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "65290",
                    "webp": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "6108",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "16320",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "615053",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "77231",
                    "mp4": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "177034",
                    "webp": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "111070",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "66428",
                    "webp": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "213889",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "29687",
                    "mp4": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "65290",
                    "webp": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "6108",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "16320",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "5205678",
                    "mp4": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "480",
                    "size": "133744",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "564658",
                    "mp4": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "192",
                    "width": "192",
                    "mp4_size": "30550",
                    "mp4": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "71",
                    "width": "71",
                    "size": "49097",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "110",
                    "width": "110",
                    "size": "28378",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "4237052",
                    "url": "https://media3.giphy.com/media/8DUxtTxFntY7lpJnzy/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media0.giphy.com/avatars/streamonmax/m0aOjjt7E6X5.jpg",
                "banner_image": "https://media0.giphy.com/channel_assets/streamonmax/UVfmcWMe6Pg8.jpg",
                "banner_url": "https://media0.giphy.com/channel_assets/streamonmax/UVfmcWMe6Pg8.jpg",
                "profile_url": "https://giphy.com/streamonmax/",
                "username": "streamonmax",
                "display_name": "Max",
                "description": "",
                "instagram_url": "https://instagram.com/HBOMax",
                "website_url": "https://bit.ly/HBOMaxGiphy",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPThEVXh0VHhGbnRZN2xwSm56eSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPThEVXh0VHhGbnRZN2xwSm56eSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPThEVXh0VHhGbnRZN2xwSm56eSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPThEVXh0VHhGbnRZN2xwSm56eSZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "v65rDtklV9l6g",
            "url": "https://giphy.com/gifs/eyebleach-hugs-v65rDtklV9l6g",
            "slug": "eyebleach-hugs-v65rDtklV9l6g",
            "bitly_gif_url": "http://gph.is/2EYSSh6",
            "bitly_url": "http://gph.is/2EYSSh6",
            "embed_url": "https://giphy.com/embed/v65rDtklV9l6g",
            "username": "",
            "source": "https://www.reddit.com/r/Eyebleach/comments/7o63kz/free_hugs/",
            "title": "Hugs GIF",
            "rating": "g",
            "content_url": "",
            "source_tld": "www.reddit.com",
            "source_post_url": "https://www.reddit.com/r/Eyebleach/comments/7o63kz/free_hugs/",
            "is_sticker": 0,
            "import_datetime": "2018-01-04 22:27:19",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "480",
                    "width": "271",
                    "size": "23910275",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "4279277",
                    "mp4": "https://media4.giphy.com/media/v65rDtklV9l6g/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "5175870",
                    "webp": "https://media4.giphy.com/media/v65rDtklV9l6g/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "450",
                    "hash": "33a2d3513379f50352e9dd980ace9eb3"
                },
                "downsized": {
                    "height": "310",
                    "width": "175",
                    "size": "1869557",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/giphy-downsized.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized.gif&ct=g"
                },
                "downsized_large": {
                    "height": "480",
                    "width": "271",
                    "size": "7081244",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/giphy-downsized-large.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-large.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "384",
                    "width": "216",
                    "size": "3698569",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/giphy-downsized-medium.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-medium.gif&ct=g"
                },
                "downsized_small": {
                    "height": "192",
                    "width": "108",
                    "mp4_size": "134549",
                    "mp4": "https://media4.giphy.com/media/v65rDtklV9l6g/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "310",
                    "width": "175",
                    "size": "39395",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/giphy-downsized_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "113",
                    "size": "4052154",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "300678",
                    "mp4": "https://media4.giphy.com/media/v65rDtklV9l6g/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "1460912",
                    "webp": "https://media4.giphy.com/media/v65rDtklV9l6g/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "113",
                    "size": "92425",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "19264",
                    "webp": "https://media4.giphy.com/media/v65rDtklV9l6g/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "57",
                    "size": "1131455",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "108586",
                    "mp4": "https://media4.giphy.com/media/v65rDtklV9l6g/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "581526",
                    "webp": "https://media4.giphy.com/media/v65rDtklV9l6g/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "57",
                    "size": "5669",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "113",
                    "size": "15802",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "354",
                    "width": "200",
                    "size": "12797525",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "784379",
                    "mp4": "https://media4.giphy.com/media/v65rDtklV9l6g/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "3047972",
                    "webp": "https://media4.giphy.com/media/v65rDtklV9l6g/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "354",
                    "width": "200",
                    "size": "269033",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "40352",
                    "webp": "https://media4.giphy.com/media/v65rDtklV9l6g/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "177",
                    "width": "100",
                    "size": "3492550",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "43484",
                    "mp4": "https://media4.giphy.com/media/v65rDtklV9l6g/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "1263612",
                    "webp": "https://media4.giphy.com/media/v65rDtklV9l6g/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "177",
                    "width": "100",
                    "size": "13423",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "354",
                    "width": "200",
                    "size": "45077",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "1340400",
                    "mp4": "https://media4.giphy.com/media/v65rDtklV9l6g/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "480",
                    "width": "271",
                    "size": "86294",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "850",
                    "width": "480",
                    "mp4_size": "4279277",
                    "mp4": "https://media4.giphy.com/media/v65rDtklV9l6g/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "384",
                    "width": "216",
                    "mp4_size": "20545",
                    "mp4": "https://media4.giphy.com/media/v65rDtklV9l6g/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "134",
                    "width": "76",
                    "size": "48498",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "252",
                    "width": "142",
                    "size": "47580",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "1290",
                    "width": "728",
                    "mp4_size": "18317716",
                    "mp4": "https://media4.giphy.com/media/v65rDtklV9l6g/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "850",
                    "width": "480",
                    "size": "23910275",
                    "url": "https://media4.giphy.com/media/v65rDtklV9l6g/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "analytics_response_payload": "e=Z2lmX2lkPXY2NXJEdGtsVjlsNmcmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXY2NXJEdGtsVjlsNmcmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXY2NXJEdGtsVjlsNmcmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPXY2NXJEdGtsVjlsNmcmZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPWY0OTg0ZmRkbW9oOXg0dGRpOGw0NmI4ZXVhY3R3bG1ucmFlMDV3ZmpzaXpudm4xaiZjdD1n&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "3KJNacH7f7p8woNrff",
            "url": "https://giphy.com/gifs/travisband-birthday-travis-fran-healy-3KJNacH7f7p8woNrff",
            "slug": "travisband-birthday-travis-fran-healy-3KJNacH7f7p8woNrff",
            "bitly_gif_url": "https://gph.is/g/ZdyAOOP",
            "bitly_url": "https://gph.is/g/ZdyAOOP",
            "embed_url": "https://giphy.com/embed/3KJNacH7f7p8woNrff",
            "username": "travisband",
            "source": "",
            "title": "Mi Cumple Happy Birthday GIF by Travis",
            "rating": "g",
            "content_url": "",
            "source_tld": "",
            "source_post_url": "",
            "is_sticker": 0,
            "import_datetime": "2021-08-29 05:30:07",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "360",
                    "width": "480",
                    "size": "1441450",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "220142",
                    "mp4": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "296780",
                    "webp": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "23",
                    "hash": "4fefc7adbe85e54cc65c05520451ef8d"
                },
                "downsized": {
                    "height": "360",
                    "width": "480",
                    "size": "1441450",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "360",
                    "width": "480",
                    "size": "1441450",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "360",
                    "width": "480",
                    "size": "1441450",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "324",
                    "width": "432",
                    "mp4_size": "106334",
                    "mp4": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "360",
                    "width": "480",
                    "size": "1441450",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "267",
                    "size": "402608",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "96276",
                    "mp4": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "170790",
                    "webp": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "267",
                    "size": "124433",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "77650",
                    "webp": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "134",
                    "size": "137890",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "41743",
                    "mp4": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "73936",
                    "webp": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "134",
                    "size": "7203",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "267",
                    "size": "18451",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "150",
                    "width": "200",
                    "size": "258231",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "67626",
                    "mp4": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "119936",
                    "webp": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "150",
                    "width": "200",
                    "size": "74646",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "50484",
                    "webp": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "75",
                    "width": "100",
                    "size": "89140",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "27504",
                    "mp4": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "50612",
                    "webp": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "75",
                    "width": "100",
                    "size": "4659",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "150",
                    "width": "200",
                    "size": "12183",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "1981769",
                    "mp4": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "360",
                    "width": "480",
                    "size": "62555",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "360",
                    "width": "480",
                    "mp4_size": "220142",
                    "mp4": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "170",
                    "width": "226",
                    "mp4_size": "42246",
                    "mp4": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "62",
                    "width": "83",
                    "size": "49269",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "136",
                    "width": "182",
                    "size": "48504",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "hd": {
                    "height": "720",
                    "width": "960",
                    "mp4_size": "636735",
                    "mp4": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/giphy-hd.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-hd.mp4&ct=g"
                },
                "480w_still": {
                    "height": "360",
                    "width": "480",
                    "size": "1441450",
                    "url": "https://media1.giphy.com/media/3KJNacH7f7p8woNrff/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media3.giphy.com/avatars/travisband/qsElQT6unyi3.jpg",
                "banner_image": "https://media3.giphy.com/channel_assets/travisband/ikO1zXZH7qkB.jpg",
                "banner_url": "https://media3.giphy.com/channel_assets/travisband/ikO1zXZH7qkB.jpg",
                "profile_url": "https://giphy.com/travisband/",
                "username": "travisband",
                "display_name": "Travis",
                "description": "Crafting Songs From Wicker Since 1997.  The Invisible Band Live OUT NOW!",
                "instagram_url": "https://instagram.com/travistheband",
                "website_url": "http://www.travisonline.com/",
                "is_verified": true
            },
            "analytics_response_payload": "e=Z2lmX2lkPTNLSk5hY0g3ZjdwOHdvTnJmZiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTNLSk5hY0g3ZjdwOHdvTnJmZiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTNLSk5hY0g3ZjdwOHdvTnJmZiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPTNLSk5hY0g3ZjdwOHdvTnJmZiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        },
        {
            "type": "gif",
            "id": "e8BnjZbxhhMHEFdrAF",
            "url": "https://giphy.com/gifs/e8BnjZbxhhMHEFdrAF",
            "slug": "e8BnjZbxhhMHEFdrAF",
            "bitly_gif_url": "https://gph.is/g/4V86vlo",
            "bitly_url": "https://gph.is/g/4V86vlo",
            "embed_url": "https://giphy.com/embed/e8BnjZbxhhMHEFdrAF",
            "username": "dotdave",
            "source": "https://www.3danimatedgifs.com/",
            "title": "I Love You Butterfly GIF",
            "rating": "g",
            "content_url": "",
            "source_tld": "www.3danimatedgifs.com",
            "source_post_url": "https://www.3danimatedgifs.com/",
            "is_sticker": 0,
            "import_datetime": "2021-03-16 12:28:35",
            "trending_datetime": "0000-00-00 00:00:00",
            "images": {
                "original": {
                    "height": "400",
                    "width": "400",
                    "size": "584933",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    "mp4_size": "257606",
                    "mp4": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
                    "webp_size": "400312",
                    "webp": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/giphy.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
                    "frames": "20",
                    "hash": "ae14278e69955a93ff29b050a190fd7b"
                },
                "downsized": {
                    "height": "400",
                    "width": "400",
                    "size": "584933",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_large": {
                    "height": "400",
                    "width": "400",
                    "size": "584933",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_medium": {
                    "height": "400",
                    "width": "400",
                    "size": "584933",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/giphy.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                },
                "downsized_small": {
                    "height": "360",
                    "width": "360",
                    "mp4_size": "81749",
                    "mp4": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/giphy-downsized-small.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g"
                },
                "downsized_still": {
                    "height": "400",
                    "width": "400",
                    "size": "584933",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "fixed_height": {
                    "height": "200",
                    "width": "200",
                    "size": "191246",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/200.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.gif&ct=g",
                    "mp4_size": "58782",
                    "mp4": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/200.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.mp4&ct=g",
                    "webp_size": "136554",
                    "webp": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/200.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200.webp&ct=g"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "82747",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/200_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
                    "webp_size": "72922",
                    "webp": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/200_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_d.webp&ct=g"
                },
                "fixed_height_small": {
                    "height": "100",
                    "width": "100",
                    "size": "71081",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/100.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.gif&ct=g",
                    "mp4_size": "22224",
                    "mp4": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/100.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.mp4&ct=g",
                    "webp_size": "42328",
                    "webp": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/100.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100.webp&ct=g"
                },
                "fixed_height_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "7324",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/100_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100_s.gif&ct=g"
                },
                "fixed_height_still": {
                    "height": "200",
                    "width": "200",
                    "size": "20610",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/200_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200_s.gif&ct=g"
                },
                "fixed_width": {
                    "height": "200",
                    "width": "200",
                    "size": "191246",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/200w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.gif&ct=g",
                    "mp4_size": "58782",
                    "mp4": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/200w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
                    "webp_size": "136554",
                    "webp": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/200w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w.webp&ct=g"
                },
                "fixed_width_downsampled": {
                    "height": "200",
                    "width": "200",
                    "size": "82747",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/200w_d.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
                    "webp_size": "72922",
                    "webp": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/200w_d.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_d.webp&ct=g"
                },
                "fixed_width_small": {
                    "height": "100",
                    "width": "100",
                    "size": "71081",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/100w.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.gif&ct=g",
                    "mp4_size": "22224",
                    "mp4": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/100w.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
                    "webp_size": "42328",
                    "webp": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/100w.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w.webp&ct=g"
                },
                "fixed_width_small_still": {
                    "height": "100",
                    "width": "100",
                    "size": "7324",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/100w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=100w_s.gif&ct=g"
                },
                "fixed_width_still": {
                    "height": "200",
                    "width": "200",
                    "size": "20610",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/200w_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=200w_s.gif&ct=g"
                },
                "looping": {
                    "mp4_size": "3042777",
                    "mp4": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/giphy-loop.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
                },
                "original_still": {
                    "height": "400",
                    "width": "400",
                    "size": "93652",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/giphy_s.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g"
                },
                "original_mp4": {
                    "height": "480",
                    "width": "480",
                    "mp4_size": "257606",
                    "mp4": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/giphy.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy.mp4&ct=g"
                },
                "preview": {
                    "height": "188",
                    "width": "188",
                    "mp4_size": "30324",
                    "mp4": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/giphy-preview.mp4?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g"
                },
                "preview_gif": {
                    "height": "101",
                    "width": "101",
                    "size": "49589",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/giphy-preview.gif?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g"
                },
                "preview_webp": {
                    "height": "120",
                    "width": "120",
                    "size": "39498",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/giphy-preview.webp?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g"
                },
                "480w_still": {
                    "height": "480",
                    "width": "480",
                    "size": "584933",
                    "url": "https://media1.giphy.com/media/e8BnjZbxhhMHEFdrAF/480w_s.jpg?cid=f4984fddmoh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g"
                }
            },
            "user": {
                "avatar_url": "https://media0.giphy.com/avatars/dotdave/ZTHTD8HeUvnt.gif",
                "banner_image": "",
                "banner_url": "",
                "profile_url": "https://giphy.com/channel/dotdave/",
                "username": "dotdave",
                "display_name": "3D Gif Artist",
                "description": "Vintage style original 3D GIFs",
                "instagram_url": "https://instagram.com/3dgifartist",
                "website_url": "https://www.3danimatedgifs.com/",
                "is_verified": false
            },
            "analytics_response_payload": "e=Z2lmX2lkPWU4Qm5qWmJ4aGhNSEVGZHJBRiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc",
            "analytics": {
                "onload": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWU4Qm5qWmJ4aGhNSEVGZHJBRiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SEEN"
                },
                "onclick": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWU4Qm5qWmJ4aGhNSEVGZHJBRiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=CLICK"
                },
                "onsent": {
                    "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPWU4Qm5qWmJ4aGhNSEVGZHJBRiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZjQ5ODRmZGRtb2g5eDR0ZGk4bDQ2YjhldWFjdHdsbW5yYWUwNXdmanNpem52bjFqJmN0PWc&action_type=SENT"
                }
            }
        }
    ],
    "pagination": {
        "total_count": 3623,
        "count": 50,
        "offset": 0
    },
    "meta": {
        "status": 200,
        "msg": "OK",
        "response_id": "moh9x4tdi8l46b8euactwlmnrae05wfjsiznvn1j"
    }
}
