import { Link, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Phone, MapPin, Menu, X, MessageCircle, Box, Leaf, ShieldCheck, Ruler, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contact, whatsappUrl, productQuoteMessage, type Product } from '@/lib/silbeyer';
import logo from '@/assets/silbeyer-logo.png.asset.json';

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return <Link to="/" aria-label="Silbeyer — início" className={`brand ${inverse ? 'brand-inverse' : ''}`}><img className="brand-logo" src={logo.url} alt="Silbeyer Embalagens de Madeira" width={835} height={500} /></Link>;
}

export function WhatsAppButton({ children = 'Solicitar orçamento', message, className = '', outline = false }: { children?: React.ReactNode; message?: string; className?: string; outline?: boolean }) {
  return <Button asChild variant={outline ? 'outline' : 'default'} className={`quote-button ${className}`}><a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />{children}<ArrowUpRight size={17} /></a></Button>;
}

const navigation = [{ to: '/', name: 'Início' }, { to: '/empresa', name: 'A Silbeyer' }, { to: '/produtos', name: 'Produtos' }, { to: '/solucoes', name: 'Sob medida' }, { to: '/tratamento', name: 'NIMF 15' }, { to: '/contato', name: 'Contato' }] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: state => state.location.pathname });
  return <><div className="topbar"><div className="container topbar-inner"><span>Da nossa madeira, a segurança da sua carga.</span><div><a href="tel:+551146613191"><Phone size={12} />{contact.phone}</a><span className="topbar-location"><MapPin size={12} />Embu-Guaçu, SP</span></div></div></div><header className="site-header"><div className="container header-inner"><Brand /><nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(item => <Link key={item.to} to={item.to} className={pathname === item.to ? 'active' : ''}>{item.name}</Link>)}</nav><WhatsAppButton className="header-quote">Pedir orçamento</WhatsAppButton><Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)} aria-expanded={open}>{open ? <X /> : <Menu />}</Button></div>{open && <nav className="mobile-nav" aria-label="Navegação móvel">{navigation.map(item => <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>{item.name}<ArrowUpRight size={16} /></Link>)}<WhatsAppButton /></nav>}</header></>;
}

export function Footer() {
  return <footer className="site-footer"><div className="container footer-grid"><div><Brand inverse /><p>Embalagens de madeira feitas para proteger<br />o que move o seu negócio.</p><span className="footer-location"><MapPin size={15} />Embu-Guaçu, São Paulo</span></div><div><h3>Explore</h3>{navigation.slice(1).map(item => <Link key={item.to} to={item.to}>{item.name}</Link>)}</div><div><h3>Fale com a Silbeyer</h3><a href="tel:+551146613191"><Phone size={15} />{contact.phone}</a><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} />{contact.whatsapp}</a><a href={`mailto:${contact.emails[0]}`}><Mail size={15} />{contact.emails[0]}</a><a href={`mailto:${contact.emails[1]}`}>{contact.emails[1]}</a></div><div><h3>Onde estamos</h3><p>{contact.address}<br />Chácara Lídia Maria<br />Embu-Guaçu / SP</p><a href="https://www.google.com/maps/search/?api=1&query=Rua+Leonardo+Scacciotti+Neto+150+Embu+Guaçu+SP" target="_blank" rel="noopener noreferrer">Ver no mapa <ArrowUpRight size={15} /></a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Silbeyer Embalagens de Madeira. Todos os direitos reservados.</span><span>Madeira de origem responsável. Proteção de verdade.</span></div></footer>;
}

export function FloatingWhatsApp() {
  return <Button asChild className="floating-whatsapp" size="icon"><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Conversar com a Silbeyer no WhatsApp" title="Fale com nosso comercial"><MessageCircle /></a></Button>;
}

export function ProductCard({ product, label }: { product: Product; label?: string }) {
  return <article className="product-card"><Link to="/produtos" className="product-image-link" aria-label={`Conhecer ${product.name}`}><img src={product.image} alt={`${product.name} — imagem ilustrativa`} width={1024} height={768} loading="lazy" />{label && <span className="product-label">{label}</span>}<span className="product-image-arrow"><ArrowUpRight size={19} /></span></Link><div className="product-info"><h3>{product.name}</h3><p>{product.short}</p><Button asChild variant="link" className="product-quote"><a href={whatsappUrl(productQuoteMessage(product))} target="_blank" rel="noopener noreferrer">Cotar pelo WhatsApp<ArrowUpRight size={16} /></a></Button></div></article>;
}

export function QuoteBand() {
  return <section className="quote-band"><div className="container quote-band-inner"><div><span className="eyebrow">VAMOS CONVERSAR?</span><h2>A embalagem certa começa<br />com uma boa conversa.</h2><p>Conte o que você precisa. Nossa equipe encontra a solução.</p></div><WhatsAppButton>Falar com o comercial</WhatsAppButton></div></section>;
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-intro"><div className="container"><div className="breadcrumb"><Link to="/">Início</Link><ArrowRight size={12} /><span>{eyebrow}</span></div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div></section>;
}

export const benefits = [{ icon: Ruler, title: 'Feitas sob medida', text: 'Projetos de acordo com a sua carga.' }, { icon: ShieldCheck, title: 'NIMF 15 / IPPC', text: 'Preparadas para ir mais longe.' }, { icon: Leaf, title: 'Madeira de reflorestamento', text: 'Origem responsável, qualidade real.' }, { icon: Box, title: 'Proteção em cada detalhe', text: 'Segurança do início ao destino.' }];