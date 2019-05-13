/**
 * syncImageUpload - takes request data, image and returns status. Must have - Redux
 */

export default {
    to: promise => promise.then(data => [null, data]).catch(err => [err.message]),
    syncImageUpload: (method, url, image, options = {})=> {

        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };

            // If this image should update Redux State to display upload percentage
            if(options.redux && options.updateUploadStatus){
                xhr.upload.addEventListener("progress", e => {
                    console.log(e)
                    options.updateUploadStatus(parseInt(e.loaded / e.total * 100))
                })
                xhr.onerror = function () {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                };
            }


            let formData = new FormData()
            formData.append('file', image)

            xhr.send(formData);
        });
    },
    post: (url = ``, data = {})  => {
        // Default options are marked with *
        return fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
            .then(response => response.json()); // parses response to JSON
    },
    // async function
    fetchAsync: async (path) => {
        // await response of fetch call
        let response = await fetch(path);
        // only proceed once promise is resolved
        let data = await response.json();
        // only proceed once second promise is resolved
        return data;
    }
};
