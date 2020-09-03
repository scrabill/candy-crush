document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid")
    const width = 8
    const squares = []
    const scoreDisplay = document.querySelector("#score")
    let score = 0

    const candyColors = [
        "url(images/red.png)",
        "url(images/orange.png)",
        "url(images/yellow.png)",
        "url(images/green.png)",
        "url(images/blue.png)",
        "url(images/purple.png)"
    ]    

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement("div")
            square.setAttribute("draggable", true)
            square.setAttribute("id", i)
            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundImage = candyColors[randomColor]
            grid.appendChild(square)
            squares.push(square)
        }
    }

    createBoard()

    squares.forEach(square => square.addEventListener("dragstart", dragStart))
    squares.forEach(square => square.addEventListener("dragover", dragOver))
    squares.forEach(square => square.addEventListener("dragenter", dragEnter))
    squares.forEach(square => square.addEventListener("dragleave", dragLeave))
    squares.forEach(square => square.addEventListener("dragend", dragEnd))
    squares.forEach(square => square.addEventListener("drop", dragDrop))

    let colorBeingDragged = ""
    let colorBeingReplaced = ""
    let squareIDBeingDragged = 0
    let squareIDBeingReplaced = 0

    function dragStart() {
        colorBeingDragged = this.style.backgroundImage
        squareIDBeingDragged = parseInt(this.id)
        console.log(colorBeingDragged, squareIDBeingDragged)
    }

    function dragOver(e) {
        e.preventDefault()
    }

    function dragEnter(e) {
        e.preventDefault()
    }

    function dragLeave() {
    }

    function dragEnd() {
        let validMoves = [
            squareIDBeingDragged -1,
            squareIDBeingDragged -width,
            squareIDBeingDragged +1,
            squareIDBeingDragged +width
        ]

        let validMove = validMoves.includes(squareIDBeingReplaced)

        if (squareIDBeingReplaced && validMove) { 
            squareIDBeingReplaced = null
        } else if (squareIDBeingReplaced && !validMove) {
            squares[squareIDBeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIDBeingDragged].style.backgroundImage = colorBeingDragged
        } else {
            squares[squareIDBeingDragged].style.backgroundImage = colorBeingDragged
        }
    }

    function dragDrop() {
        colorBeingReplaced = this.style.backgroundImage
        squareIDBeingReplaced = parseInt(this.id)
        this.style.backgroundImage = colorBeingDragged
        squares[squareIDBeingDragged].style.backgroundImage = colorBeingReplaced
    }

    function moveDown() {
        for (let i = 0; i < 56; i++) {
            if (squares[i + width].style.backgroundImage === '') {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ""

                const firstRow = [0,1,2,3,4,5,6,7]
                const isFirstRow = firstRow.includes(i)
                if (isFirstRow && (squares[i].style.backgroundImage === '')) {
                    let randomColor = Math.floor(Math.random() * candyColors.length)
                    squares[i].style.backgroundImage = candyColors[randomColor]
                }
            }
        }
    }

    function checkRowForThree() {
        for (let i = 0; i < 62; i++) {
            let rowOfThree = [i, i+1, i+2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]

            if (notValid.includes(i)) continue

            if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }

        }   
    }

    function checkRowForFour() {
        for (i = 0; i < 61; i++) {
            let rowOfFour = [i, i+1, i+2, i+3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]

            if (notValid.includes(i)) continue

            if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }

        }   
    }

    function checkColForThree() {
        for (i = 0; i < 47; i++) {
            let colOfThree = [i, i+width, i+width*2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (colOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                colOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }

        }   
    }

    function checkColForFour() {
        for (i = 0; i < 39; i++) {
            let colOfFour = [i, i+width, i+width*2, 1+width*3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (colOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                colOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }

        }   
    }

    moveDown()
    checkRowForFour()
    checkColForFour()
    checkRowForThree()
    checkColForThree()

    window.setInterval(function() {
        moveDown()
        checkRowForFour()
        checkRowForThree()
        checkColForFour()
        checkColForThree()
    }, 100)

})