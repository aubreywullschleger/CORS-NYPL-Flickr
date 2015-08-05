function loadPhotos() {
    var method = 'GET';
    var url = 'https://api.flickr.com/services/rest/?' +
        'method=flickr.people.getPublicPhotos&' +
        'user_id=32951986%40N05&' +
        'extras=url_q&format=json&nojsoncallback=1&' +
        'api_key=' + api_key;
    var xhr = new XMLHttpRequest();
    console.log(xhr);

    if (!('withCredentials' in xhr)) {
        alert('Browser does not support CORS.');
        return;
    }

    xhr.open(method, url);

    xhr.onerror = function() {
        alert('There was an error.');
    };

    xhr.onload = function () {
        var data = JSON.parse(xhr.responseText);
        console.log(data);
        if (data.stat === 'ok') {
            var photosDiv = document.getElementById('photos');
            photosDiv.innerHTML = '';
            var photos = data.photos.photo;
            for (var i = 0; i < photos.length; i++) {
                var img = document.createElement('img');
                img.src = photos[i].url_q;
                photosDiv.appendChild(img);
            }
        } else {
            alert(data.message);
        }
    };

    xhr.send();
}