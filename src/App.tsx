import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  MessageSquare, 
  Mail, 
  Phone, 
  Clock, 
  FileText, 
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Languages,
  Bot,
  Sparkles,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Users,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Loader,
  Database,
  Zap,
  Send,
  CheckCircle2
} from 'lucide-react';

function App() {
  const [selectedTab, setSelectedTab] = useState('feed');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [showDataProcessing, setShowDataProcessing] = useState(false);
  const [agentResponse, setAgentResponse] = useState('');
  const [showAgentResponse, setShowAgentResponse] = useState(false);
  const [showRAGButton, setShowRAGButton] = useState(false);
  const [ragProcessing, setRAGProcessing] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [customerMessageReceived, setCustomerMessageReceived] = useState(false);
  const [profileEnriched, setProfileEnriched] = useState(false);
  const [showFrenchTranslation, setShowFrenchTranslation] = useState(false);

  const steps = [
    {
      id: 0,
      title: "Waiting for Customer Contact",
      description: "System ready to receive customer inquiries",
      duration: 2000,
      actions: () => {
        // Initial blank state - no actions needed
      }
    },
    {
      id: 1,
      title: "Customer Message Received",
      description: "Customer message received and profile populated from Data Cloud",
      duration: 2000,
      actions: () => {
        setCustomerMessageReceived(true);
        setProfileEnriched(true);
      }
    },
    {
      id: 2,
      title: "Case Created & AI Translation",
      description: "Support case created and LLM translates French message to English",
      duration: 2500,
      actions: () => {
        setShowTranslation(true);
        setShowRAGButton(true);
      }
    },
    {
      id: 3,
      title: "Agent Reviews Context",
      description: "Agent reviews translated message and customer context",
      duration: 3500,
      actions: () => {
        // Agent can now choose to generate recommendations
      }
    },
    {
      id: 4,
      title: "RAG Knowledge Retrieval",
      description: "Agent triggers AI recommendations when ready",
      duration: 3000,
      actions: () => {
        // This will be triggered by agent action
      }
    },
    {
      id: 6,
      title: "Agent Response",
      description: "Agent reviews AI recommendations, crafts response, and auto-translates to French",
      duration: 4000,
      actions: () => {
        setAgentResponse("Hello Marie, I understand your concern about the duplicate charges on your December bill. I've reviewed your account and can confirm there was indeed a billing error on December 15th. I'm processing a credit of €245 to your account right now, which will appear on your next statement. Is there anything else I can help you with regarding this billing issue?");
        setShowAgentResponse(true);
        // Auto-translate after a brief delay
        setTimeout(() => {
          setShowFrenchTranslation(true);
        }, 2000);
      }
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      steps[nextStepIndex].actions();
      
      // Special handling for RAG step - don't auto-trigger in manual mode
      if (nextStepIndex === 2) {
        setShowRAGButton(true);
      }
    }
  };

  const generateRAGRecommendations = async () => {
    setRAGProcessing(true);
    setCurrentStep(4); // Move to RAG step
    
    // Simulate RAG processing time
    setTimeout(() => {
      setShowAIRecommendations(true);
      setRAGProcessing(false);
      setShowRAGButton(false);
      // In manual mode, don't auto-advance after RAG
      if (!manualMode) {
        setCurrentStep(5); // Move to agent response step
      }
    }, 3000);
  };

  const playScenario = () => {
    setIsPlaying(true);
    let stepIndex = 0;
    
    const executeStep = () => {
      if (stepIndex < steps.length) {
        setCurrentStep(stepIndex);
        steps[stepIndex].actions();
        
        setTimeout(() => {
          stepIndex++;
          if (stepIndex < steps.length) {
            // Skip step 4 (RAG) in auto-play, let agent control it
            if (stepIndex === 4) {
              stepIndex++;
            }
            if (stepIndex < steps.length) {
              executeStep();
            }
          } else {
            setIsPlaying(false);
          }
        }, steps[stepIndex].duration);
      }
    };
    
    executeStep();
  };

  const resetScenario = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setShowTranslation(false);
    setShowAIRecommendations(false);
    setShowDataProcessing(false);
    setShowRAGButton(false);
    setRAGProcessing(false);
    setShowAgentResponse(false);
    setAgentResponse('');
    setManualMode(false);
    setCustomerMessageReceived(false);
    setProfileEnriched(false);
    setShowFrenchTranslation(false);
  };

  const goToStep = (stepIndex) => {
    if (!isPlaying) {
      setCurrentStep(stepIndex);
      // Apply all actions up to this step
      for (let i = 0; i <= stepIndex; i++) {
        if (i !== 4) { // Don't auto-trigger RAG step
          steps[i].actions();
        }
      }
      // Show RAG button if we're at step 3 or later
      if (stepIndex >= 2) {
        setShowRAGButton(true);
      }
      if (stepIndex >= 1) {
        setCustomerMessageReceived(true);
        setProfileEnriched(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-blue-900 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            </div>
            <span className="text-sm">Service Console</span>
          </div>
          <div className="flex items-center space-x-2 bg-blue-800 px-3 py-1 rounded">
            <span className="text-sm">Cases</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex items-center space-x-2 bg-blue-800 px-3 py-1 rounded">
            <span className="text-sm">00001085</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Salesforce" 
              className="bg-white text-gray-900 pl-10 pr-4 py-2 rounded-md w-64"
            />
          </div>
          <Bell className="w-5 h-5" />
          <Settings className="w-5 h-5" />
          <User className="w-5 h-5" />
        </div>
      </header>

      {/* Interactive Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold text-gray-800">Interactive Scenario Demo</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={playScenario}
                disabled={isPlaying}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPlaying ? <Loader className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Playing...' : 'Play Scenario'}</span>
              </button>
              <button
                onClick={() => {
                  setManualMode(true);
                  if (currentStep === 0) {
                    nextStep();
                  }
                }}
                disabled={isPlaying}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SkipForward className="w-4 h-4" />
                <span>Manual Mode</span>
              </button>
              {manualMode && currentStep < steps.length - 1 && (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>Next Step</span>
                </button>
              )}
              <button
                onClick={resetScenario}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            {manualMode && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                Manual Mode
              </span>
            )}
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => goToStep(index)}
                  disabled={isPlaying}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    index <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  } ${isPlaying ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {index < currentStep ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                </button>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-1 mx-2 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {steps[currentStep].description}
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-4 space-y-4">
          {/* Case Details */}
          {currentStep >= 1 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Case Details
                </h3>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Case Number</span>
                  <span className="font-medium">00001085</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Case Owner</span>
                  <span className="font-medium text-blue-600">Sarah Johnson</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    currentStep >= 7 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {currentStep >= 7 ? 'Responding' : 'In Progress'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Priority</span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium">Billing Issue</span>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-gray-600">Subject</span>
                  <p className="font-medium mt-1">Discrepancy in Monthly Billing Statement</p>
                </div>
                <div>
                  <span className="text-gray-600">Description</span>
                  <p className="text-gray-700 mt-1 text-xs leading-relaxed">
                    Customer reporting incorrect charges on their monthly statement. Multiple line items appear to be duplicated.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-center py-8 text-gray-400">
                <FileText className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                <p className="text-sm font-medium">No Active Cases</p>
                <p className="text-xs">Waiting for customer contact...</p>
              </div>
            </div>
          )}

          {/* Enhanced Customer Profile */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Contact Details
                {profileEnriched && (
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    Enriched
                  </span>
                )}
              </h3>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-medium">{profileEnriched ? 'Marie Dubois' : '---'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Language</span>
                <span className="font-medium flex items-center">
                  {profileEnriched ? (
                    <>
                      <Languages className="w-3 h-3 mr-1" />
                      French
                    </>
                  ) : (
                    '---'
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account</span>
                <span className="font-medium text-blue-600">{profileEnriched ? 'Asana Enterprise' : '---'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">{profileEnriched ? 'marie.dubois@company.fr' : '---'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone</span>
                <span className="font-medium">{profileEnriched ? '+33 1 42 34 56 78' : '---'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer Since</span>
                <span className="font-medium">{profileEnriched ? 'Jan 2022' : '---'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plan</span>
                <span className="font-medium">{profileEnriched ? 'Enterprise Premium' : '---'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">MRR</span>
                <span className="font-medium">{profileEnriched ? '€2,450' : '---'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sentiment Score</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  profileEnriched ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {profileEnriched ? 'Neutral' : '---'}
                </span>
              </div>
            </div>
          </div>

          {/* Billing History */}
          {currentStep >= 2 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Billing History
                </h3>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>Dec 2024</span>
                  <span className="font-medium">€2,450</span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Disputed</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Nov 2024</span>
                  <span className="font-medium">€2,450</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Paid</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Oct 2024</span>
                  <span className="font-medium">€2,450</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Paid</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-center py-6 text-gray-400">
                <DollarSign className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No billing data available</p>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
              Discrepancy in Monthly Billing Statement
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setSelectedTab('feed')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'feed'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                FEED
              </button>
              <button
                onClick={() => setSelectedTab('details')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'details'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                DETAILS
              </button>
            </nav>
          </div>

          {/* Action Bar */}
          <div className="flex items-center space-x-4 mb-6">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Post
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Email
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Log a Call
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Change Priority
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentStep >= 3 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={currentStep < 3}
            >
              Close the Case
            </button>
          </div>

          {/* AI Translation Panel */}
          {showTranslation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-blue-800 flex items-center">
                  <Languages className="w-4 h-4 mr-2" />
                  AI Translation Service
                  {currentStep === 2 && (
                    <Loader className="w-4 h-4 ml-2 animate-spin text-blue-600" />
                  )}
                </h3>
                <button
                  onClick={() => setShowTranslation(false)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium text-gray-500">ORIGINAL (FRENCH)</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    "Bonjour, j'ai reçu ma facture mensuelle et je remarque plusieurs charges en double. 
                    Je vois que j'ai été facturé deux fois pour le même service le 15 décembre. 
                    Pouvez-vous m'aider à résoudre ce problème?"
                  </p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium text-gray-500">TRANSLATION (ENGLISH)</span>
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      98% Confidence
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    "Hello, I received my monthly bill and I notice several duplicate charges. 
                    I see that I was billed twice for the same service on December 15th. 
                    Can you help me resolve this issue?"
                  </p>
                </div>
                
                {/* Agent RAG Control */}
                {showRAGButton && !showAIRecommendations && (
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-800 mb-1">Ready for AI Recommendations?</h4>
                        <p className="text-xs text-gray-600">
                          Generate AI-powered recommendations based on customer context and knowledge base
                        </p>
                      </div>
                      <button
                        onClick={generateRAGRecommendations}
                        disabled={ragProcessing}
                        className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {ragProcessing ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" />
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>Generate Recommendations</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Recommendations */}
          {(showAIRecommendations || ragProcessing) && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6 animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-purple-800 flex items-center">
                  <Bot className="w-4 h-4 mr-2" />
                  AI-Powered Recommendations
                  {ragProcessing && (
                    <Loader className="w-4 h-4 ml-2 animate-spin text-purple-600" />
                  )}
                </h3>
                {!ragProcessing && (
                  <button
                    onClick={() => setShowAIRecommendations(false)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    ✕
                  </button>
                )}
              </div>
              
              {ragProcessing ? (
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Loader className="w-4 h-4 animate-spin text-purple-600" />
                      <span className="text-sm font-medium">Processing Knowledge Base...</span>
                    </div>
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>• Searching vector database for similar cases...</span>
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Analyzing billing documentation...</span>
                        <Loader className="w-3 h-3 animate-spin text-blue-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Retrieving resolution procedures...</span>
                        <div className="w-3 h-3 border border-gray-300 rounded-full" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Generating recommendations...</span>
                        <div className="w-3 h-3 border border-gray-300 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : showAIRecommendations ? (
                <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className="text-sm font-medium">Suggested Action</span>
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      94% Confidence
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    Review billing records for December 15th duplicate charges. 
                    Similar cases typically resolve with account credit.
                  </p>
                  <div className="mb-3 p-2 bg-gray-50 rounded text-xs">
                    <div className="font-medium text-gray-700 mb-1">Sources Used:</div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600">• Billing_Dispute_Resolution_v2.3.pdf</span>
                        <span className="text-gray-500">Internal KB - 96%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600">• Case #00001023 - Similar billing issue</span>
                        <span className="text-gray-500">Historical - 91%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600">• Zuora API Documentation - Credit Process</span>
                        <span className="text-gray-500">External - 88%</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700">
                    Apply Credit
                  </button>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="flex items-center mb-2">
                    <FileText className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium">Relevant Knowledge Base</span>
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      Vector Search Results
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <a href="#" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                          Billing Discrepancy Resolution Guide
                        </a>
                        <div className="text-xs text-gray-500 mt-1">
                          Internal KB • Google Drive • billing-procedures/
                        </div>
                      </div>
                      <span className="text-xs font-medium text-green-600">96%</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <a href="#" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                          Duplicate Charge Investigation Process
                        </a>
                        <div className="text-xs text-gray-500 mt-1">
                          Internal KB • Confluence • support-workflows/
                        </div>
                      </div>
                      <span className="text-xs font-medium text-green-600">93%</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <a href="#" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                          Zuora Billing API - Credit Management
                        </a>
                        <div className="text-xs text-gray-500 mt-1">
                          External KB • Zuora Docs • api-reference/
                        </div>
                      </div>
                      <span className="text-xs font-medium text-yellow-600">87%</span>
                    </div>
                  </div>
                </div>
              </div>
              ) : null}
            </div>
          )}

          {/* Customer Message */}
          <div className="space-y-4">
            {currentStep === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Waiting for customer contact...</p>
                <p className="text-sm">The system is ready to receive and process customer inquiries</p>
              </div>
            ) : currentStep >= 1 ? (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-800">{profileEnriched ? 'Marie Dubois' : 'Customer'}</span>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Customer</span>
                    {currentStep === 1 && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs animate-pulse">
                        Message Received
                      </span>
                    )}
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">
                      {showTranslation 
                        ? '"Hello, I received my monthly bill and I notice several duplicate charges. I see that I was billed twice for the same service on December 15th. Can you help me resolve this issue?"'
                        : '"Bonjour, j\'ai reçu ma facture mensuelle et je remarque plusieurs charges en double. Je vois que j\'ai été facturé deux fois pour le même service le 15 décembre. Pouvez-vous m\'aider à résoudre ce problème?"'
                      }
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Agent Response */}
            {showAgentResponse && (
              <div className="flex items-start space-x-3 animate-fade-in">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-800">Sarah Johnson</span>
                    <span className="text-xs text-gray-500">Just now</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Agent</span>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm text-gray-700">
                      {agentResponse}
                    </p>
                    
                    {/* Auto-Translation Process */}
                    {showAgentResponse && !showFrenchTranslation && currentStep >= 6 && (
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <div className="flex items-center text-xs text-blue-700">
                          <Loader className="w-3 h-3 mr-2 animate-spin" />
                          <span>Auto-translating to French...</span>
                        </div>
                      </div>
                    )}
                    
                    {/* French Translation */}
                    {showFrenchTranslation && (
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <div className="bg-blue-50 p-3 rounded border border-blue-200 mb-3">
                          <div className="flex items-center mb-2">
                            <Languages className="w-3 h-3 mr-1 text-blue-600" />
                            <span className="text-xs font-medium text-blue-800">AUTO-TRANSLATED TO FRENCH</span>
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              97% Confidence
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 italic">
                            "Bonjour Marie, je comprends votre préoccupation concernant les charges en double sur votre facture de décembre. J'ai examiné votre compte et je peux confirmer qu'il y a effectivement eu une erreur de facturation le 15 décembre. Je traite actuellement un crédit de 245 € sur votre compte, qui apparaîtra sur votre prochain relevé. Y a-t-il autre chose avec laquelle je peux vous aider concernant ce problème de facturation ?"
                          </p>
                        </div>
                        <div className="flex items-center text-xs text-green-700">
                          <Languages className="w-3 h-3 mr-1" />
                          <span>French translation sent to customer</span>
                          <Send className="w-3 h-3 ml-2" />
                          <CheckCircle className="w-3 h-3 ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Agent Response Input */}
            {!showAgentResponse && showAIRecommendations && (
              <div className="border border-gray-200 rounded-lg p-4">
                <textarea
                  placeholder="Type your response here..."
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={currentStep >= 5 ? agentResponse : ''}
                  readOnly={currentStep >= 5}
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <Languages className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Will be translated to French</span>
                  </div>
                  <button 
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentStep >= 5 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={currentStep < 5}
                  >
                    Send Response
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Related</h3>
            {currentStep >= 3 ? (
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span>Billing Records (5)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span>Previous Cases (2)</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-400">
                <p className="text-sm">No related items</p>
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Activity History</h3>
            <div className="space-y-3">
              {currentStep === 0 ? (
                <div className="text-center py-4 text-gray-400">
                  <p className="text-sm">No activity yet</p>
                </div>
              ) : (
                <>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <div className="text-sm">
                      <p className="font-medium">Customer message received</p>
                      <p className="text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  {currentStep >= 1 && (
                    <div className="flex items-start space-x-2 animate-fade-in">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                      <div className="text-sm">
                        <p className="font-medium">Customer profile enriched</p>
                        <p className="text-gray-600">2 hours ago</p>
                      </div>
                    </div>
                  )}
                </>
              )}
              {currentStep >= 2 && (
                <div className="flex items-start space-x-2 animate-fade-in">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <div className="text-sm">
                    <p className="font-medium">Case created</p>
                    <p className="text-gray-600">1 hour ago</p>
                  </div>
                </div>
              )}
              {currentStep >= 2 && (
                <div className="flex items-start space-x-2 animate-fade-in">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <div className="text-sm">
                    <p className="font-medium">Message translated</p>
                    <p className="text-gray-600">1 hour ago</p>
                  </div>
                </div>
              )}
              {showAIRecommendations && (
                <div className="flex items-start space-x-2 animate-fade-in">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                  <div className="text-sm">
                    <p className="font-medium">AI recommendations generated</p>
                    <p className="text-gray-600">1 hour ago</p>
                  </div>
                </div>
              )}
              {currentStep >= 6 && (
                <div className="flex items-start space-x-2 animate-fade-in">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                  <div className="text-sm">
                    <p className="font-medium">Agent response drafted</p>
                    <p className="text-gray-600">Just now</p>
                  </div>
                </div>
              )}
              {showFrenchTranslation && (
                <div className="flex items-start space-x-2 animate-fade-in">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <div className="text-sm">
                    <p className="font-medium">Response auto-translated to French</p>
                    <p className="text-gray-600">Just now</p>
                  </div>
                </div>
              )}
              {showFrenchTranslation && (
                <div className="flex items-start space-x-2 animate-fade-in">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                  <div className="text-sm">
                    <p className="font-medium">French response sent to customer</p>
                    <p className="text-gray-600">Just now</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Data Sources</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span>Salesforce CRM</span>
                <CheckCircle className="w-3 h-3 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Zuora Billing</span>
                <CheckCircle className="w-3 h-3 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Databricks Analytics</span>
                {profileEnriched ? (
                  <CheckCircle className="w-3 h-3 text-green-500" />
                ) : (
                  <div className="w-3 h-3 border border-gray-300 rounded-full" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>Vector DB (RAG)</span>
                {showAIRecommendations ? (
                  <CheckCircle className="w-3 h-3 text-green-500" />
                ) : (
                  <div className="w-3 h-3 border border-gray-300 rounded-full" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>Google Drive KB</span>
                {showAIRecommendations ? (
                  <CheckCircle className="w-3 h-3 text-green-500" />
                ) : (
                  <div className="w-3 h-3 border border-gray-300 rounded-full" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>Confluence Wiki</span>
                {showAIRecommendations ? (
                  <CheckCircle className="w-3 h-3 text-green-500" />
                ) : (
                  <div className="w-3 h-3 border border-gray-300 rounded-full" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>SharePoint Docs</span>
                {showAIRecommendations ? (
                  <CheckCircle className="w-3 h-3 text-green-500" />
                ) : (
                  <div className="w-3 h-3 border border-gray-300 rounded-full" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
