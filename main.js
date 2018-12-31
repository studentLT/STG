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

            shot: {
                bullet: [],
                timeStamp: 0,
                interval: 120
            },

            draw: () => {
                // player body
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

                // player shot
                player.shot.bullet.map(pos => {
                    ctx.beginPath();
                    ctx.strokeStyle = '#fff';
                    ctx.moveTo(pos.x, pos.y);
                    ctx.lineTo(pos.x, pos.y - 10);
                    ctx.stroke();
                });
            },

            update: () => {
                player.shot.bullet.map((pos, index, array) => {
                    pos.x += pos.dx;
                    pos.y += pos.dy;
                    if (pos.x < 0 || pos.x > width || pos.y < 0 || pos.y > height) array.splice(index, 1);
                });
            }
        };

        document.addEventListener('keydown', e => keyBuffer[e.keyCode] = true);

        document.addEventListener('keyup', e => keyBuffer[e.keyCode] = false);

        const getTimeStamp = () => new Date().getTime();

        const main = () => {
            requestAnimationFrame(main);

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, width, height);

            if (keyBuffer[37]) player.x -= player.speed;
            if (keyBuffer[39]) player.x += player.speed;
            if (keyBuffer[38]) player.y -= player.speed;
            if (keyBuffer[40]) player.y += player.speed;

            let limit = 30;
            if (player.x < limit || player.x > width - limit) {
                if (player.x < limit) {
                    player.x = limit;
                } else {
                    player.x = width - limit;
                }
            }

            if (player.y < limit || player.y > height - limit) {
                if (player.y < limit) {
                    player.y = limit;
                } else {
                    player.y = height - limit;
                }
            }

            if (keyBuffer[90] && getTimeStamp() - player.shot.timeStamp > player.shot.interval) {
                player.shot.timeStamp = getTimeStamp();
                player.shot.bullet.push({x: player.x - 20, y: player.y, dx: 0, dy: -7});
                player.shot.bullet.push({x: player.x + 20, y: player.y, dx: 0, dy: -7});
            }

            player.draw();
            player.update();
        };

        main();
    };
})();