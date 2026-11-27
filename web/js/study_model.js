// web/js/study_models.js

/**
 * 1. 학생·학년 및 전체 동일/개별 적용 선택 모델
 * - 학년별 학생 목록 필터링과 '전체 동일 vs 학생별 개별' 선택 모드를 관리합니다.
 */
export class StudentBatchSelection {
    constructor({
        targetGrade = "",           // 선택된 학년 (예: "중2", "고2", 전체면 "")
        applyMode = "same",         // "same"(전부 같은 내용 적용) | "individual"(학생별 개별 적용)
        selectedStudentIds = [],    // 선택된 학생 ID 목록
        students = []               // 대상 학생 객체 배열
    } = {}) {
        this.targetGrade = targetGrade;
        this.applyMode = applyMode === "individual" ? "individual" : "same";
        this.selectedStudentIds = Array.isArray(selectedStudentIds) ? [...selectedStudentIds] : [];
        this.students = Array.isArray(students) ? [...students] : [];
    }

    getStudentsByGrade(grade = this.targetGrade) {
        if (!grade) return [...this.students];
        return this.students.filter((s) => {
            const sGrade = s.gradeAtReg || s.grade || s["등록일 학년"] || "";
            return sGrade === grade;
        });
    }

    isSameMode() {
        return this.applyMode === "same";
    }

    static fromDict(docId = "", data = {}) {
        return new StudentBatchSelection({
            targetGrade: data["대상학년"] || data.targetGrade || "",
            applyMode: data["적용방식"] || data.applyMode || "same",
            selectedStudentIds: data["선택학생ID목록"] || data.selectedStudentIds || [],
            students: data.students || []
        });
    }

    toDict() {
        return {
            "대상학년": this.targetGrade,
            "적용방식": this.applyMode,
            "선택학생ID목록": [...this.selectedStudentIds]
        };
    }
}

/**
 * 2. 수업 진도 기록 모델
 * - 학생별 수업(풀이) 진도, 계획/완료 페이지, 실제 진도 이행 여부를 관리합니다.
 */
export class ClassProgressRecord {
    constructor({
        recordId = "",
        date = "",
        dayOfWeek = "",
        studentId = "",
        studentName = "",
        grade = "",
        bookName = "",
        unitName = "",
        startPage = null,
        planPage = null,
        donePage = null,
        studyMinutes = null,
        attendance = "정상",        // "정상" | "지각" | "결석" | "외부"
        notes = ""
    } = {}) {
        this.recordId = recordId;
        this.date = date;
        this.dayOfWeek = dayOfWeek;
        this.studentId = studentId;
        this.studentName = studentName;
        this.grade = grade;
        this.bookName = bookName;
        this.unitName = unitName;
        this.startPage = startPage !== "" && startPage !== null && startPage !== undefined ? Number(startPage) : null;
        this.planPage = planPage !== "" && planPage !== null && planPage !== undefined ? Number(planPage) : null;
        this.donePage = donePage !== "" && donePage !== null && donePage !== undefined ? Number(donePage) : null;
        this.studyMinutes = studyMinutes !== "" && studyMinutes !== null && studyMinutes !== undefined ? Number(studyMinutes) : null;
        this.attendance = attendance || "정상";
        this.notes = notes;
    }

    // 실제 완료한 페이지 수 (완료 미입력 또는 역전 시 null 반환해 음수 방지)
    getCompletedPages() {
        if (this.startPage === null || this.donePage === null || Number.isNaN(this.startPage) || Number.isNaN(this.donePage)) {
            return null;
        }
        if (this.donePage < this.startPage) return null;
        return this.donePage - this.startPage + 1;
    }

    // 계획 페이지 수
    getPlannedPages() {
        if (this.startPage === null || this.planPage === null || Number.isNaN(this.startPage) || Number.isNaN(this.planPage)) {
            return null;
        }
        if (this.planPage < this.startPage) return null;
        return this.planPage - this.startPage + 1;
    }

    // 정말 수업진도가 나갔는지 판정 ("진도 완료" | "일부 진행" | "진도 미진행")
    getProgressStatus() {
        if (this.attendance === "결석" || this.attendance === "외부") {
            return "진도 미진행";
        }
        const completed = this.getCompletedPages();
        if (completed === null || completed <= 0) {
            return "진도 미진행";
        }
        const planned = this.getPlannedPages();
        if (planned !== null && this.donePage >= this.planPage && this.attendance === "정상") {
            return "진도 완료";
        }
        return "일부 진행";
    }

    static fromDict(recordId = "", data = {}) {
        return new ClassProgressRecord({
            recordId,
            date: data["날짜"] || data.date || "",
            dayOfWeek: data["요일"] || data.dayOfWeek || "",
            studentId: data["학생ID"] || data.studentId || "",
            studentName: data["학생이름"] || data.studentName || "",
            grade: data["학년"] || data.grade || "",
            bookName: data["문제집"] || data.bookName || "",
            unitName: data["단원"] || data.unitName || "",
            startPage: data["시작페이지"] ?? data.startPage ?? null,
            planPage: data["계획페이지"] ?? data.planPage ?? null,
            donePage: data["완료페이지"] ?? data.donePage ?? null,
            studyMinutes: data["학습시간"] ?? data.studyMinutes ?? null,
            attendance: data["출결상태"] || data.attendance || "정상",
            notes: data["비고"] || data.notes || ""
        });
    }

    toDict() {
        return {
            "날짜": this.date,
            "요일": this.dayOfWeek,
            "학생ID": this.studentId,
            "학생이름": this.studentName,
            "학년": this.grade,
            "문제집": this.bookName,
            "단원": this.unitName,
            "시작페이지": this.startPage,
            "계획페이지": this.planPage,
            "완료페이지": this.donePage,
            "학습시간": this.studyMinutes,
            "출결상태": this.attendance,
            "비고": this.notes
        };
    }
}

/**
 * 3. 숙제 기록 모델
 * - 학생별 숙제 범위, 마감일, 완료/검사 상태를 수업 진도와 독립적으로 관리합니다.
 */
export class HomeworkRecord {
    constructor({
        homeworkId = "",
        assignedDate = "",
        dueDate = "",
        checkedDate = "",
        studentId = "",
        studentName = "",
        grade = "",
        bookName = "",
        unitName = "",
        startPage = null,
        endPage = null,
        completionRate = null,      // 0 ~ 100 또는 0 ~ 1
        checkStatus = "미검사",      // "미검사" | "검사 완료" | "일부 확인" | "숙제 없음"
        notes = ""
    } = {}) {
        this.homeworkId = homeworkId;
        this.assignedDate = assignedDate;
        this.dueDate = dueDate;
        this.checkedDate = checkedDate;
        this.studentId = studentId;
        this.studentName = studentName;
        this.grade = grade;
        this.bookName = bookName;
        this.unitName = unitName;
        this.startPage = startPage !== "" && startPage !== null && startPage !== undefined ? Number(startPage) : null;
        this.endPage = endPage !== "" && endPage !== null && endPage !== undefined ? Number(endPage) : null;
        this.completionRate = completionRate !== "" && completionRate !== null && completionRate !== undefined ? Number(completionRate) : null;
        this.checkStatus = checkStatus || "미검사";
        this.notes = notes;
    }

    getHomeworkPages() {
        if (this.startPage === null || this.endPage === null || Number.isNaN(this.startPage) || Number.isNaN(this.endPage)) {
            return null;
        }
        if (this.endPage < this.startPage) return null;
        return this.endPage - this.startPage + 1;
    }

    isChecked() {
        return this.checkStatus === "검사 완료";
    }

    static fromDict(homeworkId = "", data = {}) {
        return new HomeworkRecord({
            homeworkId,
            assignedDate: data["부여일"] || data.assignedDate || "",
            dueDate: data["마감일"] || data.dueDate || "",
            checkedDate: data["검사날짜"] || data.checkedDate || "",
            studentId: data["학생ID"] || data.studentId || "",
            studentName: data["학생이름"] || data.studentName || "",
            grade: data["학년"] || data.grade || "",
            bookName: data["숙제문제집"] || data.bookName || "",
            unitName: data["숙제단원"] || data.unitName || "",
            startPage: data["숙제시작"] ?? data.startPage ?? null,
            endPage: data["숙제마무리"] ?? data.endPage ?? null,
            completionRate: data["완성률"] ?? data.completionRate ?? null,
            checkStatus: data["검사여부"] || data.checkStatus || "미검사",
            notes: data["비고"] || data.notes || ""
        });
    }

    toDict() {
        return {
            "부여일": this.assignedDate,
            "마감일": this.dueDate,
            "검사날짜": this.checkedDate,
            "학생ID": this.studentId,
            "학생이름": this.studentName,
            "학년": this.grade,
            "숙제문제집": this.bookName,
            "숙제단원": this.unitName,
            "숙제시작": this.startPage,
            "숙제마무리": this.endPage,
            "완성률": this.completionRate,
            "검사여부": this.checkStatus,
            "비고": this.notes
        };
    }
}