import { getToken } from "./getToken";
import { Nodes, NodeType, Tokens } from "../type/interface";

export const getVariable = (words:string) => {
    const variableDel = words.split(':');
    if(variableDel.length === 2 && variableDel[0].startsWith('@')) {
        const [prop,value] = variableDel;
        return {
            type: 'variable',
            value: value.slice(0, -1), // 去除结尾的 ;
            prop
        }
    }
    return false;
}

export const getProperty = (words:string) => {
    if(words.endsWith(';')) {
        const propertyDel = words.split(':');
        if(propertyDel.length === 2) {
            const [prop, value] = propertyDel;
            return {
                type: 'property',
                prop,
                value: value.trim().slice(0, -1)
            }
        }
    }
    return false;
}

export const getSelector = (lines: string[],lineIndex:number,words:string) => {
    if(words.endsWith('{')) {
        const selectorDel = words.split('{');
        // 目前只考虑单个选择器
        if(selectorDel.length === 2) {
            const {tokens, line} = getToken(lines.slice(lineIndex +1).join('\n'));
            return {
                del: {
                    type: 'selector' as NodeType,
                    value: selectorDel[0],
                    prop: '',
                    ...tokens
                },
                line: line+lineIndex
            }
        }
    }
    return false;
}

export const getComment = (lines: string[],lineIndex:number,words:string) => {
    if(words.startsWith('/*')) {
        /* 单行注释 */
        if(words.endsWith('*/')) {
            return {
               comment: { 
                   type: 'comment' as NodeType,
                    prop:'',
                    value: words,
                    nodes: null,
                    dels: null
                },
                line: lineIndex
            }
        }
        else {
            /**
             * 多行注释
             */
            const comments = [];
            while(!lines[lineIndex].trim().endsWith('*/')) {
                comments.push(lines[lineIndex]);
                lineIndex++;
            }
            comments.push(lines[lineIndex]);
            return {
                comment: {
                    type: 'comment' as NodeType,
                    prop: '',
                    value: comments.join('\n'),
                    nodes: null,
                    dels: null
                },
                line:lineIndex
            }
        }
    }
    return false;
}

// 变量替换
export const parse = (tokens: Tokens)=> {
    const {dels, nodes} = tokens || {};
    const variableMap = dels?.reduce((variableMap, {prop, value}) => {
        variableMap[prop] = value;
        return variableMap;
    }, {} as {[key: string]:any}) || {};

    parseNode(nodes, variableMap);

    tokens.dels = null;
    return {...tokens, type: 'root' as NodeType, value: '', prop: ''};
} 

const parseNode = (nodes: Nodes[] | null, variableMap: {[key:string]:any}) => {
    if(!nodes?.length) return;
    nodes.map((node) => {
        node.dels?.map(del => {
            const {value} = del;
            // value 可能是单个值: @color，也可能是多个值 1px solid @color;
            const variableName = value.match(/@(.*?)(\s|$)/g)?.[0];
            if(variableName && variableName in variableMap) {
                del.value = del.value.replace(variableName, variableMap[variableName]);
            }
        });

        parseNode(node.nodes, variableMap);
    })
} 