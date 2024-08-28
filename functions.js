const W = [ // 단어들 저장한 배열
    "해바라기", "호랑나비", "후라이팬", "모래시계", "대한민국",
    "고슴도치", "계란말이", "손목시계", "허수아비", "죽마고우",
    "노래자랑", "시외버스", "동그라미",
]
const W_length = 5;

let answer_count = 0; // 맞춘 정답 개수
let game_count = 5; // 문제 개수 (소진되면 게임 종료) 

// 배열 무작위 섞기
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        // 무작위 i 값을 만듦 (0 이상의 배열 길이 값)
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
}

/* 게임 */


/* 완료 */