# ParkFinder: Visão Geral do Projeto

## O que é o ParkFinder?

O ParkFinder é um protótipo de aplicativo móvel e plataforma online inovadora, projetado para revolucionar a maneira como os usuários encontram e utilizam estacionamentos em áreas urbanas. Em sua essência, o ParkFinder atua como um sistema de estacionamento online, oferecendo uma interface intuitiva baseada em mapa que permite aos motoristas localizar rapidamente vagas de estacionamento disponíveis nas proximidades de seu destino desejado. A principal proposta de valor do ParkFinder reside na sua capacidade de simplificar o processo de busca por estacionamento, que historicamente tem sido uma fonte significativa de estresse, perda de tempo e consumo desnecessário de combustível em ambientes urbanos congestionados. Ao fornecer informações em tempo real e detalhadas sobre as opções de estacionamento, o aplicativo visa otimizar a experiência do usuário, tornando-a mais eficiente, conveniente e previsível. O protótipo atual demonstra as funcionalidades centrais de busca por localização, filtragem avançada de resultados e visualização de detalhes específicos de cada estacionamento, como preço, horário de funcionamento e comodidades oferecidas. Ele representa um passo fundamental na direção de uma solução completa para a gestão inteligente de estacionamentos, beneficiando tanto os motoristas quanto os operadores de estacionamentos ao otimizar a ocupação e a fluidez do tráfego.





## Concorrentes

O mercado de aplicativos de estacionamento no Brasil é dinâmico e conta com diversos players, cada um com suas particularidades e focos. Analisar os principais concorrentes é fundamental para posicionar o ParkFinder de forma estratégica e identificar oportunidades de diferenciação. Entre os mais relevantes, destacam-se:

*   **Estapar / Zul+:** A Estapar é uma das maiores redes de estacionamentos do Brasil, e seu aplicativo Zul+ se tornou uma plataforma abrangente para motoristas, oferecendo não apenas a compra e ativação de Zona Azul em diversas cidades, mas também serviços como pagamento de IPVA, licenciamento e multas. Sua força reside na capilaridade da rede Estapar e na diversidade de serviços agregados, buscando ser um "super app" para o motorista.

*   **EasyPark:** De origem europeia, o EasyPark é um aplicativo global que permite pagar o estacionamento em diversas cidades ao redor do mundo, incluindo algumas no Brasil. Seu foco principal é a facilidade de pagamento e gestão do tempo de estacionamento via celular, com funcionalidades como extensão remota do tempo e interrupção antecipada. Sua vantagem é a experiência internacional e a interface simplificada.

*   **Parkingaki:** Este aplicativo foca na reserva antecipada de vagas, permitindo que o usuário procure o local pelo endereço ou CEP e reserve sua vaga com antecedência. É útil para quem busca garantir um lugar em eventos ou áreas de alta demanda, evitando a busca no local. Sua diferenciação está na funcionalidade de reserva garantida.

*   **Aplicativos de Zona Azul Digital (diversos):** Muitas cidades brasileiras possuem seus próprios aplicativos de Zona Azul Digital (como Estacionamento Digital, Zona Azul Brasil, Rek Pay, etc.). Estes são focados especificamente na regulamentação do estacionamento rotativo público, permitindo a compra e ativação de créditos digitais. Embora essenciais para o dia a dia, geralmente não oferecem a busca por estacionamentos privados ou funcionalidades de comparação.

*   **Google Maps / Waze:** Embora não sejam aplicativos dedicados exclusivamente a estacionamentos, plataformas como Google Maps e Waze oferecem funcionalidades de busca por estacionamentos próximos (privados e públicos) e, em alguns casos, informações sobre preços e disponibilidade. Sua força está na base de usuários massiva e na integração com a navegação, mas não oferecem a profundidade de detalhes ou a capacidade de reserva de apps especializados.

O ParkFinder se posiciona neste cenário buscando combinar a conveniência da busca em mapa com informações detalhadas e a capacidade de filtragem avançada, diferenciando-se dos apps de Zona Azul e complementando as funcionalidades básicas de mapas.





## Diferenciais do ParkFinder

O ParkFinder se destaca no mercado de estacionamentos online por uma combinação de funcionalidades e uma abordagem centrada no usuário que o diferencia dos concorrentes. Nossos principais diferenciais incluem:

*   **Busca Inteligente e Geocodificação Real:** Diferente de muitos aplicativos que dependem de uma base de dados estática ou de coordenadas aproximadas, o ParkFinder integra-se com APIs de geocodificação em tempo real (como o OpenStreetMap Nominatim). Isso permite que os usuários busquem por endereços exatos, pontos de interesse ou até mesmo usem sua localização atual para encontrar estacionamentos nas proximidades com alta precisão. A capacidade de calcular e exibir a distância exata até o estacionamento mais próximo, juntamente com a ordenação por proximidade, oferece uma experiência de busca superior e mais relevante.

*   **Sistema de Filtros Avançado e Combinado:** Enquanto outros aplicativos podem oferecer filtros básicos, o ParkFinder proporciona um sistema de filtragem robusto e intuitivo. Os usuários podem combinar múltiplos critérios de busca, incluindo:
    *   **Faixa de Preço:** Permite definir um orçamento máximo por hora.
    *   **Comodidades:** Filtra por características específicas como estacionamento coberto, segurança 24h, acessibilidade, serviço de valet, lavagem de carros e carregamento elétrico.
    *   **Disponibilidade:** Permite visualizar apenas estacionamentos com vagas disponíveis, quase lotados ou até mesmo lotados (para planejamento futuro).
    Essa capacidade de refinar a busca de forma tão granular garante que o usuário encontre exatamente o tipo de estacionamento que precisa, economizando tempo e frustração.

*   **Interface Intuitiva e Foco na Experiência do Usuário (UX):** O protótipo do ParkFinder foi desenvolvido com uma forte ênfase em um design limpo, moderno e responsivo, otimizado para dispositivos móveis. A visualização clara no mapa, os marcadores interativos e as telas de detalhes bem organizadas garantem que a navegação seja fluida e que as informações essenciais sejam facilmente acessíveis. A experiência do usuário é priorizada para tornar a busca por estacionamento uma tarefa simples e agradável.

*   **Informações Detalhadas e Transparentes:** Ao clicar em um estacionamento, o usuário tem acesso a um painel detalhado com todas as informações relevantes: preço por hora, horário de funcionamento, lista completa de comodidades e status de disponibilidade. Essa transparência ajuda o usuário a tomar decisões informadas rapidamente.

*   **Base para Expansão Futura:** O protótipo foi construído com uma arquitetura modular em React, facilitando a adição de futuras funcionalidades como sistema de reservas, avaliações de usuários, histórico de estacionamentos e integração com sistemas de pagamento, transformando-o em uma solução completa e escalável.

Esses diferenciais posicionam o ParkFinder não apenas como uma ferramenta de busca, mas como um assistente completo para a gestão de estacionamento urbano, oferecendo conveniência, precisão e uma experiência de usuário superior.





## Funcionamento do ParkFinder

O ParkFinder foi projetado para ser intuitivo e fácil de usar, guiando o motorista através de um fluxo simples para encontrar e selecionar o estacionamento ideal. O funcionamento do protótipo pode ser dividido nas seguintes etapas:

1.  **Tela Inicial e Busca por Localização:**
    *   Ao abrir o aplicativo, o usuário é apresentado a uma tela principal dominada por um mapa interativo. Este mapa simula a área urbana e exibe marcadores azuis (`P`) que representam os estacionamentos disponíveis.
    *   Na parte superior da tela, há uma barra de busca com o placeholder "Digite seu destino...". O usuário pode digitar um endereço, nome de um local (como "Avenida Paulista") ou um ponto de interesse.
    *   Conforme o usuário digita, o sistema de geocodificação em tempo real (integrado com a API Nominatim do OpenStreetMap) começa a sugerir endereços e locais correspondentes. Essas sugestões aparecem abaixo da barra de busca.
    *   O usuário pode selecionar uma das sugestões ou clicar no ícone de localização atual para que o aplicativo detecte sua posição e centralize o mapa nela.
    *   Uma vez que um destino é selecionado ou a localização atual é definida, um marcador vermelho (`Navigation`) aparece no mapa indicando o ponto de interesse da busca. Simultaneamente, um painel lateral à direita exibe os três estacionamentos mais próximos ao destino, ordenados por distância.

2.  **Visualização e Filtragem de Estacionamentos:**
    *   No mapa, os marcadores de estacionamento exibem um pequeno círculo colorido (verde, amarelo ou vermelho) indicando o status de disponibilidade (Disponível, Quase lotado, Lotado, respectivamente).
    *   Ao passar o mouse sobre um marcador, um tooltip exibe o nome do estacionamento, o preço por hora e a distância até o destino selecionado.
    *   No canto superior direito da tela, há um botão "Filtros". Ao clicar nele, um painel deslizante é revelado, permitindo ao usuário refinar a busca.
    *   Os filtros incluem:
        *   **Faixa de Preço:** Um slider para definir o preço máximo por hora.
        *   **Comodidades:** Checkboxes para selecionar características como "Coberto", "Segurança 24h", "Acessível", "Valet", "Lavagem" e "Carregamento elétrico".
        *   **Disponibilidade:** Checkboxes para filtrar por status de vagas ("Disponível", "Quase lotado", "Lotado").
    *   Após selecionar os filtros, o usuário clica em "Aplicar Filtros". O mapa e a lista de estacionamentos são atualizados em tempo real para exibir apenas aqueles que correspondem aos critérios selecionados. Um contador de filtros ativos é exibido no botão "Filtros", e a legenda do mapa mostra quantos estacionamentos atendem aos critérios.
    *   Há também um botão "Limpar Filtros" para resetar todas as seleções e ver todos os estacionamentos novamente.

3.  **Detalhes do Estacionamento:**
    *   Ao clicar em qualquer marcador de estacionamento no mapa ou em um item da lista lateral, o aplicativo navega para uma tela de detalhes específica para aquele estacionamento.
    *   Esta tela apresenta informações abrangentes, incluindo:
        *   Nome e endereço do estacionamento.
        *   Preço por hora.
        *   Horário de funcionamento.
        *   Lista completa de comodidades (com ícones intuitivos).
        *   Status de disponibilidade atual.
        *   Um botão "Reservar Vaga" (funcionalidade a ser implementada em futuras versões).
    *   Um botão de "Voltar" permite ao usuário retornar à tela do mapa e continuar a busca.

O ParkFinder, em sua versão protótipo, oferece uma experiência de busca e filtragem completa, demonstrando o potencial de simplificar significativamente a vida dos motoristas urbanos.



