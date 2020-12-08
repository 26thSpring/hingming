
export class Text {
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