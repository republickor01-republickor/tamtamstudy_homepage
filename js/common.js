(function() {
    const isGitHub = window.location.hostname.includes("github.io");
    const repoName = isGitHub ? "/tamtamstudy_homepage" : ""; 

    // 1. 스타일시트 경로도 repoName을 붙여서 완성하기
    const pagestyle = document.getElementById("pagestyle");
    if (pagestyle) {
        pagestyle.setAttribute("href", repoName + "/web/css/style.css");
    }

    // 2. 링크 주소들도 repoName을 앞에 꼭 붙여주기
    const links = document.querySelectorAll(".path-link");
    links.forEach(link => {
        const originalHref = link.getAttribute("href");
        link.setAttribute("href", repoName + originalHref);
    });
})();