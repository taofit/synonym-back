# Run command

-   npm run build
-   npm start
-   npm test

# APIs

-   create synonyms
    -   url: /synonym
    -   payload: ["cheek", "face", "front", "head"]
    -   POST
-   get synonyms
    -   GET
    -   url: /synonym/{word}
-   get all synonyms
    -   GET
    -   url: /synonym/all/word
-   update synonyms
    -   PUT
    -   url: /synonym
    -   payload: {"word": "big", "newSynonyms": ["great", "massive", "extra", "huge"]}
