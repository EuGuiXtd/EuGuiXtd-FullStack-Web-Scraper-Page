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
- Solução hospedada online em um servidor utilizando o [**Render**](https://render.com/);
- Caso queria visualizar a aplicação basta acessar esse [**Link**](https://lex-art-test-front-end.onrender.com/).

# Tecnologias usadas:
Back-end:
Node.JS, Express, Sequelize, MySQL, JavaScript, DockerFile, Puppeteer.

Front-end:
Node.JS, JavaScript, Axios, React.js, SweetAlert.

# Rodando a aplicação na sua maquina:

Para testar a aplicação, é necessário:

Clonar o projeto SSH em um diretorio da sua escolha: `git clone git@github.com:EuGuiXtd/EuGuiXtd-Lexart-FullStack-Test-Software.git`

Instalar as dependecias do Back-end e iniciar o mesmo: `entre no diretorio com: cd back-end/ instale as dependecias com: npm install e inicie o Back-end com: npm start ou npm run dev para desenvolvimento`

Instalar as dependecias do Front-end e iniciar o mesmo: `entre no diretorio com: cd front-end/ instale as dependecias com: npm install e inicie o Front-end com: npm start`

Obs: Lembrando que o Front tentara rodar na porta 3000  e o Back na 3001.

Pronto agora com todos os passos feitos basta acessar http://localhost:3000/ na sua maquina.
