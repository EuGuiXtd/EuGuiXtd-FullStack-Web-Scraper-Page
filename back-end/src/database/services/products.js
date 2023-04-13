const puppeteer = require('puppeteer');
const { scrollPageToBottom } = require('puppeteer-autoscroll-down');
const _ = require('lodash');

async function getMercadoLivre(searchStr,category) {
  const browser = await puppeteer.launch()//{headless: false});
  const page = await browser.newPage();
  console.log('iniciei');

  await page.goto(`https://lista.mercadolivre.com.br/${category}`);
  console.log('fui pra url');

  await page.setViewport({width: 1080, height: 1024});

  const search = '.nav-search-input'
  const searchBtn = '.nav-search-btn';
  const check = 'p > input'

  await page.waitForSelector(search);

  await page.click(check)
  await page.focus(search);
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  await page.type(search, searchStr);
  await Promise.all([
    page.waitForNavigation(),
    await page.click(searchBtn),
  ]);

  await scrollPageToBottom(page, {
    size: 250,
    delay: 250
  })

const links = await page.$$eval('.ui-search-layout__item.shops__layout-item', el => {
  return el.map(link => ({
    link: link.querySelector(".ui-search-link").href,
    price: link.querySelector(".ui-search-price__second-line.shops__price-second-line").querySelector(".price-tag-fraction").innerHTML,
    image: link.querySelector("img").getAttribute('src'),
    description: link.querySelector(".ui-search-item__title.shops__item-title").innerHTML
}));
});
//console.log(links)
  await browser.close();
  return links;
};

async function getBuscape(searchStr,category) {
    const browser = await puppeteer.launch()//{headless: false});
    const page = await browser.newPage();
  
    await page.goto('https://www.buscape.com.br/');
  
    await page.setViewport({width: 1280, height: 926});
  
    const selectCategory = '.Dropdown_DropdownHeader__N3Zqc'
    const input = '.AutoCompleteStyle_input__HG105.AutoCompleteStyle_textBox__MXJXH.AutoCompleteStyle_input__HG105'
    if(category === 'celular')await page.$$eval('.Dropdown_DropdownOption__fl0dr', divs => divs.at(1).click());
    if(category === 'geladeira')await page.$$eval('.Dropdown_DropdownOption__fl0dr', divs => divs.at(4).click());
    if(category === 'tv')await page.$$eval('.Dropdown_DropdownOption__fl0dr', divs => divs.at(2).click());
    await page.click(selectCategory)
    await page.type(input, searchStr);
    await page.focus(input);
    await Promise.all([
      page.waitForNavigation(),
      page.keyboard.press('Enter'),
    ]);

    await scrollPageToBottom(page, {
      size: 250,
      delay: 250
    })

  const products = await page.$$eval('.SearchCard_ProductCard_Inner__7JhKb', product => {
    return product.map(product => ({
      link: product.href,
      price: product.querySelector(".Text_Text__h_AF6.Text_MobileHeadingS__Zxam2").innerHTML,
      image: product.querySelector("img").getAttribute('src'),
      description: product.querySelector("h2").innerHTML
  }));
  });
//  console.log(products) 
    await browser.close();
    return products;
  };

  async function getProducts(searchStr,category) {
    const products = []
    const productsMl = await MercadoLivre(searchStr, category);
    const productsBp = await getBuscape(searchStr, category);
    products.push(productsMl, productsBp);
    return {
        type: null,
        message: products,
    }
  }




const getProductsAndPostSearch = async (search, site, category) => {
    let [productsMl,productsBp] = await Promise.all([
        (site === 'Mercado Livre' || site === 'Ambos') ? getMercadoLivre(search, category) : [],
        (site === 'Buscapé' || site === 'Ambos') ? getBuscape(search, category) : []
    ])
    console.log('ML',productsMl.length)
    console.log('BP',productsBp.length)
    const products =  _.concat(productsMl,productsBp);
    return {
        type: null,
        message: products
    };
};

module.exports = { 
    getProductsAndPostSearch, 
    };