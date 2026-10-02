# NEXLIC — Landing Page Concept

Conceito de landing page para um software de licitações AI-native.

## Posicionamento

**NEXLIC — seu sistema operacional de licitações com IA.**

A ideia central é deixar de vender apenas “busca de edital” e posicionar o produto como um fluxo completo:

1. Aprende o perfil da empresa.
2. Varre e prioriza oportunidades com Match Score.
3. Analisa o edital com IA e cruza exigências com documentos.
4. Organiza a operação, prazos, tarefas e proposta.
5. Alimenta inteligência histórica após o resultado.

## Referência estratégica

A CamaleonPro foi usada como referência de categoria e escopo — especialmente monitoramento, gestão do certame, documentos, propostas, histórico e IA — sem copiar layout, marca, redação ou identidade visual.

## Skills enviados e como foram aplicados

- **GSAP Skills:** arquitetura pronta para GSAP + ScrollTrigger, transform/opacity, stagger curto, `prefers-reduced-motion` e fallback nativo.
- **Motion Design Skill:** hierarquia de movimento em 3 camadas (primário, secundário e ambiente), uma ação de destaque por cena, movimentos suaves para transmitir confiança e controle.
- **img2threejs:** a LP inclui uma camada Three.js opcional no hero. Como não foi fornecida uma imagem de objeto/personagem para reconstrução 3D, não foi necessário executar o pipeline completo de image-to-3D; a cena é procedural e decorativa, com fallback em CSS.

## Arquivos

- `index.html` — estrutura e conteúdo.
- `styles.css` — identidade visual, responsividade e estados.
- `app.js` — interações, demonstração do produto, animações e camada 3D opcional.

## Abrir localmente

Use um servidor local (recomendado para permitir o import do Three.js):

```bash
python3 -m http.server 8080
```

Depois abra `http://localhost:8080`.

## Observações para produção

- O formulário da lista de espera é uma demonstração e deve ser conectado a CRM/API.
- Integrações com PNCP, Compras.gov e outros portais estão apresentadas como visão de produto; precisam ser implementadas e validadas no backend.
- “NEXLIC” é um nome conceitual/provisório. Antes do lançamento, fazer pesquisa formal de marca/domínio.
- Para produção, instalar `gsap` e `three` no projeto em vez de depender de CDN e aplicar bundling/code-splitting.
