export default function({ data = {}, method, url }) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-type', 'application/json');

    const requestPromise = new Promise((resolve) => {
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
                return;
            } else if (xhr.status === 200) {
                try {
                    resolve(JSON.parse(xhr.responseText));
                } catch(e) {
                    resolve(xhr.responseText);
                }
            } else {
                console.log(`Request Failed: ${xhr.responseText}`);
            }
        };
    });

    xhr.send(JSON.stringify(data));

    return requestPromise;
}
