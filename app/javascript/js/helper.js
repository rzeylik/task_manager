export const csrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]').content;
}

export const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': csrfToken()
}

export const post = (url, data, headers = defaultHeaders, method = 'POST') => {
    return fetch(url, {
        headers: headers,
        method: method,
        body: JSON.stringify(data)
    })
}
