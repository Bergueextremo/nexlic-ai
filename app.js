(() => {
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 16);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const revealEls = [...document.querySelectorAll('.reveal')];
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('visible'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px' });
    revealEls.forEach(el => io.observe(el));
  }

  const tabButtons = [...document.querySelectorAll('[data-feature-group]')];
  const featureCards = [...document.querySelectorAll('.feature-card')];
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => {
        const active = btn === button;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-selected', String(active));
      });
      const group = button.dataset.featureGroup;
      featureCards.forEach(card => card.classList.toggle('is-muted', card.dataset.group !== group));
    });
  });

  const glossaryData = {
    pregao: { category: 'MODALIDADE', title: 'Pregão eletrônico', definition: 'Modalidade de licitação utilizada para aquisição de bens e serviços comuns, com disputa de preços em ambiente eletrônico.', context: 'Exige atenção ao horário da sessão, regras de lance, documentos de habilitação e acompanhamento do chat do pregoeiro.' },
    srp: { category: 'PROCEDIMENTO', title: 'Sistema de Registro de Preços (SRP)', definition: 'Procedimento para registrar preços e condições para contratações futuras, sem obrigar a Administração a contratar todo o quantitativo previsto.', context: 'O fornecedor precisa acompanhar a ata, vigência, possibilidade de adesões e capacidade de atendimento ao longo do período.' },
    habilitacao: { category: 'ETAPA', title: 'Habilitação', definition: 'Fase em que a Administração verifica se a empresa atende aos requisitos jurídicos, fiscais, trabalhistas, econômicos e técnicos exigidos.', context: 'É onde o cofre documental e o controle de validade ajudam a reduzir risco de inabilitação por documento ausente ou vencido.' },
    impugnacao: { category: 'PEÇA ADMINISTRATIVA', title: 'Impugnação', definition: 'Instrumento utilizado para questionar cláusulas, exigências ou condições do edital antes da realização da disputa, nos prazos previstos.', context: 'A análise do edital deve sinalizar pontos restritivos e prazos para que a equipe decida se vale questionar o instrumento convocatório.' },
    ata: { category: 'DOCUMENTO', title: 'Ata de registro de preços', definition: 'Documento que formaliza fornecedores, preços e condições registrados após um procedimento de registro de preços.', context: 'O histórico de atas ajuda a entender faixas de preço, órgãos compradores, vigência e comportamento do mercado.' },
    dispensa: { category: 'CONTRATAÇÃO DIRETA', title: 'Dispensa eletrônica', definition: 'Procedimento eletrônico utilizado em hipóteses legais de contratação direta, com regras próprias de envio de propostas e disputa quando aplicável.', context: 'Mesmo sem uma licitação tradicional, a equipe precisa acompanhar prazos curtos, documentos e critérios de julgamento.' }
  };
  const termButtons = [...document.querySelectorAll('[data-term]')];
  const termCategory = document.getElementById('termCategory');
  const termTitle = document.getElementById('termTitle');
  const termDefinition = document.getElementById('termDefinition');
  const termContext = document.getElementById('termContext');
  termButtons.forEach(button => button.addEventListener('click', () => {
    const data = glossaryData[button.dataset.term];
    if (!data) return;
    termButtons.forEach(btn => {
      const active = btn === button;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    termCategory.textContent = data.category;
    termTitle.textContent = data.title;
    termDefinition.textContent = data.definition;
    termContext.textContent = data.context;
  }));

  const billingButtons = [...document.querySelectorAll('[data-billing]')];
  const priceEls = [...document.querySelectorAll('.price strong[data-monthly]')];
  billingButtons.forEach(button => button.addEventListener('click', () => {
    const billing = button.dataset.billing;
    billingButtons.forEach(btn => btn.classList.toggle('active', btn === button));
    priceEls.forEach(el => {
      el.textContent = el.dataset[billing];
      const note = el.closest('.price-card')?.querySelector('.price-note');
      if (note) note.dataset.billing = billing;
    });
  }));

  const form = document.getElementById('leadForm');
  const email = document.getElementById('leadEmail');
  const feedback = document.getElementById('formFeedback');
  if (form && email && feedback) {
    email.addEventListener('blur', () => {
      if (email.value && !email.validity.valid) email.classList.add('invalid');
      else email.classList.remove('invalid');
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!email.validity.valid) {
        email.classList.add('invalid');
        feedback.textContent = 'Digite um e-mail válido para continuar.';
        feedback.className = 'form-feedback error';
        email.focus();
        return;
      }
      const submit = form.querySelector('button[type="submit"]');
      submit.disabled = true;
      submit.querySelector('span').textContent = 'Registrando...';
      setTimeout(() => {
        feedback.textContent = 'Interesse registrado nesta demonstração. Conecte o formulário ao CRM/API para capturar leads em produção.';
        feedback.className = 'form-feedback success';
        submit.querySelector('span').textContent = 'Solicitar acesso';
        submit.disabled = false;
        form.reset();
      }, 500);
    });
  }
})();