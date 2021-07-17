import { TransForm } from "../type/interface";

export const generate = (ast:TransForm[]) => {
    const cssLines = ast.reduce((cssArr, {dels,selector, comment})=> {
        if(comment) {
            cssArr.push(comment);
        }
        else if(selector && dels) {
            cssArr.push(selector + " {");
            cssArr.push(dels.map((del) => ` ${del.prop}: ${del.value};`).join('\n'));
            cssArr.push('   }');
        }

        return cssArr;
    },[] as string[]);

    return cssLines.join('\n');
}