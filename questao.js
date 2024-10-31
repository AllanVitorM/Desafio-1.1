// Questão 1

class Vertice {
    #x;
    #y;
    
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    } 
    
    CalcDist(nVertice) {
        return (nVertice) => {
            const dx = nVertice.#x - this.#x;
            const dy = nVertice.#y - this.#y;
            return Math.sqrt(dx * dx + dy * dy);
        };
    }

    move (Attx, Atty) {
        this.#x = Attx
        this.#y = Atty
    }

    equals(nVertice) {
        return this.#x === nVertice.#x && this.#y === nVertice.#y;
    }

    get coordenadas() {
        return {x: this.#x, y: this.#y};
    }
}

function VVertice () {
    const vert = [];
    const prompt = require('prompt-sync')();

    for (let i = 1;  i <= 3; i++) {
        const x = parseInt(prompt(`Digite as coordenadas de X do vértice ${i}:`))
        const y = parseInt(prompt(`Digite as coordenadas de Y do vértice ${i}:`))
        vert.push(new Vertice(x,y));
    }
    return vert;
}

const vert = VVertice();
console.log("Vertices criados: ")

if (Array.isArray(vert)) {
    vert.forEach((vvert, index) => {
        console.log(`Vértice ${index + 1}: `, vvert.coordenadas)
    })
}

if(vert.length >= 2) {
    const dist1 = vert[0].CalcDist()(vert[1]);
    const dist2 = vert[1].CalcDist()(vert[2]);
    const dist3 = vert[0].CalcDist()(vert[2]);

    console.log(`Distância entre os vértices 1 e 2: ${dist1}`);
    console.log(`Distância entre os vértices 2 e 3: ${dist2}`);
    console.log(`Distância entre os vértices 1 e 3: ${dist3}`);
    
    console.log(`Os vértices 1 e 2 são iguais? ${vert[0].equals(vert[1]) ? "Sim" : "Não"}`)
    console.log(`Os vértices 2 e 3 são iguais? ${vert[1].equals(vert[2]) ? "Sim" : "Não"}`)
    console.log(`Os vértices 1 e 3 são iguais? ${vert[0].equals(vert[2]) ? "Sim" : "Não"}`)
}

// Questão 2
class Triangulo {
    #lado1;
    #lado2;
    #lado3;
    
    constructor(lado1, lado2, lado3) {
        this.#lado1 = lado1;
        this.#lado2 = lado2;
        this.#lado3 = lado3;
    }

    #fTriangulo() {
        const ladoa = this.#lado1.CalcDist()(this.#lado2);
        const ladob = this.#lado2.CalcDist()(this.#lado3);
        const ladoc = this.#lado3.CalcDist()(this.#lado1);
        
        return (ladoa + ladob > ladoc) && (ladoa + ladoc > ladob) && (ladob + ladoc > ladoa);
    }

    equals(Tri) {
        return (
            this.#lado1.equals(Tri.#lado1) &&
            this.#lado2.equals(Tri.#lado2) &&
            this.#lado3.equals(Tri.#lado3)
        );
    }

    get dist() {
        const a = this.#lado1.CalcDist()(this.#lado2);
        const b = this.#lado2.CalcDist()(this.#lado3);
        const c = this.#lado3.CalcDist()(this.#lado1);
        return a + b + c;
    }

    tTriangulo() {
        const a = this.#lado1.CalcDist()(this.#lado2);
        const b = this.#lado2.CalcDist()(this.#lado3);
        const c = this.#lado3.CalcDist()(this.#lado1);

        if (a === b && b === c) {
            return "Equilátero";
        } else if (a === b || b === c || a === c) {
            return "Isósceles";
        } else {
            return "Escaleno";
        }
    }

    cTriangulo () {
        return new Triangulo(this.#lado1, this.#lado2, this.#lado3)
    }

    get areaTri() {
        const a = this.#lado1.CalcDist()(this.#lado2);
        const b = this.#lado2.CalcDist()(this.#lado3);
        const c = this.#lado3.CalcDist()(this.#lado1);
        const s = this.dist / 2;

        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
}

const prompt = require ('prompt-sync')();

function TTriangulo() {
    const vertices = [];

    for (let i = 1; i <= 3; i++) {
        const x = parseFloat(prompt(`Digite o ponto de x do vértice ${i}: `));
        const y = parseFloat(prompt(`Digite o ponto de y do vértice ${i}: `));

        vertices.push(new Vertice (x, y));
    }

    return new Triangulo (vertices[0], vertices[1], vertices[2]);
}

const triangulo = TTriangulo();
console.log(`Perímetro do triângulo: ${triangulo.dist}`);
console.log(`Área do triângulo: ${triangulo.areaTri}`);
console.log(`Tipo do triângulo: ${triangulo.tTriangulo()}`);

// Questão 3

class Poligono {
    #poli;

  constructor(vertices) {
    if (vertices.length < 3) {
        throw new Error("Mínimo 3 vértices.")
    }
    this.#poli = vertices
  }

  adicionarVert(novoV) {
    for (const vertice of this.#poli) {
        if(vertice.equals(novoV)) {
            return false;
        }
    }
    this.#poli.push(novoV);
    return true;
  }

  get peri() {
    let total = 0;

    for (let i = 0; i < this.#poli.length; i++) {
        const v1 = this.#poli[i];
        const v2 = this.#poli[(i + 1) % this.#poli.length];
        total += v1.CalcDist()(v2);
    }
    return total
  }
  get quantVert() {
    return this.#poli.length;
  }
}

//const prompt = require ('prompt-sync')();

function PPoli() {

    const vertices = [];
    const prompt = require('prompt-sync')();

    for (let i = 1; i <= 3; i++) {
        const x = parseInt(prompt(`Digite a coordenada X do vértice ${i}: `));
        const y = parseInt(prompt(`Digite a coordenada Y do vértice ${i}: `));
        vertices.push(new Vertice(x, y));
    }
    return new Poligono(vertices);
}

const poligono = PPoli();
console.log(`Quantidade de vértices: ${poligono.quantVert}`);
console.log(`Perímetro do polígono: ${poligono.peri}`);

const Novox = parseInt(prompt("Digite a coordenada X do novo vértice: "));
const Novoy = parseInt(prompt("Digite a coordenada Y do novo vértice: "));
const novoVert = new Vertice(Novox, Novoy);
const adicionado = poligono.adicionarVert(novoVert);

if (adicionado) {
    console.log("Vértice adicionado com sucesso!");
} else {
    console.log("O vértice já existe no polígono.");
}

console.log(`Quantidade de vértices após adição: ${poligono.quantVert}`);
console.log(`Perímetro do polígono após adição: ${poligono.peri}`);


// Questão 4

class Aluno {
    constructor(matricula, nome) {
        this.matricula = matricula;
        this.nome = nome;
        this.p1 = null;
        this.p2 = null;
    }

    LancarNota(p, nota) {
        if (p === 1) {
            this.p1 = nota;
        } else if (p === 2) {
            this.p2 = nota;
        }
    }

    CalcNF() {
        if(this.p1 !== null && this.p2 !== null) {
            return ((this.p1 + this.p2) / 2).toFixed(1);
        } else if (this.p1 !== null) {
            return (this.p1 / 2).toFixed(1);
        } else if (this.p2 !== null) {
            return (this.p2 / 2).toFixed(1);
        }
        return "0.0"
    }
}

class Turma {
    #alunos

    constructor(){
        this.#alunos = [];
    }

    insertAluno(matricula, nome){
        const AlunoExist = this.#alunos.find(a => a.matricula === matricula);
        if (AlunoExist) {
            console.log("Já existe aluno com essa matricula")
            return false;
        }
        const NewAluno = new Aluno(matricula, nome);
        this.#alunos.push(NewAluno);
        return true;
    }

    DeletAluno(matricula) {
        const index = this.#alunos.findIndex(a => a.matricula === matricula);
        if(index !== -1) {
            this.#alunos.splice(index, 1);
            console.log("Aluno removido com sucesso!");
        } else {
            console.log("Aluno não encontrado.");
        }
    }

    EnviarNota(matricula, p, nota){
        const aluno = this.#alunos.find(a => a.matricula === matricula);
        if (aluno) {
            aluno.LancarNota(p,nota);
        } else {
            console.log("Aluno não encontrado.");
        }
    }

    imprimirAlunos() {
        console.log(`—---------------------------------------`);
        console.log(`Matricula Nome P1 P2 NF`);
        console.log(`—---------------------------------------`);
        this.#alunos
            .sort((a, b) => a.nome.localeCompare(b.nome))
            .forEach(aluno => {
                console.log(`${aluno.matricula} ${aluno.nome} ${aluno.p1 !== null ? aluno.p1 : '-'} ${aluno.p2 !== null ? aluno.p2 : '-'} ${aluno.CalcNF()}`);
            });
        console.log(`—---------------------------------------`);
    }
}
// Alguns inserts para testar. fique a vontade para adicionar novos.
const turma = new Turma();

turma.insertAluno('12345', 'Ana de Almeida');
turma.insertAluno('23456', 'Bruno Carvalho');
turma.insertAluno('34567', 'Fernanda Abreu');
turma.insertAluno('45678', 'Joao Santos');
turma.EnviarNota('12345', 1, 8.0);
turma.EnviarNota('12345', 2, 9.5);
turma.EnviarNota('23456', 1, 7.0);
turma.EnviarNota('23456', 2, null);
turma.EnviarNota('34567', 1, null);
turma.EnviarNota('34567', 2, 8.5);
turma.EnviarNota('45678', 1, null); 
turma.EnviarNota('45678', 2, null); 
turma.imprimirAlunos();



//Questão 5

class Cliente {
    constructor(nome, cpf, DataNasc, RendaMensal, EstadoCivil, dep) {
        this.nome = nome;
        this.cpf = cpf;
        this.DataNasc = DataNasc;
        this.RendaMensal = RendaMensal;
        this.EstadoCivil = EstadoCivil.toUpperCase();
        this.dep = dep;
    }
    
    FormatCPF() {
        return this.cpf.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    formatRendaMensal() {
        return `R$ ${this.RendaMensal.toFixed(2).replace(".", ",")}`
    }

    formatDataNasc(){
        return this.DataNasc.toLocaleDateString("pt-BR");
    }
}

function SolicitarEntrada (mensagem, validacaoFunc, conversaoFunc) {
    let entrada;
    do {
        entrada = prompt(mensagem);
        entrada = conversaoFunc ? conversaoFunc(entrada) : entrada;
        if (validacaoFunc(entrada)) {
            return entrada;
        } else {
            console.log("Erro: Entrada invalida")
        }
    } while (true);
}

function ValidNome(nome) {
    return typeof nome === "string" && nome.length >= 5;
}

function ValidCPF(cpf) {
    return typeof cpf === "number" && cpf.toString().length === 11;
}

function ValidDataNasc(DataNasc) {
    const hoje = new Date();
    const idadeMinima = new Date(hoje.getFullYear() - 18, hoje.getMonth(), hoje.getDate());
    return DataNasc instanceof Date && !isNaN(DataNasc) && DataNasc <= idadeMinima;
}

function ValidRendaMensal(rendaMensal) {
    return typeof rendaMensal === "number" && rendaMensal >= 0;
}

function ValidEstadoCivil(estadoCivil) {
    return typeof estadoCivil === "string" && /^[CSVD]$/i.test(estadoCivil);
}

function ValidDep(dependentes) {
    return typeof dependentes === "number" && dependentes >= 0 && dependentes <= 10;
}

function convNumero(valor) {
    return Number(valor);
}

function convData(dataStr) {
    const [dia, mes, ano] = dataStr.split("/");
    return new Date(`${ano}-${mes}-${dia}`);
}

//const prompt = require ('prompt-sync')();

function main() {
    const nome = SolicitarEntrada("Nome (mínimo 5 caracteres): ", ValidNome);
    const cpf = SolicitarEntrada("CPF (exatamente 11 dígitos): ", ValidCPF, convNumero);
    const dataNascimento = SolicitarEntrada("Data de nascimento (DD/MM/AAAA): ", ValidDataNasc, convData);
    const rendaMensal = SolicitarEntrada("Renda mensal (número positivo com 2 casas decimais): ", ValidRendaMensal, valor => parseFloat(valor.replace(",", ".")));
    const estadoCivil = SolicitarEntrada("Estado civil (C, S, V ou D): ", ValidEstadoCivil);
    const dependentes = SolicitarEntrada("Dependentes (0 a 10): ", ValidDep, convNumero);

    const cliente = new Cliente(nome, cpf, dataNascimento, rendaMensal, estadoCivil, dependentes);

    console.log(`
        Dados do Cliente:
        Nome: ${cliente.nome}
        CPF: ${cliente.FormatCPF()}
        Data de Nascimento: ${cliente.formatDataNasc()}
        Renda Mensal: ${cliente.formatRendaMensal()}
        Estado Civil: ${cliente.EstadoCivil}
        Dependentes: ${cliente.dep}
    `);
}

main();