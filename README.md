# Card Generator

```bash
#temp webserver
python3 -m http.server 8000
```

these are the inital requirements i set myself:

- learn tailwindcss
- the preview should be in the middle and the selectors on the left top right and bottom of the preview
- let me set the height + width of the card with sliders
- let me add content to each of the 4 edges
  - let me select the direction of the text (e.g. horiztonal/vertical)
- lets me add unlimited content in the middle and set the proportional height in % with a slider and show the correct %
  - let me use text/image/list/table as content
- for each content i want to be able to set the following:
  - let me change the size, font, color and alignment of each text individually
  - let me set the background color of each content part
  - let me set the different borders to each content
    - let me choose a border side
    - allow me to choose 2 or more border sides
    - the border type
    - p.dotted {border-style: dotted;}p.dashed {border-style: dashed;}p.solid {border-style: solid;}p.double {border-style: double;}p.groove {border-style: groove;}p.ridge {border-style: ridge;}p.inset {border-style: inset;}p.outset {border-style: outset;}p.none {border-style: none;}p.hidden {border-style: hidden;}p.mix {border-style: dotted dashed solid double;}
    - rounded borders
    - shadow
      - shift right/down
      - spread
      - blur
      - opacity
      - inset
      - color
- separate the different parts so they are more distingushable




1) initalize
=> get sectionSelect and add addEventListener
  - update state.selectedSection
  - generateHTML
  - updateUIElements
=> resetButton
=> go through allElements and add addEventListener
  - update state var for selectedSection
  - generateHTML
  - updateUIElements

2) generateHTML
=> getElementById(previewSettings) and set innerHTML
=> for Each section (card/top/bottom...) generate a new DIV with and append if there is content in the TextArea

3) update UI Elements
=> go through allElements
  - update HTML Input based on current state
  - update HTML label for Input based on current state
