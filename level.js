class Level {
    timeline;

    constructor(nTimelines) {
    timeline = Array.from(new Array(8), () => new Array(nTimelines))
    
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < nTimelines; j++) {
            timeline[i][j] = [-1,-1];
        }
    }

    }
}