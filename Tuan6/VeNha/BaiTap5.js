let wrongCount = 0;
let swapped = false;

function renderLoveUI() {
    document.body.innerHTML = `
        <div class="love-container">
            <h1 class="question">BẠN CÓ THÍCH MÌNH KHÔNG?</h1>
            <div class="answers">
                ${
                    swapped
                        ? `
                            <button id="btnNo" class="btn btn-no">KHÔNG</button>
                            <span class="divider">|</span>
                            <button id="btnYes" class="btn btn-yes">CÓ</button>
                          `
                        : `
                            <button id="btnYes" class="btn btn-yes">CÓ</button>
                            <span class="divider">|</span>
                            <button id="btnNo" class="btn btn-no">KHÔNG</button>
                          `
                }
            </div>
            <p class="hint">Chọn thật lòng nhaaaaaaaa</p>
        </div>
    `;

    attachEvents();
}

function attachEvents() {
    const btnYes = document.getElementById("btnYes");
    const btnNo = document.getElementById("btnNo");

    if (btnYes) {
        btnYes.addEventListener("click", function () {
            alert("Xin lỗi, bạn không phải là đối tượng của mình");
        });
    }

    if (btnNo) {
        btnNo.addEventListener("click", function () {
            wrongCount++;
            if (wrongCount < 3) {
                alert("có thể Bạn nên chọn lại.");
            } else {
                alert("Sai 3 lần rồi, để mình đổi vị trí cho dễ chọn hơn nha ^^");
                swapped = !swapped;
                wrongCount = 0;
                renderLoveUI();
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    renderLoveUI();
});
