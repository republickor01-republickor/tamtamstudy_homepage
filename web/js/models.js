// web/js/models.js

// 1. 학생 모델 클래스
export class Student {
    constructor(docId = "", studentName = "", schoolName = "", gradeAtReg = "", registrationDate = "", birthDate = "", phone = "", address = "", counselingNotes = "") {
        this.docId = docId;
        this.studentName = studentName;       // 학생이름
        this.schoolName = schoolName;         // 학교명
        this.gradeAtReg = gradeAtReg;         // 등록일 학년
        this.registrationDate = registrationDate; // 등록일
        this.birthDate = birthDate;           // 생년월일
        this.phone = phone;                   // 전화번호
        this.address = address;               // 주소
        this.counselingNotes = counselingNotes; // 상담중특이사항
        this.parents = [];                    // 조인된 부모 객체 리스트
    }

    static fromDict(docId, data) {
        return new Student(
            docId,
            data['학생이름'] || '',
            data['학교명'] || '',
            data['등록일 학년'] || data['등록일학년'] || '',
            data['등록일'] || '',
            data['생년월일'] || '',
            data['전화번호'] || '',
            data['주소'] || '',
            data['상담중특이사항'] || ''
        );
    }

    toDict() {
        return {
            '학생이름': this.studentName,
            '학교명': this.schoolName,
            '등록일 학년': this.gradeAtReg,
            '등록일': this.registrationDate,
            '생년월일': this.birthDate,
            '전화번호': this.phone,
            '주소': this.address,
            '상담중특이사항': this.counselingNotes
        };
    }
}

// 2. 보호자 모델 클래스
export class Parent {
    constructor(docId = "", name = "", phone = "", notes = "") {
        this.docId = docId;
        this.name = name;     // 보호자명
        this.phone = phone;   // 보호자전화번호
        this.notes = notes;   // 특이사항
    }

    static fromDict(docId, data) {
        return new Parent(
            docId,
            data['보호자명'] || '',
            data['보호자전화번호'] || '',
            data['특이사항'] || ''
        );
    }

    toDict() {
        return {
            '보호자명': this.name,
            '보호자전화번호': this.phone,
            '특이사항': this.notes
        };
    }
}

// 3. 반 정보 모델 클래스
export class ClassInfo {
    constructor(docId, className = null, extraData = null) {
        this.docId = docId;
        this.className = className ? className : docId;
        this.extraData = extraData ? extraData : {};
    }

    static fromDict(docId, data) {
        const className = data['class_name'] || docId;
        return new ClassInfo(docId, className, data);
    }

    toDict() {
        let res = { ...this.extraData };
        res['class_name'] = this.className;
        return res;
    }
}

// 4. 학생-반 관계 모델 클래스
export class StudentClassRel {
    constructor(relId = "", classId = "", className = "", studentId = "", regDate = "") {
        this.relId = relId;
        this.classId = classId;
        this.className = className;
        this.studentId = studentId;
        this.regDate = regDate;
    }

    static fromDict(relId, data) {
        return new StudentClassRel(
            relId,
            data['class_id'] || '',
            data['class_name'] || '',
            data['student_id'] || '',
            data['등록일자'] || ''
        );
    }

    toDict() {
        return {
            'class_id': this.classId,
            'class_name': this.className,
            'student_id': this.studentId,
            '등록일자': this.regDate
        };
    }
}

// 5. 학생-보호자 관계 모델 클래스
export class StudentParentRel {
    constructor(relId = "", studentId = "", parentId = "", relation = "기타", smsAlarm = true, attendanceAlarm = false, kakaoAlarm = false) {
        this.relId = relId;
        this.studentId = studentId;
        this.parentId = parentId;
        this.relation = relation;
        this.smsAlarm = smsAlarm;
        this.attendanceAlarm = attendanceAlarm;
        this.kakaoAlarm = kakaoAlarm;
    }

    static fromDict(relId, data) {
        return new StudentParentRel(
            relId,
            data['student_id'] || '',
            data['parent_id'] || '',
            data['관계'] || '기타',
            data['문자알람'] !== undefined ? data['문자알람'] : true,
            data['출결알람'] !== undefined ? data['출결알람'] : false,
            data['카톡알람'] !== undefined ? data['카톡알람'] : false
        );
    }

    toDict() {
        return {
            'student_id': this.studentId,
            'parent_id': this.parentId,
            '관계': this.relation,
            '문자알람': this.smsAlarm,
            '출결알람': this.attendanceAlarm,
            '카톡알람': this.kakaoAlarm
        };
    }
}
// 6. 학년·과목 분류 카탈로그 모델 클래스
// - 기본은 학년별(H1은 대수·미적1 포함 등)로 묶고, 미적2·기하·확률과 통계는 별도 과목으로 관리합니다.
export class GradeSubjectCatalog {
    constructor(entries = null) {
        this.entries = Array.isArray(entries) && entries.length > 0
            ? entries
            : GradeSubjectCatalog.getDefaultEntries();
    }

    static getDefaultEntries() {
        return [
            // 초등 학년별 기본 과목
            { gradeCode: "C1", gradeLabel: "초등1", subjectCode: "Math_C1", subjectLabel: "초등 1(학년별)", collectionName: "Math_C1", category: "grade", includedNotes: "" },
            { gradeCode: "C2", gradeLabel: "초등2", subjectCode: "Math_C2", subjectLabel: "초등 2(학년별)", collectionName: "Math_C2", category: "grade", includedNotes: "" },
            { gradeCode: "C3", gradeLabel: "초등3", subjectCode: "Math_C3", subjectLabel: "초등 3(학년별)", collectionName: "Math_C3", category: "grade", includedNotes: "" },
            { gradeCode: "C4", gradeLabel: "초등4", subjectCode: "Math_C4", subjectLabel: "초등 4(학년별)", collectionName: "Math_C4", category: "grade", includedNotes: "" },
            { gradeCode: "C5", gradeLabel: "초등5", subjectCode: "Math_C5", subjectLabel: "초등 5(학년별)", collectionName: "Math_C5", category: "grade", includedNotes: "" },
            { gradeCode: "C6", gradeLabel: "초등6", subjectCode: "Math_C6", subjectLabel: "초등 6(학년별)", collectionName: "Math_C6", category: "grade", includedNotes: "" },
            // 중등 학년별 기본 과목
            { gradeCode: "M1", gradeLabel: "중1", subjectCode: "Math_M1", subjectLabel: "중1 수학 (학년별)", collectionName: "Math_M1", category: "grade", includedNotes: "" },
            { gradeCode: "M2", gradeLabel: "중2", subjectCode: "Math_M2", subjectLabel: "중2 수학 (학년별)", collectionName: "Math_M2", category: "grade", includedNotes: "" },
            { gradeCode: "M3", gradeLabel: "중3", subjectCode: "Math_M3", subjectLabel: "중3 수학 (학년별)", collectionName: "Math_M3", category: "grade", includedNotes: "" },

            // 고등 학년별 기본 과목 (H1은 대수·미적1 포함)
            { gradeCode: "H1", gradeLabel: "고1(H1)", subjectCode: "Math_H1", subjectLabel: "H1 수학 (공통수학 1,2)", collectionName: "Math_H1", category: "grade", includedNotes: "대수, 미적1 포함" },
            { gradeCode: "H2", gradeLabel: "고2(H2)", subjectCode: "Math_H2", subjectLabel: "H2 수학 (대수,미적1)", collectionName: "Math_H2", category: "grade", includedNotes: "" },

            // 별도 분리 과목: 미적2 · 기하 · 확률과 통계
            { gradeCode: "H", gradeLabel: "고등 선택", subjectCode: "Math_H_ADV_CAL", subjectLabel: "미적2", collectionName: "Math_H_ADV_CAL", category: "subject", includedNotes: "미적분2" },
            { gradeCode: "H", gradeLabel: "고등 선택", subjectCode: "Math_Sheet20", subjectLabel: "기하", collectionName: "Math_Sheet20", category: "subject", includedNotes: "기하" },
            { gradeCode: "H", gradeLabel: "고등 선택", subjectCode: "Math_H_STAT", subjectLabel: "확률과 통계", collectionName: "Math_H_STAT", category: "subject", includedNotes: "확룔과 통계" }
        ];
    }

    // 학년 필터에 맞는 항목 조회 (예: "H1", "H", 또는 전체 "")
    getByGrade(gradeCode = "") {
        if (!gradeCode) return [...this.entries];
        if (gradeCode === "H") {
            return this.entries.filter((e) => e.gradeCode.startsWith("H"));
        }
        return this.entries.filter((e) => e.gradeCode === gradeCode);
    }

    // collectionName 또는 subjectCode로 단건 조회
    findByCollection(collectionName) {
        return this.entries.find((e) => e.collectionName === collectionName || e.subjectCode === collectionName) || null;
    }

    static fromDict(data = {}) {
        const list = Array.isArray(data.entries) ? data.entries : null;
        return new GradeSubjectCatalog(list);
    }

    toDict() {
        return {
            entries: this.entries.map((e) => ({ ...e }))
        };
    }
}