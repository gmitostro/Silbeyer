import { createFileRoute, Link } from '@tanstack/react-router';
import { Ruler, PackageCheck, Truck, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageIntro, WhatsAppButton, QuoteBand } from '@/components/site';
import { pageHead } from '@/lib/silbeyer';
import crates from '@/assets/crates.jpg';

export const Route = createFileRoute('/solucoes')({
  head: () => pageHead('Embalagens Industriais Sob Medida | Silbeyer', 'Caixas, pallets e engradados desenvolvidos conforme dimensões, peso, transporte e armazenamento da sua carga. Converse com a Silbeyer sobre seu projeto.', '/solucoes'),
  component: Solutions,
});

function Solutions() {
  return <main>
    <PageIntro eyebrow="Soluções sob medida" title="Sua carga define o projeto." description="Cada produto tem um formato. Cada operação, uma necessidade. A embalagem deve acompanhar os dois." />
    <section className="container solutions-section">
      <div className="solutions-grid"><div className="company-image"><img src={crates} alt="Engradado de madeira para carga industrial — imagem ilustrativa" width={1024} height={768} /><span>Imagem ilustrativa</span></div><div className="solutions-copy"><span className="eyebrow">EMBALAGENS ESPECIAIS</span><h2>Da necessidade da carga à escolha da embalagem.</h2><p>Máquinas, equipamentos e produtos industriais podem exigir soluções diferentes de uma embalagem padronizada. A Silbeyer desenvolve caixas, pallets e engradados conforme as características informadas para cada projeto.</p><p>Dimensões, peso, forma de movimentação, armazenamento e destino orientam a conversa com nossa equipe. Para exportação, consulte também os requisitos de tratamento NIMF 15 / IPPC.</p><WhatsAppButton message="Olá! Gostaria de conversar sobre uma embalagem sob medida. Produto a embalar: \nDimensões: \nPeso: \nQuantidade: \nCidade de entrega: \nDestino nacional ou exportação: ">Cotar meu projeto</WhatsAppButton></div></div>
      <div className="section-heading solutions-heading"><div><span className="eyebrow">O QUE CONSIDERAMOS</span><h2>Proteção alinhada à sua operação.</h2></div></div>
      <div className="values-grid">{[{ icon: Ruler, title: 'Dimensões e peso', text: 'Medidas e características do produto orientam a configuração da embalagem.' }, { icon: Truck, title: 'Transporte e movimentação', text: 'A forma de manuseio e o destino ajudam a definir o tipo de caixa, pallet ou engradado.' }, { icon: PackageCheck, title: 'Armazenamento e proteção', text: 'As necessidades de acondicionamento entram na avaliação do projeto.' }].map(item => <div key={item.title}><item.icon size={30} /><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
    </section>
    <section className="project-process"><div className="container"><span className="eyebrow">DO PROJETO AO ORÇAMENTO</span><h2>Uma conversa objetiva, desde o início.</h2><ol className="process-grid"><li><span>01</span><h3>Conte sobre a carga</h3><p>Informe o produto, as medidas, o peso e, se possível, compartilhe fotos com o comercial.</p></li><li><span>02</span><h3>Defina a operação</h3><p>Indique a quantidade, a cidade de entrega e as necessidades de transporte ou exportação.</p></li><li><span>03</span><h3>Converse com nossa equipe</h3><p>O comercial avalia as informações com você para preparar uma proposta adequada ao projeto.</p></li></ol><Button asChild variant="outline"><Link to="/contato">Detalhar meu orçamento<ArrowUpRight size={17} /></Link></Button></div></section>
    <QuoteBand />
  </main>;
}