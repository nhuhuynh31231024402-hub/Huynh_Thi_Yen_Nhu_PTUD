$(function () {
    // ===== KHỞI TẠO BIẾN / OBJECT =====
    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var score_label = $('#score');
    var level_label = $('#level');

    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());

    var speed = 6;                 // tốc độ ống
    var go_up = false;             // interval cho việc bay lên
    var score_updated = false;
    var game_over = false;

    var score = 0;
    var level = 1;
    var interval = 40;             // Level 1
    var the_game = null;           // lưu setInterval chính

    // ===== HÀM MAIN LOOP =====
    function gameLoop() {
        // Kiểm tra va chạm / ra khỏi biên
        if (collision(bird, pole_1) ||
            collision(bird, pole_2) ||
            parseInt(bird.css('top')) <= 0 ||
            parseInt(bird.css('top')) > container_height - bird_height) {

            stop_the_game(false);
        } else {

            var pole_current_position = parseInt(pole.css('right'));

            // Cộng điểm khi vượt qua cặp ống
            if (pole_current_position > container_width - bird_left) {
                if (!score_updated) {
                    increaseScore();
                    score_updated = true;
                }
            }

            // Nếu ống đi hết màn thì reset lại + random khoảng trống
            if (pole_current_position > container_width) {
                var new_height = parseInt(Math.random() * 100);
                pole_1.css('height', pole_initial_height + new_height);
                pole_2.css('height', pole_initial_height - new_height);
                score_updated = false;
                pole_current_position = pole_initial_position;
            }

            // Di chuyển ống
            pole.css('right', pole_current_position + speed);

            // Chim rơi xuống nếu không bay lên
            if (!go_up) {
                go_down();
            }
        }
    }

    // ===== BẮT ĐẦU GAME =====
    function startGame() {
        // reset trạng thái
        score = 0;
        level = 1;
        interval = 40;
        score_label.text(score);
        level_label.text('Level: ' + level);

        if (the_game) {
            clearInterval(the_game);
        }
        the_game = setInterval(gameLoop, interval);
    }

    // ===== LEVEL & ĐIỂM =====
    function increaseScore() {
        score += 1;
        score_label.text(score);
        updateLevel();
    }

    function updateLevel() {
        // Thắng game nếu >= 50 điểm
        if (score >= 50) {
            stop_the_game(true);
            return;
        }

        var old_level = level;

        if (score >= 40) {
            level = 4;
            interval = 20;
        } else if (score >= 20) {
            level = 3;
            interval = 25;
        } else if (score >= 5) {
            level = 2;
            interval = 30;
        } else {
            level = 1;
            interval = 40;
        }

        level_label.text('Level: ' + level);

        // Nếu level thay đổi thì restart vòng lặp với interval mới
        if (level !== old_level && !game_over) {
            restartGameInterval();
        }
    }

    function restartGameInterval() {
        if (the_game) {
            clearInterval(the_game);
        }
        the_game = setInterval(gameLoop, interval);
    }

    // ===== ĐIỀU KHIỂN BẰNG PHÍM ARROW DOWN =====
    // Nhấn giữ Arrow Down => chim bay lên
    $(document).keydown(function (e) {
        if ((e.key === 'ArrowDown' || e.keyCode === 40) &&
            !go_up && !game_over) {

            go_up = setInterval(up, 40);
            e.preventDefault();
        }
    });

    // Nhả phím Arrow Down => dừng bay lên
    $(document).keyup(function (e) {
        if (e.key === 'ArrowDown' || e.keyCode === 40) {
            clearInterval(go_up);
            go_up = false;
        }
    });

    // Nút bắt đầu chơi
    $('#play_btn').click(function () {
        $(this).hide();
        startGame();
    });

    // Nút chơi lại
    $('#restart_btn').click(function () {
        location.reload();
    });

    // ===== CHUYỂN ĐỘNG CHIM =====
    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 6);
        bird.css('transform', 'rotate(50deg)');
    }

    function up() {
        bird.css('top', parseInt(bird.css('top')) - 12);
        bird.css('transform', 'rotate(-10deg)');
    }

    // ===== DỪNG GAME =====
    function stop_the_game(win) {
        clearInterval(the_game);
        game_over = true;

        if (win) {
            alert('Chúc mừng bạn đã chiến thắng!');
        }

        $('#restart_btn').slideDown();
    }

    // ===== HÀM KIỂM TRA VA CHẠM =====
    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;

        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        // không va chạm
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
            return false;
        }
        // có va chạm
        return true;
    }
});

// (tuỳ chọn) đổi skin chim và ống
function changeBirdType(type) {
    const bird = document.getElementById('bird');
    bird.className = '';
    bird.classList.add(`bird-type-${type}`);
}

function changePoleType(type) {
    const poles = document.querySelectorAll('.pole');
    poles.forEach(pole => {
        pole.className = 'pole';
        pole.classList.add(`pole-type-${type}`);
    });
}
