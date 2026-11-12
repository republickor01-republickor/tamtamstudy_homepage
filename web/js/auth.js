import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 1. 로그인 초기화 및 처리 함수
export function initLogin() {
  const loginForm = document.getElementById("loginForm"); // HTML 양식과 ID 매칭 ('loginForm')
  const errorMessage = document.getElementById("errorBox"); // HTML 양식과 ID 매칭 ('errorBox')

  if (!loginForm) return;

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("teacher-id").value; // 이메일 입력 ID 매칭
    const password = document.getElementById("teacher-pw").value; // 비밀번호 입력 ID 매칭

    try {
      // 🔒 [보안] 창이나 탭을 닫으면 인증이 바로 파기되도록 세션 지속성 설정
      await setPersistence(auth, browserSessionPersistence);

      // 파이어베이스 로그인 실행
      await signInWithEmailAndPassword(auth, email, password);
      //alert("환영합니다, 선생님! 로그인에 성공했습니다.");

      // ✅ 수정된 안전한 이동 코드
      const hostname = window.location.hostname;
      const isGitHub = hostname.includes("github.io");
      const repoName = "/tamtamstudy_homepage"; // 본인의 실제 저장소 이름

      if (isGitHub) {
        window.location.href =
          window.location.origin + repoName + "./web/teacherpage/mainT.html";
      } else {
        window.location.href = "./web/teacherpage/mainT.html";
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      if (errorMessage) {
        errorMessage.style.display = "block";
        errorMessage.textContent =
          "❌ 로그인 실패: 이메일 또는 비밀번호를 다시 확인해주세요.";
      }
    }
  });
}

// 2. 직접 로그아웃 함수 (대시보드나 메인 화면의 로그아웃 버튼에 사용)
export async function logoutTeacher() {
  if (confirm("로그아웃 하시겠습니까?")) {
    try {
      await signOut(auth);
      alert("안전하게 로그아웃되었습니다.");
      window.location.href = "./index.html"; // 로그인 전 초기 메인화면으로 이동
    } catch (error) {
      console.error("로그아웃 에러:", error);
      alert("로그아웃 도중 오류가 발생했습니다.");
    }
  }
}

// 3. 페이지가 로드되면 즉시 로그인 이벤트 리스너 실행
document.addEventListener("DOMContentLoaded", () => {
  initLogin();
});
