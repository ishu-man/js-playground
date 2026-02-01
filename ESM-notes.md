# On ES6 modules
I will be using this markdown to take notes from the Odin's website.
- what's an IIFE? what is a module pattern?
- so in an ESM does the global scope not exist unless explicitly invoked via `import` or `export`?
- you can _named export_ stuff by either sticking the export keyword in front of the var of func or using export { a, b, c }
- to do a _named import_ you can use import { this, that } from "filepath"--> note that you can exclude functions or vars you don't want to import.
- "filepath" can't be a template string.
- To _default export_ something you can use export default in front of the expression or use export default expression; 
- export default replaces the variable declaration, so export default "This is a string" is totally valid.
- To _default import_ something you can use import give_it_a_random_name_because_you_default_exported from "filepath";

- Entry points:
> dependency graph - importer DEPENDS ON exporter, so the importer should be the entry point
> add an attribute type="module" in the HTML to account for the entry point. No need to defer
- check out namespace imports they are so pythonic. It's basically import * as my_module from filepath and then my_module.doThat();

# On npm
- It does not stand for node package manager, but is npm is not an acronym
- manages a `package.json` which is like requirements.txt from pip and updates it too with new dependencies
