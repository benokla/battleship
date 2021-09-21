import { Ship } from "../src/shipFactory";

test("hit function regular", () => {
    const player1 = Ship(3);
    player1.hit(1, 1)
    expect(player1.hits[1][1]).toBe("hit")
})

test("isSunk when it is", () => {
    const player1 = Ship(3);
    player1.hit(1, 1)
    player1.hit(1, 2)
    player1.hit(1, 3)
    expect(player1.isSunk()).toBe(true)
})

test("isSunk when it isnt", () => {
    const player1 = Ship(3);
    player1.hit(0, 0);
    player1.hit(1, 1);
    expect(player1.isSunk()).toBe(false)
})


