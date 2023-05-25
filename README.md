# Guilherme Durães Pereira - FullStack Test - Software:

# Contexto:
Aplicação para uma busca simples de podutos no Mercado Livre e no Buscapé ou nos dois ao mesmo tempo, utilizando web scraping para  extração de dados.

# Habilidades pessoais desenvolvidas:
- Web Scrap utilizando a biblioteca puppeteer, puppeter é uma biblioteca que roda o Chromium na memoria do computador simulando uma pessoa acessando o site que você programar para o mesmo acessar, e a partir dessa biblioteca podemos extrair diversos dados da pagina por meio do DOM.

# Funcionalidades Inclusas:
- Select para selecionar as categorias: Mobile, Geladeira e TV;
- Select para selecionar o site: Mercado Livre ou Buscapé;
- Campo de pesquisa para digitar quais  produtos deseja encontrar;
- Cards de cada produto;
- Armazenamento das buscas de produtos em um banco de dados. Para caso uma busca repetida aconteça a aplicação busca os resultados no banco de dados(considerando apenas os filtros da categoria do produto, o site aonde foi feita a busca e a busca digitada) ao invés de esperar todo o processo de web scrap feito pelo puppeteer no Back-end.

# Tecnologias usadas:
Back-end:
Node.JS, Express, Sequelize, MySQL, JavaScript, DockerFile, Puppeteer.

Front-end:
Node.JS, JavaScript, Axios, React.js, SweetAlert.

# Rodando a aplicação na sua maquina:

Para rodar a aplicação, é necessário ter o docker instalado em sua maquina e executar os seguintes passos:

- Inicie um container com MySQL server com o comando: `docker container run --name nome-do-container -e MYSQL_ROOT_PASSWORD=senha_mysql -d -p 3306:3306 mysql:8.0.29`.
***Obs: o "nome-do-container" e a "senha_mysql podem ser alteradas para o nome e a senha que você preferir,além disso lembre que o container tentara rodar na porta 3306.*** 

- Clonar o projeto SSH em um diretorio da sua escolha: `git clone git@github.com:EuGuiXtd/EuGuiXtd-Lexart-FullStack-Test-Software.git`.

- Configurar o .env: Dentro do diretorio do Back-End você encontrara um arquivo chamado ".env.example" altere o nome de arquivo para ".env" e mude as variaveis de ambiemte com as variaveis do seu container MySQL.
***Obs: Caso tenha utilizado o comando do primeiro passo para iniciar seu container,apenas precisara mudar as variaves "MYSQL_DATABASE" para um nome do seu desejo e a variavel "MYSQL_PASSWORD" para a senha que você usou no primeiro passo em "senha_mysql". Caso tenha alguma duvida ou queria conectar no Mysql Workbench confira este [link](http://localhost:3001/).*** 

- Instalar as dependecias do Back-end e iniciar o mesmo,além disso inicie sua databese e crie sua tabelas: entre no diretorio com o comando: `cd back-end/` instale as dependecias com `npm install` e inicie o Back-end com `npm start` ou `npm run dev` para desenvolvimento, após isso ainda dentro do diretorio do Back execute o comando `env $(cat .env) npx sequelize db:create` para criar a database,em seguida execute o comando `env $(cat .env) npx sequelize db:migrate` para criar as tabelas.
***Obs: Lembrando que o Back tentara rodar na porta 3001.*** 

- Instalar as dependecias do Front-end e iniciar o mesmo: `entre no diretorio com: cd front-end/ instale as dependecias com: npm install e inicie o Front-end com: npm start`
***Obs: Lembrando que o Front tentara rodar na porta 3000.*** 

Pronto agora com todos os passos feitos basta acessar http://localhost:3000/ na sua maquina.
