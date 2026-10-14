import boxes from '@/assets/boxes.jpg';
import pallets from '@/assets/pallets.jpg';
import crates from '@/assets/crates.jpg';

export const contact = {
  phone: '(11) 4661-3191',
  whatsapp: '(11) 97411-8136',
  whatsappNumber: '5511974118136',
  emails: ['vendas@silbeyer.com.br', 'sac@silbeyer.com.br', 'silbeyer@silbeyer.com.br'],
  address: 'Rua Leonardo Scacciotti Neto, 150',
  neighborhood: 'Chácara Lídia Maria · Embu-Guaçu / SP',
};

export function whatsappUrl(message = 'Olá! Vim pelo site da Silbeyer e gostaria de solicitar um orçamento.') {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message.slice(0, 3500))}`;
}

export const products = [
  { id: 'caixas-macicas', category: 'Caixas', name: 'Caixas de madeira maciça', short: 'Uma estrutura robusta para proteger sua carga durante o transporte e o armazenamento, com medidas definidas para o seu produto.', image: boxes, specs: ['Madeira maciça de reflorestamento', 'Projeto conforme dimensões e peso da carga', 'Opções para mercado nacional e exportação'], message: 'caixas de madeira maciça' },
  { id: 'caixas-compensado', category: 'Caixas', name: 'Caixas de compensado', short: 'Fechamento em painéis para acondicionar produtos e equipamentos. A configuração acompanha as necessidades de proteção da sua operação.', image: boxes, specs: ['Fechamento em compensado', 'Estrutura em madeira', 'Dimensões definidas conforme o produto'], message: 'caixas de compensado' },
  { id: 'pallets-duas', category: 'Pallets', name: 'Pallets de 2 entradas', short: 'Organize a movimentação e o armazenamento da carga com acesso por dois lados e uma configuração adequada à sua operação.', image: pallets, specs: ['Acesso por duas entradas', 'Reforço invertido ou paralelo', 'Medidas conforme carga e movimentação'], message: 'pallets de 2 entradas com reforço invertido ou paralelo' },
  { id: 'pallets-quatro', category: 'Pallets', name: 'Pallets de 4 entradas', short: 'Acesso pelos quatro lados para dar mais flexibilidade à movimentação da carga e facilitar o posicionamento na sua rotina logística.', image: pallets, specs: ['Acesso pelos quatro lados', 'Reforço invertido ou paralelo', 'Dimensões conforme sua operação'], message: 'pallets de 4 entradas com reforço invertido ou paralelo' },
  { id: 'engradados', category: 'Engradados', name: 'Engradados industriais', short: 'Acondicionamento sob medida para máquinas, equipamentos e cargas industriais, considerando o formato da peça e as etapas de transporte.', image: crates, specs: ['Estrutura de madeira', 'Projeto conforme a carga industrial', 'Dimensões personalizadas'], message: 'engradados industriais sob medida' },
];
export type Product = (typeof products)[number];

export const quoteOptions = [...products.map(product => product.name), 'Tratamento NIMF 15 / IPPC', 'Embalagem especial / projeto sob medida'];

export function productQuoteMessage(product: Product) {
  return `Olá! Vim pelo site da Silbeyer e gostaria de cotar ${product.message}.\nProduto a embalar: \nDimensões (C × L × A): \nPeso da carga: \nQuantidade: \nCidade de entrega: \nUso nacional ou exportação: \nPodem me ajudar a definir a embalagem?`;
}

export const featuredProducts = products
  .filter(product => ['caixas-macicas', 'pallets-duas', 'engradados'].includes(product.id))
  .map(product => {
    if (product.id === 'caixas-macicas') return { ...product, name: 'Caixas de madeira', short: 'Madeira maciça ou compensado. Proteção sob medida para o seu produto.', label: 'MACIÇA E COMPENSADO' };
    if (product.id === 'pallets-duas') return { ...product, name: 'Pallets de madeira', short: '2 ou 4 entradas, com reforço invertido ou paralelo. Eficiência para sua logística.', label: '2 E 4 ENTRADAS' };
    return { ...product, label: 'PROJETOS SOB MEDIDA' };
  });

export function pageHead(title: string, description: string, path: string) {
  return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { property: 'og:url', content: path }, { name: 'twitter:card', content: 'summary_large_image' }], links: [{ rel: 'canonical', href: path }] };
}