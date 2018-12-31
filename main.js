(() => {
    onload = () => {
        const width = 500;
        const height = 500;

        const canvas = document.getElementsByTagName('canvas')[0];
        const ctx = canvas.getContext('2d');

        canvas.height = height;
        canvas.width = width;

        const main = () => {
            requestAnimationFrame(main);

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, width, height);
        };

        main();
    };
})();