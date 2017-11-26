# General
Autoformat is nice feature if an IDE has it. But nevertheless:  
ALWAYS look over the code by hand, if the Code is formatted the right
way.  

```diff
+ Please consider writing nice code natively
- instead of hacking it in and then depend on the IDE to make it nice.
```

### naming
lowerCamelCase get's used for:
  * HTML/CSS classes & id's
  * JS/PHP variable names
  * JS/PHP function names

UpperCamelCase get's used for:
  * JS Objects
  * PHP Classes

# HTML

| item               | value             |
| ------------------ | ----------------- |
| Indentation:       | spaces            |
| Indentation depth: | 4                 |

  1. If a tag contains other opening tags, it has to be opened,
     the inner indented by one indentation and the closing tag in a
     seperate line on the same intendation as the opening tag.  
     Example:

```html
<!-- Simple Example -->
<div>
    <p>Text here</p>
</div>

<!--
    If your Text will contain a link in the <p> no longer use a 
    oneliner
-->
<div>
    <p>
        <a href="url here">Text here</a>
    </p>
</div>

```

  2. Oneliners are allowed if you need a placeholder to fill later by
     a script for example:

```html
<div id="topNavBarContent"></div>
```

# CSS / JS / PHP
