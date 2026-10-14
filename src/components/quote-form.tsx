import { useState, type FormEvent } from 'react';
import { z } from 'zod';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { quoteOptions, whatsappUrl } from '@/lib/silbeyer';

const optionalText = (max: number) => z.string().trim().max(max, 'Reduza o tamanho deste campo.');
export const quoteSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome.').max(100),
  company: optionalText(150),
  phone: z.string().trim().refine(value => value === '' || /^\+?[\d\s().-]+$/.test(value) && value.replace(/\D/g, '').length >= 10 && value.replace(/\D/g, '').length <= 15, 'Informe um telefone válido com DDD.'),
  email: z.union([z.literal(''), z.string().trim().email('Informe um e-mail válido.').max(254)]),
  product: z.string().refine(value => quoteOptions.includes(value), 'Escolha um produto.'),
  dimensions: optionalText(100),
  quantity: optionalText(50),
  details: optionalText(1500),
});

export function buildQuoteMessage(data: z.infer<typeof quoteSchema>) {
  return ['Olá! Vim pelo site da Silbeyer e gostaria de um orçamento.', `Nome: ${data.name}`, data.company && `Empresa: ${data.company}`, data.phone && `Telefone: ${data.phone}`, data.email && `E-mail: ${data.email}`, `Produto: ${data.product}`, data.dimensions && `Dimensões (C × L × A): ${data.dimensions}`, data.quantity && `Quantidade: ${data.quantity}`, data.details && `Observações: ${data.details}`].filter(Boolean).join('\n');
}

export function QuoteForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preparedUrl, setPreparedUrl] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = quoteSchema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of result.error.issues) { const key = String(issue.path[0]); if (!nextErrors[key]) nextErrors[key] = issue.message; }
      setErrors(nextErrors);
      event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    setErrors({});
    const url = whatsappUrl(buildQuoteMessage(result.data));
    setPreparedUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  const fieldError = (name: string) => errors[name] ? <p className="field-error" id={`${name}-error`}>{errors[name]}</p> : null;
  const accessibility = (name: string) => ({ 'aria-invalid': Boolean(errors[name]), 'aria-describedby': errors[name] ? `${name}-error` : undefined });
  return <form className="quote-form" onSubmit={submit} noValidate onChange={() => setPreparedUrl('')}>
    <span className="eyebrow">SEU PROJETO COMEÇA AQUI</span><h2>Solicite seu orçamento</h2>
    <div className="form-field"><label htmlFor="name">Seu nome *</label><input id="name" name="name" autoComplete="name" placeholder="Seu nome" required maxLength={100} {...accessibility('name')} />{fieldError('name')}</div>
    <div className="form-field"><label htmlFor="company">Empresa</label><input id="company" name="company" autoComplete="organization" placeholder="Nome da empresa" maxLength={150} {...accessibility('company')} />{fieldError('company')}</div>
    <div className="form-row"><div className="form-field"><label htmlFor="phone">Telefone com DDD</label><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(11) 99999-9999" maxLength={25} {...accessibility('phone')} />{fieldError('phone')}</div><div className="form-field"><label htmlFor="email">E-mail comercial</label><input id="email" name="email" type="email" autoComplete="email" placeholder="voce@empresa.com.br" maxLength={254} {...accessibility('email')} />{fieldError('email')}</div></div>
    <div className="form-field"><label htmlFor="product">Produto desejado *</label><select id="product" name="product" required defaultValue="" {...accessibility('product')}><option value="" disabled>Selecione o produto</option>{quoteOptions.map(item => <option key={item}>{item}</option>)}</select>{fieldError('product')}</div>
    <div className="form-row"><div className="form-field"><label htmlFor="dimensions">Dimensões (C × L × A)</label><input id="dimensions" name="dimensions" placeholder="Ex.: 120 × 80 × 100 cm" maxLength={100} /></div><div className="form-field"><label htmlFor="quantity">Quantidade</label><input id="quantity" name="quantity" placeholder="Ex.: 100 unidades" maxLength={50} /></div></div>
    <div className="form-field"><label htmlFor="details">Observações sobre a carga</label><textarea id="details" name="details" rows={4} maxLength={1500} placeholder="Produto, peso, cidade de entrega e necessidades de transporte ou exportação." /></div>
    <Button type="submit" className="quote-button form-submit"><MessageCircle size={18} />Continuar no WhatsApp<ArrowUpRight size={17} /></Button>
    {preparedUrl && <div className="quote-confirmation" role="status"><strong>Seu orçamento está pronto para enviar.</strong><p>Conclua o envio no WhatsApp. A Silbeyer só receberá os dados depois que você enviar a mensagem.</p><Button asChild variant="link"><a href={preparedUrl} target="_blank" rel="noopener noreferrer">Abrir conversa no WhatsApp<ArrowUpRight size={16} /></a></Button></div>}
    <p className="form-note">* Campos obrigatórios. Nenhum dado é armazenado neste site; o pedido é enviado por você no WhatsApp.</p>
  </form>;
}