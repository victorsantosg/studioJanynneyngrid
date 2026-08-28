import { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageCircle, X, Send, RefreshCw, Palette, ExternalLink, Check, Heart } from 'lucide-react';
import { sendChatMessage } from '../services/groqChat';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: 'Olá! Sou a **Assistente Criativa do Studio Janynne Yngrid** 🌸✨\n\nEstou aqui para te ajudar a desenhar o conceito perfeito da sua próxima coleção de estampas em aquarela. Me conte um pouco: qual o segmento da sua marca ou qual ideia você tem em mente?'
};

const SUGGESTIONS = [
  '🌸 Criar uma coleção infantil delicada',
  '🌊 Estampas exclusivas para moda praia',
  '👗 Estampa botânica para vestidos longos',
  '🎨 Como funciona o processo e prazos?'
];

const WHATSAPP_NUMBER = '558586299263';

function parseBriefingCard(content) {
  const match = content.match(/:::BRIEFING_CARD\s*([\s\S]*?)\s*:::/);
  if (!match) return { text: content, card: null };

  const text = content.replace(/:::BRIEFING_CARD\s*[\s\S]*?\s*:::/, '').trim();
  try {
    const card = JSON.parse(match[1]);
    return { text, card };
  } catch (e) {
    console.error('Erro ao fazer parse do Briefing Card:', e);
    return { text: content, card: null };
  }
}

export default function AIBriefingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const newMessages = [...messages, { role: 'user', content: text.trim() }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Filtrar mensagens para envio à API
      const apiMessages = newMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const assistantReply = await sendChatMessage(apiMessages);
      setMessages([...newMessages, { role: 'assistant', content: assistantReply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Desculpe, tive uma oscilação na conexão com a inteligência artificial. Poderia tentar novamente ou nos chamar diretamente no WhatsApp?'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInputValue('');
  };

  const openWhatsApp = (card) => {
    const defaultText = `Olá Janynne! Criei um briefing com a sua Assistente de IA no site:\n\n` +
      `✨ *Coleção:* ${card.titulo}\n` +
      `🎯 *Nicho:* ${card.nicho}\n` +
      `🎨 *Tema & Elementos:* ${card.tema}\n` +
      `🌈 *Cartela de Cores:* ${card.cores}\n` +
      `👗 *Peças Pretendidas:* ${card.pecas}\n\n` +
      `Gostaria de saber como podemos dar início a esse projeto!`;

    const messageText = card.resumoWhatsApp || defaultText;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Botão Flutuante (Trigger) */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5rem'
      }}>
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            style={{
              background: 'white',
              padding: '0.45rem 0.9rem',
              borderRadius: '20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              border: '1px solid rgba(232, 131, 154, 0.3)',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--ink)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              animation: 'pulse-soft 4s infinite ease-in-out'
            }}
          >
            <Sparkles size={14} style={{ color: 'var(--rosa-deep)' }} />
            <span>Criar Briefing com IA</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir Assistente de Briefing"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--rosa-deep) 0%, #d46582 100%)',
            color: 'white',
            border: '3px solid white',
            boxShadow: '0 10px 30px rgba(232, 131, 154, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
          }}
        >
          {isOpen ? <X size={26} /> : <Palette size={26} />}
        </button>
      </div>

      {/* Janela de Chat Flutuante */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '96px',
          right: '24px',
          width: 'min(420px, calc(100vw - 32px))',
          height: 'min(620px, calc(100vh - 120px))',
          background: 'var(--creme-warm)',
          borderRadius: '28px',
          boxShadow: '0 20px 60px rgba(28, 20, 16, 0.2)',
          border: '1px solid var(--border-soft)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9999,
          overflow: 'hidden',
          animation: 'slideUpFade 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #FFF9F6 0%, #FEEFF2 100%)',
            padding: '1.1rem 1.25rem',
            borderBottom: '1px solid rgba(232, 131, 154, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'var(--rosa-pale)',
                border: '2px solid var(--rosa-deep)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <Sparkles size={20} color="var(--rosa-deep)" />
                <div style={{
                  position: 'absolute',
                  bottom: '1px',
                  right: '1px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  border: '2px solid white'
                }} />
              </div>
              <div>
                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  color: 'var(--ink)',
                  margin: 0,
                  fontWeight: 700
                }}>
                  Assistente Criativa
                </h4>
                <span style={{ fontSize: '0.74rem', color: 'var(--ink-soft)' }}>
                  Studio Janynne Yngrid &bull; IA
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                onClick={handleResetChat}
                title="Reiniciar Conversa"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ink-soft)',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Fechar"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ink-soft)',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}>
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              const { text, card } = isUser ? { text: msg.content, card: null } : parseBriefingCard(msg.content);

              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: isUser ? 'flex-end' : 'flex-start',
                    width: '100%'
                  }}
                >
                  <div style={{
                    maxWidth: '85%',
                    padding: '0.85rem 1.05rem',
                    borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: isUser ? 'var(--rosa-deep)' : 'white',
                    color: isUser ? 'white' : 'var(--ink)',
                    fontSize: '0.86rem',
                    lineHeight: 1.48,
                    boxShadow: isUser ? '0 4px 14px rgba(232, 131, 154, 0.3)' : '0 4px 16px rgba(0,0,0,0.04)',
                    border: isUser ? 'none' : '1px solid var(--border-soft)',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {text}

                    {/* Renderização Especial do Card de Briefing */}
                    {card && (
                      <div style={{
                        marginTop: '0.9rem',
                        background: 'linear-gradient(135deg, #FFF7F9 0%, #F5F9F3 100%)',
                        borderRadius: '16px',
                        padding: '1rem',
                        border: '1.5px solid var(--rosa-pale)',
                        boxShadow: '0 4px 15px rgba(232, 131, 154, 0.12)',
                        color: 'var(--ink)'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontFamily: 'var(--font-script)',
                          fontSize: '1.25rem',
                          color: 'var(--rosa-deep)',
                          marginBottom: '0.4rem'
                        }}>
                          <Palette size={16} />
                          <span>Briefing de Coleção Finalizado</span>
                        </div>

                        <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          <div><strong>✨ Coleção:</strong> {card.titulo}</div>
                          <div><strong>🎯 Nicho:</strong> {card.nicho}</div>
                          <div><strong>🎨 Tema:</strong> {card.tema}</div>
                          <div><strong>🌈 Cores:</strong> {card.cores}</div>
                          <div><strong>👗 Peças:</strong> {card.pecas}</div>
                        </div>

                        <button
                          onClick={() => openWhatsApp(card)}
                          style={{
                            marginTop: '0.85rem',
                            width: '100%',
                            background: '#25D366',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '0.65rem 0.9rem',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <ExternalLink size={15} />
                          <span>Enviar Briefing no WhatsApp</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '18px 18px 18px 4px',
                  background: 'white',
                  border: '1px solid var(--border-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--ink-soft)',
                  fontSize: '0.82rem'
                }}>
                  <RefreshCw size={14} className="spin" style={{ color: 'var(--rosa-deep)' }} />
                  <span>Pensando nas cores e estampas...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips (Quando poucas mensagens) */}
          {messages.length <= 2 && (
            <div style={{
              padding: '0 1rem 0.6rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem'
            }}>
              {SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(sug)}
                  style={{
                    background: 'white',
                    border: '1px solid rgba(232, 131, 154, 0.35)',
                    borderRadius: '14px',
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.74rem',
                    color: 'var(--ink-soft)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <div style={{
            padding: '0.75rem 1rem',
            background: 'white',
            borderTop: '1px solid var(--border-soft)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua ideia de estampa ou dúvida..."
              style={{
                flex: 1,
                padding: '0.65rem 0.9rem',
                borderRadius: '99px',
                border: '1px solid var(--border-soft)',
                outline: 'none',
                fontSize: '0.84rem',
                color: 'var(--ink)'
              }}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: inputValue.trim() && !isLoading ? 'var(--rosa-deep)' : 'var(--border-soft)',
                color: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputValue.trim() && !isLoading ? 'pointer' : 'default',
                transition: 'all 0.2s ease'
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
