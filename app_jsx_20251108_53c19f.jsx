import { useState } from 'react';
import './App.css';
import Chat from './Chat';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Emergency Numbers Data
  const emergencyNumbers = [
    { icon: "🚑", service: "Ambulance & Medical Emergency", number: "997", description: "24/7 medical emergency response" },
    { icon: "👮", service: "Police Emergency", number: "999", description: "Crime, safety emergencies" },
    { icon: "🔥", service: "Fire Department", number: "998", description: "Fire and rescue services" },
    { icon: "🎯", service: "Poison Control", number: "+267 390-1605", description: "Poisoning emergencies" },
    { icon: "💊", service: "Mental Health Crisis", number: "116", description: "24/7 mental health support" },
    { icon: "👶", service: "Child Emergency", number: "391-1107", description: "Child protection services" }
  ];

  // First Aid Guides
  const firstAidGuides = [
    { icon: "💓", title: "CPR", steps: ["Check responsiveness", "Call 997", "30 chest compressions", "2 rescue breaths"] },
    { icon: "🩸", title: "Bleeding", steps: ["Apply direct pressure", "Elevate injury", "Cover with clean cloth", "Seek medical help"] },
    { icon: "🔥", title: "Burns", steps: ["Cool with running water", "Remove jewelry", "Cover loosely", "Don't pop blisters"] },
    { icon: "💨", title: "Choking", steps: ["Encourage coughing", "5 back blows", "5 abdominal thrusts", "Call 997 if continues"] }
  ];

  // Nearby Healthcare Facilities
  const healthcareFacilities = [
    { name: "Princess Marina Hospital", type: "Hospital", distance: "2.1km", waitTime: "1-2 hours", emergency: true },
    { name: "Gaborone Private Hospital", type: "Private Hospital", distance: "3.5km", waitTime: "30-60 min", emergency: true },
    { name: "Bontleng Clinic", type: "Public Clinic", distance: "1.8km", waitTime: "45-90 min", emergency: false },
    { name: "Clicks Pharmacy", type: "Pharmacy", distance: "0.5km", waitTime: "10 min", emergency: false }
  ];

  // How It Works Steps
  const howItWorks = [
    { step: "1", icon: "💬", title: "Describe Symptoms", description: "Chat with our AI assistant about your health concerns" },
    { step: "2", icon: "🤖", title: "AI Assessment", description: "Get instant risk evaluation and personalized guidance" },
    { step: "3", icon: "🩺", title: "Get Care Options", description: "Receive recommendations for appropriate healthcare services" },
    { step: "4", icon: "📱", title: "Connect Instantly", description: "Book appointments or find nearby care facilities" }
  ];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="nav-container">
          <div className="logo-section">
            <div className="logo-icon">🩺</div>
            <h1 className="logo-text">Tlamelo Cloud eClinic</h1>
          </div>
          <nav className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About</a>
          </nav>
          <button className="nav-button" onClick={() => setCurrentSection('home')}>
            Get Started
          </button>
        </div>
        
        <div className="hero-section">
          <div className="hero-text">
            <h2>Healthcare Revolution for Africa</h2>
            <p>AI-powered telehealth platform bringing quality healthcare to every community in Botswana and beyond.</p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={() => setCurrentSection('symptoms')}>
                Start Free Consultation
              </button>
              <button className="secondary-btn" onClick={() => setCurrentSection('how-it-works')}>
                How It Works
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card consultation">
              <div className="card-header">
                <span className="card-icon">💬</span>
                <span>AI Health Assistant</span>
              </div>
              <p>"Hello! How can I help you today?"</p>
            </div>
            <div className="floating-card doctor">
              <div className="card-header">
                <span className="card-icon">👨‍⚕️</span>
                <span>Dr. Available</span>
              </div>
              <p>Ready for consultation</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {currentSection === 'home' && (
          <section className="options-section">
            <div className="section-header">
              <h3>Your Healthcare Journey Starts Here</h3>
              <p>Choose how you'd like to get help today</p>
            </div>
            <div className="options-grid">
              <div className="option-card" onClick={() => setCurrentSection('symptoms')}>
                <div className="option-icon">🩺</div>
                <h4>Check Symptoms</h4>
                <p>AI-powered health assessment with personalized guidance</p>
                <button className="option-button">Start Assessment</button>
              </div>

              <div className="option-card" onClick={() => setCurrentSection('doctor')}>
                <div className="option-icon">📅</div>
                <h4>See a Doctor</h4>
                <p>Book online consultations or in-person appointments</p>
                <button className="option-button">Find Care</button>
              </div>

              <div className="option-card" onClick={() => setCurrentSection('nearby')}>
                <div className="option-icon">🗺️</div>
                <h4>Find Nearby Help</h4>
                <p>Locate hospitals, clinics, pharmacies with real-time info</p>
                <button className="option-button">Locate Now</button>
              </div>

              <div className="option-card" onClick={() => setCurrentSection('emergency')}>
                <div className="option-icon">🚑</div>
                <h4>Emergency Contacts</h4>
                <p>Quick access to all emergency services in Botswana</p>
                <button className="option-button">Get Help</button>
              </div>

              <div className="option-card" onClick={() => setCurrentSection('medicine')}>
                <div className="option-icon">💊</div>
                <h4>Medicine Delivery</h4>
                <p>Get prescriptions delivered to your doorstep</p>
                <button className="option-button">Order Now</button>
              </div>

              <div className="option-card" onClick={() => setCurrentSection('firstaid')}>
                <div className="option-icon">🆘</div>
                <h4>First Aid Guides</h4>
                <p>Learn emergency procedures and life-saving techniques</p>
                <button className="option-button">Learn Now</button>
              </div>
            </div>
          </section>
        )}

        {/* Symptom Checker */}
        {currentSection === 'symptoms' && (
          <Chat onBack={() => setCurrentSection('home')} />
        )}

        {/* Emergency Contacts */}
        {currentSection === 'emergency' && (
          <section className="feature-section">
            <div className="section-header">
              <h3>Emergency Contacts - Botswana</h3>
              <p>Immediate access to emergency services</p>
            </div>
            <div className="emergency-grid">
              {emergencyNumbers.map((emergency, index) => (
                <div key={index} className="emergency-card">
                  <div className="emergency-icon">{emergency.icon}</div>
                  <div className="emergency-info">
                    <h4>{emergency.service}</h4>
                    <div className="emergency-number">{emergency.number}</div>
                    <p>{emergency.description}</p>
                  </div>
                  <button className="call-button" onClick={() => window.open(`tel:${emergency.number}`)}>
                    Call Now
                  </button>
                </div>
              ))}
            </div>
            <div className="emergency-tips">
              <h4>Emergency Tips:</h4>
              <ul>
                <li>Stay calm and speak clearly when calling emergency services</li>
                <li>Provide your exact location and the nature of the emergency</li>
                <li>Follow the operator's instructions carefully</li>
                <li>Keep emergency numbers saved in your phone</li>
              </ul>
            </div>
            <button className="back-button" onClick={() => setCurrentSection('home')}>
              ← Back to Main Menu
            </button>
          </section>
        )}

        {/* Find Nearby Help */}
        {currentSection === 'nearby' && (
          <section className="feature-section">
            <div className="section-header">
              <h3>Healthcare Facilities Near You</h3>
              <p>Find hospitals, clinics, and pharmacies in your area</p>
            </div>
            <div className="facilities-grid">
              {healthcareFacilities.map((facility, index) => (
                <div key={index} className="facility-card">
                  <div className="facility-header">
                    <h4>{facility.name}</h4>
                    <span className={`facility-type ${facility.emergency ? 'emergency' : 'regular'}`}>
                      {facility.emergency ? '🚨 Emergency' : '🏥 Regular'}
                    </span>
                  </div>
                  <div className="facility-details">
                    <div className="detail">
                      <span>Type:</span>
                      <span>{facility.type}</span>
                    </div>
                    <div className="detail">
                      <span>Distance:</span>
                      <span>{facility.distance}</span>
                    </div>
                    <div className="detail">
                      <span>Wait Time:</span>
                      <span>{facility.waitTime}</span>
                    </div>
                  </div>
                  <div className="facility-actions">
                    <button className="direction-button">Get Directions</button>
                    <button className="call-button">Call Facility</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="back-button" onClick={() => setCurrentSection('home')}>
              ← Back to Main Menu
            </button>
          </section>
        )}

        {/* First Aid Guides */}
        {currentSection === 'firstaid' && (
          <section className="feature-section">
            <div className="section-header">
              <h3>First Aid Emergency Guides</h3>
              <p>Life-saving procedures for common emergencies</p>
            </div>
            <div className="firstaid-grid">
              {firstAidGuides.map((guide, index) => (
                <div key={index} className="firstaid-card">
                  <div className="firstaid-icon">{guide.icon}</div>
                  <h4>{guide.title}</h4>
                  <div className="steps-list">
                    {guide.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="step">
                        <span className="step-number">{stepIndex + 1}</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="back-button" onClick={() => setCurrentSection('home')}>
              ← Back to Main Menu
            </button>
          </section>
        )}

        {/* Medicine Delivery */}
        {currentSection === 'medicine' && (
          <section className="feature-section">
            <div className="section-header">
              <h3>Medicine Delivery Service</h3>
              <p>Get your prescriptions delivered quickly and safely</p>
            </div>
            <div className="delivery-options">
              <div className="delivery-card">
                <h4>💊 Prescription Delivery</h4>
                <p>Upload your prescription and get medications delivered</p>
                <ul>
                  <li>✓ Same-day delivery available</li>
                  <li>✓ Partner pharmacies nationwide</li>
                  <li>✓ Secure payment options</li>
                  <li>✓ Prescription verification</li>
                </ul>
                <button className="service-button">Upload Prescription</button>
              </div>
              <div className="delivery-card">
                <h4>🛵 Over-the-Counter</h4>
                <p>Common medications without prescription</p>
                <ul>
                  <li>✓ Pain relievers</li>
                  <li>✓ Cold & flu medicine</li>
                  <li>✓ First aid supplies</li>
                  <li>✓ Vitamins & supplements</li>
                </ul>
                <button className="service-button">Browse Medicines</button>
              </div>
            </div>
            <button className="back-button" onClick={() => setCurrentSection('home')}>
              ← Back to Main Menu
            </button>
          </section>
        )}

        {/* Doctor Booking */}
        {currentSection === 'doctor' && (
          <section className="feature-section">
            <div className="section-header">
              <h3>Book Medical Appointment</h3>
              <p>Connect with healthcare professionals</p>
            </div>
            
            {bookingConfirmed ? (
              <div className="booking-confirmation">
                <div className="confirmation-icon">✅</div>
                <h4>Appointment Booked Successfully!</h4>
                <p>Your consultation has been scheduled. You will receive a confirmation SMS shortly.</p>
                <button 
                  className="service-button"
                  onClick={() => setBookingConfirmed(false)}
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <div className="service-options">
                <div className="service-card">
                  <h4>🎥 Online Consultation</h4>
                  <p>Video call with licensed doctors</p>
                  <ul>
                    <li>Available 24/7</li>
                    <li>No travel needed</li>
                    <li>Prescription delivery</li>
                    <li>Secure video platform</li>
                  </ul>
                  <button 
                    className="service-button" 
                    onClick={() => setBookingConfirmed(true)}
                  >
                    Book Online - R150
                  </button>
                </div>
                <div className="service-card">
                  <h4>🏥 In-Person Visit</h4>
                  <p>Schedule clinic appointments</p>
                  <ul>
                    <li>Choose preferred location</li>
                    <li>See doctor availability</li>
                    <li>Get reminders</li>
                    <li>Insurance accepted</li>
                  </ul>
                  <button 
                    className="service-button"
                    onClick={() => setBookingConfirmed(true)}
                  >
                    Find Clinics
                  </button>
                </div>
              </div>
            )}
            
            <button className="back-button" onClick={() => {
              setCurrentSection('home');
              setBookingConfirmed(false);
            }}>
              ← Back to Main Menu
            </button>
          </section>
        )}

        {/* How It Works */}
        {currentSection === 'how-it-works' && (
          <section className="feature-section">
            <div className="section-header">
              <h3>How Tlamelo eClinic Works</h3>
              <p>Simple steps to better healthcare</p>
            </div>
            <div className="steps-container">
              {howItWorks.map((step, index) => (
                <div key={index} className="step-card">
                  <div className="step-number">{step.step}</div>
                  <div className="step-icon">{step.icon}</div>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
            <div className="features-overview">
              <h4>Our Comprehensive Features:</h4>
              <div className="features-list">
                <div className="feature-item">🤖 AI-Powered Symptom Checker</div>
                <div className="feature-item">🎥 Video Consultations</div>
                <div className="feature-item">🗺️ Healthcare Facility Locator</div>
                <div className="feature-item">💊 Medicine Delivery</div>
                <div className="feature-item">🆘 Emergency Services</div>
                <div className="feature-item">📱 Mobile-First Design</div>
              </div>
            </div>
            <button className="back-button" onClick={() => setCurrentSection('home')}>
              ← Back to Main Menu
            </button>
          </section>
        )}
      </main>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h3>Why Choose Tlamelo eClinic?</h3>
          <p>Comprehensive healthcare solutions powered by cutting-edge technology</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h4>AI-Powered Triage</h4>
            <p>Advanced symptom assessment with intelligent follow-up questions and risk evaluation using Google's AI technology</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h4>Made for Africa</h4>
            <p>Designed specifically for Botswana and African healthcare contexts with local language support</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h4>Instant Access</h4>
            <p>Skip long queues and connect directly with healthcare professionals via secure video calls</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h3>Ready to Transform Your Healthcare Experience?</h3>
          <p>Join thousands of patients across Botswana who have discovered better healthcare through technology</p>
          <button className="cta-button" onClick={() => setCurrentSection('symptoms')}>
            Start Your Health Journey Today
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Tlamelo Cloud eClinic</h3>
            <p>Revolutionizing African healthcare through AI innovation and technology</p>
          </div>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Tlamelo Cloud eClinic. Building healthier communities across Africa.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;