function hienThi() {
    const ten = document.getElementById("txtName").value.trim();
    const tuoi = document.getElementById("txtAge").value.trim();
    const ketQua = document.getElementById("ketQua");

    if (!ten || !tuoi) {
        ketQua.innerHTML = "<p>Bạn chưa nhập đủ tên và tuổi.</p>";
        return;
    }

    const ketQuaTen =
        '<h1 style="color: blue; font-weight: bold;">' + ten + '</h1>';

    const ketQuaTuoi = '<h2 style="text-decoration: underline;">' + tuoi + '</h2>';

    ketQua.innerHTML = ketQuaTen + ketQuaTuoi;
}
