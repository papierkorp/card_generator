# Card Generator

just a small app to generate a html Code by using HTML Inputs.

**How does the app work**

1. initalize (main.js)

- get sectionSelect and add addEventListener
  - update state.selectedSection
  - generateHTML
  - updateUIElements
- resetButton
- go through allElements and add addEventListener
  - update state var for selectedSection
  - generateHTML
  - updateUIElements

2. generateHTML (generateHTML.js)

- getElementById(previewSettings) and set innerHTML
- for Each section (card/top/bottom...) generate a new DIV with and append if there is content in the TextArea

3. update UI Elements (main.js)

- go through allElements
  - update HTML Input based on current state
  - update HTML label for Input based on current state

# Local Development

you need some kind of local webserver

```bash
#temp webserver with python
python3 -m http.server 8000
```

and the http://localhost:8000
