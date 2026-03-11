# [Greenn](https://greenn.com.br/) Challenge - Carousel Rendering & Performance Refactor

This repository contains a technical proposal created during my
application process for a full stack position at Greenn.

While analyzing the carousel component on the official website
(https://greenn.com.br/), I identified rendering and state consistency
issues affecting user experience and animation performance.

Instead of only reporting the problems, I chose to reproduce the
scenario and implement a technically solution using modern React
architecture.

---

## Problem Context

The analyzed component is a horizontal carousel responsible for
displaying people cards.

During interaction testing (desktop and swipe simulation), the following
issues were identified:

---

## 1️⃣ Consecutive Duplicate Rendering

The carousel may render the same person card sequentially.

This indicates potential problems related to:

- Rotation algorithm
- Index control logic
- State mutation
- Improper key usage in React lists

### Observed behavior

<img src="./public/demos/repeated-user-card-bug.gif" alt="repeated-user-card-bug" width="100%">

---

## 2️⃣ Card Merging & Animation Fluidity Degradation

During swipe interaction:

- Cards visually overlap or merge
- Transition frames lose consistency
- Animation fluidity drops
- Interaction responsiveness degrades

### Observed behavior

<img src="./public/demos/carousel-card-merge-and-swipe-lag.gif" alt="carousel-card-merge-and-swipe-lag" width="100%">

---

## Funcionalidades Implementadas

### 1. Página de Introdução

Apresentação institucional, overview técnico e destaques do projeto.

<img src="./public/demos/frontend/intro-page.gif" alt="intro-page" width="100%">

---

### 2. Carrossel de Produtores (Home)

Carrossel animado, responsivo, com rotação infinita, ordenação por score e carregamento otimizado.

<img src="./public/demos/frontend/carousel.gif" alt="carousel" width="100%">

---

### 3. Painel Administrativo

Painel para gestão de produtores, com listagem, ordenação, busca e acesso rápido à criação/edição.

<img src="./public/demos/frontend/admin.gif" alt="admin" width="100%">

---

### 4. Cadastro de Novo Produtor

Formulário em modal para criar produtores, com validação, feedback visual e atualização instantânea do carrossel.

<img src="./public/demos/frontend/create-new-producer.gif" alt="create-new-producer" width="100%">

---

### 5. Edição de Produtor

Edição inline via modal, com atualização em tempo real e feedback de sucesso/erro.

<img src="./public/demos/frontend/edit-producer.gif" alt="edit-producer" width="100%">

---

### 6. Novo Produtor no Carrossel

Demonstração do fluxo completo: cadastro de produtor e exibição imediata no carrossel.

<img src="./public/demos/frontend/new-producer-carousel.gif" alt="new-producer-carousel" width="100%">

---

## Destaques Técnicos

- **Frontend:** React + TypeScript + Vite + TailwindCSS
- **Backend:** Laravel (API RESTful), Eloquent ORM, autenticação, seeders e testes
- **Integração:** Comunicação assíncrona, tratamento de estados, feedback visual e UX aprimorada
- **Performance:** Memoização, animações otimizadas, controle de re-render, uso de hooks avançados
- **Arquitetura:** Separação clara de responsabilidades, componentes reutilizáveis, tipagem forte

---

## Resumo Visual das Funcionalidades

| Página/Funcionalidade      | Demonstração                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------ |
| Introdução                 | <img src="./public/demos/frontend/intro-page.gif" alt="intro-page" width="400%">                       |
| Carrossel de Produtores    | <img src="./public/demos/frontend/carousel.gif" alt="carousel" width="400%">                           |
| Painel Admin               | <img src="./public/demos/frontend/admin.gif" alt="admin" width="400%">                                 |
| Criar Novo Produtor        | <img src="./public/demos/frontend/create-new-producer.gif" alt="create-new-producer" width="400%">     |
| Editar Produtor            | <img src="./public/demos/frontend/edit-producer.gif" alt="edit-producer" width="400%">                 |
| Novo Produtor no Carrossel | <img src="./public/demos/frontend/new-producer-carousel.gif" alt="new-producer-carousel" width="400%"> |

---

## Como rodar o projeto

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
composer install
cp .env.example .env # configure o .env conforme necessário
php artisan migrate --seed
php artisan serve
```

---

## Sobre o Projeto

O projeto foi desenvolvido com foco em:

- Experiência do usuário fluida e responsiva
- Arquitetura escalável e manutenível
- Integração robusta entre frontend e backend
- Código limpo, testável e documentado

---

## Créditos

Desenvolvido por Leona para o desafio técnico Greenn.

The goal is to rebuild the carousel with focus on:

## Rendering Stability

- Deterministic item rotation
- Immutable state updates
- Strict index boundary control
- Stable `key` strategy
- Predictable reconciliation behavior

---

## Performance Optimization

- `useMemo` and `useCallback` where necessary
- Component memoization (`React.memo`)
- Avoid derived state recalculation
- Transform-based animation (`translate3d`)
- Reduced layout reflows
- Avoid synchronous layout reads during animation

---

## Architectural Decisions

The implementation will:

- Separate carousel logic from presentation layer
- Encapsulate rotation algorithm
- Avoid mutation-based array operations
- Use controlled animation state
- Ensure single source of truth

---

## Engineering Goals

- Zero consecutive duplicate cards
- Consistent frame rendering
- Smooth swipe experience
- Predictable component lifecycle
- Clean, scalable component structure

---

# Stack

Developed using:

- React
- Vite
- TypeScript
- Modern CSS with hardware-accelerated transitions
- Strict component isolation

---

# Development Roadmap

- [x] Problem identification
- [x] Visual documentation
- [ ] Algorithm definition
- [ ] Controlled carousel implementation
- [ ] Performance validation
- [ ] Before vs After comparison
- [ ] Technical conclusion

---

# Objective

This project is not only a UI refactor.

It is a demonstration of:

- React rendering knowledge
- Performance awareness
- State control discipline
- UI architecture decisions
- Production-oriented thinking

The final implementation and metrics comparison will be added upon
completion.
