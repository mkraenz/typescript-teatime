import { Point } from './types';

export class Vec2 {
  static totalPathLength(path: Point[]) {
    return path.reduce((total, point, index, path) => {
      if (index === 0) return total;
      const prevPoint = path[index - 1];
      return total + Vec2.fromPoint(point).distance(Vec2.fromPoint(prevPoint));
    }, 0);
  }

  x: number;
  y: number;

  static Zero() {
    return new Vec2(0, 0);
  }

  static Left() {
    return new Vec2(-1, 0);
  }

  static Right() {
    return new Vec2(1, 0);
  }

  static Up() {
    return new Vec2(0, -1);
  }

  static Down() {
    return new Vec2(0, 1);
  }

  static toJSON(vector2: Vec2) {
    return { x: vector2.x, y: vector2.y };
  }

  static fromPoint(point: Point) {
    return new Vec2(point.x, point.y);
  }

  static fromXy(x: number, y: number) {
    return new Vec2(x, y);
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vector2: Vec2) {
    return new Vec2(this.x + vector2.x, this.y + vector2.y);
  }

  sub(vector2: Vec2) {
    return new Vec2(this.x - vector2.x, this.y - vector2.y);
  }

  addXy(x: number, y: number) {
    return new Vec2(this.x + x, this.y + y);
  }

  mult(scalar: number) {
    return new Vec2(this.x * scalar, this.y * scalar);
  }

  normalize() {
    if (this.length === 0) return new Vec2(0, 0);
    return this.mult(1 / this.length);
  }

  equals(vector2: Vec2) {
    return this.x === vector2.x && this.y === vector2.y;
  }

  distance(vector2: Vec2) {
    return Math.sqrt(
      Math.pow(this.x - vector2.x, 2) + Math.pow(this.y - vector2.y, 2)
    );
  }

  aboutEquals(vector2: Vec2, epsilon: number) {
    return this.distance(vector2) < epsilon;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }

  toJSON() {
    return { x: this.x, y: this.y };
  }

  lerp(from: Vec2, lambda: number) {
    // (1 - lambda) * this + lambda * from
    return this.mult(lambda).add(from.mult(1 - lambda));
  }
}
