import { Gameboard } from "../src/gameboardFactory";
import { Ship } from "../src/shipFactory";

test("place ship regulary horizontally", () => {
    const gb1 = Gameboard();
    gb1.placeShips(3, 0, 3, "h")
    expect(gb1.gameboard[1][3]).toBe("")
    expect(gb1.gameboard[0][3]).not.toBe("")
    expect(gb1.gameboard[0][4]).not.toBe("")
    expect(gb1.gameboard[0][5]).not.toBe("")
    expect(gb1.gameboard[0][6]).toBe("")
})

test("place ship horizontal with not engough space", () => {
    const gb1 = Gameboard();
    gb1.placeShips(8, 3, 3, "h")
    expect(gb1.gameboard[8][3]).toBe("")
})

test("place ship regulary vertically", () => {
    const gb1 = Gameboard();
    gb1.placeShips(3, 3, 3, "v")
    expect(gb1.gameboard[3][2]).toBe("")
    expect(gb1.gameboard[3][3]).not.toBe("")
    expect(gb1.gameboard[4][3]).not.toBe("")
    expect(gb1.gameboard[5][3]).not.toBe("")
    expect(gb1.gameboard[6][3]).toBe("")
})

test("receive attack hit", () => {
    const gb1 = Gameboard();
    gb1.placeShips(0, 0, 3, "h")
    gb1.receiveAttack(0, 0)
    expect(gb1.gameboard[0][0].hits[0][0]).toBe("hit")
})

test("receive attack miss", () => {
    const gb1 = Gameboard();
    gb1.placeShips(0, 3, 3, "h")
    expect(gb1.receiveAttack(1, 8)).toStrictEqual([false, 1, 8])
})

test("all ships sunk true", () => {
    const gb1 = Gameboard();
    gb1.placeShips(0, 3, 3, "h")
    gb1.placeShips(0, 4, 3, "h")
    gb1.receiveAttack(0,3)
    gb1.receiveAttack(1,3)
    gb1.receiveAttack(2,3)
    gb1.receiveAttack(0,4)
    gb1.receiveAttack(1,4)
    gb1.receiveAttack(2,4)
    expect(gb1.allShipsSunk()).toBe(true)
})

test("all ships sunk false", () => {
    const gb1 = Gameboard();
    gb1.placeShips(0, 3, 3, "h")
    gb1.placeShips(0, 4, 3, "h")
    gb1.receiveAttack(0,3)
    gb1.receiveAttack(1,3)
    gb1.receiveAttack(0,4)
    gb1.receiveAttack(1,4)
    gb1.receiveAttack(2,4)
    expect(gb1.allShipsSunk()).toBe(false)
})