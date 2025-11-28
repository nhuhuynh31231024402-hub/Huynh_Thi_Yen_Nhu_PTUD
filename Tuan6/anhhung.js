var name="Huynh Thi Yen Nhu";
var MSSV = 31231024402;
document.writeln("Tôi tên là " + name + " – MSSV: [" + MSSV + "] sẽ quyết tâm trở thành 1 anh hùng JS");


level = 1;
xp = 0;
skillPoints = 5;

strength = 0.6*skillPoints+0.1*xp;
agility = 0.2*skillPoints+0.2*xp;
intel = 0.2*skillPoints+10*level;

document.writeln("<br>Chỉ số strength của bạn là " + strength);
document.writeln("<br>Chỉ số agility của bạn là " + agility);
document.writeln("<br>Chỉ số intel của bạn là " + intel);

nameNhapLai = prompt("Tên bạn là gì?","");
if(name == nameNhapLai){
    console.log("Chính xác! Bạn có trí nhớ rất tốt! skillPoints +5!");
        skillPoints +=5;
}
else{
    console.log("Tệ thật! Tên chính mình mà không nhớ sao?! skillPoints -5!");
    skillPoints -=5;
}   
phancap = prompt("Bạn muốn chọn phân cấp nào? a: Chiến Binh | b: Sát Thủ | c: Thợ Săn");
switch(phancap){
    case "a":
        phancap = "Chiến Binh";
        strength +=10;
        agility -=10;
        break;
    case "b":
        phancap = "Sát Thủ";
        strength -=10;
        agility +=5;
        intel +=5;
        break;
    case "c":
        phancap = "Thợ Săn";
        strength -=10;
        intel +=10;
        break;
}
/* Cập nhật thông tin sau khi chọn phân cấp */
document.addEventListener('DOMContentLoaded', function(){
    document.getElementsByClassName("capnhat")[0].innerHTML = `
    Sau khi lựa chọn: Xin chào ${phancap}!
    <br> Chỉ số strength của bạn là ${strength}
    <br> Chỉ số agility của bạn là ${agility}
    <br> Chỉ số intel của bạn là ${intel}
    `;
})