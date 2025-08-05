// pages/api/students.js
import pool from '@/lib/db';

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        return handleGet(req, res);
      case 'POST':
        return handlePost(req, res);
      case 'PUT':
        return handlePut(req, res);
      case 'DELETE':
        return handleDelete(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}

async function handleGet(req, res) {
  const result = await pool.query(
    'SELECT * FROM basic_education_students ORDER BY created_at DESC'
  );
  return res.status(200).json(result.rows);
}

async function handlePost(req, res) {
  const {
    schoolYear, gradeLevel, studentType, status,
    lastName, givenName, middleName, suffix, gender, citizenship,
    address, contactNumber, birthDate, birthPlace, religion, age,
    sacraments, familyInfo, residenceInfo, educationBackground,
    organizations, healthInfo, testResults, signatureDate,
    parentSignatureDate, studentPhotoUrl
  } = req.body;

  const result = await pool.query(
    `INSERT INTO basic_education_students (
      school_year, grade_level, student_type, status,
      last_name, given_name, middle_name, suffix, gender, citizenship,
      address, contact_number, birth_date, birth_place, religion, age,
      sacraments, family_info, residence_info, education_background,
      organizations, health_info, test_results, signature_date,
      parent_signature_date, student_photo_url
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
    RETURNING *`,
    [
      schoolYear, gradeLevel, studentType, status,
      lastName, givenName, middleName, suffix, gender, citizenship,
      address, contactNumber, birthDate, birthPlace, religion, age,
      JSON.stringify(sacraments),
      JSON.stringify(familyInfo),
      JSON.stringify(residenceInfo),
      JSON.stringify(educationBackground),
      JSON.stringify(organizations),
      JSON.stringify(healthInfo),
      JSON.stringify(testResults),
      signatureDate,
      parentSignatureDate,
      studentPhotoUrl
    ]
  );
  return res.status(201).json(result.rows[0]);
}

async function handlePut(req, res) {
  const { id, ...updates } = req.body;
  
  const setParts = [];
  const values = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(updates)) {
    setParts.push(`${key} = $${paramIndex}`);
    values.push(
      ['sacraments', 'familyInfo', 'residenceInfo', 'educationBackground', 'organizations', 'healthInfo', 'testResults'].includes(key)
        ? JSON.stringify(value)
        : value
    );
    paramIndex++;
  }

  values.push(id);

  const result = await pool.query(
    `UPDATE basic_education_students 
     SET ${setParts.join(', ')} 
     WHERE id = $${paramIndex}
     RETURNING *`,
    values
  );
  return res.status(200).json(result.rows[0]);
}

async function handleDelete(req, res) {
  const { id } = req.body;
  await pool.query(
    'DELETE FROM basic_education_students WHERE id = $1',
    [id]
  );
  return res.status(200).json({ message: 'Student deleted successfully' });
}