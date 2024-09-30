# Run command

-   npm run build
-   npm start
-   npm test

# APIs

-   live root url: https://synonym-back.onrender.com
-   create synonyms
    -   url: /synonym
    -   example url for live: https://synonym-back.onrender.com/synonym
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
