// DOM 요소 가져오기
const titleInput = document.getElementById('event-title');
const dateInput = document.getElementById('event-date');
const addButton = document.getElementById('add-button');
const ddayList = document.getElementById('dday-list');

// '추가하기' 버튼 클릭 이벤트 처리
addButton.addEventListener('click', () => {
    const title = titleInput.value;
    const targetDate = dateInput.value;

    // 입력값 확인
    if (!title || !targetDate) {
        alert('이벤트 이름과 날짜를 모두 입력해주세요.');
        return;
    }

    addDdayItem(title, targetDate);

    // 입력 필드 초기화
    titleInput.value = '';
    dateInput.value = '';
});

// D-Day 아이템을 목록에 추가하는 함수
function addDdayItem(title, targetDate) {
    const li = document.createElement('li');

    const today = new Date();
    // 사용자가 선택한 날짜의 00:00:00 시점을 기준으로 설정
    const dday = new Date(targetDate);

    // 시간대 오차 보정 (한국 시간 기준)
    const offset = dday.getTimezoneOffset() * 60000;
    const ddayUTC = new Date(dday.getTime() + offset);

    // 날짜 차이 계산 (밀리초 단위)
    const diff = ddayUTC - today;
    
    // 밀리초를 일(day)로 변환
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    let resultText = '';
    if (diffDays === 0) {
        resultText = 'D-Day';
    } else if (diffDays > 0) {
        resultText = `D-${diffDays}`;
    } else {
        resultText = `D+${Math.abs(diffDays -1)}`;
    }

    li.innerHTML = `
        <span class="dday-title">${title} (${targetDate})</span>
        <span class="dday-result">${resultText}</span>
    `;

    ddayList.appendChild(li);
}