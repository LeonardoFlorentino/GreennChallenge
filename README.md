# [Greenn](https://greenn.com.br/) Challenge - Carousel Rendering & Performance Refactor

This repository contains a technical proposal created during my
application process for a full stack position at Greenn.

While analyzing the carousel component on the official website
(https://greenn.com.br/), I identified rendering and state consistency
issues affecting user experience and animation performance.

Instead of only reporting the problems, I chose to reproduce the
scenario and implement a technically solution using modern React
architecture.

------------------------------------------------------------------------

## Problem Context

The analyzed component is a horizontal carousel responsible for
displaying people cards.

During interaction testing (desktop and swipe simulation), the following
issues were identified:

------------------------------------------------------------------------

## 1️⃣ Consecutive Duplicate Rendering

The carousel may render the same person card sequentially.

This indicates potential problems related to:

-   Rotation algorithm
-   Index control logic
-   State mutation
-   Improper key usage in React lists

### Observed behavior

![Repeated User Card Bug](./public/demos/repeated-user-card-bug.gif)

------------------------------------------------------------------------

## 2️⃣ Card Merging & Animation Fluidity Degradation

During swipe interaction:

-   Cards visually overlap or merge
-   Transition frames lose consistency
-   Animation fluidity drops
-   Interaction responsiveness degrades

### Observed behavior

![Carousel Merge and Swipe
Lag](./public/demos/carousel-card-merge-and-swipe-lag.gif)

------------------------------------------------------------------------

# Proposed Technical Solution

The goal is to rebuild the carousel with focus on:

## Rendering Stability

-   Deterministic item rotation
-   Immutable state updates
-   Strict index boundary control
-   Stable `key` strategy
-   Predictable reconciliation behavior

------------------------------------------------------------------------

## Performance Optimization

-   `useMemo` and `useCallback` where necessary
-   Component memoization (`React.memo`)
-   Avoid derived state recalculation
-   Transform-based animation (`translate3d`)
-   Reduced layout reflows
-   Avoid synchronous layout reads during animation

------------------------------------------------------------------------

## Architectural Decisions

The implementation will:

-   Separate carousel logic from presentation layer
-   Encapsulate rotation algorithm
-   Avoid mutation-based array operations
-   Use controlled animation state
-   Ensure single source of truth

------------------------------------------------------------------------

## Engineering Goals

-   Zero consecutive duplicate cards
-   Consistent frame rendering
-   Smooth swipe experience
-   Predictable component lifecycle
-   Clean, scalable component structure

------------------------------------------------------------------------

# Stack

Developed using:

-   React
-   Vite
-   TypeScript
-   Modern CSS with hardware-accelerated transitions
-   Strict component isolation

------------------------------------------------------------------------

# Development Roadmap

-   [x] Problem identification
-   [x] Visual documentation
-   [ ] Algorithm definition
-   [ ] Controlled carousel implementation
-   [ ] Performance validation
-   [ ] Before vs After comparison
-   [ ] Technical conclusion

------------------------------------------------------------------------

# Objective

This project is not only a UI refactor.

It is a demonstration of:

-   React rendering knowledge
-   Performance awareness
-   State control discipline
-   UI architecture decisions
-   Production-oriented thinking

The final implementation and metrics comparison will be added upon
completion.
