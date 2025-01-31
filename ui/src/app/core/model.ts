export class Categoria {
  codigo!: number;
  nome!: string;
}

export class Usuario {
  codigo!: number;
  nome!: string;
  email!: string;
  senha!: string;
  permissoes!: string[];
}

export class Pessoa {
  codigo!: number;
  nome!: string;
  endereco = new Endereco();
  ativo = true;
}

export class permissao {
  codigo!: number;
  descricao!: string;
}

export class Endereco {
  logradouro!: string;
  numero!: string;
  complemento!: string;
  bairro!: string;
  cep!: string;
  cidade!: string;
  estado!: string;
}

export class Lancamento {
  codigo!: number;
  tipo!: string;
  descricao!: string;
  dataVencimento!: Date;
  dataPagamento!: Date;
  valor!: number;
  observacao!: string;
  categoria = new Categoria();
  pessoa = new Pessoa();
}
