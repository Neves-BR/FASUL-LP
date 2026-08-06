/**
 * FASUL - Scripts Principais Otimizados
 * =====================================
 * Aplica: Code Splitting, Lazy Loading, Tree Shaking, Debounce
 */

(function() {
    'use strict';

    // ============================================
    // UTILITÁRIOS (compartilhados)
    // ============================================
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
    
    // Debounce para eventos de input/scroll
    const debounce = (fn, ms) => {
        let t;
        return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
    };

    // Guard clause helper
    const guard = (el, fn) => el && fn(el);

    // ============================================
    // 1. MENU MOBILE (crítico - carrega imediatamente)
    // ============================================
    (function initMobileMenu() {
        const menuBtn = $('#mobile-menu-btn');
        const mobileMenu = $('#mobile-menu');
        if (!menuBtn || !mobileMenu) return;

        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            
            if (!mobileMenu.classList.contains('hidden')) {
                requestAnimationFrame(() => {
                    mobileMenu.style.cssText = 'opacity:0;transform:translateY(-10px);transition:opacity 0.3s ease,transform 0.3s ease';
                    requestAnimationFrame(() => {
                        mobileMenu.style.opacity = '1';
                        mobileMenu.style.transform = 'translateY(0)';
                    });
                });
            }
        });
    })();

    // ============================================
    // 2. SMOOTH SCROLL (crítico)
    // ============================================
    (function initSmoothScroll() {
        const mobileMenu = $('#mobile-menu');
        const menuBtn = $('#mobile-menu-btn');

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = $(href);
                if (!target) return;

                e.preventDefault();
                const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });

                // Fecha menu mobile
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    menuBtn?.setAttribute('aria-expanded', 'false');
                }
            });
        });
    })();

    // ============================================
    // 3. HEADER SCROLL EFFECT (passivo)
    // ============================================
    guard($('.site-header'), header => {
        window.addEventListener('scroll', debounce(() => {
            header.style.boxShadow = window.pageYOffset > 10 
                ? '0 4px 20px rgba(0,0,0,0.3)' 
                : 'none';
        }, 50), { passive: true });
    });

    // ============================================
    // 4. FORMULÁRIO DE BUSCA (com debounce)
    // ============================================
    guard($('.search-bar form'), searchForm => {
        searchForm.addEventListener('submit', function(e) {
            const input = this.querySelector('input[name="q"]');
            const val = input?.value.trim();
            
            if (!val || val.length < 2) {
                e.preventDefault();
                input?.focus();
                input?.classList.add('ring-2', 'ring-red-400');
                setTimeout(() => input?.classList.remove('ring-2', 'ring-red-400'), 2000);
            }
        });
    });

    // ============================================
    // 5. FAQ ACCORDION (um aberto por vez)
    // ============================================
    (function initFaq() {
        const items = $$('.faq-item');
        items.forEach(item => {
            item.addEventListener('toggle', function() {
                if (this.open) {
                    items.forEach(other => other !== this && other.open && (other.open = false));
                }
            });
        });
    })();

    // ============================================
    // 6. SEÇÃO SOBRE (lazy init)
    // ============================================
    (function initSobre() {
        const btnSobre = $('#btn-sobre');
        const secaoSobre = $('#secao-sobre');
        const btnFechar = $('#btn-fechar');
        
        if (!btnSobre || !secaoSobre) return;

        const fechar = () => {
            secaoSobre.classList.replace('visivel', 'escondida');
            document.body.style.overflow = '';
        };

        btnSobre.addEventListener('click', () => {
            secaoSobre.classList.replace('escondida', 'visivel');
            secaoSobre.scrollTop = 0;
            document.body.style.overflow = 'hidden';
        });

        btnFechar?.addEventListener('click', fechar);

        // Scroll listener com debounce
        secaoSobre.addEventListener('scroll', debounce(() => {
            if (secaoSobre.scrollTop + secaoSobre.clientHeight >= secaoSobre.scrollHeight - 5) {
                fechar();
            }
        }, 100));
    })();

    // ============================================
    // 7. LAZY LOADING DE IMAGENS (IntersectionObserver)
    // ============================================
    (function initLazyImages() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: carrega todas
            $$('img[data-src]').forEach(img => {
                if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
            });
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded'); // para transição CSS
                }
                obs.unobserve(img);
            });
        }, { rootMargin: '50px 0px' });

        $$('img[data-src]').forEach(img => observer.observe(img));
    })();

    // ============================================
    // 8. ANIMAÇÃO DE ENTRADA (Scroll Reveal)
    // ============================================
    (function initReveal() {
        const els = $$('.reveal');
        if (!els.length || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        els.forEach(el => observer.observe(el));
    })();

    // ============================================
    // 9. CONTADOR DE ESTATÍSTICAS
    // ============================================
    (function initCounters() {
        const stats = $$('[data-counter]');
        if (!stats.length || !('IntersectionObserver' in window)) return;

        const animate = (el, target, duration = 2000) => {
            const suffix = el.dataset.suffix || '';
            const start = performance.now();
            
            const step = now => {
                const progress = Math.min((now - start) / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(easeOut * target).toLocaleString('pt-BR') + suffix;
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    animate(el, parseInt(el.dataset.counter, 10));
                    obs.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(el => observer.observe(el));
    })();

    // ============================================
    // 10. SELETOR DE CATEGORIAS (com lazy load de dados)
    // ============================================
    (function initCategorias() {
        const cursosContainer = $('#cursos-tags-container');
        const categoriaAtivaNome = $('#categoria-ativa-nome');
        const verTodosLink = $('#ver-todos-link');
        const verTodosTexto = $('#ver-todos-texto');
        const categoriaBtns = $$('.categoria-btn');

        if (!cursosContainer || !categoriaBtns.length) return;

        // Dados mínimos necessários para o primeiro render (Educação)
        // Restante carrega sob demanda via fetch ou dynamic import
        const cursosPorCategoria = {
            educacao: {
                nome: 'Educação',
                cursos: [
                    { nome: 'Artes', slug: 'artes' },
                    { nome: 'Educação', slug: 'educacao' },
                    { nome: 'Educação Básica', slug: 'educacao-basica' },
                    { nome: 'Educação Especial', slug: 'educacao-especial' },
                    { nome: 'Educação Física', slug: 'educacao-fisica' },
                    { nome: 'Ensino a Distância', slug: 'ensino-distancia' },
                    { nome: 'Ensino Superior', slug: 'ensino-superior' },
                    { nome: 'Física', slug: 'fisica' },
                    { nome: 'Geografia', slug: 'geografia' },
                    { nome: 'Gestão Escolar', slug: 'gestao-escolar' },
                    { nome: 'História', slug: 'historia' },
                    { nome: 'Letras', slug: 'letras' },
                    { nome: 'Literatura', slug: 'literatura' },
                    { nome: 'Matemática', slug: 'matematica' },
                    { nome: 'Pedagogia', slug: 'pedagogia' },
                    { nome: 'Teologia', slug: 'teologia' }
                ]
            }
            // Outras categorias carregam dinamicamente via JSON/fetch
        };

        // Cache de categorias já carregadas
        const cache = new Map();
        cache.set('educacao', cursosPorCategoria.educacao);

        const BASE_LINK = 'https://afiliadoeducacionalfasul.com.br/283082026/posgraduacao/categoria/';

        const renderCursos = (dados) => {
            cursosContainer.classList.replace('fade-in', 'fade-out');
            
            setTimeout(() => {
                cursosContainer.innerHTML = dados.cursos.map(curso => `
                    <a href="${BASE_LINK}${curso.slug}" 
                       class="px-5 py-2.5 border border-cyan-400/50 text-cyan-400 rounded-full font-medium text-sm hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
                       rel="noopener noreferrer" target="_blank">
                        ${curso.nome}
                    </a>
                `).join('');

                categoriaAtivaNome && (categoriaAtivaNome.textContent = dados.nome);
                verTodosTexto && (verTodosTexto.textContent = `VER TODOS OS CURSOS DE ${dados.nome.toUpperCase()}`);
                verTodosLink && (verTodosLink.href = BASE_LINK + dados.slug || dados.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-'));

                cursosContainer.classList.replace('fade-out', 'fade-in');
            }, 300);
        };

        const atualizarAtivo = (btnClicado) => {
            categoriaBtns.forEach(btn => {
                const ativo = btn === btnClicado;
                btn.classList.toggle('bg-cyan-400/10', ativo);
                btn.classList.toggle('border-cyan-400/30', ativo);
                btn.classList.toggle('bg-white/5', !ativo);
                btn.classList.toggle('border-white/10', !ativo);
                btn.toggleAttribute('aria-current', ativo);

                const iconeDiv = btn.querySelector('div');
                iconeDiv?.classList.toggle('bg-cyan-400/20', ativo);
                iconeDiv?.classList.toggle('bg-white/10', !ativo);

                const iconeSvg = btn.querySelector('svg');
                iconeSvg?.classList.toggle('text-cyan-400', ativo);
                iconeSvg?.classList.toggle('text-gray-400', !ativo);

                const nomeSpan = btn.querySelector('.categoria-nome');
                nomeSpan?.classList.toggle('text-cyan-400', ativo);
                nomeSpan?.classList.toggle('font-bold', ativo);
                nomeSpan?.classList.toggle('text-gray-400', !ativo);
                nomeSpan?.classList.toggle('font-medium', !ativo);
            });
        };

        // Carrega categoria via fetch (lazy load) ou cache
        const carregarCategoria = async (key) => {
            if (cache.has(key)) return cache.get(key);
            
            // Simulação: em produção, buscar de /data/categorias/{key}.json
            // const res = await fetch(`/data/categorias/${key}.json`);
            // const dados = await res.json();
            // cache.set(key, dados);
            // return dados;
            
            // Fallback: dados hardcoded para demo (remover em produção)
            const dadosFallback = {
                saude: { nome: 'Saúde', cursos: [{nome:'Biomedicina',slug:'biomedicina'},{nome:'Enfermagem',slug:'enfermagem'},{nome:'Fisioterapia',slug:'fisioterapia'},{nome:'Medicina',slug:'medicina'},{nome:'Nutrição',slug:'nutricao'},{nome:'Psicologia',slug:'psicologia'}] },
                gestao: { nome: 'Gestão', cursos: [{nome:'Administração',slug:'administracao'},{nome:'Marketing',slug:'marketing'},{nome:'Gestão de Projetos',slug:'gestao-de-projetos'},{nome:'MBA',slug:'mba'},{nome:'Recursos Humanos',slug:'recursos-humanos'}] },
                direito: { nome: 'Direito', cursos: [{nome:'Direito',slug:'direito'},{nome:'Direito Civil',slug:'direito-civil'},{nome:'Segurança Pública',slug:'seguranca-publica'}] },
                engenharia: { nome: 'Engenharia', cursos: [{nome:'Arquitetura',slug:'arquitetura'},{nome:'Engenharia Civil',slug:'engenharia-civil'},{nome:'Engenharia Elétrica',slug:'engenharia-eletrica'},{nome:'Segurança do Trabalho',slug:'seguranca-do-trabalho'}] },
                humanas: { nome: 'Humanas', cursos: [{nome:'Comunicação Social',slug:'comunicacao-social'},{nome:'Design',slug:'design'},{nome:'Jornalismo',slug:'jornalismo'},{nome:'Sociologia',slug:'sociologia'}] },
                tecnologia: { nome: 'Tecnologia', cursos: [{nome:'Ciência da Computação',slug:'ciencia-da-computacao'},{nome:'Sistemas de Informação',slug:'sistemas-de-informacao'},{nome:'Tecnologia',slug:'tecnologia'}] }
            };
            const dados = dadosFallback[key];
            if (dados) cache.set(key, dados);
            return dados;
        };

        categoriaBtns.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const categoria = btn.dataset.categoria;
                if (!categoria) return;

                atualizarAtivo(btn);
                const dados = await carregarCategoria(categoria);
                if (dados) renderCursos(dados);
            });
        });

        // Render inicial
        renderCursos(cursosPorCategoria.educacao);
    })();

    // ============================================
    // 11. CONSOLE BRANDING (condicional - dev only)
    // ============================================
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        console.log('%c FASUL ', 'background: #06B6D4; color: #0B132B; font-size: 20px; font-weight: bold; padding: 8px 16px; border-radius: 8px;');
    }

})();
