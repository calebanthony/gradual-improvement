---
title: Bootstrap 4 with Laravel 5 using Gulp
---

My team is starting a new project, and we've decided to go with Laravel 5 as our framework of choice.

We've also decided to go with Bootstrap 4, which at the time of this writing, is in Alpha.

While it would be straightforward to just copy+paste the CDN or manually grab the minified CSS, I wanted a bit of a challenge. Plus the ability to easily `npm update` without having to manually do anything is a big plus.

To get things up and running, there wasn't a lot of documentation so I found bits and pieces here and there. Hopefully by me doing the research, you can get it all in one nice place.

## What You Need
* NPM
* Gulp (or your favorite build system)
* Laravel 5 already up and running (I'm on 5.3)

## The Gist
1. Install Bootstrap via NPM
2. Set up your gulpfile.js to build your CSS
mix.sass('../../../node_modules/bootstrap/scss/bootstrap.scss')
3. Include your CSS in your layout

### #1 - Get Bootstrap
If you already have NPM installed, this should be easy as going into your project directory and:

`npm install bootstrap@4.0.0-alpha.5`

...or whatever version of bootstrap it is you're trying to get.

For those of you a bit unfamiliar with `npm`, this will give you a `node_modules` directory where all your packages will live.

This is where we'll find Bootstrap later for Gulp to mess with.

### #2 - Set Up Your Gulpfile
If you're using Laravel, you should know what [Elixir](https://laravel.com/docs/5.3/elixir) is.

So your `gulpfile.js` should look something like:

```javascript
const elixir = require('laravel-elixir');

elixir(function(mix) {  
    mix.sass('../../../node_modules/bootstrap/scss/bootstrap.scss')
});
```

Once you run `gulp` from your terminal, this will spit out the `bootstrap.css` file into your `public/css` directory. Laravel is already familiar with this, so don't worry about it too much.

I feel like there should be a more elegant way to grab things out of `node_modules` but everywhere I looked at the time of writing said this was the way to go. If anyone knows a better way, I'm open!

### #3 - Include Your CSS
For my project, I have a `layout.blade.php` blade template where I have my boilerplate code, and that's where I put the stylesheet references. While this may vary depending on your project, I would recommend this practice as it keeps things tidy.

```css
<link rel="stylesheet" type="text/css" href="{{ elixir("css/bootstrap.css") }}">
```

That's all there is to it! This will continue to work if you include some [cache-busting](https://laravel.com/docs/5.3/elixir#versioning-and-cache-busting) into your project, which I would highly recommend if not solely for the cool-factor.

---

So there you have it! All-in-all it's pretty straightforward, and if you've used these tools before, it gets even easier.

But for someone who's relatively new to all this, tackling this and getting it all to work right took longer than I'd care to admit on the internet.
