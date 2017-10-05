---
title: Building a Component Library
---

We're starting a rewrite of our software here at DataJoe and that gives me the freedom to design our front-end systems the right way from the start.

However, finding "the Right Way™" is difficult, because it doesn't appear to exist.

So in lieue of the Right Way™ I'm deciding to go with "the best way I currently know how".

That way is building a component library.

If you're in front-end development at all, you should really check out what the guys at Lonely Planet are [doing](http://engineering.lonelyplanet.com/2014/05/18/a-maintainable-styleguide.html). While it might not be the Right Way™ it's certainly the best I've seen thus far and seems to take a lot of best practices from back-end development and apply it to the front end.

In short, their solution is to create an API of components. This API feeds all their applications as well as their style guide, so changing the API cascades across all their applications, as well as updating the living style guide.

This is a beautiful approach, because there's no more copying and pasting of code, and it allows for changes to be made in a clean way that doesn't leave legacy code laying all over your app.

So at DataJoe, we decided to build something pretty similar, but here is how we structured it.

### What DataJoe is doing.
* Pipette, our CSS and JavaScript library.
* Beaker, our component library (written in VueJS), that pulls from Pipette.

Beaker then delivers a single ES Module JS file and a bundled CSS file that is required to be built into your app. This means you can use Webpack to do some tree-shaking and only build the JS that you need for your app. Nifty.

The reason we broke it up into two libraries is because we wanted to make it difficult to change the underlying JS and CSS that feeds everything we build. We limit access to Pipette and make changes few and far between with lots of testing to ensure we're not breaking anything.

We let the rest of the team access Beaker, which also houses our style guide. This means that as you update components, you can see your changes live reload in the style guide and see if (and where) things are breaking.

These are also housed in BitBucket, where they're versioned appropriately so that updating Beaker doesn't necessarily break your application that's using it. You can stay on older versions if you want to.

### Why It's Great
Keeping the two libraries separate is great for separation of concerns (definitely a Good Thing™), as well as making sure the big changes to CSS and JS which have a widespread effect are kept in check.

Keeping a wide range of components in Beaker is great because in the future, building an app will be extremely straightforward. Want a button?

```html
<b-button>Click Me!</b-button>
```

Want that button to be big? Don't worry, this is all documented in the style guide.

```html
<b-button size="large">Click Here!</b-button>
```

Should that button be different than the default $primary color set in your SASS?
Maybe your `$success` color?

```html
<b-button size="large" color="success"></b-button>
```

It's ridiculously easy.

Want to use the click event to trigger something in your parent element? Don't worry, Vue handles this to where when I click the button, it will send the full event (or just precisely what I want depending on the options given) to the parent element to do whatever it wants with.

This is all totally decoupled. Meaning I can jam my buttons everywhere without fear of things breaking.

It's beautiful.

### Closing Thoughts
I'm still developing Beaker (only the button component is currently written and working) but we'll be using it soon for our new apps and I'm excited to see how much quicker it makes development.

I'll be sure to update as we continue to use this down the line, but I have confidence in it.
