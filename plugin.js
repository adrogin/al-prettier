import { parser } from "./parser.js";
import { printer } from "./printer.js";

const alPrettier = {
  languages: [
    {
      name: "al",
      parsers: ["al-parse"]
    }
  ],
  parsers: {
    "al-parse": parser
  },
  printers: {
    "al-ast": printer
  },
};

export default alPrettier;
