
/*
 * 파일명: path-config.js
 * 위치: tamtamstudy_homepage/path-config.js
 *
 * 목적:
 * 1. 홈페이지의 루트 경로를 한곳에서 관리합니다.
 * 2. HTML, CSS, JavaScript, 이미지 경로에 재사용합니다.
 * 3. GitHub Pages와 로컬 웹 서버를 지원합니다.
 */

(function () {
    "use strict";

    // GitHub 저장소 이름
    const REPOSITORY_NAME = "tamtamstudy_homepage";

    // 현재 실행 환경 확인
    const isGitHubPages =
        window.location.hostname.endsWith(".github.io");

    // 환경별 홈페이지 루트 경로
    // GitHub Pages: /tamtamstudy_homepage/
    // 로컬 서버:    /
    const ROOT_PATH = isGitHubPages
        ? "/" + REPOSITORY_NAME + "/"
        : "/";

    // 공통 설정 객체
    window.APP_CONFIG = {
        ROOT_PATH: ROOT_PATH,

        // 루트 기준 상대 경로를 URL 경로로 변환
        // 예: pages/student.html
        // 결과: /tamtamstudy_homepage/pages/student.html
        path: function (filePath) {
            return ROOT_PATH + String(filePath)
                .replace(/^\/+/, "");
        },

        // 브라우저에서 사용할 전체 URL 생성
        url: function (filePath) {
            return new URL(
                this.path(filePath),
                window.location.origin
            ).href;
        }
    };

    // 개발 중 경로 확인용 로그
    console.log("[APP_CONFIG] 루트 경로:", ROOT_PATH);
})();
