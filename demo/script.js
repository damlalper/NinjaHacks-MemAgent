import { init, chat } from '../src/memagent.js';

// Initialize MemAgent SDK to connect to the backend
init();

const chatDiv = document.getElementById('chat');
const messageInput = document.getElementById('message');

async function sendMessage() {
    const userMessage = messageInput.value.trim();
    if (!userMessage) return;

    // Display user message
    addMessage('user', userMessage);
    messageInput.value = '';

    try {
        // Get AI response from the backend (which handles memory retrieval and saving)
        const result = await chat(userMessage);
        const aiResponse = result.response;

        // Display AI response
        addMessage('ai', aiResponse);

    } catch (error) {
        addMessage('ai', 'Error: ' + error.message);
    }
}

function addMessage(sender, text) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.textContent = `${sender.toUpperCase()}: ${text}`;
    chatDiv.appendChild(div);
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

// Allow sending message with Enter key
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
