/**
 * FASUL - Scripts Principais
 * ============================
 */

(function() {
    'use strict';

    // ============================================
    // DADOS DOS CURSOS POR CATEGORIA
    // ============================================
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
        },
        saude: {
            nome: 'Saúde',
            cursos: [
                { nome: 'Biomedicina', slug: 'biomedicina' },
                { nome: 'Ciências Biológicas', slug: 'ciencias-biologicas' },
                { nome: 'Enfermagem', slug: 'enfermagem' },
                { nome: 'Estética', slug: 'estetica' },
                { nome: 'Farmácia', slug: 'farmacia' },
                { nome: 'Fisioterapia', slug: 'fisioterapia' },
                { nome: 'Gestão Hospitalar', slug: 'gestao-hospitalar' },
                { nome: 'Medicina', slug: 'medicina' },
                { nome: 'Neurociência', slug: 'neurociencia' },
                { nome: 'Nutrição', slug: 'nutricao' },
                { nome: 'Odontologia', slug: 'odontologia' },
                { nome: 'Psicologia', slug: 'psicologia' },
                { nome: 'Saúde', slug: 'saude' },
                { nome: 'Saúde da Família', slug: 'saude-da-familia' },
                { nome: 'Veterinária', slug: 'veterinaria' }
            ]
        },
        gestao: {
            nome: 'Gestão',
            cursos: [
                { nome: 'Administração', slug: 'administracao' },
                { nome: 'Agronegócio', slug: 'agronegocio' },
                { nome: 'Ciências Contábeis', slug: 'ciencias-contabeis' },
                { nome: 'Comércio Exterior', slug: 'comercio-exterior' },
                { nome: 'Empreendedorismo', slug: 'empreendedorismo' },
                { nome: 'Finanças', slug: 'financas' },
                { nome: 'Gestão', slug: 'gestao' },
                { nome: 'Gestão de Projetos', slug: 'gestao-de-projetos' },
                { nome: 'Gestão Pública', slug: 'gestao-publica' },
                { nome: 'Logística', slug: 'logistica' },
                { nome: 'Marketing', slug: 'marketing' },
                { nome: 'MBA', slug: 'mba' },
                { nome: 'Negócios Imobiliários', slug: 'negocios-imobiliarios' },
                { nome: 'Recursos Humanos', slug: 'recursos-humanos' },
                { nome: 'Relações Internacionais', slug: 'relacoes-internacionais' },
                { nome: 'Serviço Social', slug: 'servico-social' }
            ]
        },
        direito: {
            nome: 'Direito',
            cursos: [
                { nome: 'Direito', slug: 'direito' },
                { nome: 'Direito Civil', slug: 'direito-civil' },
                { nome: 'Segurança Pública', slug: 'seguranca-publica' }
            ]
        },
        engenharia: {
            nome: 'Engenharia',
            cursos: [
                { nome: 'Arquitetura', slug: 'arquitetura' },
                { nome: 'Engenharia', slug: 'engenharia' },
                { nome: 'Engenharia Ambiental', slug: 'engenharia-ambiental' },
                { nome: 'Engenharia Civil', slug: 'engenharia-civil' },
                { nome: 'Engenharia de Produção', slug: 'engenharia-de-producao' },
                { nome: 'Engenharia Elétrica', slug: 'engenharia-eletrica' },
                { nome: 'Gestão Ambiental', slug: 'gestao-ambiental' },
                { nome: 'Meio Ambiente', slug: 'meio-ambiente' },
                { nome: 'Química', slug: 'quimica' },
                { nome: 'Segurança do Trabalho', slug: 'seguranca-do-trabalho' }
            ]
        },
        humanas: {
            nome: 'Humanas',
            cursos: [
                { nome: 'Antropologia', slug: 'antropologia' },
                { nome: 'Artes Visuais', slug: 'artes-visuais' },
                { nome: 'Ciências Sociais', slug: 'ciencias-sociais' },
                { nome: 'Cinema', slug: 'cinema' },
                { nome: 'Comunicação Social', slug: 'comunicacao-social' },
                { nome: 'Dança', slug: 'danca' },
                { nome: 'Design', slug: 'design' },
                { nome: 'Filosofia', slug: 'filosofia' },
                { nome: 'Gastronomia', slug: 'gastronomia' },
                { nome: 'Humanas', slug: 'humanas' },
                { nome: 'Jornalismo', slug: 'jornalismo' },
                { nome: 'Língua Espanhola', slug: 'lingua-espanhola' },
                { nome: 'Língua Inglesa', slug: 'lingua-inglesa' },
                { nome: 'Língua Portuguesa', slug: 'lingua-portuguesa' },
                { nome: 'Música', slug: 'musica' },
                { nome: 'Sociologia', slug: 'sociologia' }
            ]
        },
        tecnologia: {
            nome: 'Tecnologia',
            cursos: [
                { nome: 'Ciência da Computação', slug: 'ciencia-da-computacao' },
                { nome: 'Sistemas de Informação', slug: 'sistemas-de-informacao' },
                { nome: 'Tecnologia', slug: 'tecnologia' }
            ]
        }
    };

    // ============================================
    // MENU MOBILE
    // ============================================
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            
            // Animação suave
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.style.opacity = '0';
                mobileMenu.style.transform = 'translateY(-10px)';
                requestAnimationFrame(() => {
                    mobileMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    mobileMenu.style.opacity = '1';
                    mobileMenu.style.transform = 'translateY(0)';
                });
            }
        });
    }

    // ============================================
    // SMOOTH SCROLL PARA LINKS INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Offset para o header fixo
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Fecha menu mobile se aberto
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        menuBtn.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.querySelector('.site-header');
    let lastScroll = 0;

    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Adiciona sombra ao scrollar
            if (currentScroll > 10) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
            } else {
                header.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ============================================
    // FORMULÁRIO DE BUSCA
    // ============================================
    const searchForm = document.querySelector('.search-bar form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('input[name="q"]');
            const searchValue = searchInput.value.trim();
            
            if (!searchValue || searchValue.length < 2) {
                e.preventDefault();
                searchInput.focus();
                searchInput.classList.add('ring-2', 'ring-red-400');
                setTimeout(() => {
                    searchInput.classList.remove('ring-2', 'ring-red-400');
                }, 2000);
                return false;
            }
        });
    }

    // ============================================
    // FAQ ACCORDION (um aberto por vez)
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('toggle', function() {
            if (this.open) {
                faqItems.forEach(other => {
                    if (other !== this && other.open) {
                        other.open = false;
                    }
                });
            }
        });
    });
    const btnSobre = document.getElementById('btn-sobre');
const secaoSobre = document.getElementById('secao-sobre');
const btnFechar = document.getElementById('btn-fechar');

// 1. Abrir a seção da FASUL
btnSobre.addEventListener('click', () => {
  secaoSobre.classList.remove('escondida');
  secaoSobre.classList.add('visivel');
  secaoSobre.scrollTop = 0; 
  document.body.style.overflow = 'hidden'; 
});

// 2. Fechar pelo botão X
btnFechar.addEventListener('click', fecharSecaoSobre);

// 3. Monitorar a rolagem para fechar
secaoSobre.addEventListener('scroll', () => {
  const scrollAtual = secaoSobre.scrollTop; 
  const alturaVisivel = secaoSobre.clientHeight; 
  const alturaTotal = secaoSobre.scrollHeight; 

  if (scrollAtual + alturaVisivel >= alturaTotal - 5) {
    fecharSecaoSobre();
  }
});

// Função central para fechar
function fecharSecaoSobre() {
  secaoSobre.classList.remove('visivel');
  secaoSobre.classList.add('escondida');
  document.body.style.overflow = ''; 
}
    // ============================================
    // LAZY LOADING DE IMAGENS
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // ANIMAÇÃO DE ENTRADA (SCROLL REVEAL)
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // ============================================
    // CONTADOR DE ESTATÍSTICAS
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        let start = null;
        const suffix = element.dataset.suffix || '';
        
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            element.textContent = current.toLocaleString('pt-BR') + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }

    const statElements = document.querySelectorAll('[data-counter]');
    
    if (statElements.length > 0 && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.counter, 10);
                    animateCounter(el, target);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statElements.forEach(el => counterObserver.observe(el));
    }

    // ============================================
    // SELETOR DE CATEGORIAS (NOVO)
    // ============================================
    const categoriaBtns = document.querySelectorAll('.categoria-btn');
    const cursosContainer = document.getElementById('cursos-tags-container');
    const categoriaAtivaNome = document.getElementById('categoria-ativa-nome');
    const verTodosLink = document.getElementById('ver-todos-link');
    const verTodosTexto = document.getElementById('ver-todos-texto');

    function renderCursos(categoriaKey) {
        const dados = cursosPorCategoria[categoriaKey];
        if (!dados) return;

        // Animação de saída
        cursosContainer.classList.remove('fade-in');
        cursosContainer.classList.add('fade-out');

        setTimeout(() => {
            // Limpa e renderiza novas tags
            cursosContainer.innerHTML = '';
            
            dados.cursos.forEach(curso => {
                const link = document.createElement('a');
                link.href = `https://afiliadoeducacionalfasul.com.br/283082026/posgraduacao/categoria/${curso.slug}`;
                link.className = 'px-5 py-2.5 border border-cyan-400/50 text-cyan-400 rounded-full font-medium text-sm hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300';
                link.textContent = curso.nome;
                link.rel = 'noopener noreferrer';
                link.target = '_blank';
                cursosContainer.appendChild(link);
            });

            // Atualiza título e link "ver todos"
            categoriaAtivaNome.textContent = dados.nome;
            verTodosTexto.textContent = `VER TODOS OS CURSOS DE ${dados.nome.toUpperCase()}`;
            verTodosLink.href = `https://afiliadoeducacionalfasul.com.br/283082026/posgraduacao/categoria/${categoriaKey}`;

            // Animação de entrada
            cursosContainer.classList.remove('fade-out');
            cursosContainer.classList.add('fade-in');
        }, 300);
    }

    function atualizarEstadoAtivo(btnClicado) {
        categoriaBtns.forEach(btn => {
            const iconeDiv = btn.querySelector('div');
            const iconeSvg = btn.querySelector('svg');
            const nomeSpan = btn.querySelector('.categoria-nome');

            // Remove estado ativo
            btn.classList.remove('bg-cyan-400/10', 'border-cyan-400/30');
            btn.classList.add('bg-white/5', 'border-white/10');
            btn.removeAttribute('aria-current');

            iconeDiv.classList.remove('bg-cyan-400/20');
            iconeDiv.classList.add('bg-white/10');

            iconeSvg.classList.remove('text-cyan-400');
            iconeSvg.classList.add('text-gray-400');

            nomeSpan.classList.remove('text-cyan-400', 'font-bold');
            nomeSpan.classList.add('text-gray-400', 'font-medium');
        });

        // Adiciona estado ativo no botão clicado
        const iconeDiv = btnClicado.querySelector('div');
        const iconeSvg = btnClicado.querySelector('svg');
        const nomeSpan = btnClicado.querySelector('.categoria-nome');

        btnClicado.classList.remove('bg-white/5', 'border-white/10');
        btnClicado.classList.add('bg-cyan-400/10', 'border-cyan-400/30');
        btnClicado.setAttribute('aria-current', 'page');

        iconeDiv.classList.remove('bg-white/10');
        iconeDiv.classList.add('bg-cyan-400/20');

        iconeSvg.classList.remove('text-gray-400');
        iconeSvg.classList.add('text-cyan-400');

        nomeSpan.classList.remove('text-gray-400', 'font-medium');
        nomeSpan.classList.add('text-cyan-400', 'font-bold');
    }

    categoriaBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const categoria = this.dataset.categoria;
            
            atualizarEstadoAtivo(this);
            renderCursos(categoria);
        });
    });

    // Renderiza cursos iniciais (Educação)
    if (cursosContainer) {
        renderCursos('educacao');
    }

    // ============================================
    // CONSOLE BRANDING
    // ============================================
    console.log('%c FASUL ', 'background: #06B6D4; color: #0B132B; font-size: 20px; font-weight: bold; padding: 8px 16px; border-radius: 8px;');
    console.log('%c Faculdade de Ensino Superior - Educação que transforma vidas ', 'color: #06B6D4; font-size: 12px;');

})();
