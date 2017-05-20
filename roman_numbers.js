R = require("ramda")

const ROMAN = {1: "I", 5: "V", 10: "X", 50: "L", 100: "C", 500: "D", 1000: "M"}
const ARABIC = {M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1}
const TEST_CASES = [[3, "III"], [14, "XIV"], [99, "XCIX"], [454, "CDLIV"]
                   , [949, "CMXLIX"], [1415, "MCDXV"], [1944, "MCMXLIV"]]


const isNine = (letter, number) => {
    let divider = ARABIC[letter]
    return Math.floor((number - divider) / (divider / 5)) == 4
}


const makeLetters = (letter, numberOfLetters) => {
    switch (numberOfLetters) {
        case 4:
            return letter + ROMAN[ARABIC[letter] * 5]
        case 9:
            return letter + ROMAN[ARABIC[letter] * 10]
        default: 
            return R.repeat(letter, numberOfLetters).join("")
    }
}


const check = R.curry((letter, {number, roman}) => {
    if (isNine(letter, number) && R.contains(letter, ["D","L","V"])) {
        return {number, roman}
    } else {
        let divider = ARABIC[letter]
        let numberOfLetters = Math.floor(number/divider)
        let rest = number % divider 
        let nextRoman = makeLetters(letter, numberOfLetters)
        return { number: rest, roman:  roman + nextRoman }
    }
})


const makeRoman = (number) => {
    return R.pipe(
        check("M"),
        check("D"),
        check("C"),
        check("L"),
        check("X"),
        check("V"),
        check("I")
    )({number: number, roman: ""})
    .roman
}  


const testRoman = (cases) => {
    return R.map(([arabic, roman]) => makeRoman(arabic) == roman)(cases)
}

console.log(testRoman(TEST_CASES))
