import { Tokens } from "../type/interface";
import { getComment, getProperty, getSelector, getVariable } from "./parse";

export const getToken = (source: string) => {
    let currentParseLine = 0;
    const lines = source.split(/\n|\r\n/);

    const tokens: Tokens = {dels: [], nodes: []};
    for(let i = 0; i< lines.length;i++) {
        const effectiveWords = lines[i].trim();
        if(i < currentParseLine || !effectiveWords) {
            continue;
        }

        if(effectiveWords === '}') {
            currentParseLine++;
            break;
        }

        // 变量
        const variableDel = getVariable(effectiveWords);
        if(variableDel) {
            tokens['dels']?.push(variableDel);
        }
        else {
        // 属性
            const propertyDel = getProperty(effectiveWords);
            if(propertyDel) {
                currentParseLine++;
                tokens['dels']?.push(propertyDel);
                continue;
            }
            // 选择器
            const selectorDel = getSelector(lines,i,effectiveWords);
            if(selectorDel) {
                const {del,line} = selectorDel;
                currentParseLine = line;
                tokens['nodes'].push(del);
            }
            else {
                const commentDel = getComment(lines, i, effectiveWords);
                if(commentDel) {
                    const {comment,line} =commentDel;
                    currentParseLine = line;
                    tokens['nodes'].push(comment);
                }
            }
        }
        currentParseLine++;
    }
    return {tokens, line: currentParseLine};
}

