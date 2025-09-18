import { ELDR } from "./eldr";
import { ngramsData } from "./ngrams/ngrams-l60";

const eldr = new ELDR(ngramsData);
export { eldr };
