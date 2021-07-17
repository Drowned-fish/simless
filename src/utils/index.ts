
import { generate } from "./generate";
import { getToken } from "./getToken";
import { transform } from "./transform";
import { parse } from "./parse";

const simless = (less:string) => {
    const {tokens} = getToken(less);
    const parseRes = parse(tokens);
    const transformRef = transform(parseRes);
    const res = generate(transformRef);
    return res;

}

export default simless;