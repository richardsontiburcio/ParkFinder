# ParkFinder - Protótipo de Estacionamento Online

## Descrição
O ParkFinder é um protótipo de aplicativo web para encontrar estacionamentos próximos. O usuário pode buscar por destinos, visualizar estacionamentos no mapa e ver detalhes completos de cada local.

## Funcionalidades Implementadas

### 🗺️ Tela Principal (Mapa)
- **Mapa interativo** com visualização de estacionamentos
- **Barra de busca** para inserir destinos
- **Marcadores azuis** representando estacionamentos disponíveis
- **Navegação inferior** com ícones de Início e Perfil
- **Botão de localização atual** (GPS)

### 📍 Marcadores de Estacionamento
- **5 estacionamentos simulados** espalhados pelo mapa
- **Clique nos marcadores** para ver informações rápidas
- **Card popup** com informações básicas ao clicar
- **Transição suave** para tela de detalhes

### 📋 Tela de Detalhes
- **Informações completas** do estacionamento selecionado
- **Preço por hora** com destaque visual
- **Horário de funcionamento** detalhado
- **Status de disponibilidade** (Disponível/Lotado)
- **Comodidades visuais** com ícones:
  - 🏠 Cobertura
  - 🛡️ Segurança
  - ♿ Acessibilidade
  - 📹 Monitoramento
  - ⚡ Carregamento elétrico
  - 💳 Pagamento por cartão

### 📱 Design Responsivo
- **Interface mobile-first** otimizada para smartphones
- **Cores consistentes** seguindo o design system
- **Animações suaves** nos marcadores e transições
- **Tipografia clara** e hierarquia visual bem definida

## Dados Simulados

### Estacionamentos Disponíveis:
1. **Estacionamento Centro** - R$ 8,00/hora - 24h - Disponível
2. **Shopping Plaza** - R$ 12,00/hora - 8:00-22:00 - Disponível  
3. **Estacionamento Norte** - R$ 6,00/hora - 6:00-20:00 - Lotado
4. **Garagem Sul** - R$ 10,00/hora - 24h - Disponível
5. **Estacionamento Oeste** - R$ 7,00/hora - 7:00-19:00 - Disponível

## Tecnologias Utilizadas
- **React 18** - Framework principal
- **Tailwind CSS** - Estilização e design system
- **Lucide React** - Ícones modernos
- **Vite** - Build tool e desenvolvimento
- **shadcn/ui** - Componentes de interface

## Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou pnpm

### Instalação
```bash
cd parkfinder-app
pnpm install
```

### Desenvolvimento
```bash
pnpm run dev --host
```
Acesse: http://localhost:5174

### Build para Produção
```bash
pnpm run build
```

## Estrutura do Projeto
```
parkfinder-app/
├── src/
│   ├── components/
│   │   ├── ui/           # Componentes base (shadcn/ui)
│   │   ├── MapView.jsx   # Componente do mapa
│   │   ├── SearchBar.jsx # Barra de busca
│   │   ├── ParkingDetails.jsx # Tela de detalhes
│   │   └── Badge.jsx     # Componente de badge
│   ├── assets/           # Imagens e recursos
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos customizados
│   └── main.jsx         # Ponto de entrada
├── public/              # Arquivos públicos
└── design-system.md     # Documentação do design
```

## Próximos Passos (Roadmap)

### Funcionalidades Futuras:
- [ ] Integração com API real de mapas (Google Maps/OpenStreetMap)
- [ ] Sistema de autenticação de usuários
- [ ] Reserva real de vagas com pagamento
- [ ] Histórico de estacionamentos utilizados
- [ ] Avaliações e comentários dos usuários
- [ ] Notificações push para lembretes
- [ ] Filtros avançados (preço, comodidades, distância)
- [ ] Modo escuro/claro
- [ ] Compartilhamento de localização
- [ ] Integração com calendário

### Melhorias Técnicas:
- [ ] Testes automatizados (Jest/Testing Library)
- [ ] PWA (Progressive Web App)
- [ ] Otimização de performance
- [ ] Acessibilidade (WCAG)
- [ ] Internacionalização (i18n)

## Design System

### Cores Principais:
- **Azul Principal**: #2563EB
- **Verde (Disponível)**: #10B981  
- **Vermelho (Indisponível)**: #EF4444
- **Cinza Claro**: #F8FAFC

### Tipografia:
- **Fonte**: Inter, system-ui, sans-serif
- **Tamanhos**: 32px (títulos), 16px (texto), 14px (pequeno)

## Contato
Protótipo desenvolvido para demonstração das funcionalidades do ParkFinder.

