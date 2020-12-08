/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


window.onload = () => {
    new _App_js__WEBPACK_IMPORTED_MODULE_0__["App"]();
    console.log('load');
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var _Visual_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _Text_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



class App {
    constructor() {
        this.setWebgl();

        WebFont.load({
            google: {
                families: ['Noto Sans KR']
            },
            fontactive: () => {
                this.visual = new _Visual_js__WEBPACK_IMPORTED_MODULE_0__["Visual"]();

                window.addEventListener('resize', this.resize.bind(this), false);
                this.resize();

                requestAnimationFrame(this.animate.bind(this));

                // this.text = new Text();
                // console.log('text', this.text);
                // this.text.setText('A', 3, document.body.clientWidth, document.body.clientHeight);
            }
        });
    }

    setWebgl() {
        this.renderer = new PIXI.Renderer({
            width: document.body.clientWidth,
            height: document.body.clientHeight,
            antialias: true,
            transparent: false,
            resolution: (window.devicePixelRatio > 1) ? 2 : 1,
            autoDensity: false,
            powerPreference: "high-performance",
            backgroundColor: 0xffffff,
        });

        document.body.appendChild(this.renderer.view);

        this.stage = new PIXI.Container();
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.renderer.resize(this.stageWidth, this.stageHeight);
        this.visual.show(this.stageWidth, this.stageHeight, this.stage);
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));

        this.visual.animate();

        this.renderer.render(this.stage);
    }
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Visual", function() { return Visual; });
/* harmony import */ var _Text_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _Particle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);



class Visual {
    constructor() {
        this.text = new _Text_js__WEBPACK_IMPORTED_MODULE_0__["Text"]();

        this.texture = PIXI.Texture.from('particle.png');

        this.particles = [];

        this.mouse = {
            x: 0,
            y: 0,
            radius: 100
        };

        document.addEventListener('pointermove', this.onMove.bind(this), false);
    }

    show(stageWidth, stageHeight, stage) {
        if (this.container) {
            stage.removeChild(this.container);
        }

        this.pos = this.text.setImage('hingming.png', 2, stageWidth, stageHeight).then((res) => {
            console.log('show', stageWidth, stageHeight, stage, res);

            this.container = new PIXI.ParticleContainer(
                res.length,
                {
                    vertices: false,
                    position: true,
                    rotation: false,
                    scale: false,
                    uvs: false,
                    tint: true,
                }
            );

            stage.addChild(this.container);

            this.particles = [];

            for (let i = 0; i < res.length; i++) {
                const item = new _Particle_js__WEBPACK_IMPORTED_MODULE_1__["Particle"](res[i], this.texture);
                this.container.addChild(item.sprite);
                this.particles.push(item);
            }
        });
        // this.pos = this.text.setText('A', 2, stageWidth, stageHeight);

        // console.log('show', stageWidth, stageHeight, stage, this.pos);

        // this.container = new PIXI.ParticleContainer(
        //     this.pos.length,
        //     {
        //         vertices: false,
        //         position: true,
        //         rotation: false,
        //         scale: false,
        //         uvs: false,
        //         tint: true,
        //     }
        // );

        // stage.addChild(this.container);

        // this.particles = [];

        // for (let i = 0; i < this.pos.length; i++) {
        //     const item = new Particle(this.pos[i], this.texture);
        //     this.container.addChild(item.sprite);
        //     this.particles.push(item);
        // }
    }

    animate() {
        for (let i = 0; i < this.particles.length; i++) {
            const item = this.particles[i];
            const dx = this.mouse.x - item.x;
            const dy = this.mouse.y - item.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = item.radius + this.mouse.radius;

            if (dist < minDist) {
                const angle = Math.atan2(dy, dx);
                const tx = item.x + Math.cos(angle) * minDist;
                const ty = item.y + Math.sin(angle) * minDist;
                const ax = tx - this.mouse.x;
                const ay = ty - this.mouse.y;
                item.vx -= ax;
                item.vy -= ay;
                item.collide();
            }

            item.draw();
        }
    }

    onMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return Text; });

class Text {
    constructor() {
        this.canvas = document.createElement('canvas');
        // this.canvas.style.position = 'absolute';
        // this.canvas.style.left = 0;
        // this.canvas.style.top = 0;
        // document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
    }

    setImage(src, density, stageWidth, stageHeight) {
        return new Promise((resolve, reject) => {
            this.canvas.width = stageWidth;
            this.canvas.height = stageHeight;

            const image = new Image(stageWidth, stageHeight); // Using optional size for image
            image.onload = () => {
                this.ctx.drawImage(image, 0, 0, stageWidth, stageHeight);
                // this.drawImageActualSize();

                console.log('onload', this.ctx);
                resolve(this.dotPos(density, stageWidth, stageHeight));
            }; // Draw when image has loaded

            image.src = src;
            this.image = image;

            console.log('image', image);
        });
        // return this.dotPos(density, stageWidth, stageHeight);
    }

    drawImageActualSize() {
        // Use the intrinsic size of image in CSS pixels for the canvas element
        this.canvas.width = this.naturalWidth;
        this.canvas.height = this.naturalHeight;

        // Will draw the image as 300x227, ignoring the custom size of 60x45
        // given in the constructor
        // this.ctx.drawImage(this.image, 0, 0);

        // To use the custom size we'll have to specify the scale parameters 
        // using the element's width and height properties - lets draw one 
        // on top in the corner:
        this.ctx.drawImage(this.image, 0, 0, stageWidth, stageHeight);
    }

    setText(str, density, stageWidth, stageHeight) {
        this.canvas.width = stageWidth;
        this.canvas.height = stageHeight;

        const myText = str;
        const fontWidth = 700;
        const fontSize = 800;
        const fontName = 'Noto Sans KR';

        this.ctx.clearRect(0, 0, stageWidth, stageHeight);
        this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.textBaseline = 'middle';

        const fontPos = this.ctx.measureText(myText);

        this.ctx.fillText(
            myText,
            (stageWidth - fontPos.width) / 2,
            fontPos.actualBoundingBoxAscent + fontPos.actualBoundingBoxDescent
        );

        return this.dotPos(density, stageWidth, stageHeight);
    }

    dotPos(density, stageWidth, stageHeight) {
        const imageData = this.ctx.getImageData(
            0, 0,
            stageWidth, stageHeight,
        ).data;

        const particles = [];
        let i = 0;
        let width = 0;
        let pixel;

        for (let height = 0; height < stageHeight; height += density) {
            ++i;

            const slide = (i % 2) === 0;
            width = 0;

            if (slide) {
                width += 6;
            }

            for (width; width < stageWidth; width += density) {
                pixel = imageData[((width + (height * stageWidth)) * 4) - 1];

                if (pixel !== 0 &&
                    width > 0 &&
                    width < stageWidth &&
                    height > 0 &&
                    height < stageHeight) {
                    particles.push({
                        x: width,
                        y: height,
                        pixel: pixel
                    })
                }
            }
        }

        console.log('imageData', imageData);
        console.log('dotPos', 3, 696, 978);

        console.log('particles', particles);

        return particles;
    }
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Particle", function() { return Particle; });

const FRICTION = 0.98;
const COLOR_SPEED = 0.12;
const MOVE_SPEED = 0.88;

class Particle {
    constructor(pos, texture) {
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.scale.set(0.06);

        this.savedX = pos.x;
        this.savedY = pos.y;
        this.x = pos.x;
        this.y = pos.y;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.vx = 0;
        this.vy = 0;
        this.radius = 10;

        this.savedRgb = 0xf3316e;
        this.rgb = 0xf3316e;
    }

    collide() {
        this.rgb = 0x451966;
    }

    draw() {
        this.rgb += (this.savedRgb - this.rgb) * COLOR_SPEED;

        this.x += (this.savedX - this.x) * MOVE_SPEED;
        this.y += (this.savedY - this.y) * MOVE_SPEED;

        this.vx *= FRICTION;
        this.vy *= FRICTION;

        this.x += this.vx;
        this.y += this.vy;

        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.tint = this.rgb;
    }
}

/***/ })
/******/ ]);