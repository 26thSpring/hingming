import { Visual } from './Visual.js';
import { Text } from './Text.js';

export class App {
    constructor() {
        this.setWebgl();

        WebFont.load({
            google: {
                families: ['Noto Sans KR']
            },
            fontactive: () => {
                this.visual = new Visual();

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
            resolution: 1,
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