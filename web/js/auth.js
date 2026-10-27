import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

export function initLogin() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // 파이어베이스 로그인 실행
            await signInWithEmailAndPassword(auth, email, password);
            alert("환영합니다, 선생님! 로그인에 성공했습니다.");
            
            // 로그인 성공 후 대시보드(관리자 메인 화면)로 이동!
            window.location.href = 'dashboard.html';
            
        } catch (error) {
            console.error("로그인 에러:", error);
            errorMessage.textContent = "로그인 실패: 이메일 또는 비밀번호를 다시 확인해주세요.";
        }
    });
}