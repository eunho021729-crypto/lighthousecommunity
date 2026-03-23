
// 등대마을공동체 웹사이트를 위한 JavaScript

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEHn-Ldd7p5neCCcubVWFBub9uYPKILR4",
  authDomain: "lighthousecommunity.firebaseapp.com",
  projectId: "lighthousecommunity",
  storageBucket: "lighthousecommunity.firebasestorage.app",
  messagingSenderId: "289114059635",
  appId: "1:289114059635:web:21a7066b4fb596ae618b06",
  measurementId: "G-QL86PCXLHE"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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

    // 후원 양식 처리
    const donationForm = document.getElementById('donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = donationForm.name.value;
            const amount = donationForm.amount.value;
            const message = donationForm.message.value;

            db.collection('donations').add({
                name: name,
                amount: amount,
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                alert('후원해주셔서 감사합니다!');
                donationForm.reset();
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
                alert('후원 처리 중 오류가 발생했습니다.');
            });
        });
    }

    // 후기 양식 처리
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = reviewForm.name.value;
            const rating = reviewForm.rating.value;
            const comment = reviewForm.comment.value;

            db.collection('reviews').add({
                name: name,
                rating: rating,
                comment: comment,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                alert('소중한 후기 감사합니다!');
                reviewForm.reset();
                loadReviews();
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
                alert('후기 등록 중 오류가 발생했습니다.');
            });
        });
    }

    // 후기 불러오기
    const reviewsContainer = document.getElementById('reviews-container');
    function loadReviews() {
        if (reviewsContainer) {
            db.collection('reviews').orderBy('timestamp', 'desc').get()
                .then((querySnapshot) => {
                    reviewsContainer.innerHTML = '';
                    querySnapshot.forEach((doc) => {
                        const review = doc.data();
                        const reviewElement = document.createElement('div');
                        reviewElement.classList.add('review');
                        reviewElement.innerHTML = `
                            <h4>${review.name} (${review.rating}점)</h4>
                            <p>${review.comment}</p>
                        `;
                        reviewsContainer.appendChild(reviewElement);
                    });
                });
        }
    }

    loadReviews();
});
