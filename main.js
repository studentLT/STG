(() => {
    onload = () => {
        const width = 500;
        const height = 500;

        const canvas = document.getElementsByTagName('canvas')[0];
        const ctx = canvas.getContext('2d');

        canvas.height = height;
        canvas.width = width;

        let keyBuffer = [];

        let player = {
            speed: 3,
            x: width / 2,
            y: height / 2,

            draw: () => {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#fff';
                ctx.moveTo(player.x, player.y - 15);
                ctx.lineTo(player.x + 10, player.y + 15);
                ctx.lineTo(player.x - 10, player.y + 15);
                ctx.lineTo(player.x, player.y - 15);
                ctx.closePath();
                ctx.stroke();

                let r = 4;
                ctx.beginPath();
                ctx.arc(player.x + 20, player.y + 7, r, 0, Math.PI * 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(player.x - 20, player.y + 7, r, 0, Math.PI * 2);
                ctx.stroke();
            }
        };

        document.addEventListener('keydown', e => keyBuffer[e.keyCode] = true);

        document.addEventListener('keyup', e => keyBuffer[e.keyCode] = false);

        const main = () => {
            requestAnimationFrame(main);

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, width, height);

            if (keyBuffer[37]) player.x -= player.speed;
            if (keyBuffer[39]) player.x += player.speed;
            if (keyBuffer[38]) player.y -= player.speed;
            if (keyBuffer[40]) player.y += player.speed;

            player.draw();
        };

        main();
    };
})();