const state = {
    human: { hp: 100, maxHp: 100, isDefending: false, isDodging: false },
    dragon: { hp: 100, maxHp: 100 },
    turn: 1,
    isProcessing: false
};

const elements = {
    humanHp: document.getElementById('human-hp'),
    dragonHp: document.getElementById('dragon-hp'),
    humanHealthBar: document.getElementById('human-health'),
    dragonHealthBar: document.getElementById('dragon-health'),
    gameLog: document.getElementById('game-log')
};

function updateHealth() {
    elements.humanHp.textContent = state.human.hp;
    elements.dragonHp.textContent = state.dragon.hp;

    elements.humanHealthBar.style.width =
        `${(state.human.hp / state.human.maxHp) * 100}%`;
    elements.dragonHealthBar.style.width =
        `${(state.dragon.hp / state.dragon.maxHp) * 100}%`;
}

function logAction(message, type = 'info') {
    const p = document.createElement('p');
    p.textContent = `[Lượt ${state.turn}] ${message}`;

    if (type === 'damage') p.style.color = '#d32f2f';
    if (type === 'success') p.style.color = '#388e3c';

    if (elements.gameLog.firstChild) {
        elements.gameLog.insertBefore(p, elements.gameLog.firstChild);
    } else {
        elements.gameLog.appendChild(p);
    }
}

function humanAction(action) {
    if (state.human.hp <= 0 || state.dragon.hp <= 0 || state.isProcessing) return;
    state.isProcessing = true;

    state.human.isDefending = false;
    state.human.isDodging = false;

    if (action === 'attack') {
        const damage = Math.floor(Math.random() * 10) + 10;
        state.dragon.hp -= damage;
        logAction(
            `Bà Huynh phun pate, tấn công Huynh Hoa, gây ${damage} sát thương!`,
            'damage'
        );

    } else if (action === 'defend') {
        state.human.isDefending = true;
        logAction(
            'Bà Huynh che bánh cẩn thận, chuẩn bị giảm sát thương.',
            'success'
        );

    } else if (action === 'dodge') {
        state.human.isDodging = true;
        logAction(
            'Bà Huynh né qua một bên, tránh bị văng đồ chua.',
            'success'
        );
    }

    setTimeout(dragonAction, 1500);
}

function dragonAction() {
    let damage = Math.floor(Math.random() * 15) + 15;

    if (state.human.isDodging && Math.random() < 0.3) {
        damage = 0;
        logAction(
            'Huynh Hoa tung đòn nhưng Bà Huynh đã né và không mất miếng pate nào!',
            'success'
        );

    } else if (state.human.isDefending) {
        const original = damage;
        const reduced = Math.floor(damage / 2);
        damage = original - reduced;
        logAction(
            `Huynh Hoa phản công, sát thương gốc ${original} nhưng nhờ che chắn nên chỉ còn ${damage}.`,
            'damage'
        );

    } else {
        logAction(
            `Huynh Hoa phản công mạnh mẽ, gây ${damage} sát thương lên Bà Huynh!`,
            'damage'
        );
    }

    state.human.hp -= damage;
    state.human.hp = Math.max(0, state.human.hp);
    state.dragon.hp = Math.max(0, state.dragon.hp);

    updateHealth();
    state.turn++;
    state.isProcessing = false;

    checkGameOver();
}

function checkGameOver() {
    if (state.human.hp <= 0) {
        logAction(
            'Bánh mì của Bà Huynh đã gục ngã! Huynh Hoa giành lợi thế.',
            'damage'
        );
        alert('Game Over! Bánh mì Huynh Hoa thắng cuộc.');
    } else if (state.dragon.hp <= 0) {
        logAction(
            'Huynh Hoa đã hết topping! Bánh mì Bà Huynh chiến thắng!',
            'success'
        );
        alert('Chiến thắng! Bánh mì Bà Huynh thắng cuộc.');
    }
}

updateHealth();
logAction(
    'Trận chiến bánh mì bắt đầu! Bánh mì Bà Huynh ra tay trước.',
    'info'
);
