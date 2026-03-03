const tf = require('@tensorflow/tfjs');
const fs = require('fs');

async function trainBot(isLeft) {
    // 3-Layer Perceptron (16 -> 16 -> 3)
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 16, activation: 'relu', inputShape: [5] }));
    model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));
    model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy' });

    // Generate synthetic perfect-play data with noise
    const inputs = [];
    const outputs = [];
    for (let i = 0; i < 8000; i++) {
        const bx = Math.random();
        const by = Math.random();
        const bdx = (Math.random() - 0.5) * 2; // -1 to 1
        const bdy = (Math.random() - 0.5) * 2;
        const py = Math.random();

        inputs.push([bx, by, bdx, bdy, py]);

        let targetY = 0.5;
        // If ball moving towards bot
        if ((isLeft && bdx < 0) || (!isLeft && bdx > 0)) {
            const timeToIntercept = isLeft ? (bx / Math.abs(bdx)) : ((1 - bx) / Math.abs(bdx));
            targetY = by + bdy * timeToIntercept;
            // Simple bounce logic reflection (infinite bounces)
            let bounces = Math.floor(targetY);
            if (bounces % 2 !== 0) {
                targetY = 1 - (targetY - bounces);
            } else {
                targetY = targetY - bounces;
            }
            if (targetY < 0) targetY = -targetY; // Fallback
        } else {
            // Ball moving away, lazily return to center
            targetY = 0.5;
        }

        // Add behavioral noise: Left bot (Bot 1) is lazier and messier, Right bot (Bot 2) is tighter
        if (isLeft) targetY += (Math.random() - 0.5) * 0.25;
        else targetY += (Math.random() - 0.5) * 0.1;

        // Threshold for moving vs staying
        if (py + 0.04 < targetY) outputs.push([0, 0, 1]); // DOWN
        else if (py - 0.04 > targetY) outputs.push([1, 0, 0]); // UP
        else outputs.push([0, 1, 0]); // STAY
    }

    const xs = tf.tensor2d(inputs);
    const ys = tf.tensor2d(outputs);

    // Bot 2 trains for longer to be a "harder" RL model
    await model.fit(xs, ys, { epochs: isLeft ? 15 : 40, shuffle: true });

    const w1 = model.layers[0].getWeights()[0].arraySync();
    const b1 = model.layers[0].getWeights()[1].arraySync();
    const w2 = model.layers[1].getWeights()[0].arraySync();
    const b2 = model.layers[1].getWeights()[1].arraySync();
    const w3 = model.layers[2].getWeights()[0].arraySync();
    const b3 = model.layers[2].getWeights()[1].arraySync();

    return { w1, b1, w2, b2, w3, b3 };
}

async function main() {
    console.log("Training Bot 1 (Left Model)...");
    const bot1 = await trainBot(true);
    console.log("Training Bot 2 (Right Model)...");
    const bot2 = await trainBot(false);

    fs.writeFileSync('./client/src/components/pong_weights.json', JSON.stringify({ bot1, bot2 }));
    console.log("Saved Neural Network weights to pong_weights.json");
}
main();
