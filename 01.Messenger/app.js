function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const messages = document.getElementById('messages');
 
    document.getElementById('submit').addEventListener('click', () => postMessages(url));
    document.getElementById('refresh').addEventListener('click', () => loadAllMessages(url, messages));
}
 
async function postMessages(url) {
    const [author, content] = [document.getElementById('author'), document.getElementById('content')];
    
    if (author.value !== '' && content.value !== '') { 
        await request(url, { author: author.value, content: content.value });
    }
    
    author.value = '';
    content.value = '';
}
 
async function loadAllMessages(url, messages) {
    const res = await fetch(url);
    const data = await res.json();
 
    messages.value = Object.values(data)
        .map(({ author, content }) => `${author}: ${content}`)
        .join('\n');
}
 
async function request(url, option) {
    if (option) {
        option = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(option)
        };
    }
    const response = await fetch(url, option);
    return response.json();
}
 
attachEvents();
