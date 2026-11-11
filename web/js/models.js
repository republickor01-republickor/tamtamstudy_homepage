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