NUM_OF_BUTTONS = 3;
NUM_OF_QUESTIONS = 3;

//part 클릭시 설명 보이는 이벤트 추가
function navOnClick(num) {
    let descriptNodes = document.querySelectorAll('.part__description>*');
    let buttons = document.querySelectorAll('.part__navigation>*');
    descriptNodes[num].style = "display:grid";
    descriptNodes[num].style.opacity = 0;
    console.log(descriptNodes[num]);
    setTimeout(() => {
        descriptNodes[num].style.opacity = 1;
    }, 20);
    console.log(descriptNodes[num]);
    buttons[num].style = "border-bottom: 2px solid var(--theme-color)";

    for (let i = 0; i < 3; i++) {
        if (i != num) {
            descriptNodes[i].style.display = "none";
            buttons[i].style.borderBottom = "0px";
            console.log(descriptNodes[i]);
        }
    }
}


document.querySelectorAll('.part__navigation>*').forEach((button, i) => {
    button.addEventListener("click", () => {
        navOnClick(i);
    })
})


//지원 분야 선택 드롭다운 구현
function showPartDropdown() {
    document.querySelectorAll(".spec-part").forEach(elem => {
        elem.style.display = "block";
    })
    document.querySelector(".select-part").setAttribute("state", "open");
    document.querySelector(".select-part").style = "border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;"
    document.querySelector(".select-part img").src = "./Icons/chevron-up.png";
}

function hidePartDropdown() {
    document.querySelectorAll(".spec-part").forEach(elem => {
        elem.style.display = "none";
    })
    document.querySelector(".select-part").setAttribute("state", "closed")
    document.querySelector(".select-part").style = "border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;"
    document.querySelector(".select-part img").src = "./Icons/chevron-down.png";
}
document.querySelector(".select-part").addEventListener("click", function() {
    if (this.getAttribute("state") == "closed") {
        showPartDropdown()
    } else {
        hidePartDropdown()
    }
})

document.querySelectorAll(".spec-part").forEach((elem, i) => elem.addEventListener("click", () => {
    document.querySelector(".select-part span").innerHTML = elem.innerHTML;
    document.querySelector(".select-part").setAttribute("selected", true);
    document.querySelector(".select-part").style.color = 'black';
    hidePartDropdown();
}))

//자주 묻는 질문 펼치기 구현
let questions = document.querySelectorAll('.frequent .question')
let questionDropButtons = document.querySelectorAll(`.frequent .down-icon`);
let questionUpButtons = document.querySelectorAll(`.frequent .up-icon`);
let answers = document.querySelectorAll('.frequent .answer');
for (let i = 0; i < NUM_OF_QUESTIONS; i++) {
    questions[i].addEventListener("click", function() {
        if (this.getAttribute("state") == "closed") {
            answers[i].style = "display: block";
            answers[i].style.opacity = 0;
            setTimeout(() => answers[i].style.opacity = 1)
            questionUpButtons[i].style = "display: block";
            questionDropButtons[i].style = "display: none";
            document.querySelectorAll(".QnA-box")[i].style = "background-color: #F8F9FA";
            this.setAttribute("state", "open");
        } else {
            answers[i].style = "display: none";
            questionDropButtons[i].style = "display: block";
            questionUpButtons[i].style = "display: none";
            this.setAttribute("state", "closed");
            document.querySelectorAll(".QnA-box")[i].style = "background-color: white";
        }

    })
}

//더블터치로 확대되는것 막기
var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function(event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

//지원하기 form 전송
let xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() {
    if (this.status == 200 && this.readyState == this.DONE) {
        console.log(this.status);
        console.log(xmlHttp.responseText);
    }
}
document.querySelector(".contact .submit").addEventListener("click", () => {

    let part = document.querySelector(".contact .select-part span");
    let partSelected = document.querySelector(".contact .select-part").getAttribute("selected")
    let [name, phone, checkBox] = document.querySelectorAll(".contact .sub input");
    if (!partSelected) alert("지원 분야를 선택하세요");
    else if (!name.value) alert("이름을 입력하세요")
    else if (!phone.value) alert("전화번호를 입력하세요")
    else if (!checkBox.checked) alert("개인정보 수집/이용 동의해주세요")
    else {
        xmlHttp.open("POST", "http://127.0.0.1:8080/members/new");
        let data = new FormData();
        data.append("name", name.value);
        xmlHttp.send(data);
    }
})



//xmlHttp.open("G")

//체크박스 범위 확대(체크박스 기본동작 취소)
document.querySelector(".contact .agree .text").addEventListener("click", () => {
    let checkBox = document.querySelector(".contact .agree input")
    if (checkBox.checked) checkBox.checked = false;
    else checkBox.checked = true;
})


class AutonomousButton extends HTMLElement {

}
customElements.define("autonomous-button", AutonomousButton);