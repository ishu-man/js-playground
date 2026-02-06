import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './styles.css';

import Game from './app';

const root = createRoot(document.querySelector("#root"));
console.log(root);
root.render(
    <StrictMode>
        <Game />
    </StrictMode>
);