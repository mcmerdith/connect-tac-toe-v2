import { type Player } from "./types";

interface BoardSpace {
  player: Player | null;
}

class Space implements BoardSpace {
  player = null;
}

class Board<T extends BoardSpace> {
  private _activePlayer: Player;
  private _winner: Player | null = null;
  private _board: T[][];

  get winner() {
    return this._winner;
  }

  constructor(
    readonly width: number,
    readonly height: number,
    readonly winLength: number,
    generator: () => T,
  ) {
    this._activePlayer = "X";
    this._board = [];
    for (let i = 0; i < height; i++) {
      this._board.push([]);
      for (let j = 0; j < width; j++) {
        this._board[i]!.push(generator());
      }
    }
  }

  getBoardString() {
    const strs = [];
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        strs.push(this._board[i]!.map((s) => s.player ?? " ").join(""));
      }
    }
    return strs;
  }

  getSpace(row: number, col: number) {
    if (row < 0 || row >= this.height) throw new Error("Row out of bounds");
    if (col < 0 || col >= this.width) throw new Error("Column out of bounds");

    return this._board[row]![col]!;
  }

  checkWin() {
    // pass
  }

  play(row: number, col: number) {
    this.getSpace(row, col).player = this._activePlayer;
    this._activePlayer = this._activePlayer === "X" ? "O" : "X";
    this.checkWin();
  }
}

export class C4Board extends Board<Space> {
  get player() {
    return this.winner;
  }

  constructor() {
    super(7, 6, 4, () => new Space());
  }
}

export class CTOBoard extends Board<C4Board> {
  private _activeBoard: C4Board | null = null;

  constructor() {
    super(3, 3, 3, () => new C4Board());
  }

  selectBoard(row: number, col: number) {
    this._activeBoard = this.getSpace(row, col);
  }

  play(row: number, col: number) {
    if (!this._activeBoard) throw new Error("No active board");
    this._activeBoard.play(row, col);
  }

  getBoardString() {
    const strs = [];
    for (let i = 0; i < this.height; i++) {
      // TODO: fix this
      const bigString = [];
      for (let j = 0; j < this.width; j++) {
        strs.push(this._activeBoard!.getBoardString()[i]!);
      }
    }
    return strs;
  }
}
