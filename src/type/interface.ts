export type Dels = {
    prop: string;
    value: string;
}

export type NodeType = 'variable'|'value'|'selector'|'property'|'comment'|'root'

export type Nodes = {
    type: NodeType;
    value: string;
    prop: string;
    nodes: Nodes[] | null;
    dels: Dels[] | null;
}

export interface Tokens {
    dels: Dels[] |null;
    nodes: Nodes[];
}

export interface TransForm {
    selector:string;
    dels: Dels[] | null;
    comment?:string;
}