(function() {
    const isGitHub = window.location.hostname.includes("github.io");
    const repoName = isGitHub ? "/tamtamstudy_homepage" : ""; 

    // 1. 스타일시트 경로를 확실하게 잡아줍니다 (크기가 깨지던 원인 해결)
    const pagestyle = document.getElementById("pagestyle");
    if (pagestyle) {
        // 깃허브일 때: "/tamtamstudy_homepage/web/css/style.css"
        // 로컬일 때: "/web/css/style.css"
        pagestyle.setAttribute("href", repoName + "/web/css/style.css");
    }

    // 2. 링크 주소들 처리
    const links = document.querySelectorAll(".path-link");
    links.forEach(link => {
        let originalHref = link.getAttribute("href");
        if (originalHref) {
            if (originalHref.startsWith("/")) {
                link.setAttribute("href", repoName + originalHref);
            } else {
                link.setAttribute("href", repoName + "/" + originalHref);
            }
        }
    });
})();
