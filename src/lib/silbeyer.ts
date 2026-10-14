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
  { id: 'caixas-macicas', category: 'Caixas', name: 'Caixas de madeira maciça', short: 'Proteção robusta para cargas que exigem segurança em cada etapa do transporte.', image: boxes, specs: ['Madeira maciça de reflorestamento', 'Dimensões sob medida', 'Mercado nacional e exportação'], message: 'caixas de madeira maciça' },
  { id: 'caixas-compensado', category: 'Caixas', name: 'Caixas de compensado', short: 'Fechamento completo e versatilidade para proteger seus produtos e equipamentos.', image: boxes, specs: ['Painéis de compensado', 'Estrutura reforçada em madeira', 'Projeto conforme sua carga'], message: 'caixas de compensado' },
  { id: 'pallets-duas', category: 'Pallets', name: 'Pallets de 2 entradas', short: 'Resistência e estabilidade para movimentar, armazenar e transportar sua carga.', image: pallets, specs: ['Acesso por duas entradas', 'Reforço invertido ou paralelo', 'Medidas conforme a operação'], message: 'pallets de 2 entradas com reforço invertido ou paralelo' },
  { id: 'pallets-quatro', category: 'Pallets', name: 'Pallets de 4 entradas', short: 'Mais flexibilidade de movimentação para uma logística prática e eficiente.', image: pallets, specs: ['Acesso pelos quatro lados', 'Reforço invertido ou paralelo', 'Madeira de reflorestamento'], message: 'pallets de 4 entradas com reforço invertido ou paralelo' },
  { id: 'engradados', category: 'Engradados', name: 'Engradados industriais', short: 'Estruturas sob medida para máquinas, equipamentos e cargas de grandes dimensões.', image: crates, specs: ['Estrutura de madeira reforçada', 'Projeto para cargas industriais', 'Dimensões personalizadas'], message: 'engradados industriais sob medida' },
];
export type Product = (typeof products)[number];

export const featuredProducts = [
  { ...products[0], name: 'Caixas de madeira', short: 'Madeira maciça ou compensado. Proteção sob medida para o seu produto.', label: 'MACIÇA E COMPENSADO' },
  { ...products[2], name: 'Pallets de madeira', short: '2 ou 4 entradas, com reforço invertido ou paralelo. Eficiência para sua logística.', label: '2 E 4 ENTRADAS' },
  { ...products[4], label: 'PROJETOS SOB MEDIDA' },
];

export function pageHead(title: string, description: string) {
  return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}