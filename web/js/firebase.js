// Firebase SDK 10.8.0 CDN 임포트
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// TODO: 본인의 파이어베이스 콘솔 설정값으로 변경해주세요
const firebaseConfig = {
  apiKey: "AIzaSyC32dXr4l_NBy8n6Z-TuM67UEyK_hWxCU4",
  authDomain: "mathjusttry-form.firebaseapp.com",
  projectId: "mathjusttry-form",
  storageBucket: "mathjusttry-form.firebasestorage.app",
  messagingSenderId: "15276089610",
  appId: "1:15276089610:web:12e8447065b3f9effbdaf3"
};


// 파이어베이스 앱 초기화
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);