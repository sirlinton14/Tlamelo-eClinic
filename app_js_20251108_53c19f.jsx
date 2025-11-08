const { useState } = React;

// Chat Component
function Chat({ onClose }) {
    const [messages, setMessages] = useState([{ text: "Hello! I'm your AI health assistant. What symptoms are you experiencing today? (Headache, Chest pain, Fever, Abdominal pain)", sender: "bot" }]);
    const [input, setInput] = useState("");
    const [symptomFlow, setSymptomFlow] = useState(null);

    const handleSend = () => {
        if (!input.trim()) return;
        
        const userMessage = { text: input, sender: "user" };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        
        // AI Response logic
        setTimeout(() => {
            let response = "";
            const lowerInput = input.toLowerCase();
            
            if (!symptomFlow) {
                if (lowerInput.includes("headache")) {
                    setSymptomFlow("headache");
                    response = "I understand you have a headache. How long have you had this headache? (hours/days)";
                } else if (lowerInput.includes("chest") || lowerInput.includes("heart")) {
                    setSymptomFlow("chest");
                    response = "Chest pain can be serious. Is the pain spreading to your arms, neck, or jaw?";
                } else if (lowerInput.includes("fever")) {
                    setSymptomFlow("fever");
                    response = "You have a fever. What is your temperature if you've measured it?";
                } else if (lowerInput.includes("abdominal") || lowerInput.includes("stomach")) {
                    setSymptomFlow("abdominal");
                    response = "Abdominal pain can have many causes. Where exactly is the pain located?";
                } else {
                    response = "Please describe your main symptom: Headache, Chest pain, Fever, or Abdominal pain.";
                }
            } else {
                // Continue symptom flow
                response = "Thank you for that information. Based on your symptoms, I recommend: Rest, hydration, and monitoring. If symptoms worsen, visit a healthcare facility.";
            }
            
            setMessages([...newMessages, { text: response, sender: "bot" }]);
        }, 1000);
    };

    return React.createElement('div', { className: 'chat-container' },
        React.createElement('div', { className: 'chat-header' },
            React.createElement('h3', null, 'AI Health Assistant'),
            React.createElement('button', { onClick: onClose, className: 'close-btn' }, '×')
        ),
        React.createElement('div', { className: 'chat-messages' },
            messages.map((msg, index) =>
                React.createElement('div', { 
                    key: index, 
                    className: `message ${msg.sender}`
                }, msg.text)
            )
        ),
        React.createElement('div', { className: 'chat-input' },
            React.createElement('input', {
                type: 'text',
                value: input,
                onChange: (e) => setInput(e.target.value),
                onKeyPress: (e) => e.key === 'Enter' && handleSend(),
                placeholder: "Type your symptoms..."
            }),
            React.createElement('button', { onClick: handleSend }, 'Send')
        )
    );
}

// Main App Component
function App() {
    const [activeSection, setActiveSection] = useState('home');
    const [showChat, setShowChat] = useState(false);

    const facilities = [
        { name: "Princess Marina Hospital", type: "Public Hospital", distance: "2.5km" },
        { name: "Gaborone Private Hospital", type: "Private Hospital", distance: "3.1km" },
        { name: "Bokamoso Private Hospital", type: "Private Hospital", distance: "5.2km" }
    ];

    const emergencyContacts = [
        { name: "Emergency Services", number: "997", type: "emergency" },
        { name: "Police", number: "999", type: "emergency" },
        { name: "Ambulance", number: "997", type: "emergency" },
        { name: "Fire Brigade", number: "998", type: "emergency" }
    ];

    const renderSection = () => {
        switch(activeSection) {
            case 'home':
                return React.createElement('div', { className: 'section' },
                    React.createElement('h2', null, '🏥 Tlamelo eClinic'),
                    React.createElement('p', null, 'AI-Powered Healthcare Platform for Botswana'),
                    React.createElement('div', { className: 'grid' },
                        React.createElement('button', { 
                            onClick: () => setShowChat(true),
                            className: 'service-btn primary'
                        }, '🤖 AI Symptom Checker'),
                        React.createElement('button', { 
                            onClick: () => setActiveSection('emergency'),
                            className: 'service-btn emergency'
                        }, '🚨 Emergency Contacts'),
                        React.createElement('button', { 
                            onClick: () => setActiveSection('facilities'),
                            className: 'service-btn'
                        }, '📍 Find Facilities'),
                        React.createElement('button', { 
                            onClick: () => setActiveSection('firstaid'),
                            className: 'service-btn'
                        }, '🩹 First Aid Guide'),
                        React.createElement('button', { 
                            onClick: () => setActiveSection('medicine'),
                            className: 'service-btn'
                        }, '💊 Medicine Delivery'),
                        React.createElement('button', { 
                            onClick: () => setActiveSection('booking'),
                            className: 'service-btn'
                        }, '📅 Book Doctor')
                    )
                );
            
            case 'emergency':
                return React.createElement('div', { className: 'section' },
                    React.createElement('h2', null, '🚨 Emergency Contacts'),
                    React.createElement('div', { className: 'emergency-list' },
                        emergencyContacts.map((contact, index) =>
                            React.createElement('div', { key: index, className: 'emergency-item' },
                                React.createElement('h3', null, contact.name),
                                React.createElement('p', { className: 'number' }, contact.number),
                                React.createElement('button', { 
                                    className: 'call-btn',
                                    onClick: () => window.open(`tel:${contact.number}`)
                                }, '📞 Call')
                            )
                        )
                    ),
                    React.createElement('button', { 
                        onClick: () => setActiveSection('home'),
                        className: 'back-btn'
                    }, '← Back')
                );
            
            case 'facilities':
                return React.createElement('div', { className: 'section' },
                    React.createElement('h2', null, '📍 Healthcare Facilities'),
                    React.createElement('div', { className: 'facilities-list' },
                        facilities.map((facility, index) =>
                            React.createElement('div', { key: index, className: 'facility-item' },
                                React.createElement('h3', null, facility.name),
                                React.createElement('p', null, facility.type),
                                React.createElement('p', { className: 'distance' }, `📏 ${facility.distance}`)
                            )
                        )
                    ),
                    React.createElement('button', { 
                        onClick: () => setActiveSection('home'),
                        className: 'back-btn'
                    }, '← Back')
                );
            
            default:
                return React.createElement('div', { className: 'section' },
                    React.createElement('h2', null, 'Coming Soon'),
                    React.createElement('button', { 
                        onClick: () => setActiveSection('home'),
                        className: 'back-btn'
                    }, '← Back to Home')
                );
        }
    };

    if (showChat) {
        return React.createElement(Chat, { onClose: () => setShowChat(false) });
    }

    return React.createElement('div', { className: 'app' },
        React.createElement('div', { className: 'container' },
            renderSection()
        )
    );
}

// Render the app
ReactDOM.render(React.createElement(App), document.getElementById('root'));
