"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var addSum_1 = __importDefault(require("./addSum"));
it('test addSum', function () {
    expect((0, addSum_1.default)(1, 2)).toBe(3);
});
