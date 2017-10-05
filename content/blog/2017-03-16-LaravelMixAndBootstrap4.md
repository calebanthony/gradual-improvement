---
title: Laravel Mix and Bootstrap 4's JavaScript
---

It seems that getting Bootstrap 4 to play nicely with just about anything takes quite a bit of work. I felt like bashing my head into a brick wall several times during my work to try and get this functional. So I'm here to save your precious brain cells and just tell you what I did.

Of course you can always grab everything you need from a CDN and slap it into your `index.html` but I wanted a modularized way of building out my assets. Because we're embedding our application inside clients' websites, we want it to be as lightweight as possible. So only pulling in exactly what we need is crucial.

If you're like me and don't want to weigh down your application unnecessarily, this is what you're looking for.

First, you're going to want:

* Laravel Mix, specifically your webpack.mix.js file. If you have Laravel 5.4, this should be right in your project root directory.
* Bootstrap 4 & Tether installed. `npm i --save-dev bootstrap@4.0.0-alpha.6 tether`
* For the `exports-loader` command, you'll need Bootstrap Loader. `npm i --save-dev bootstrap-loader`. This isn't *officially* supported for Bootstrap 4, but it works fine.

This is literally my `webpack.mix.js` from the project I'm working on at work, with the custom stuff we have stripped out.

```javascript
// webpack.mix.js
mix  
  .autoload({
    jquery: ['$', 'jQuery', 'window.jQuery'],
    tether: 'Tether',
    // This nasty little syntax is necessary based on the way Boostrap is packaged.
    'exports-loader?Util!bootstrap/js/dist/util': 'Util',

    // All bootstrap dependencies.
    // Bootstrap isn't clear what you need, so when you add something, check console for errors.
    // It'll tell you what you need.
    //  "exports-loader?Alert!bootstrap/js/dist/alert": 'Alert',
    //  "exports-loader?Button!bootstrap/js/dist/button": 'Button',
    //  "exports-loader?Carousel!bootstrap/js/dist/carousel": 'Carousel',
    //  "exports-loader?Collapse!bootstrap/js/dist/collapse": 'Collapse',
    //  "exports-loader?Dropdown!bootstrap/js/dist/dropdown": 'Dropdown',
    //  "exports-loader?Modal!bootstrap/js/dist/modal": 'Modal',
    //  "exports-loader?Popover!bootstrap/js/dist/popover": 'Popover',
    //  "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy": 'Scrollspy',
    //  "exports-loader?Tab!bootstrap/js/dist/tab": 'Tab',
    //  "exports-loader?Tooltip!bootstrap/js/dist/tooltip": 'Tooltip',
    //  "exports-loader?Util!bootstrap/js/dist/util": 'Util'
  })

  .js([
    // This is Laravel's bootstrap file.
    'resources/assets/js/bootstrap.js',
    // This is all we're including from Bootstrap's JS.
    // Feel free to include whatever else you want, along with the appropriate dependencies.
    'bootstrap/js/dist/dropdown.js'
  ], 'public/js/all.js')

```
The reason this took me so long to figure out is because the way Laravel Mix uses `.autoload` is *backwards* from the typical Webpack configuration.

Whether this is a design decision or oversight, it sure caused me a few hours of pain.

#### Webpack ProvidePlugin
Here, the package names are on the right, and the variable name is on the left.

```javascript
new webpack.ProvidePlugin({  
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery'
}),
```

#### Laravel Mix Autoload
Here, the package name is on the left, and variable names are on the right.

```javascript
mix.autoload({  
    jquery: ['$', 'jQuery', 'window.jQuery'],
    tether: 'Tether',
    'exports-loader?Util!bootstrap/js/dist/util': 'Util',
```

This isn't documented in the Laravel docs, just in the [Mix wiki on GitHub](https://github.com/JeffreyWay/laravel-mix/blob/master/docs/autoloading.md). and doesn't give an error when trying to run webpack, so it took a lot of tracking down to get this figured out.

But alas, here it is! So stick this into your project and enjoy!
