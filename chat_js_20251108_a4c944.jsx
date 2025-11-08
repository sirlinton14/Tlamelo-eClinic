import { useState, useEffect, useRef } from 'react';
import Chat from './Chat.js';

const Chat = ({ onBack }) => {
  const [chatMessages, setChatMessages] = useState([
    { 
      text: "Hello! I'm your Tlamelo AI health assistant. I'm here to help you understand your symptoms and guide you to appropriate care. What symptoms are you experiencing today?", 
      sender: 'ai' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [assessment, setAssessment] = useState({
    currentSymptom: null,
    currentQuestion: 0,
    answers: {},
    riskLevel: null,
    inAssessment: false
  });
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedChat = localStorage.getItem('tlameloChatHistory');
    if (savedChat) {
      setChatMessages(JSON.parse(savedChat));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tlameloChatHistory', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: "smooth",
        block: "nearest"
      });
    };

    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [chatMessages]);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const demoSymptoms = [
    "I have a severe headache with vision changes",
    "Chest pain that spreads to my arm", 
    "Fever for 3 days with high temperature",
    "Stomach pain and nausea"
  ];

  const symptomFlows = {
    headache: {
      name: "Headache",
      questions: [
        {
          id: 'severity',
          text: "How severe is your headache on a scale of 1-10, where 1 is mild and 10 is the worst pain imaginable?",
          type: 'scale'
        },
        {
          id: 'duration', 
          text: "How long have you had this headache?",
          type: 'duration'
        },
        {
          id: 'neurological',
          text: "Are you experiencing any vision changes, numbness, weakness, or difficulty speaking?",
          type: 'safety',
          options: ['Yes', 'No']
        },
        {
          id: 'triggers',
          text: "Does light, sound, or movement make the headache worse?",
          type: 'triggers',
          options: ['Yes', 'No']
        }
      ],
      assessRisk: (answers) => {
        if (answers.neurological === 'Yes') return 'EMERGENCY';
        if (answers.severity >= 8 || answers.duration?.includes('week') || answers.duration?.includes('month')) return 'HIGH';
        if (answers.severity >= 5) return 'MODERATE';
        return 'LOW';
      }
    },
    
    chest: {
      name: "Chest Pain", 
      questions: [
        {
          id: 'radiation',
          text: "Does the pain spread to your arm, jaw, neck, or back?",
          type: 'safety',
          options: ['Yes', 'No']
        },
        {
          id: 'breathing',
          text: "Are you experiencing shortness of breath, sweating, or nausea?",
          type: 'safety', 
          options: ['Yes', 'No']
        },
        {
          id: 'duration',
          text: "How long has the chest pain lasted?",
          type: 'duration'
        }
      ],
      assessRisk: (answers) => {
        if (answers.radiation === 'Yes' || answers.breathing === 'Yes') return 'EMERGENCY';
        if (answers.duration?.includes('minute') || answers.duration?.includes('hour')) return 'HIGH';
        return 'MODERATE';
      }
    },

    fever: {
      name: "Fever",
      questions: [
        {
          id: 'temperature',
          text: "What is your temperature in Celsius?",
          type: 'number'
        },
        {
          id: 'duration',
          text: "How long have you had fever?",
          type: 'duration'
        },
        {
          id: 'symptoms',
          text: "Are you experiencing chills, sweating, or body aches?",
          type: 'options',
          options: ['Yes', 'No']
        }
      ],
      assessRisk: (answers) => {
        const temp = parseInt(answers.temperature);
        if (temp > 39.5) return 'HIGH';
        if (temp > 38 || answers.duration?.includes('day')) return 'MODERATE';
        return 'LOW';
      }
    },

    abdominal: {
      name: "Abdominal Pain",
      questions: [
        {
          id: 'location',
          text: "Where exactly is the pain located?",
          type: 'text'
        },
        {
          id: 'severity',
          text: "How severe is the pain on a scale of 1-10?",
          type: 'scale'
        },
        {
          id: 'emergency_signs',
          text: "Are you experiencing vomiting, fever, or inability to keep fluids down?",
          type: 'safety',
          options: ['Yes', 'No']
        }
      ],
      assessRisk: (answers) => {
        if (answers.emergency_signs === 'Yes' || answers.severity >= 8) return 'HIGH';
        if (answers.severity >= 5) return 'MODERATE';
        return 'LOW';
      }
    }
  };

  const generateCarePlan = (symptom, answers, riskLevel) => {
    const plans = {
      headache: {
        EMERGENCY: {
          title: "🚨 EMERGENCY CARE NEEDED",
          risk: "HIGH RISK - Seek immediate medical attention",
          immediate: [
            "🚑 Call 997 or go to nearest emergency department",
            "Do not drive yourself",
            "Describe your neurological symptoms to medical staff"
          ],
          warning: "Sudden severe headache with neurological symptoms could indicate serious conditions",
          facilities: ["Princess Marina Hospital - Emergency", "Gaborone Private Hospital - Emergency"]
        },
        HIGH: {
          title: "🟠 URGENT MEDICAL EVALUATION",
          risk: "High Risk - Same-day assessment recommended", 
          immediate: [
            "💊 Take paracetamol 500-1000mg every 6 hours as needed",
            "🕶️ Rest in dark, quiet environment",
            "💧 Drink plenty of water"
          ],
          care: [
            "📅 Schedule urgent teleconsultation today",
            "🏥 Visit clinic if no improvement in 4 hours",
            "📝 Monitor for worsening symptoms"
          ],
          booking: { type: "Urgent Consultation", price: "R200", duration: "20 minutes" }
        },
        MODERATE: {
          title: "🟡 MEDICAL CONSULTATION RECOMMENDED",
          risk: "Moderate Risk - Professional evaluation advised",
          immediate: [
            "💊 Paracetamol 500mg every 6 hours if needed",
            "🌙 Ensure adequate rest and sleep",
            "💧 Maintain hydration"
          ],
          care: [
            "📅 Book teleconsultation within 24 hours", 
            "📱 Download headache diary app for tracking",
            "🍵 Avoid caffeine and alcohol"
          ],
          booking: { type: "Standard Consultation", price: "R150", duration: "15 minutes" }
        },
        LOW: {
          title: "✅ SELF-CARE MANAGEMENT",
          risk: "Low Risk - Home management appropriate",
          immediate: [
            "💊 Paracetamol as needed for pain",
            "🧘 Relaxation techniques and stress management",
            "💧 Hydrate with 2-3 liters water daily"
          ],
          care: [
            "Monitor for 48 hours",
            "Return if symptoms worsen or persist",
            "Consider stress reduction strategies"
          ]
        }
      },

      chest: {
        EMERGENCY: {
          title: "🚨 CARDIAC EMERGENCY - IMMEDIATE ACTION",
          risk: "LIFE-THREATENING - Do not delay",
          immediate: [
            "🚑 CALL 997 IMMEDIATELY - Describe chest pain symptoms",
            "🚗 Do NOT drive - wait for ambulance",
            "💊 Do not take any medication before evaluation"
          ],
          warning: "Chest pain with radiation or breathing difficulties requires immediate cardiac assessment",
          facilities: ["Princess Marina Hospital - Cardiac Emergency", "Gaborone Private Hospital - ER"]
        },
        HIGH: {
          title: "🟠 URGENT CARDIAC ASSESSMENT",
          risk: "High Risk - Emergency evaluation needed",
          immediate: [
            "🚗 Go to nearest emergency department now",
            "💊 Do not take aspirin unless prescribed",
            "📞 Inform family or friends of your situation"
          ],
          facilities: ["Princess Marina Hospital", "Gaborone Private Hospital"]
        }
      },

      fever: {
        HIGH: {
          title: "🟠 URGENT MEDICAL ATTENTION NEEDED",
          risk: "High Fever - Professional evaluation required",
          immediate: [
            "💊 Take paracetamol to reduce fever",
            "💧 Drink plenty of fluids and rest",
            "🌡️ Monitor temperature every 2 hours"
          ],
          care: [
            "📅 See doctor within 4-6 hours",
            "🩺 Blood tests may be needed",
            "🏥 Go to emergency if fever exceeds 40°C"
          ]
        },
        MODERATE: {
          title: "🟡 MEDICAL CONSULTATION ADVISED",
          risk: "Moderate Fever - Monitor closely",
          immediate: [
            "💊 Paracetamol every 6 hours as needed",
            "💧 Stay hydrated with water and electrolytes",
            "🛌 Get plenty of rest"
          ],
          care: [
            "📅 Schedule doctor visit within 24 hours",
            "🌡️ Continue temperature monitoring",
            "🚨 Seek care if symptoms worsen"
          ]
        }
      },

      abdominal: {
        HIGH: {
          title: "🟠 URGENT MEDICAL EVALUATION",
          risk: "High Risk - Possible serious condition",
          immediate: [
            "🛌 Rest and avoid solid foods",
            "💧 Sip clear fluids only",
            "🚫 Do not take pain medication before examination"
          ],
          care: [
            "📅 Go to emergency or clinic immediately",
            "🩺 May require imaging tests",
            "🏥 Surgical evaluation may be needed"
          ]
        }
      }
    };

    return plans[symptom]?.[riskLevel] || plans.headache.MODERATE;
  };

  const processAssessment = (userInput) => {
    const { currentSymptom, currentQuestion, answers } = assessment;
    const flow = symptomFlows[currentSymptom];
    
    if (!flow) return;

    const currentQ = flow.questions[currentQuestion];
    const newAnswers = { ...answers, [currentQ.id]: userInput };

    if (currentQuestion < flow.questions.length - 1) {
      setAssessment(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        answers: newAnswers
      }));
      
      const nextQ = flow.questions[currentQuestion + 1];
      return nextQ.text;
    } else {
      const riskLevel = flow.assessRisk(newAnswers);
      const carePlan = generateCarePlan(currentSymptom, newAnswers, riskLevel);
      
      setAssessment(prev => ({
        ...prev,
        riskLevel,
        inAssessment: false
      }));

      return formatCarePlan(carePlan, currentSymptom);
    }
  };

  const formatCarePlan = (carePlan, symptom) => {
    let message = `🎯 **${carePlan.title}**\n\n`;
    message += `**Risk Level:** ${carePlan.risk}\n\n`;
    
    message += `**IMMEDIATE ACTIONS:**\n`;
    carePlan.immediate.forEach(action => {
      message += `• ${action}\n`;
    });
    
    if (carePlan.care) {
      message += `\n**RECOMMENDED CARE:**\n`;
      carePlan.care.forEach(action => {
        message += `• ${action}\n`;
      });
    }
    
    if (carePlan.booking) {
      message += `\n**QUICK BOOKING:**\n`;
      message += `• ${carePlan.booking.type} - ${carePlan.booking.price} (${carePlan.booking.duration})\n`;
    }
    
    if (carePlan.facilities) {
      message += `\n**NEAREST FACILITIES:**\n`;
      carePlan.facilities.forEach(facility => {
        message += `• ${facility}\n`;
      });
    }
    
    if (carePlan.warning) {
      message += `\n⚠️ **Important:** ${carePlan.warning}\n`;
    }
    
    message += `\n---\n*Based on your ${symptom} assessment. I'm an AI assistant - always consult healthcare professionals for medical decisions.*`;
    
    return message;
  };

  const detectSymptom = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (/(headache|migraine|head pain)/.test(input)) return 'headache';
    if (/(chest pain|heart|chest tight)/.test(input)) return 'chest';
    if (/(fever|temperature|hot)/.test(input)) return 'fever';
    if (/(stomach|abdominal|nausea)/.test(input)) return 'abdominal';
    
    return null;
  };

  const handleAISend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, sender: 'user' };
    setChatMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      let aiResponse = "";

      if (assessment.inAssessment) {
        aiResponse = processAssessment(userInput);
      } else {
        const detectedSymptom = detectSymptom(userInput);
        
        if (detectedSymptom && symptomFlows[detectedSymptom]) {
          setAssessment({
            currentSymptom: detectedSymptom,
            currentQuestion: 0,
            answers: {},
            riskLevel: null,
            inAssessment: true
          });
          
          const firstQuestion = symptomFlows[detectedSymptom].questions[0];
          aiResponse = `I understand you're experiencing ${symptomFlows[detectedSymptom].name.toLowerCase()}. Let me ask a few important questions to provide the best guidance.\n\n${firstQuestion.text}`;
        } else {
          aiResponse = "Thank you for sharing. To provide you with personalized medical guidance, please describe your main symptom (e.g., headache, fever, chest pain, etc.) and I'll conduct a proper assessment.";
        }
      }

      setChatMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAISend();
    }
  };

  const clearChatHistory = () => {
    setChatMessages([
      { 
        text: "Hello! I'm your Tlamelo AI health assistant. I'm here to help you understand your symptoms and guide you to appropriate care. What symptoms are you experiencing today?", 
        sender: 'ai' 
      }
    ]);
    setAssessment({
      currentSymptom: null,
      currentQuestion: 0,
      answers: {},
      riskLevel: null,
      inAssessment: false
    });
    localStorage.removeItem('tlameloChatHistory');
  };

  const useDemoSymptom = (symptomText) => {
    setInput(symptomText);
  };

  return (
    <div className="chat-section">
      <div className="section-header">
        <h3>AI Medical Assistant</h3>
        <p>Describe your symptoms for personalized health guidance</p>
      </div>

      <div className="demo-symptoms">
        <h4>Quick Start Demo:</h4>
        <div className="demo-buttons">
          {demoSymptoms.map((symptom, index) => (
            <button 
              key={index} 
              className="demo-btn"
              onClick={() => useDemoSymptom(symptom)}
              disabled={isLoading}
            >
              {symptom}
            </button>
          ))}
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-header">
          <h4>Medical Assessment</h4>
          <span className="status">Online - Professional Assessment Mode</span>
          <button className="clear-chat-btn" onClick={clearChatHistory}>
            Clear Chat
          </button>
        </div>
        <div className="disclaimer">
          <strong>Important:</strong> I'm an AI assistant providing guidance, not medical diagnosis. For emergencies, seek professional care immediately.
        </div>
        <div className="chat-messages">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          ))}
          {isLoading && <div className="message ai">Processing your response...</div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-container">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={assessment.inAssessment ? "Type your answer here..." : "Describe your symptoms here..."}
            disabled={isLoading}
          />
          <button onClick={handleAISend} disabled={isLoading || !input.trim()}>
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </div>
      <button className="back-button" onClick={onBack}>
        ← Back to Main Menu
      </button>
    </div>
  );
};

export default Chat;
