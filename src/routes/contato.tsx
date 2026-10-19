import { createFileRoute } from '@tanstack/react-router';
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';
import { QuoteForm } from '@/components/quote-form';
import { PageIntro, WhatsAppButton } from '@/components/site';
import { contact, pageHead, whatsappUrl } from '@/lib/silbeyer';

export const Route = createFileRoute('/contato')({ head: () => pageHead('Contato e Orçamento | Silbeyer Embalagens', 'Solicite um orçamento pelo WhatsApp (11) 4661-3191. Telefone (11) 4661-3191, vendas@silbeyer.com.br. Silbeyer em Embu-Guaçu/SP.', '/contato'), component: Contact });

function Contact() {
  return <main><PageIntro eyebrow="Contato e orçamento" title="Vamos encontrar a sua solução." description="Fale diretamente com nossa equipe comercial ou envie os detalhes do seu projeto pelo WhatsApp." /><section className="container contact-section"><div className="contact-details"><span className="eyebrow">FALE COM A SILBEYER</span><h2>Uma conversa.<br />Muitas possibilidades.</h2><WhatsAppButton>Conversar no WhatsApp</WhatsAppButton><div className="contact-item"><Phone /><div><h3>Telefone</h3><a href="tel:+551146613191">{contact.phone}</a></div></div><div className="contact-item"><MessageCircle /><div><h3>WhatsApp comercial</h3><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">{contact.whatsapp}</a></div></div><div className="contact-item"><Mail /><div><h3>E-mails</h3>{contact.emails.map(email => <a key={email} href={`mailto:${email}`}>{email}</a>)}</div></div><div className="contact-item"><MapPin /><div><h3>Localização</h3><p>{contact.address}<br />{contact.neighborhood}</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Rua+Leonardo+Scacciotti+Neto+150+Embu+Guaçu+SP" target="_blank" rel="noopener noreferrer">Ver no Google Maps<ArrowUpRight size={16} /></a></div></div></div><QuoteForm /></section></main>;
}