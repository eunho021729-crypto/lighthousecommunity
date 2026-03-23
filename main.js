// 등대마을공동체 웹사이트를 위한 JavaScript

// DOM이 완전히 로드된 후에 실행될 코드
document.addEventListener('DOMContentLoaded', () => {

    // 부드러운 스크롤링 구현
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // href가 #으로 시작하는 페이지 내 앵커 링크인지 확인
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault(); // 페이지 내 링크일 때만 기본 동작(점프) 방지

                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    // 헤더의 높이(약 80px)를 고려하여 스크롤 위치 조정
                    const topPos = targetElement.offsetTop - 80;

                    window.scrollTo({
                        top: topPos,
                        behavior: 'smooth'
                    });
                }
            } 
            // 다른 페이지로 이동하는 링크(e.g., login.html)는
            // preventDefault가 호출되지 않아 정상적으로 이동합니다.
        });
    });
});
