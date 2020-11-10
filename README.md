# Candy Crush

Candy Crush Tutorial by [Ania Kubów](http://www.twitter.com/ania_kubow)

- [Build your own CANDY CRUSH using JavaScript, HTML and CSS | Ania Kubow](https://www.youtube.com/watch?v=XD5sZWxwJUk)
- [Sample Code and Candy Assets](https://github.com/kubowania/candy-crush)

I wanted to code something fun and candy crush seemed like a good choice. 

Initial status of the game is live. Additional features will be added and the code improved upon when I have time. 

## How to Play

Local install

1. Clone the repo
1. `cd/candy-crush`
1. `open index.html`

In the Browser

- Visit [shannoncrabill.com/candy-crush](http://www.shannoncrabill.com/candy-crush)

## Future Enhancements

- Only switch candy if there if a match
- Score for 5 row and 5 column matches
- Timed game
- Leaderboard
- Confirm all squares are accounted for in for loops (off by one)
- Break functions into smaller parts (single responsibility)
    - Abstract creation of squares or setting of attributes
    -  ~~`randomColor` assigning as it's own function~~
    - Valid moves / check for a valid move
    - Check for match (row/col and 5/4/3)
    - Drag events
- Style improvements
    - Candy color/images via classes instead of inline styles
- Improved algorithmn for checking matches (does each square need to be checked)
- Animiations
- Check for matches or blank squares with each dom change instead of set interval?
- Squares as objects w/properties

## Known Bugs

- Top row does not refil if a match is made in the first row and the dragged item came from a different row
- Column match of 4 does not work
- `drag` events do no work on Android and mobile devices.
   - [https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event](drag event on MDN)
