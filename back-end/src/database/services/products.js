const puppeteer = require("puppeteer");
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");
const { Search } = require("../models");
const _ = require("lodash");

async function getMercadoLivre(searchStr, category) {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  console.log('iniciei');

  await page.setRequestInterception(true);
    
  page.on('request', (req) => {
      if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
          req.abort();
      }
      else {
          req.continue();
      }
  });

  await page.goto(`https://lista.mercadolivre.com.br/${category}`);
  console.log('fui pra url');


  const search = ".nav-search-input";
  const searchBtn = ".nav-search-btn";
  const check = "p > input";

  await page.waitForSelector(search);

  await page.click(check);
  await page.focus(search);
  await page.keyboard.down("Control");
  await page.keyboard.press("A");
  await page.keyboard.up("Control");
  await page.type(search, searchStr);
  await Promise.all([page.waitForNavigation(), await page.click(searchBtn)]);

/*   await scrollPageToBottom(page, {
    size: 250,
    delay: 250,
  }); */

  const links = await page.$$eval(
    category === "tv"
      ? ".ui-search-layout__item"
      : ".ui-search-layout__item.shops__layout-item",
    (el) => {
      return el.map((link) => ({
        link: link.querySelector(".ui-search-link").href,
        price: `$ ${
          link
            .querySelector(
              ".ui-search-price__second-line.shops__price-second-line"
            )
            .querySelector(".price-tag-fraction").innerHTML
        }`,
        image: link.querySelector("img").getAttribute("data-src"),
        description: link.querySelector(
          ".ui-search-item__title.shops__item-title"
        ).innerHTML,
      }));
    }
  );
  await browser.close();
  return links;
}

async function getBuscape(searchStr, category) {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setRequestInterception(true);
    
  page.on('request', (req) => {
      if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
          req.abort();
      }
      else {
          req.continue();
      }
  });

  await page.goto("https://www.buscape.com.br/");


  const selectCategory = ".Dropdown_DropdownHeader__N3Zqc";
  const input =
    ".AutoCompleteStyle_input__HG105.AutoCompleteStyle_textBox__MXJXH.AutoCompleteStyle_input__HG105";
  if (category === "celular")
    await page.$$eval(".Dropdown_DropdownOption__fl0dr", (divs) =>
      divs.at(1).click()
    );
  if (category === "geladeira")
    await page.$$eval(".Dropdown_DropdownOption__fl0dr", (divs) =>
      divs.at(4).click()
    );
  if (category === "tv")
    await page.$$eval(".Dropdown_DropdownOption__fl0dr", (divs) =>
      divs.at(2).click()
    );
  await page.click(selectCategory);
  await page.type(input, searchStr);
  await page.focus(input);
  await Promise.all([page.waitForNavigation(), page.keyboard.press("Enter")]);
  await scrollPageToBottom(page, {
    size: 250,
    delay: 250,
  });


  const products = await page.$$eval(
    ".SearchCard_ProductCard_Inner__7JhKb",
    (product) => {
      return product.map((product) => ({
        link: product.href,
        price: product.querySelector(
          ".Text_Text__h_AF6.Text_MobileHeadingS__Zxam2"
        ).innerHTML,
        image: product.querySelector("img").getAttribute("src"),
        description: product.querySelector("h2").innerHTML,
      }));
    }
  );
  await browser.close();
  return products;
}

const getProductsAndPostSearch = async (search, site, category) => {
  const searchVerify = await Search.findAll({
    where: {
      search: search,
      category: category,
      site: site,
    },
  });
  if (searchVerify.length === 1) {
    return {
      type: null,
      message: "Not found itens",
    };
  }
  if (searchVerify.length) {
    return {
      type: null,
      message: searchVerify,
    };
  }
  let [productsMl, productsBp] = await Promise.all([
    site === "Mercado Livre" || site === "Ambos"
      ? getMercadoLivre(search, category)
      : [],
    site === "Buscapé" || site === "Ambos" ? getBuscape(search, category) : [],
  ]);
  const products = _.concat(productsMl, productsBp);
  if (products.length === 0) {
    await Search.create({
      search: search,
      category: category,
      site: site,
    });
    return {
      type: null,
      message: "Not found itens",
    };
  }
  const newSearch = products.map(async (product) => {
    await Search.create({
      search: search,
      category: category,
      site: site,
      link: product.link,
      price: product.price,
      image: product.image,
      description: product.description,
    });
  });
  Promise.all(newSearch);
  return {
    type: null,
    message: products,
  };
};

module.exports = {
  getProductsAndPostSearch,
};
