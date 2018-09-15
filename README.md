# Knowledge Base
This is a NodeJS app, that helps to save useful information during your life.
You can store your newly earned knowledge and links and assign tags to these entries.
Later when you want to retrieve the information you can just query to db of your entries.

# Usage
 The main command is called `knowledge-base` but you can also use `kb` alias.
 - **Add new entry** WIP
    - `kb --entry "Put not here"` or `kb -e "Put note here"`
    KB then will ask you for categories. You can specify them by putting words separated by spaces:
    `Links Tutorials`.
    KB then ask you for query keywords that will help to find it later
    `JavaScript TypeScript WebDevelopment`
 - **Add new category(ies)** WIP
    `kb --category "PutNameOfCategoryHere PutSecondNewCategoryHere"` or `kb -c "PutNameOfCategoryHere PutSecondNewCategoryHere"`
 - **List all entries by category name** WIP
    - `kb --list "CategoryOne CategoryTwo"` or `kb -l CategoryOne CategoryTwo`
 - **Query your knowledge database** WIP
    - `kb --query "Phrase"` or `kb -q "Phrase"`
 - **Edit entry** WIP
    - `kb --edit-entry ID` or `kb -ee` You'll then be prompted to edit info in the following sequence:
        1. Content
        2. Categories
        3. Keywords
 - **Edit category** WIP
    - `kb --edit-category CategoryName` or `kb -ec CategoryName`. You'll be then prompted to entry new category name. 
 - **Delete entry** WIP
    - `kb --delete-entry ID` or `kb -de ID`
 - **Delete category** WIP
    - `kb --delete-category CategoryName` or `kb -dc CategoryName` 

# Examples
Let's say that I want to save an url to some cool Gimp tutorials.
1. I add new tags to my kb:
`kb --category Links Gimp Tutorials`
2. I add a new entry:
`kb --entry "https://somePlatform/sometutorial/blahblahblah"`
Kb asks me to choose categories:
`Links Gimp Tutorials`
Kb asks me to choose tags that I might later use to find that information:
`how to paint cat animal painting`
3. I want to find my entry back:
`kb --query how to paint a cat`
or 
`kb --query painting a cat` 

# Instalation
There are 2 quickiest ways to install the package

**From npm:** `npm install name-in-npm-repository -g`

**From git:** `npm install https://url.to/this/repository -g`


# Roadmap
 - [x] Proof of Concept (WIP)
 - [ ] Functionality described in this README
 - [ ] Autocomplete for tags
 - [ ] Add ability to store knowledge online

