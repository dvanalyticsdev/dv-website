import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RobotCanvas } from './RobotCanvas';
import { RobotSpeechBubbles } from './RobotSpeechBubbles';

type ChatRole = 'assistant' | 'user';

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

interface ChatbotWidgetProps {
  activePage: string;
  robotPose: 'idle' | 'wave' | 'programs' | 'benefits' | 'roadmap' | 'footer';
  robotClicked: boolean;
  onRobotClick: () => void;
  blinkTrigger: number;
  hoveredSection: string | null;
}

const initialAssistantMessage =
  "Hi! I'm Eva, your Agentify AI Guide. I can help you with anything on our site—from details on our training programs and career roadmaps, to enterprise AI services, office locations, and our mission. What can I help you find today?";

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ 
  activePage,
  robotPose,
  robotClicked,
  onRobotClick,
  blinkTrigger,
  hoveredSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [relativeMouse, setRelativeMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const syncMobileState = () => {
      setIsMinimized(window.innerWidth <= 768);
    };

    syncMobileState();
    window.addEventListener('resize', syncMobileState);

    return () => {
      window.removeEventListener('resize', syncMobileState);
    };
  }, []);

  useEffect(() => {
    if (isOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      let robotCenterX = window.innerWidth - 100;
      let robotCenterY = window.innerHeight - 100;

      if (widgetRef.current) {
        const rect = widgetRef.current.getBoundingClientRect();
        robotCenterX = rect.left + rect.width / 2;
        robotCenterY = rect.top + rect.height / 2;
      }

      const dx = e.clientX - robotCenterX;
      const dy = robotCenterY - e.clientY; // Invert Y so up is positive

      // Normalize by 250px reference radius, mapping tracking to [-1.2, 1.2]
      setRelativeMouse({
        x: dx / 250,
        y: dy / 250,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: initialAssistantMessage,
    },
  ]);

  const messagesRef = useRef<HTMLDivElement | null>(null);

  const courseContext = useMemo(() => {
    if (activePage.startsWith('course-')) {
      return activePage.replace('course-', '');
    }

    if (activePage.startsWith('enroll-')) {
      return activePage.replace('enroll-', '');
    }

    return undefined;
  }, [activePage]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let ignore = false;

    void fetch('/api/health')
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) {
          setIsConfigured(Boolean(data?.configured));
        }
      })
      .catch(() => {
        if (!ignore) {
          setIsConfigured(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [isOpen]);

  useEffect(() => {
    const element = messagesRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleSend = async (rawMessage?: string) => {
    const message = (rawMessage ?? input).trim();
    if (!message || isLoading) {
      return;
    }

    const nextUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
    };

    const nextMessages = [...messages, nextUserMessage];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          page: activePage,
          courseContext,
          history: nextMessages.map((item) => ({
            role: item.role,
            content: item.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? 'Chat request failed.');
      }

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.answer,
        },
      ]);

    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-error-${Date.now()}`,
          role: 'assistant',
          content:
            error instanceof Error
              ? `I could not reach the chatbot service: ${error.message}`
              : 'I could not reach the chatbot service right now.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: initialAssistantMessage,
      },
    ]);

    setInput('');
  };

  return (
    <>
      {isOpen ? (
        <div className="chatbot-overlay" onClick={() => setIsOpen(false)}>
          <section
            className="chatbot-panel"
            aria-label="DV Analytics chatbot"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="chatbot-header">
              <div className="chatbot-header-copy">
                <h3>Eva - DV Analytics Guide</h3>
                <p className="chatbot-subtitle">Ask about courses, enterprise services, mission, roadmaps, or office contacts.</p>
              </div>

              <div className="chatbot-header-actions">
                <button
                  type="button"
                  className="chatbot-clear-btn"
                  onClick={handleClearChat}
                  disabled={isLoading}
                >
                  Clear chat
                </button>
                <button
                  type="button"
                  className="chatbot-close-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chatbot"
                >
                  x
                </button>
              </div>
            </div>

            {!isConfigured ? (
              <div className="chatbot-status-banner">
                Gemini key not connected yet. Add `GEMINI_API_KEY` locally to make replies work.
              </div>
            ) : null}

            <div className="chatbot-body">
              <div className="chatbot-main">
                <div className="chatbot-messages" ref={messagesRef}>
                  {messages.map((message) => (
                    <div key={message.id} className={`chatbot-message ${message.role}`}>
                      <p>{message.content}</p>
                    </div>
                  ))}
                  {isLoading ? (
                    <div className="chatbot-message assistant loading">
                      <p>Thinking through the best fit...</p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="chatbot-footer">
                <form
                  className="chatbot-input-row"
                  onSubmit={(event) => {
                    event.preventDefault();
                    void handleSend();
                  }}
                >
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        void handleSend();
                      }
                    }}
                    placeholder="Ask about a course, tools, outcomes, services, mission, or contact info..."
                    rows={1}
                  />
                  <button type="submit" className="chatbot-send-btn" disabled={isLoading || !isConfigured}>
                    Send
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {/* Minimized restore pill */}
      {isMinimized && !isOpen && (
        <motion.button
          className="chatbot-restore-pill"
          onClick={() => setIsMinimized(false)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Bring Eva back"
        >
          <span className="restore-pill-icon">🤖</span>
          <span className="restore-pill-text">Eva</span>
        </motion.button>
      )}

      {/* Full robot widget */}
      {!isMinimized && (
        <motion.div 
          className={`chatbot-shell ${isOpen ? 'open' : ''}`}
          drag={!isOpen}
          dragMomentum={false}
          dragElastic={0.1}
          whileDrag={{ scale: 1.02 }}
        >
          {!isOpen && (
            <div className="robot-widget-container" ref={widgetRef}>
              <RobotSpeechBubbles 
                pose={robotPose} 
                isClicked={robotClicked} 
                onClick={() => setIsOpen(true)}
                hoveredSection={hoveredSection}
                onMinimize={() => setIsMinimized(true)}
              />
              <RobotCanvas 
                pose={robotPose} 
                onRobotClick={onRobotClick} 
                mini={true} 
                blinkTrigger={blinkTrigger}
                globalMouse={relativeMouse}
              />
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};
