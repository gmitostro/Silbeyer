import { describe, expect, it } from 'vitest';
import { quoteSchema, buildQuoteMessage } from '@/components/quote-form';
import { products, productQuoteMessage, whatsappUrl } from '@/lib/silbeyer';

const data = { name: 'João', company: 'Indústria', phone: '(11) 98888-7777', email: 'compras@example.com', product: 'Caixas de madeira maciça', dimensions: '120 × 80 × 100 cm', quantity: '100', details: 'Máquina, 200 kg' };
describe('Orçamento comercial', () => {
  it('valida os dados e inclui todos os campos na mensagem', () => {
    expect(quoteSchema.safeParse(data).success).toBe(true);
    const message = buildQuoteMessage(data);
    for (const value of Object.values(data)) expect(message).toContain(value);
    const url = new URL(whatsappUrl(message));
    expect(url.hostname).toBe('wa.me');
    expect(url.pathname).toBe('/551146613191');
    expect(url.searchParams.get('text')).toBe(message);
  });
  it('recusa contatos inválidos e apresenta erro em português para produto ausente', () => {
    expect(quoteSchema.safeParse({ ...data, phone: 'abc' }).success).toBe(false);
    expect(quoteSchema.safeParse({ ...data, email: 'inválido' }).success).toBe(false);
    const result = quoteSchema.safeParse({ ...data, product: undefined });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues[0]?.message).toBe('Escolha um produto.');
  });
  it('gera cotação específica para cada produto', () => {
    for (const product of products) {
      expect(productQuoteMessage(product)).toContain(product.message);
      expect(productQuoteMessage(product)).toContain('Quantidade:');
      expect(productQuoteMessage(product)).toContain('Peso da carga:');
    }
  });
});