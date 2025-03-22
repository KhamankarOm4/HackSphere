import React, { useState, useRef, useEffect } from 'react';

const ChatBot = ({ medicines }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I can help you find information about medicines. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleBotResponse = (userMessage) => {
    const userMessageLower = userMessage.toLowerCase();
    
    // Greetings
    if (userMessageLower.match(/^(hi|hello|hey|hii|howdy|greetings)/)) {
      return "Hello! 👋 How can I assist you today? Type 'help' to see what I can do!";
    }

    // Goodbye messages
    if (userMessageLower.match(/^(bye|goodbye|see you|cya|good night)/)) {
      return "Goodbye! Take care and stay healthy! 👋";
    }

    // Thank you messages
    if (userMessageLower.match(/(thank you|thanks|thx|ty)/)) {
      return "You're welcome! 😊 Is there anything else I can help you with?";
    }

    // General questions about the system
    if (userMessageLower.includes('what can you do') || userMessageLower.includes('who are you')) {
      return `I'm your Medicine Inventory Assistant! I can help you:
      - Find information about medicines
      - Check stock levels
      - Monitor expiry dates
      - Find prices
      - Search by categories
      Type 'help' for specific commands!`;
    }

    // Help command with more detailed information
    if (userMessageLower.includes('help')) {
      return `I can help you with the following commands:
      
      Medicine Information:
      - "Show me [medicine name]"
      - "What is [medicine name]"
      - "Tell me about [medicine name]"
      
      Price Queries:
      - "How much is [medicine name]"
      - "Price of [medicine name]"
      - "Cost of [medicine name]"
      
      Stock Queries:
      - "What's low in stock?"
      - "Show low stock items"
      - "Stock status"
      
      Category Search:
      - "Show [category] medicines"
      - "What [category] medicines do we have?"
      - "List all [category]"
      
      Expiry Information:
      - "Show expired medicines"
      - "What's expiring soon?"
      - "Check expiry dates"
      
      You can also just say hi! 👋`;
    }

    // Stock status overview
    if (userMessageLower.includes('stock status') || userMessageLower.includes('inventory status')) {
      const lowStock = medicines.filter(med => med.quantity < 100);
      const outOfStock = medicines.filter(med => med.quantity === 0);
      const goodStock = medicines.filter(med => med.quantity >= 100);
      
      return `Inventory Status:
      - Good Stock: ${goodStock.length} items
      - Low Stock: ${lowStock.length} items
      - Out of Stock: ${outOfStock.length} items`;
    }

    // Expiring soon query
    if (userMessageLower.includes('expiring soon')) {
      const today = new Date();
      const threeMonthsFromNow = new Date();
      threeMonthsFromNow.setMonth(today.getMonth() + 3);
      
      const expiringMeds = medicines.filter(med => {
        const expiryDate = new Date(med.expiryDate);
        return expiryDate > today && expiryDate <= threeMonthsFromNow;
      });
      
      return `Medicines expiring in the next 3 months:
      ${expiringMeds.map(med => `${med.name} (Expires: ${med.expiryDate})`).join('\n')}`;
    }

    // Category overview
    if (userMessageLower.includes('list categories') || userMessageLower.includes('show categories')) {
      const categories = [...new Set(medicines.map(med => med.category))];
      return `Available Categories:\n${categories.join('\n')}`;
    }

    // Add category search
    if (userMessageLower.includes('category') || userMessageLower.includes('show me')) {
      const categories = [...new Set(medicines.map(med => med.category.toLowerCase()))];
      const foundCategory = categories.find(cat => userMessageLower.includes(cat));
      
      if (foundCategory) {
        const categoryMeds = medicines.filter(med => 
          med.category.toLowerCase() === foundCategory
        );
        return `${foundCategory.toUpperCase()} medicines:\n${categoryMeds.map(med => 
          `- ${med.name} (${med.quantity} in stock, $${med.price})`
        ).join('\n')}`;
      }
    }

    // Price queries
    if (userMessageLower.includes('price') || userMessageLower.includes('cost') || userMessageLower.includes('how much')) {
      const foundMedicine = medicines.find(med => 
        userMessageLower.includes(med.name.toLowerCase())
      );
      
      if (foundMedicine) {
        return `${foundMedicine.name} costs $${foundMedicine.price}. Currently ${foundMedicine.quantity} units in stock.`;
      }
    }

    // Existing medicine search with enhanced response
    const foundMedicine = medicines.find(med => 
      med.name.toLowerCase().includes(userMessageLower)
    );

    if (foundMedicine) {
      const expiryDate = new Date(foundMedicine.expiryDate);
      const today = new Date();
      const daysToExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
      
      let expiryStatus = "";
      if (daysToExpiry < 0) {
        expiryStatus = "⚠️ EXPIRED";
      } else if (daysToExpiry < 90) {
        expiryStatus = "⚠️ Expiring Soon";
      } else {
        expiryStatus = "✅ Good";
      }

      return `${foundMedicine.name}:
      
      Stock Information:
      - Quantity: ${foundMedicine.quantity} ${foundMedicine.quantity < 100 ? "⚠️ Low Stock" : "✅"}
      - Price: $${foundMedicine.price}
      
      Product Details:
      - Category: ${foundMedicine.category}
      - Manufacturer: ${foundMedicine.manufacturer}
      
      Expiry Status:
      - Date: ${foundMedicine.expiryDate}
      - Status: ${expiryStatus}`;
    }

    // Existing low stock check with enhanced response
    if (userMessageLower.includes('low stock')) {
      const lowStockMeds = medicines.filter(med => med.quantity < 100);
      if (lowStockMeds.length === 0) {
        return "Good news! No medicines are currently low in stock. 👍";
      }
      return `Low Stock Alert ⚠️\n${lowStockMeds.map(med => 
        `- ${med.name}: ${med.quantity} units remaining (Reorder recommended)`
      ).join('\n')}`;
    }

    // Existing expiry check with enhanced response
    if (userMessageLower.includes('expired')) {
      const expiredMeds = medicines.filter(med => new Date(med.expiryDate) < new Date());
      if (expiredMeds.length === 0) {
        return "Good news! No medicines are currently expired. 👍";
      }
      return `Expired Medicines ⚠️\n${expiredMeds.map(med => 
        `- ${med.name} (Expired on: ${med.expiryDate})`
      ).join('\n')}`;
    }

    // Default response for unknown queries
    return "I'm not sure about that. Type 'help' to see what I can do! 😊";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: input }]);

    // Add bot response
    setTimeout(() => {
      const botResponse = handleBotResponse(input);
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 500);

    setInput('');
  };

  return (
    <div className="chatbot-container">
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '💊 Need Help?'}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Medicine Assistant</h3>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.type}`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about medicines..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 