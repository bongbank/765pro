// Chat Viewer App - JavaScript

let conversations = [];

// Load conversations from JSON file
async function loadConversations() {
    try {
        const response = await fetch('conversations.json');
        const data = await response.json();
        conversations = data.conversations || [];
        populateConversationList();
    } catch (error) {
        console.error('Error loading conversations:', error);
        showEmptyState('Error loading conversations. Please check the JSON file.');
    }
}

// Populate the conversation dropdown
function populateConversationList() {
    const select = document.getElementById('conversationSelect');
    select.innerHTML = '<option value="">Select a conversation...</option>';
    
    conversations.forEach((conv, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = conv.name || `Conversation ${index + 1}`;
        select.appendChild(option);
    });
}

// Display messages for selected conversation
function displayConversation(index) {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    
    if (index === '' || index === null) {
        showEmptyState('Select a conversation to view messages.');
        return;
    }
    
    const conversation = conversations[index];
    if (!conversation || !conversation.messages) {
        showEmptyState('No messages in this conversation.');
        return;
    }
    
    conversation.messages.forEach(msg => {
        const messageEl = createMessageElement(msg);
        chatMessages.appendChild(messageEl);
    });
    
    // Scroll to bottom
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Create message DOM element
function createMessageElement(msg) {
    const div = document.createElement('div');
    div.className = `message ${msg.type === 'sent' ? 'sent' : 'received'}`;
    
    const sender = msg.sender ? `<div class="sender">${msg.sender}</div>` : '';
    const text = `<div class="text">${msg.text}</div>`;
    const timestamp = msg.timestamp ? `<div class="timestamp">${formatTimestamp(msg.timestamp)}</div>` : '';
    
    div.innerHTML = sender + text + timestamp;
    return div;
}

// Format timestamp
function formatTimestamp(ts) {
    const date = new Date(ts);
    return date.toLocaleString();
}

// Show empty state
function showEmptyState(message) {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = `<div class="empty-state">${message}</div>`;
}

// Event listeners
document.getElementById('conversationSelect').addEventListener('change', (e) => {
    displayConversation(e.target.value);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadConversations();
    alert('Chat viewer updated!');
});
