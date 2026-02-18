# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Todos/Notes
- [ ] First and foremost 'Thinking in React' was a great read and its methods definitely work as a model to at least start working on React projects. I gave it a read and applied each of its steps during the initial part of making this thing.
- [ ] Lifting the state up makes a lot more sense now. Also embedding JSX as children in react components, ex. in Form I would return <Form Element> which would have an input and something else. So returning JSX was the way to go for me as it wasn't really clicking before that to think in that direction. And I was micro managing (or at least planning to) everything in my original (OldPersonalSection.jsx) version of the component.
- [ ] Apart from this I could do a lot better on taking the data and mapping it to setter functions and input types. Current approach was if else if ladders. Better alternative would be array/object mapping. 
- [ ] Tailwind has made my css experience a LOT better. I was kind of enjoying CSS after a while, notwithstanding the flex fuckup I did (my brain froze completely on how to center a div)