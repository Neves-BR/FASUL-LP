/**
 * FASUL - Scripts Principais Otimizados (monolítico)
 * ==================================================
 * Todos os dados inline, mas carregamento lazy por categoria
 */

(function() {
    'use strict';

    // ===== UTILITÁRIOS =====
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
    const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

    // ===== DADOS: Só Educação no início, resto em getter lazy =====
    const getCursos = (() => {
        const cache = new Map();
        
        const db = {
            educacao: {
                nome: 'Educação',
                cursos: [
                    { nome: 'Artes', slug: 'artes' }, { nome: 'Educação', slug: 'educacao' },
                    { nome: 'Educação Básica', slug: 'educacao-basica' }, { nome: 'Educação Especial', slug: 'educacao-especial' },
                    { nome: 'Educação Física', slug: 'educacao-fisica' }, { nome: 'Ensino a Distância', slug: 'ensino-distancia' },
                    { nome: 'Ensino Superior', slug: 'ensino-superior' }, { nome: 'Física', slug: 'fisica' },
                    { nome: 'Geografia', slug: 'geografia' }, { nome: 'Gestão Escolar', slug: 'gestao-escolar' },
                    { nome: 'História', slug: 'historia' }, { nome: 'Letras', slug: 'letras' },
                    { nome: 'Literatura', slug: 'literatura' }, { nome: 'Matemática', slug: 'matematica' },
                    { nome: 'Pedagogia', slug: 'pedagogia' }, { nome: 'Teologia', slug: 'teologia' }
                ]
            }
        };

        // Lazy load: outras categorias só são montadas no objeto quando acessadas
        const builders = {
            saude: () => ({
                nome: 'Saúde',
                cursos: [
                    { nome: 'Biomedicina', slug: 'biomedicina' }, { nome: 'Ciências Biológicas', slug: 'ciencias-biologicas' },
                    { nome: 'Enfermagem', slug: 'enfermagem' }, { nome: 'Estética', slug: 'estetica' },
                    { nome: 'Farmácia', slug: 'farmacia' }, { nome: 'Fisioterapia', slug: 'fisioterapia' },
                    { nome: 'Gestão Hospitalar', slug: 'gestao-hospitalar' }, { nome: 'Medicina', slug: 'medicina' },
                    { nome: 'Neurociência', slug: 'neurociencia' }, { nome: 'Nutrição', slug: 'nutricao' },
                    { nome: 'Odontologia', slug: 'odontologia' }, { nome: 'Psicologia', slug: 'psicologia' },
                    { nome: 'Saúde', slug: 'saude' }, { nome: 'Saúde da Família', slug: 'saude-da-familia' },
                    { nome: 'Veterinária', slug: 'veterinaria' }
                ]
            }),
            gestao: () => ({
                nome: 'Gestão',
                cursos: [
                    { nome: 'Administração', slug: 'administracao' }, { nome: 'Agronegócio', slug: 'agronegocio' },
                    { nome: 'Ciências Contábeis', slug: 'ciencias-contabeis' }, { nome: 'Comércio Exterior', slug: 'comercio-exterior' },
                    { nome: 'Empreendedorismo', slug: 'empreendedorismo' }, { nome: 'Finanças', slug: 'financas' },
                    { nome: 'Gestão', slug: 'gestao' }, { nome: 'Gestão de Projetos', slug: 'gestao-de-projetos' },
                    { nome: 'Gestão Pública', slug: 'gestao-publica' }, { nome: 'Logística', slug: 'logistica' },
                    { nome: 'Marketing', slug: 'marketing' }, { nome: 'MBA', slug: 'mba' },
                    { nome: 'Negócios Imobiliários', slug: 'negocios-imobiliarios' }, { nome: 'Recursos Humanos', slug: 'recursos-humanos' },
                    { nome: 'Relações Internacionais', slug: 'relacoes-internacionais' }, { nome: 'Serviço Social', slug: 'servico-social' }
                ]
            }),
            direito: () => ({
                nome: 'Direito',
                cursos: [
                    { nome: 'Direito', slug: 'direito' },
                    { nome: 'Direito Civil', slug: 'direito-civil' },
                    { nome: 'Segurança Pública', slug: 'seguranca-publica' }
                ]
            }),
            engenharia: () => ({
                nome: 'Engenharia',
                cursos: [
                    { nome: 'Arquitetura', slug: 'arquitetura' }, { nome: 'Engenharia', slug: 'engenharia' },
                    { nome: 'Engenharia Ambiental', slug: 'engenharia-ambiental' }, { nome: 'Engenharia Civil', slug: 'engenharia-civil' },
                    { nome: 'Engenharia de Produção', slug: 'engenharia-de-producao' }, { nome: 'Engenharia Elétrica', slug: 'engenharia-eletrica' },
                    { nome: 'Gestão Ambiental', slug: 'gestao-ambiental' }, { nome: 'Meio Ambiente', slug: 'meio-ambiente' },
                    { nome: 'Química', slug: 'quimica' }, { nome: 'Segurança do Trabalho', slug: 'seguranca-do-trabalho' }
                ]
            }),
            humanas: () => ({
                nome: 'Humanas',
                cursos: [
                    { nome: 'Antropologia', slug: 'antropologia' }, { nome: 'Artes Visuais', slug: 'artes-visuais' },
                    { nome: 'Ciências Sociais', slug: 'ciencias-sociais' }, { nome: 'Cinema', slug: 'cinema' },
                    { nome: 'Comunicação Social', slug: 'comunicacao-social' }, { nome: 'Dança', slug: 'danca' },
                    { nome: 'Design', slug: 'design' }, { nome: 'Filosofia', slug: 'filosofia' },
                    { nome: 'Gastronomia', slug: 'gastronomia' }, { nome: 'Humanas', slug: 'humanas' },
                    { nome: 'Jornalismo', slug: 'jornalismo' }, { nome: 'Língua Espanhola', slug: 'lingua-espanhola' },
                    { nome: 'Língua Inglesa', slug: 'lingua-inglesa' }, { nome: 'Língua Portuguesa', slug: 'lingua-portuguesa' },
                    { nome: 'Música', slug: 'musica' }, { nome: 'Sociologia', slug: 'sociologia' }
                ]
            }),
            tecnologia: () => ({
                nome: 'Tecnologia',
                cursos: [
                    { nome: 'Ciência da Computação', slug: 'ciencia-da-computacao' },
                    { nome: 'Sistemas de Informação', slug: 'sistemas-de-informacao' },
                    { nome: 'Tecnologia', slug: 'tecnologia' }
                ]
            })
        };

        return (key) => {
            if (cache.has(key)) return cache.get(key);
            if (db[key]) { cache.set(key, db[key]); return db[key]; }
            if (builders[key]) {
                const dados = builders[key]
