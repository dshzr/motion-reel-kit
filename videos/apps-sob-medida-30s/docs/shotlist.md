# Shotlist: Apps sob medida · 30 s · 120 BPM · 60 beats · formats 16x9

STATUS: APPROVED (01/11/2026). Contato do end card: o usuário não definiu; segunda linha "Fale com a gente." até ele escolher. Acento cobalto mantido.

Beats are on the measured grid (`beats.json`). 1 beat = 0,5 s, 1 compasso = 4 beats = 2 s. Cortes secos só em linhas de compasso (b8, b16, b28, b36, b48, b56).
Rule check: algo novo a cada 2 s no máximo · hook legível em 0–2 s · end card 2 s, com push lento.

| # | Beats | Time (s) | Shot | On-screen text (exact) | Motion (preset / transition) | SFX (timeline mark) | New on screen |
|---|---|---|---|---|---|---|---|
| 1 | 0–8 | 0.0–4.0 | **Hook.** Papel com grade; à direita um rascunho a lápis de uma tela (frame 0 já tem traços). | "Sua ideia" (b0) / "vira app." (b2, "app." no acento) | Palavras sobem pela máscara (heavy). b4: o rascunho constrói em tela real (skeleton → conteúdo, default). | pop b0, pop b2, whoosh b4 | b0 texto · b2 2ª linha · b4 rascunho vira tela · b6 câmera aproxima da tela |
| 2 | 8–16 | 4.0–8.0 | **Apps mobile.** Corte seco; celular sobe (card rise) com app de agenda/pedidos genérico. | eyebrow "iOS e Android" · título "Apps mobile." | Celular: card rise (default). Barra de abas troca de aba com `track` (snappy) b12. Notificação desce do topo b14. | whoosh b8, click b12, chime b14 | b8 celular · b10 lista carrega · b12 troca de aba · b14 notificação |
| 3 | 16–28 | 8.0–14.0 | **Sistemas web.** O celular é empurrado para fora; janela de navegador sobe e cobre. Sidebar + tabela de registros. | eyebrow "Portais, ERPs, sistemas internos" · título "Sistemas web." | Janela: card rise (default). Linhas da tabela entram em sequência b18. Seleção de linha b20 (snappy). Pílula de status troca para "Aprovado" b22. Modal de formulário sobe b24; campo preenche b26. | whoosh b16, ticks b18, click b20, pop b22, whoosh b24, typing b26 | a cada 2 beats um evento novo |
| 4 | 28–36 | 14.0–18.0 | **Dashboards e BI.** Corte seco; a câmera mergulha num painel de indicadores. | eyebrow "Relatórios e indicadores" · título "Dashboards e BI." | Barras crescem uma a uma b28–30 (snappy, leve overshoot). Linha do gráfico se desenha b30–32. Contador de KPI rola b32 (odômetro). Filtro de período troca b34 e o gráfico recompõe (`track`). | shutter b28, ticks b28–30, riser curto b30, odômetro b32, click b34 | b28 barras · b30 linha · b32 KPI · b34 filtro |
| 5 | 36–48 | 18.0–24.0 | **IA e automações.** Corte seco para fundo noite. Chat à esquerda, fluxo de automação à direita. | eyebrow "Chatbots, agentes, integrações" · título "IA e automações." · pedido no chat: "Gera o relatório de vendas de outubro." | Pedido digita b36. Resposta da IA constrói b38. Nós do fluxo aparecem e se conectam um a um: Formulário → IA → Planilha → E-mail (b40, b41, b42, b43, snappy). Pulso percorre o fluxo b44. Build b46–47.5. | typing b36, pop b38, zip b40–43, riser b44–47.5 | b36 chat · b38 resposta · b40–43 nós · b44 pulso |
| 6 | 48–56 | 24.0–28.0 | **Payoff.** Silêncio de meio beat (b47.5), drop em b48: as 4 telas se encaixam num grid 2×2. | "Tudo sob medida." (b48) / "Do jeito do seu negócio." (b51, "seu negócio." no acento) | Telas colapsam para o grid (default). Título heavy, sem overshoot. b53 cada célula acende em sequência (snappy). | thump b48, pop b51, ticks b53–55 | b48 grid · b51 2ª linha · b53 destaque das células |
| 7 | 56–60 | 28.0–30.0 | **End card.** O grid é coberto por um painel noite (mais contraste depois do grid claro); à direita, a lista dos 4 tipos entra b57.25–58. Sem logo, sem nome. | "Vamos criar o seu?" + linha de contato (a definir) | Texto sobe pela máscara (heavy); contato entra b57 (snappy). Push lento 1,00 → 1,05 até o fim. | pop b56, pop b57, cauda da música | b56 pergunta · b57 contato |

## Music
Synth original, 120 BPM: intro leve b0–8 (pluck + kick suave) → completo b8–36 → mais escuro e filtrado no trecho de IA b36–44 → build b44–47.5 → gap de meio beat → drop no payoff b48 → cauda curta no end card. Mix em -14 LUFS.

## Look
- Paleta neutra, sem marca: papel #F3F1EC, tinta #0E1116, cartão #FFFFFF, noite #0E1116 (cena de IA), acento único cobalto #2F5BFF só na palavra-chave e em elementos ativos das telas.
- Fonte: Geist 700 (títulos, alinhados à esquerda em x ≥ 120 px) e Geist 500 (eyebrows e textos de UI).
- Sem gradiente com título centralizado, sem fades, sem brilho, sem partículas, sem crossfade.

## Open questions for the user
- End card: que linha de contato vai embaixo de "Vamos criar o seu?" — um e-mail, WhatsApp, um site neutro, ou nada?
- Cor de acento: cobalto #2F5BFF está bom, ou prefere outra?
- Algum tipo de app deve ganhar mais tempo que os outros?
