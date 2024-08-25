var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
console.log("HELLO");
import { createCanvas, loadImage } from "canvas";
import * as fs from "node:fs/promises";
import models from "./blocks_models.json";
function getDominantColor(image) {
    return __awaiter(this, void 0, void 0, function () {
        var canvas, ctx, imgPath, image_1, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    canvas = createCanvas(1, 1);
                    ctx = canvas.getContext("2d");
                    imgPath = "./public/blocks/".concat(image);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, loadImage(imgPath)];
                case 2:
                    image_1 = _a.sent();
                    if (image_1.width !== image_1.height) {
                        throw new Error("Image ".concat(image_1, " is not square"));
                    }
                    ctx.drawImage(image_1, 0, 0, 1, 1);
                    data = ctx.getImageData(0, 0, 1, 1).data;
                    return [2 /*return*/, Array.from(data)];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var colors, _models, blocks, _i, blocks_1, block, _loop_1, _a, _b, uri;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    colors = [];
                    _models = Object.entries(models)
                        .map(function (_a) {
                        var key = _a[0], value = _a[1];
                        return (__assign({ name: key }, value));
                    })
                        .filter(function (model) {
                        return model.hasOwnProperty("parent") && model.hasOwnProperty("textures");
                    });
                    blocks = _models.filter(function (model) {
                        return [
                            "minecraft:block/cube_all",
                            "minecraft:block/cube_column",
                            "minecraft:block/cube_column_horizontal",
                            "minecraft:block/leaves",
                        ].includes(model.parent);
                    });
                    _i = 0, blocks_1 = blocks;
                    _c.label = 1;
                case 1:
                    if (!(_i < blocks_1.length)) return [3 /*break*/, 6];
                    block = blocks_1[_i];
                    _loop_1 = function (uri) {
                        var name_1, image, rgba, isNameExist, hsl;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    name_1 = uri.split("/")[1];
                                    image = "".concat(name_1, ".png");
                                    return [4 /*yield*/, getDominantColor(image)];
                                case 1:
                                    rgba = _d.sent();
                                    isNameExist = colors.find(function (color) { return color.name === name_1; });
                                    if (rgba && !isNameExist) {
                                        hsl = rgbToHsl(rgba[0], rgba[1], rgba[2]);
                                        colors.push({ name: name_1, rgba: rgba, hsl: hsl, image: image });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a = 0, _b = Object.values(block.textures);
                    _c.label = 2;
                case 2:
                    if (!(_a < _b.length)) return [3 /*break*/, 5];
                    uri = _b[_a];
                    return [5 /*yield**/, _loop_1(uri)];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4:
                    _a++;
                    return [3 /*break*/, 2];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [4 /*yield*/, fs.writeFile("./src/assets/colors.json", JSON.stringify(colors, null, 2))];
                case 7:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    var l = Math.max(r, g, b);
    var s = l - Math.min(r, g, b);
    var h = s
        ? l === r
            ? (g - b) / s
            : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
        : 0;
    return [
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2,
    ];
}
run();
