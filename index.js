import {html, render} from "https://unpkg.com/htm/preact/standalone.module.js";
import InputForm from "./InputForm.js";
import ResultTable from "./ResultTable.js";

const App = html`<${ResultTable} />`;
render(App, document.body);
