---
title: Menu
last_updated: 2 September, 2017
summary: "WIP"
sidebar: default
permalink: menu
---

When users use the [Web Rotor][1] in combination with Chrome, the `role="menuitem"` will move all items from 'Links' to 'Form controls', this could confuse users who are used to find the menu items within the links panel. I need to research more about this topic, at this moment in time I think you should use `role="menuitem"`.

{% assign menubar =  site.data.results.menu[0] %}

## Advised markup

## Menubar

```html
{{ menubar.code }}
```

## Menu Types

### Menu

A menu is shown when a user clicks on a button.

![Visual representation of a menu]({{site.baseurl}}/images/menu/menu.gif)

```html
<!-- menu button -->
<button type="menu" aria-controls="popup-menu" aria-expanded="false">Menu Button</button>

<!-- menu -->
<menu id="popup-menu" role="menu" hidden>
  <li role="presentation">
      <button role="menuitem" type="button">Action</button>
  </li>
  <li role="presentation">
      <button role="menuitem" type="button">Another action</button>
  </li>
  <hr>
  <li role="presentation">
      <button role="menuitem" type="button">Separated action</button>
  </li>
</menu>
```

* [WAI-ARIA 1.1 - Menu](https://www.w3.org/TR/wai-aria-1.1/#menu)

### Context menu

{% include note.html content="Native support is deprecated" %}

A context menu is shown when **right-clicks** on a element.

![Visual representation of a context menu]({{site.baseurl}}/images/menu/context-menu.gif)


* [WAI-ARIA 1.1 - Menu](https://www.w3.org/TR/wai-aria-1.1/#menu)
* [HTML 5.1 - Context menus](https://www.w3.org/TR/html/interactive-elements.html#context-menus)

### Menubar

A visual persistent menu offering the user a quick access to a consistent set of commands, like the macOS menubar shown in beneath gif.

![Visual representation of a menubar]({{site.baseurl}}/images/menu/menubar.gif)

```html
<menu role="menubar">
  <li role="presentation">
      <button role="menuitem" type="button">Action</button>
  </li>
  <li role="presentation">
      <button role="menuitem" type="button">Another action</button>
  </li>
  <hr>
  <li role="presentation">
      <button role="menuitem" type="button">Separated action</button>
  </li>
</menu>
```

* [WAI-ARIA 1.1 - Menu](https://www.w3.org/TR/wai-aria-1.1/#menubar)

### Specifications

* [MDN - menu element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu)
* [HTML 5.1 - menu element](https://www.w3.org/TR/html/interactive-elements.html#the-menu-element)
* [HTML living standard - menu element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-menu-element)
* [WAI-ARIA practices - Menu or Menu bar](https://www.w3.org/TR/wai-aria-practices/#menu)

[1]: http://a11yproject.com/posts/getting-started-with-voiceover/#the-web-item-rotor
