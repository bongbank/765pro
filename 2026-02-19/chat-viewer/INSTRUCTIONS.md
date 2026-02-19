# Chat Viewer - Instructions

## Overview
A simple, cost-effective HTML/JavaScript web page for displaying chat conversations.

## Files
- `index.html` - Main HTML structure
- `styles.css` - Clean, responsive styling
- `app.js` - JavaScript for loading and displaying conversations
- `conversations.json` - Sample conversation data

## How to Use
1. Open `index.html` in any modern web browser
2. Select a conversation from the dropdown menu
3. View the chat messages in the main area

## Customizing Conversations
Edit `conversations.json` to add your own conversations:
```json
{
  "conversations": [
    {
      "name": "Your Conversation Name",
      "messages": [
        {
          "type": "sent" or "received",
          "sender": "Sender Name",
          "text": "Message text",
          "timestamp": "ISO 8601 format"
        }
      ]
    }
  ]
}
```

## Features
- Simple and lightweight (no frameworks)
- Responsive design
- Clean UI with message bubbles
- Easy to customize and extend

## Cost-Effective
- No backend required
- Static files only
- Works with any basic web hosting
- Free to use and modify
