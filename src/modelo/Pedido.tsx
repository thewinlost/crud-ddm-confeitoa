// id, recheio do bolo,  massa, telefone, peso

export class Pedido {
    constructor() {
}
    public id: number;
    public telefone: string; 
    public massa: string;    
    public recheio: string; 
    public peso: string;   

    toString() {
        return this.id+''+this.telefone+''+this.massa+''+this.recheio+this.peso+'';
    };
}
