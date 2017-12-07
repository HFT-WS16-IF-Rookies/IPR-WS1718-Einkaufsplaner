# What is this
This project is a group task for our lecture Internet programming.

# What are we gonna do
We will create a Website to keep your everday products tracked in a stock like system.  
It is thought to organize the shopping in a household between the different housemates.

# What you should know if you want to contribute
#### git-flow / styleguide
Under ./docs/ you'll find
  * our [git-workflow](./docs/git-workflow.md) you should follow
  * the [styleguide](./docs/styleguide.md)
    for a few general things, aswell as HTML, CSS, JS and PHP guidelines
  * a textual and graphical example of a complete git branching model.  
    (This won't be the strict rule, but it is an example in which direction it should go.)

#### IDE
The IDE used in this project is Atom.  
In the styleguides general section the identation rules to use, are described.  

Please make sure the following settings are applied to your Atom, while working on this project.  
1.  Open your Atom configuration folder as project  
    (the folder is found in your user directory called '.atom')
2. open the file 'config.cson'
3. make sure that it contains the following settings:

```
"*"
  editor:
    preferredLineLength: 100
    showIndentGuide: true <- optional but recommended
    showInvisibles: true <- optional but recommended
    tabLength: 4
    tabType: "soft"
  "line-ending-selector":
    defaultLineEnding: "LF"
```
