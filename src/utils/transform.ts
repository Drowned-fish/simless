import { Nodes, TransForm } from "../type/interface";

export const transform = (ast: Nodes) => {
    let transformRes: TransForm[] = [];
    const traverse = (astNode: Nodes,result: TransForm[],selectorPrefix:string) => {
        let selector = '    ';
        if(astNode.type === 'selector') {
            let astNodeValue = astNode.value.trim();
            if(astNodeValue.startsWith('&')) {
                selector = selectorPrefix + astNodeValue.slice(1);
            }
            else {
                selector = selectorPrefix + astNodeValue;
            }
            result.push({
                selector,
                dels: astNode.dels!
            })
        }
        else if(astNode.type === 'comment') {
            result.push({comment: astNode.value,selector:'',dels:null})
        }
        if(astNode.nodes) {
            for(let i =0;i<astNode?.nodes?.length; i++) {
                traverse(astNode.nodes[i], result, selector);
            }
        }
    }

    traverse(ast, transformRes, "");
    return transformRes;
}