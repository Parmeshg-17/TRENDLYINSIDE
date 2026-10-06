import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bot, Send, User, Sparkles, RefreshCw, Copy, Check,
  Zap, Compass, MessageSquare, Lightbulb, TrendingUp
} from 'lucide-react';
import { askAssistant } from '../services/api';
import type { ChatMessage, CreatorContext } from '../types';
import {
  AdBanner,
  ErrorCard,
  CreatorToolkit,
} from '../components/AnalysisComponents';

const STARTER_PROMPTS = [
  {
    icon: <Zap className="w-3.5 h-3.5 text-amber-500" />,
    label: 'Refine My Hook',
    prompt: 'Can you rewrite my opening hook? Here is what I currently have: "Hey guys welcome back to another video today we are looking at..." How do I make this stop the scroll in 3 seconds?'
  },
  {
    icon: <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />,
    label: '10 High-CTR Titles',
    prompt: 'Give me 10 high-CTR title variations for a video about productivity habits that avoid cheesy clickbait.'
  },
  {
    icon: <TrendingUp className="w-3.5 h-3.5 text-green-500" />,
    label: 'Fix Retention Cliff',
    prompt: 'My videos consistently lose 35% of viewers between 0:00 and 0:45. What is the step-by-step retention salvage protocol to fix this?'
  },
  {
    icon: <Compass className="w-3.5 h-3.5 text-blue-500" />,
    label: 'Sponsor Pitch Email',
    prompt: 'Give me a battle-tested cold pitch email template to send to SaaS and software brands for a sponsored integration.'
  }
];

export default function CreatorAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `👋 **Welcome to your AI Creator Assistant!**

I am your personal AI content strategist, script doctor, and growth coach. How can I help you today?

- 🎯 **Hook & Intro Doctoring**: Turn weak intros into 3-second scroll stoppers.
- ⚡ **Title & Packaging Brainstorms**: Generate high-CTR titles paired with thumbnail concepts.
- 📉 **Retention Diagnostics**: Diagnose pacing drops and retention cliffs.
- 💼 **Monetization & Brand Pitching**: Exact email scripts and rate calculators for sponsors.

Click one of the prompt chips below or type your question to get started!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [niche, setNiche] = useState('Tech & AI');
  const [channelName, setChannelName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    setError('');
    const userMsg: ChatMessage = {
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageText) setInput('');
    setIsLoading(true);

    try {
      const creatorContext: CreatorContext = {
        niche,
        channelName: channelName.trim() || undefined,
        primaryGoal: 'Audience Growth & Retention'
      };

      const res = await askAssistant({
        message: userMsg.content,
        history: messages.slice(-6),
        creatorContext
      });

      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: res.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Failed to get a response from the assistant.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Conversation reset! What creator project or video idea would you like to brainstorm next?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-midnight-surface pt-28 md:pt-32 pb-16">
      <div className="container-main max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fjord-blue/10 border border-fjord-blue/20 text-fjord-blue text-xs font-semibold mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Phase 3 AI Creator Intelligence
          </motion.div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-midnight-abyss mb-2">
            AI Creator Assistant & Strategist
          </h1>
          <p className="text-frosty-slate text-sm md:text-base max-w-2xl mx-auto">
            Your on-demand algorithmic consultant. Brainstorm hooks, critique packaging, diagnose retention dips, and script brand sponsorship pitches.
          </p>
        </div>

        {/* Creator Context Settings Bar */}
        <div className="card p-4 mb-6 bg-white/80 border border-glacial-sky/30 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-midnight-abyss">
              <span className="text-frosty-slate">Niche Context:</span>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="bg-glacial-sky/10 border border-glacial-sky/30 rounded-lg px-2.5 py-1 text-xs text-midnight-abyss focus:outline-none focus:border-fjord-blue"
              >
                <option value="Tech & AI">Tech & AI</option>
                <option value="Gaming">Gaming</option>
                <option value="Finance & Investing">Finance & Investing</option>
                <option value="Lifestyle & Vlog">Lifestyle & Vlog</option>
                <option value="Fitness & Health">Fitness & Health</option>
                <option value="Education & Science">Education & Science</option>
                <option value="Business & Startups">Business & Startups</option>
                <option value="General Creator">General Creator</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-midnight-abyss">
              <span className="text-frosty-slate">Handle:</span>
              <input
                type="text"
                placeholder="@yourchannel (optional)"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                className="bg-glacial-sky/10 border border-glacial-sky/30 rounded-lg px-2.5 py-1 text-xs text-midnight-abyss placeholder-frosty-slate/60 focus:outline-none focus:border-fjord-blue w-36"
              />
            </div>
          </div>

          <button
            onClick={handleClear}
            className="text-xs text-frosty-slate hover:text-midnight-abyss flex items-center gap-1.5 transition-colors"
            title="Reset Chat"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Clear Chat
          </button>
        </div>

        {/* Chat Container */}
        <div className="card border border-glacial-sky/30 shadow-card bg-white flex flex-col h-[650px] overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-fjord-blue to-midnight-abyss text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed relative group ${
                    msg.role === 'user'
                      ? 'bg-midnight-abyss text-white rounded-tr-none'
                      : 'bg-[#F4F8FC] text-midnight-abyss border border-glacial-sky/20 rounded-tl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans space-y-2">
                    {msg.content}
                  </div>

                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-black/5 text-[11px] opacity-75">
                    <span>{msg.timestamp || 'Just now'}</span>
                    {msg.role === 'assistant' && (
                      <button
                        onClick={() => handleCopy(msg.content, idx)}
                        className="hover:text-fjord-blue flex items-center gap-1 transition-colors"
                        title="Copy message"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-green-600" />
                            <span className="text-green-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-fjord-blue text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}

            {isLoading && (
              <div className="flex gap-3.5 justify-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-fjord-blue to-midnight-abyss text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-[#F4F8FC] border border-glacial-sky/20 rounded-2xl rounded-tl-none p-4 text-sm text-frosty-slate flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-fjord-blue animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-fjord-blue animate-pulse delay-150" />
                  <span className="w-2 h-2 rounded-full bg-fjord-blue animate-pulse delay-300" />
                  <span className="text-xs text-frosty-slate ml-1">Analyzing creator strategy...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="my-2">
                <ErrorCard message={error} onRetry={() => handleSend()} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips */}
          <div className="p-3 bg-[#F8FAFC] border-t border-glacial-sky/20 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs text-frosty-slate whitespace-nowrap pl-1 font-semibold flex items-center gap-1">
              <MessageSquare className="w-3 h-3 text-fjord-blue" />
              Quick:
            </span>
            {STARTER_PROMPTS.map((starter, i) => (
              <button
                key={i}
                onClick={() => handleSend(starter.prompt)}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-glacial-sky/20 border border-glacial-sky/30 text-xs text-midnight-abyss whitespace-nowrap transition-all shadow-2xs hover:border-fjord-blue disabled:opacity-50"
              >
                {starter.icon}
                {starter.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-glacial-sky/20">
            <div className="relative flex items-end gap-2 bg-[#F7FAFC] border border-glacial-sky/30 rounded-2xl p-2 focus-within:border-fjord-blue focus-within:bg-white transition-all shadow-inner">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about hooks, titles, retention dips, sponsor pitches, or video scripts..."
                rows={2}
                className="flex-1 bg-transparent resize-none border-none outline-none text-sm text-midnight-abyss placeholder-frosty-slate px-2 py-1 max-h-32"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="btn-primary rounded-xl px-4 py-2.5 text-xs font-semibold shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>
            <p className="text-[11px] text-frosty-slate mt-2 text-center">
              Pro tip: Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border text-[10px]">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border text-[10px]">Shift + Enter</kbd> for a new line. 100% Free. No login required.
            </p>
          </div>
        </div>

        {/* Ad Banner */}
        <div className="py-8">
          <AdBanner className="my-2" />
        </div>

        {/* Creator Growth Toolkit */}
        <CreatorToolkit />
      </div>
    </div>
  );
}
