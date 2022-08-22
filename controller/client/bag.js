const Product = require('../../model/Product')

module.exports = {
  home: (req, res) => {

    res.render('bag', {
      title: 'bag',
      products: res.locals.bug_products,
    })
  },

  add: async (req, res) => {
    let product = (await Product.findById(req.params.id));
    product.__v = 1

    if (!product) {
      console.log('Bag product is not defined!');
      return res.redirect('back')
    }

    if (!res.locals.bug_products) {
      res.cookie('products', JSON.stringify([product]), {
        maxAge: 1000 * 60 * 60 * 48
      });
    } else {
      const indexOfObject = res.locals.bug_products.findIndex(object => {
        return object._id === req.params.id;
      });
      if (indexOfObject !== -1) {
        res.locals.bug_products[indexOfObject].__v = res.locals.bug_products[indexOfObject].__v + 1
        res.cookie('products', JSON.stringify(res.locals.bug_products), {
          maxAge: 1000 * 60 * 60 * 48
        });
      } else {
        const items = res.locals.bug_products;
        items.push(product);
        res.cookie('products', JSON.stringify(items), {
          maxAge: 1000 * 60 * 60 * 48
        })
      }
    }

    res.redirect('back')
  },

  del: async (req, res) => {
    const products = res.locals.bug_products
    products.splice(req.params.id, 1)
    res.cookie('products', JSON.stringify(products), {
      maxAge: 1000 * 60 * 60 * 48
    })
    res.redirect('back')
  },

  count: async (req, res) => {
    const indexOfObject = res.locals.bug_products.findIndex(object => {
      return object._id === req.params.id;
    });
    const pro = res.locals.bug_products[indexOfObject]

    if (req.params.mode === 'plus') {
      if (pro.__v <= 1000) {
        res.locals.bug_products[indexOfObject].__v = pro.__v + 1
      }
    } else if (req.params.mode === 'minus') {
      if(pro.__v > 1){
        res.locals.bug_products[indexOfObject].__v = pro.__v - 1
      }
    }

    res.cookie('products', JSON.stringify(res.locals.bug_products), {
      maxAge: 1000 * 60 * 60 * 48
    });

    res.json({ count: pro.__v })
  }
}