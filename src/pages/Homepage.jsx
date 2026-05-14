import React, { useState } from 'react';
import Sidebar from '@/components/aeromind/Sidebar';
import ModelSwitcher from '@/components/aeromind/ModelSwitcher';
import ChatArea from '@/components/aeromind/ChatArea';
import ChatInput from '@/components/aeromind/ChatInput';
import SettingsPanel from '@/components/aeromind/SettingsPanel';
import ModelsPanel from '@/components/aeromind/ModelsPanel.tsx';

const INITIAL_MESSAGES = [
  {
    role: 'user',
    content: 'How did we humans come to the conclusion that there are only 24 hours in a day? Be Brief.',
  },
  {
    role: 'assistant',
    content: 'Ancient Egyptians split daylight into 12 parts using sundials and nighttime into 12 using stars. That made 24 total segments, and later civilizations kept it—so it became the standard.',
  },
  {
    role: 'user',
    content: 'And, what was the system used before that? Give me a rundown of the history of how time was measured',
  },
];

export default function Homepage() {
  const [activeNav, setActiveNav] = useState('homepage');
  const [selectedModel, setSelectedModel] = useState('ChatGPT');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(true);

  const handleSend = (text) => {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'That\'s a great question! Early humans used natural phenomena like sunrise and sunset, shadow lengths, and star positions. Water clocks and candle clocks came next, followed by mechanical clocks in medieval Europe. The modern 24-hour system was standardized internationally in the 19th century.',
        },
      ]);
    }, 2500);
  };

  const handleSelectChat = (chat) => {
    setActiveNav('homepage');
    setMessages([{ role: 'user', content: chat }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Let me help you with that! Here\'s what I know...' },
      ]);
    }, 1500);
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        onSelectChat={handleSelectChat}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {activeNav === 'homepage' && (
          <>
            <ModelSwitcher
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
            <ChatArea messages={messages} isTyping={isTyping} />
            <ChatInput onSend={handleSend} />
          </>
        )}

        {activeNav === 'models' && <ModelsPanel />}
        {activeNav === 'settings' && <SettingsPanel />}
      </div>
    </div>
  );
}