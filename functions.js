const W = [ // 단어들 저장한 배열
    "해바라기", "호랑나비", "후라이팬", "모래시계", "대한민국",
    "고슴도치", "계란말이", "손목시계", "허수아비", "죽마고우",
    "노래자랑", "시외버스", 
]
const W_length = 12;

let answer_count = 0; // 맞춘 정답 개수
let game_count = 5; // 문제 개수 (소진되면 게임 종료) 
let index_arr = []; // 문제들의 번호(인덱스)를 저장하는 배열

let game_index = 0; // 문제 번호(인덱스)
let letter_index = 0; // 맞춰야 하는 문자 번호(인덱스)

// 배열 무작위 섞기
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        // 무작위 i 값을 만듦 (0 이상의 배열 길이 값)
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
}

/* 게임 - 초기 설정 */
function initGame() {
    // 문제 번호를 문제 개수 만큼 랜덤으로 뽑기
    const numbers = Array.from({ length: W_length }, (_, i) => i);
    shuffle(numbers);

    for (let i = 0; i < game_count; i++) { 
        // 문제 번호 배열에 문제 번호를 저장
        index_arr.push(numbers[i]);
    }
    console.log("index_arr: ", index_arr);
    
    // 화면 요소 설정&출력
    clearAnswer(); 
    printRemaining();
    printNextWord();
}

/* 게임 - 남은 문제 개수 출력 */
const remainingElement = document.getElementById("남은문제");
function printRemaining() {
    remainingElement.innerText = game_count + " 문제 남았습니다";
}

/* 게임 - 답안지 초기화 */
function clearAnswer() {
    for (let i=1; i<=4; i++) {
        document.getElementById("답안_" + i).innerText = "";
    }
}

let answer_arr; // 정답 글자들 저장 배열
let string_arr; // 카드 글자 순서대로 저장

/* 게임 - 다음 문제 */
const imageElement = document.getElementById("image");
function printNextWord() {
    // 문제를 모두 풀었을 경우, 게임 종료
    if (game_count == 0) {
        console.log("문제 " + game_count + "개를 모두 풀었습니다!");
        return gameClear();
    }

    string_arr = Array.from(W[index_arr[game_index]]); // 단어의 글자를 순서대로 저장
    answer_arr = Array.from(W[index_arr[game_index]]); // 정답 글자들 저장

    while (string_arr.every((value, index) => value === answer_arr[index])) {
        // 단어 글자 무작위로 섞기
        shuffle(string_arr); 
    }
    
    console.log("answer: ", answer_arr);
    console.log("string: ", string_arr);
    
    // 그림 표시
    imageElement.style.background = "url(img/" + (index_arr[game_index] + 1) + ".png) no-repeat center / cover";
    
    // 4개의 글자를 글자 카드에 표시
    let letter_element;
    for (let i=0; i<4; i++) {
        letter_element = document.getElementById("글자_" + (i+1));
        letter_element.innerText = string_arr[i];
    }
}

/* 게임 - 글자 카드 클릭 이벤트 */
function letterClick(idx) {
    console.log("클릭된 글자 = " + string_arr[idx]);
    if (string_arr[idx] == answer_arr[letter_index]) { // 맞춰야 하는 글자 순서일 경우
        console.log((letter_index+1)+"번째 글자를 맞췄습니다(" + string_arr[idx] + ")");

        // 글자를 답안에 출력
        document.getElementById("답안_" + (letter_index+1)).innerText = string_arr[idx];
        letter_index += 1;
        if (letter_index == 4) {
            // 다 맞췄다면 1초 대기 후 다음 문제로 넘어가기 
            setTimeout(function(){
                game_index += 1; // 다음 문제 번호로 이동
                answer_count += 1; // 맞춘 문제 개수 + 1

                letter_index = 0;
                game_count -= 1;

                clearAnswer(); 
                printRemaining();
                printNextWord();
            }, 1000); 
        }
    }
    else { // 순서에 맞지 않는 글자일 경우
        console.log("순서에 맞지 않는 글자입니다!");
    }
}

/* 게임 - 처음 시작 */
window.onload = function() {
    console.log("게임을 시작합니다");
    initGame();
}

/* 게임 - 넘어가기 버튼 */
function passBtn() {
    console.log((game_index + 1) + "번 문제는 넘어가기");

    game_index += 1;
    game_count -= 1;
    letter_index = 0;

    clearAnswer(); 
    printRemaining();
    printNextWord();
}

/* 완료 */
function gameClear() {
    console.log("game clear!");

    remainingElement.innerText = "문제를 모두 풀었습니다";
    setTimeout(function() {
        document.getElementById("게임화면").style.display = 'none';
        document.getElementById("맞춘개수").innerText = "5개 중 " + answer_count + "문제";
        document.getElementById("완료화면").style.display = 'flex';
    }, 1000);
}

/* 완료 - 한 번 더 게임하기*/
function restart() {
    // 변수/배열 초기화
    answer_count = 0;
    game_count = 5;
    index_arr.length = 0;
    game_index = 0;

    document.getElementById("완료화면").style.display = 'none';
    document.getElementById("게임화면").style.display = 'flex';

    initGame();
}