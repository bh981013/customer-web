NUM_OF_BUTTONS = 3;
NUM_OF_QUESTIONS = 7;
//아이템이 자연스럽게 등장하는 애니메이션을 주는 함수
function appearSoft(node) {
    node.style.display = "block";
    node.style.opacity = 0;
    setTimeout(() => node.style.opacity = 1);
}

function disappearSoft(node, disappearTime) {
    node.style.opacity = 0;
    setTimeout(() => node.style.display = "none", disappearTime);
}
//지원 분야 선택 드롭다운 구현
function showPartDropdown() {
    document.querySelectorAll(".spec-part").forEach(elem => {
        elem.style.display = "block";
        elem.style.opacity = 0;
    })
    setTimeout(() => document.querySelectorAll(".spec-part").forEach(elem => elem.style.opacity = 1));
    document.querySelector(".select-part").setAttribute("state", "open");
    document.querySelector(".select-part").style = "border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;"
    document.querySelector(".select-part img").src = "./Icons/chevron-up.png";
}

function hidePartDropdown() {
    document.querySelectorAll(".spec-part").forEach(elem => {
        elem.style.opacity = 0;
    })
    setTimeout(() => document.querySelectorAll(".spec-part").forEach(elem => elem.style.display = "none"), 300);
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
    document.querySelector(".select-part span").style.color = 'black';
    hidePartDropdown();
}))




//자주 묻는 질문 펼치기 구현
let qnaBox = document.querySelectorAll('.frequent .QnA-box');
let questions = document.querySelectorAll('.frequent .question');
let questionDropButtons = document.querySelectorAll(`.frequent .down-icon`);
let questionUpButtons = document.querySelectorAll(`.frequent .up-icon`);
let answers = document.querySelectorAll('.frequent .answer');

function openQuestion(i) {
    answers[i].style = "display: block";
    answers[i].style.opacity = 0;
    setTimeout(() => {
        answers[i].style.opacity = 1
    })
    questionUpButtons[i].style = "display: block";
    questionDropButtons[i].style = "display: none";
    document.querySelectorAll(".QnA-box")[i].style = "background-color: #F8F9FA";
    questions[i].setAttribute("state", "open");
}

function closeQuestion(i) {
    if (i == -1) return;
    answers[i].style = "display: none";
    questionDropButtons[i].style = "display: block";
    questionUpButtons[i].style = "display: none";
    questions[i].setAttribute("state", "closed");
    document.querySelectorAll(".QnA-box")[i].style = "background-color: white";
}

let beforeSelected = -1
questions.forEach((q, i) => q.addEventListener("click", function() {
    if (this.getAttribute("state") == "closed") {
        openQuestion(i);
        for (let j = 0; j < NUM_OF_QUESTIONS; j++)
            if (j != i)
                closeQuestion(j);

    } else {
        closeQuestion(i);
    }

}))

//part 클릭시 설명 보이는 이벤트 추가
function navOnClick(num) {
    let descriptNodes = document.querySelectorAll('.part__description>*');
    let buttons = document.querySelectorAll('.part__navigation>*');
    descriptNodes[num].style = "display:grid";
    descriptNodes[num].style.opacity = 0;
    setTimeout(() => {
        descriptNodes[num].style.opacity = 1;
    });
    questions.forEach((e, i) => closeQuestion(i));
    buttons[num].style = "border-bottom: 2px solid var(--theme-color); font-weight: 500;";

    for (let i = 0; i < NUM_OF_BUTTONS; i++) {
        if (i != num) {
            descriptNodes[i].style.display = "none";
            buttons[i].style.borderBottom = "0px";
            buttons[i].style.fontWeight = "400";
        }
    }
}


document.querySelectorAll('.part__navigation>*').forEach((button, i) => {
    button.addEventListener("click", () => {
        navOnClick(i);
    })
})

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
        if (document.querySelector(".apply .select-part span").innerHTML == "가사청소") {
            document.querySelectorAll(".apply .pop-up .HC").forEach(e => e.style.display = "block");
            document.querySelectorAll(".apply .pop-up .other").forEach(e => e.style.display = "none");
        } else {
            document.querySelectorAll(".apply .pop-up .HC").forEach(e => e.style.display = "none");
            document.querySelectorAll(".apply .pop-up .other").forEach(e => e.style.display = "block");
        }
        if (window.innerWidth <= 800) {
            appearSoft(document.querySelector(".apply .pop-up-background"))
            appearSoft(document.querySelector(".apply .pop-up.mobile"));
        } else {
            appearSoft(document.querySelector(".apply .pop-up-background"))
            appearSoft(document.querySelector(".apply .pop-up.pc"));
        }
    }
}

//지원하기 클릭시 실행함수
let nameErrorTimeout = null;
let phoneErrorTimeout = null;
document.querySelector(".apply .submit").addEventListener("click", () => {
    //appearSoft(document.querySelector(".apply .pop-up-background"))
    //appearSoft(document.querySelector(".apply .pop-up.pc"));

    let part = document.querySelector(".apply .select-part span");
    let [name, phone] = document.querySelectorAll(".apply .sub input");
    if (!name.value) {
        if (nameErrorTimeout) {
            clearTimeout(nameErrorTimeout);
        }
        appearSoft(document.querySelector(".apply .name-error"));
        nameErrorTimeout = setTimeout(() => {
            disappearSoft(document.querySelector(".apply .name-error"), 300);
        }, 3000)
    }
    if (!phone.value || !phone.value.match(/.[(0-9)]{9,10}/)) {
        if (phoneErrorTimeout) clearTimeout(phoneErrorTimeout);
        appearSoft(document.querySelector(".apply .phone-error"));
        phoneErrorTimeout = setTimeout(() => disappearSoft(document.querySelector(".apply .phone-error"), 300), 3000)
    } else {
        xmlHttp.open("POST", "https://lapi.dangjib.com/provider/inbound");
        xmlHttp.setRequestHeader('Content-type', 'application/json')
        let data = {
            "category": part.innerHTML,
            "name": name.value,
            "phone": phone.value
        }
        console.log(part.innerHTML, name.value, phone.value);
        xmlHttp.send(JSON.stringify(data));

    }
})

//지원하기 모바일버전 플로팅버튼 구현
const TOP = 240;
const BOTTOM = 4000;
window.addEventListener('scroll', () => {
    //스크롤을 할 때마다 로그로 현재 스크롤의 위치가 찍혀나온다.
    let floatingBtn = document.querySelector(".goto-apply-button.floating");
    if (window.innerWidth <= 800) {
        if (window.scrollY >= TOP && window.scrollY <= BOTTOM) {
            floatingBtn.style.display = "block";
        } else if (window.scrollY < TOP || window.scrollY >= BOTTOM) {
            floatingBtn.style.display = "none";
        }
    }
})

//지원 완료 후 확인 메세지 닫기
document.querySelectorAll(".apply .pop-up .out").forEach(out => out.addEventListener("click", () => {
    disappearSoft(document.querySelector(".apply .pop-up-background"), 0.5);
    disappearSoft(document.querySelector(".apply .pop-up.pc"), 0.5);
    disappearSoft(document.querySelector(".apply .pop-up.mobile"), 0.5);
    document.querySelectorAll(".apply .sub input").forEach(e => e.value = null);
}))