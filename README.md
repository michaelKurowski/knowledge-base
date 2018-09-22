# Knowledge Base
This is a NodeJS app, that helps to save useful information during your life.
You can store your newly earned knowledge and links and assign tags to these entries.
Later when you want to retrieve the information you can just query to db of your entries.

Fully working proof of concept is availible on this branch:
https://github.com/michaelKurowski/knowledge-base/tree/poc-first-iteration

Master branch is only for well engineered version.

# Usage
 The main command is called `knowledge-base` but you can also use `kb` alias.
 - **Add new note** WIP
    - `kb --note Put content here` or `kb -n Put content here`
    KB then will ask you for categories. You can specify them by putting words separated by spaces:
    `category1 category2`.
    KB then ask you for query keywords that will help to find it later
    `tag1 tag2 tag3`
 - **Add new category** WIP
    `kb --category categoryVariant1 categoryVariant2` or `kb -c categoryVariant1 categoryVariant2`
    KB then will ask for aliases for your new categories so they'll be easier to access.
 - **List all entries by category name** WIP
    - `kb --list category` or `kb -l category`
 - **Query your knowledge database** WIP
    - `kb --query put here query phrase` or `kb -q put here query phrase`
 - **Edit note** WIP
    - `kb --edit-note someId` or `kb -en someId` You'll then be prompted to edit info in the following sequence:
        1. Content
        2. Categories
        3. Keywords
 - **Edit category** WIP
    - `kb --edit-category CategoryName` or `kb -ec CategoryName`. You'll be then prompted to enlist new category variants.
 - **Delete note** WIP
    - `kb --delete-note ID` or `kb -dn ID`
 - **Delete category** WIP
    - `kb --delete-category CategoryName` or `kb -dc CategoryName` 

# Examples
Let's say that I want to save an url to some cool Gimp tutorials.
1. I add 2 new categories to my kb:
`kb --category JavaScript JS EcmaScript ES`
`kb --category Tutorials`
2. I add a new note:
`kb --note "https://somePlatform/sometutorial/blahblahblah"`
Kb asks me to choose categories:
`js tutorials`
Kb asks me to choose tags that I might later use to find that information:
`understanding promises asynchronous`
3. I want to find my note back:
`kb --query "js promises"`
Query is rather intelligent and will take into account categories and their aliases, note content and tags.

# Instalation
There are 2 quickiest ways to install the package

**From npm:** `npm install name-in-npm-repository -g`

**From git:** `npm install https://url.to/this/repository -g`


# Roadmap
 - [x] Fully working Proof of Concept
 - [ ] Functionality described in this README
 - [ ] Autocomplete for tags
 - [ ] Add ability to store knowledge online

