import { Game } from "phaser";
import { gameConfig } from "./game-config";

main();

function main() {
    window.addEventListener("load", () => {
        new Game(gameConfig);
    });
}
