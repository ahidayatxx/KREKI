# Chatbot UI - Setup & Usage Instructions

## 🚀 **Quick Start**

### **1. Open the Chatbot**
Simply double-click `chatbot-ui.html` to open it in your default browser, or:
- Right-click → "Open with" → Choose your preferred browser
- Drag and drop the file into any browser window

### **2. Configure the Webhook URL**
When the page loads, you'll see a configuration panel:
1. Enter your n8n webhook URL (e.g., `https://your-n8n-instance.com/webhook/chat`)
2. Optionally customize your User ID
3. Click **"Save"** to store the configuration
4. Click **"Hide"** to minimize the config panel

### **3. Start Chatting!**
- Type your message in Indonesian
- Press **Enter** or click the send button
- Wait for the AI response with typing indicator
- Continue the conversation with full memory

---

## 🎨 **Features Overview**

### **✨ Modern UI Design**
- Clean, gradient-based design
- Smooth animations and transitions
- Mobile-responsive layout
- Professional chat interface

### **🔧 Smart Functionality**
- **Real-time Status**: Connection indicator (green = ready, red = error)
- **Typing Indicators**: Animated dots while AI is thinking
- **Auto-scroll**: Messages automatically scroll to bottom
- **Session Memory**: Maintains conversation context
- **Error Handling**: Clear error messages with retry options

### **📱 Mobile Support**
- Fully responsive design
- Touch-friendly interface
- Optimized for phones and tablets

---

## 🛠️ **Configuration Options**

### **Required Configuration**
| Setting | Description | Example |
|---------|-------------|---------|
| **Webhook URL** | Your n8n workflow webhook endpoint | `https://n8n.yoursite.com/webhook/chat` |

### **Optional Configuration**
| Setting | Description | Default |
|---------|-------------|---------|
| **User ID** | Unique identifier for your session | `user_abc123def` |

### **Automatic Settings**
- **Session ID**: Auto-generated for conversation continuity
- **Message History**: Automatically maintained
- **Local Storage**: Configuration saved in browser

---

## 🔍 **How to Get Your n8n Webhook URL**

1. **In n8n Workflow Editor:**
   - Open your "Chat with Memory - Optimized" workflow
   - Click on the **"Webhook Trigger"** node
   - Copy the **"Production URL"** (something like: `https://your-n8n.com/webhook/chat`)

2. **Test Your Webhook:**
   - Make sure your n8n workflow is **Active** (toggle switch should be ON)
   - You can test it in n8n first with the "Test Webhook" button

---

## 💬 **Usage Examples**

### **First Conversation**
```
You: Halo, siapa kamu?
AI: Halo! Saya adalah asisten AI yang membantu dan ramah bernama Claude...
```

### **Follow-up Questions** 
```
You: Bisa jelaskan tentang artificial intelligence?
AI: Artificial Intelligence (AI) adalah teknologi yang memungkinkan mesin...

You: Berikan contoh penggunaannya
AI: Berdasarkan penjelasan AI sebelumnya, berikut beberapa contoh penggunaan...
```

---

## 🚨 **Troubleshooting**

### **Common Issues**

#### **❌ "Configure webhook URL" Error**
- **Solution**: Open config panel and enter your n8n webhook URL
- **Check**: Make sure the URL starts with `https://` or `http://`

#### **❌ "Failed to send message" Error**
- **Check**: Your n8n workflow is activated
- **Check**: Webhook URL is correct and accessible
- **Check**: Your internet connection is working
- **Try**: Refresh the page and reconfigure

#### **❌ Messages not appearing**
- **Check**: Browser console for JavaScript errors (F12)
- **Try**: Clear browser cache and reload
- **Try**: Test in a different browser

#### **❌ "CORS" or "Network" Errors**
- **Check**: n8n webhook CORS settings are properly configured
- **Check**: n8n instance is publicly accessible
- **Try**: Test webhook URL directly in browser

### **Testing Your Setup**

#### **1. Test n8n Webhook Directly**
```bash
curl -X POST https://your-n8n.com/webhook/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "test", "user_id": "test_user"}'
```

#### **2. Check Browser Console**
- Press **F12** to open developer tools
- Look for any red error messages
- Check **Network** tab for failed requests

---

## 🎯 **Best Practices**

### **For Better Performance**
- Keep messages under 2000 characters
- Use consistent session by not refreshing too often
- Close other heavy browser tabs while chatting

### **For Better AI Responses**
- Ask questions in clear Indonesian
- Provide context for complex topics
- Use follow-up questions to dive deeper

### **For Privacy**
- Your conversations are stored temporarily in n8n memory
- Clear browser data to remove locally saved config
- Don't share sensitive information

---

## 🔧 **Advanced Customization**

### **Changing Colors/Themes**
The CSS is embedded in the HTML file. You can modify:
- **Background gradient**: Line 13-14 (body background)
- **Chat colors**: Lines 95-100 (message styling)
- **Button colors**: Lines 196-200 (send button)

### **Modifying Behavior**
JavaScript functions you can customize:
- `addMessage()` - Message display format
- `sendToWebhook()` - API communication
- `formatTime()` - Timestamp format

---

## 📊 **Technical Specifications**

### **Browser Compatibility**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### **File Size & Performance**
- **File Size**: ~15KB (single HTML file)
- **Load Time**: <1 second
- **Memory Usage**: <10MB
- **No Dependencies**: Runs completely offline (except API calls)

### **Data Storage**
- **Local Storage**: Configuration only
- **Session Storage**: Not used
- **Cookies**: Not used
- **Server Storage**: Messages handled by n8n workflow

---

## 🆘 **Support & Help**

### **Quick Checklist**
1. ✅ n8n workflow is active and working
2. ✅ Webhook URL is correctly configured
3. ✅ Browser allows JavaScript execution
4. ✅ Internet connection is stable

### **Still Having Issues?**
1. **Check n8n logs** for webhook execution errors
2. **Test webhook** directly with curl/Postman
3. **Try different browser** to isolate issues
4. **Check firewall/proxy** settings

---

**Ready to Chat!** 🎉  
Open `chatbot-ui.html` in your browser and start your conversation with Claude!