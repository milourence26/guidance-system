import pool from '../../lib/db';

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        return await handleGet(req, res);
      case 'POST':
        return await handlePost(req, res);
      case 'PUT':
        return await handlePut(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleGet(req, res) {
  const { id } = req.query;
  
  if (id) {
    const result = await pool.query(
      'SELECT * FROM basic_ed_students WHERE student_id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    return res.status(200).json(result.rows[0]);
  } else {
    const { search, studentType } = req.query;
    let query = 'SELECT * FROM basic_ed_students WHERE 1=1';
    const params = [];
    
    if (search) {
      query += ` AND (LOWER(last_name) LIKE LOWER($${params.length + 1}) OR 
               LOWER(given_name) LIKE LOWER($${params.length + 1}) OR 
               contact_number LIKE $${params.length + 1})`;
      params.push(`%${search}%`);
    }
    
    if (studentType) {
      query += ` AND student_type = $${params.length + 1}`;
      params.push(studentType);
    }
    
    query += ' ORDER BY last_name, given_name';
    
    const result = await pool.query(query, params);
    return res.status(200).json(result.rows);
  }
}

async function handlePost(req, res) {
  const {
    studentType,
    schoolYear,
    gradeLevel,
    lastName,
    givenName,
    middleName,
    suffix,
    gender,
    citizenship,
    age,
    address,
    birthMonth,
    birthDay,
    birthYear,
    birthPlace,
    contactNumber,
    religion,
    fatherName,
    fatherOccupation,
    fatherStatus,
    fatherEducation,
    motherName,
    motherOccupation,
    motherStatus,
    motherEducation,
    parentsMaritalStatus,
    residenceType,
    languagesSpoken,
    familyIncome,
    financialSupport,
    otherFinancialSupport,
    leisureActivities,
    otherLeisureActivities,
    specialInterests,
    livingWithParents,
    guardianName,
    guardianRelation,
    otherGuardianRelation,
    guardianAddress,
    siblings,
    educationBackground,
    organizations,
    healthProblem,
    healthProblemDetails,
    generalCondition,
    underMedication,
    medicationDetails,
    specialCare,
    specialCareDetails,
    lastDoctorVisit,
    doctorVisitReason,
    testResults,
    signatureDate,
    parentSignatureDate,
    studentPhotoUrl
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO basic_ed_students (
        student_type, school_year, grade_level, last_name, given_name, middle_name, suffix,
        gender, citizenship, age, address, birth_month, birth_day, birth_year, birth_place,
        contact_number, religion, father_name, father_occupation, father_status, father_education,
        mother_name, mother_occupation, mother_status, mother_education, parents_marital_status,
        residence_type, languages_spoken, family_income, financial_support, other_financial_support,
        leisure_activities, other_leisure_activities, special_interests, living_with_parents,
        guardian_name, guardian_relation, other_guardian_relation, guardian_address, siblings,
        education_background, organizations, health_problem, health_problem_details, general_condition,
        under_medication, medication_details, special_care, special_care_details, last_doctor_visit,
        doctor_visit_reason, test_results, signature_date, parent_signature_date, student_photo_url
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38,
        $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55
      ) RETURNING *`,
      [
        studentType,
        schoolYear,
        gradeLevel,
        lastName,
        givenName,
        middleName,
        suffix,
        gender,
        citizenship,
        age,
        address,
        birthMonth,
        birthDay,
        birthYear,
        birthPlace,
        contactNumber,
        religion,
        fatherName,
        fatherOccupation,
        fatherStatus,
        fatherEducation,
        motherName,
        motherOccupation,
        motherStatus,
        motherEducation,
        parentsMaritalStatus,
        residenceType,
        languagesSpoken,
        familyIncome,
        financialSupport,
        otherFinancialSupport,
        leisureActivities,
        otherLeisureActivities,
        specialInterests,
        livingWithParents,
        guardianName,
        guardianRelation,
        otherGuardianRelation,
        guardianAddress,
        siblings,
        educationBackground,
        organizations,
        healthProblem,
        healthProblemDetails,
        generalCondition,
        underMedication,
        medicationDetails,
        specialCare,
        specialCareDetails,
        lastDoctorVisit,
        doctorVisitReason,
        testResults,
        signatureDate,
        parentSignatureDate,
        studentPhotoUrl
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating student:', error);
    return res.status(400).json({ error: 'Failed to create student' });
  }
}

async function handlePut(req, res) {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'Student ID is required' });
  }

  const {
    studentType,
    schoolYear,
    gradeLevel,
    lastName,
    givenName,
    middleName,
    suffix,
    gender,
    citizenship,
    age,
    address,
    birthMonth,
    birthDay,
    birthYear,
    birthPlace,
    contactNumber,
    religion,
    fatherName,
    fatherOccupation,
    fatherStatus,
    fatherEducation,
    motherName,
    motherOccupation,
    motherStatus,
    motherEducation,
    parentsMaritalStatus,
    residenceType,
    languagesSpoken,
    familyIncome,
    financialSupport,
    otherFinancialSupport,
    leisureActivities,
    otherLeisureActivities,
    specialInterests,
    livingWithParents,
    guardianName,
    guardianRelation,
    otherGuardianRelation,
    guardianAddress,
    siblings,
    educationBackground,
    organizations,
    healthProblem,
    healthProblemDetails,
    generalCondition,
    underMedication,
    medicationDetails,
    specialCare,
    specialCareDetails,
    lastDoctorVisit,
    doctorVisitReason,
    testResults,
    signatureDate,
    parentSignatureDate,
    studentPhotoUrl
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE basic_ed_students SET
        student_type = $1,
        school_year = $2,
        grade_level = $3,
        last_name = $4,
        given_name = $5,
        middle_name = $6,
        suffix = $7,
        gender = $8,
        citizenship = $9,
        age = $10,
        address = $11,
        birth_month = $12,
        birth_day = $13,
        birth_year = $14,
        birth_place = $15,
        contact_number = $16,
        religion = $17,
        father_name = $18,
        father_occupation = $19,
        father_status = $20,
        father_education = $21,
        mother_name = $22,
        mother_occupation = $23,
        mother_status = $24,
        mother_education = $25,
        parents_marital_status = $26,
        residence_type = $27,
        languages_spoken = $28,
        family_income = $29,
        financial_support = $30,
        other_financial_support = $31,
        leisure_activities = $32,
        other_leisure_activities = $33,
        special_interests = $34,
        living_with_parents = $35,
        guardian_name = $36,
        guardian_relation = $37,
        other_guardian_relation = $38,
        guardian_address = $39,
        siblings = $40,
        education_background = $41,
        organizations = $42,
        health_problem = $43,
        health_problem_details = $44,
        general_condition = $45,
        under_medication = $46,
        medication_details = $47,
        special_care = $48,
        special_care_details = $49,
        last_doctor_visit = $50,
        doctor_visit_reason = $51,
        test_results = $52,
        signature_date = $53,
        parent_signature_date = $54,
        student_photo_url = $55,
        updated_at = NOW()
      WHERE student_id = $56
      RETURNING *`,
      [
        studentType,
        schoolYear,
        gradeLevel,
        lastName,
        givenName,
        middleName,
        suffix,
        gender,
        citizenship,
        age,
        address,
        birthMonth,
        birthDay,
        birthYear,
        birthPlace,
        contactNumber,
        religion,
        fatherName,
        fatherOccupation,
        fatherStatus,
        fatherEducation,
        motherName,
        motherOccupation,
        motherStatus,
        motherEducation,
        parentsMaritalStatus,
        residenceType,
        languagesSpoken,
        familyIncome,
        financialSupport,
        otherFinancialSupport,
        leisureActivities,
        otherLeisureActivities,
        specialInterests,
        livingWithParents,
        guardianName,
        guardianRelation,
        otherGuardianRelation,
        guardianAddress,
        siblings,
        educationBackground,
        organizations,
        healthProblem,
        healthProblemDetails,
        generalCondition,
        underMedication,
        medicationDetails,
        specialCare,
        specialCareDetails,
        lastDoctorVisit,
        doctorVisitReason,
        testResults,
        signatureDate,
        parentSignatureDate,
        studentPhotoUrl,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating student:', error);
    return res.status(400).json({ error: 'Failed to update student' });
  }
}