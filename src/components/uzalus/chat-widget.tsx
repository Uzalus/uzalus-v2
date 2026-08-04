'use client';

import { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/lib/i18n-context';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatWidget() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(`uzalus-${Date.now()}`);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initChat = async () => {
    if (initialized) return;
    setInitialized(true);
    setMessages([{ role: 'assistant', content: t('chat.welcome') }]);
  };

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: msg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, sessionId: sessionId.current }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Pardon, une erreur est survenue. Réessayez.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
    if (!open) initChat();
  };

  const suggestions = [t('chat.sug1'), t('chat.sug2'), t('chat.sug3'), t('chat.sug4')];

  return (
    <>
      {/* Floating button */}
      <button
        onClick={handleOpen}
        className={`fixed bottom-6 end-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          open
            ? 'bg-noir-lighter border border-gold/40 rotate-0'
            : 'gold-btn rotate-0 hover:scale-110'
        }`}
        aria-label={t('chat.title')}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 end-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] bg-noir-card border border-border rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="px-5 py-4 border-b border-border bg-gradient-to-r from-gold/10 to-transparent flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <Sparkles size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-gold">{t('chat.title')}</h3>
              <span className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                {t('chat.online')}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-gold/20' : 'bg-gold/10'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User size={14} className="text-gold" />
                  ) : (
                    <Bot size={14} className="text-gold" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gold/15 text-foreground rounded-tr-sm'
                      : 'bg-noir-lighter text-foreground/90 rounded-tl-sm border border-border'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                  <Bot size={14} className="text-gold" />
                </div>
                <div className="bg-noir-lighter border border-border px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && !loading && (
            <div className="px-4 pb-2">
              <p className="text-xs text-muted-foreground mb-2 font-medium">{t('chat.suggestions')}</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleSend(sug)}
                    className="text-xs px-3 py-1.5 rounded-full bg-noir-lighter border border-border text-foreground/70 hover:text-gold hover:border-gold/30 transition-colors"
                  >
                    {sug.length > 35 ? sug.slice(0, 35) + '...' : sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chat.placeholder')}
                disabled={loading}
                className="flex-1 bg-noir-lighter border border-border rounded-full px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-gold/50 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-full gold-btn flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
