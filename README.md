# Projeto Terminus

## Dados Extraidos

- [Quantidade total de participações de um Convidado](https://github.com/lucashpmelo/node-terminus/blob/main/src/data/csv/ConvidadosPorParticipacoes.csv)

- [Quantidade total de participações de um Convidado por Ano](https://github.com/lucashpmelo/node-terminus/blob/main/src/data/csv/ConvidadosPorParticipacoesPorAno.csv)

- [Quantidade de vezes que um Convidado participou de uma Categoria(NerdCast, Caneca de Mamicas, NerdTech, ...)](https://github.com/lucashpmelo/node-terminus/blob/main/src/data/csv/ConvidadosPorCategoria.csv)

- [Quantidade de vezes que um Convidado participou de um Tema(Ciências, História, Política, ...)](https://github.com/lucashpmelo/node-terminus/blob/main/src/data/csv/ConvidadosPorTema.csv)

- [Todos os episódios que um Convidado participou](https://github.com/lucashpmelo/node-terminus/blob/main/src/data/csv/ConvidadosPorEpisodio.csv)

- [Duração estimada da leitura de e-mails de cada episódio](https://github.com/lucashpmelo/node-terminus/blob/main/src/data/csv/DuracaoEmailPorEpisodio.csv)

- [Episódio mais curto e mais longo por Categoria](https://github.com/lucashpmelo/node-terminus/blob/main/src/data/csv/EpisodiosPorDuracao.csv)

- [Quantidade total de Convidados por episódio](https://github.com/lucashpmelo/node-terminus/blob/main/src/data/csv/QuantidadeConvidadosPorPrograma.csv)

- [Quantidade total de episódios lançados por ano de cada Categoria](https://github.com/lucashpmelo/node-terminus/blob/main/src/data/csv/TotalEpisodiosPorAno.csv)

## Funcionamento

Comando para sincronizar os dados dos episódios

```sh
$ npm run sinc
```

Comando para gerar os CSV's com os dados sincronizados

```sh
$ npm run csv
```

## Pré-Requisitos

Ter instalado em sua máquina:

- _NodeJS_
- _MongoDB_

Na pasta do projeto abra o terminal e digite:

```sh
$ npm install
```
