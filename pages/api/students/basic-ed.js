// api/students/basic-ed.js
import pool from '@/lib/db';

export default async function handler(req, res) {
  const { method, query, body } = req;

  switch (method) {
    case 'GET':
      try {
        const { userId, studentId } = query;

        if (studentId) {
          // Fetch single student with all related data
          const [studentResult, sacramentsResult, parentsResult, siblingsResult, 
                 siblingBreakdownResult, otherRelativesResult, financialSupportResult,
                 leisureActivitiesResult, educationResult, organizationsResult,
                 testResultsResult] = await Promise.all([
            pool.query(`SELECT * FROM basic_ed_students WHERE id = $1 AND user_id = $2`, [studentId, userId]),
            pool.query(`SELECT sacrament_type, received, date, church FROM basic_ed_student_sacraments WHERE student_id = $1`, [studentId]),
            pool.query(`SELECT parent_type, last_name, first_name, middle_name, occupation, location, employment_type, status, education, specialization 
                       FROM basic_ed_student_parents WHERE student_id = $1`, [studentId]),
            pool.query(`SELECT name, age, school, status, occupation FROM basic_ed_student_siblings WHERE student_id = $1`, [studentId]),
            pool.query(`SELECT brothers, sisters, step_brothers, step_sisters, adopted 
                       FROM basic_ed_student_sibling_breakdown WHERE student_id = $1`, [studentId]),
            pool.query(`SELECT relative_type FROM basic_ed_student_other_relatives WHERE student_id = $1`, [studentId]),
            pool.query(`SELECT support_type FROM basic_ed_student_financial_support WHERE student_id = $1`, [studentId]),
            pool.query(`SELECT activity FROM basic_ed_student_leisure_activities WHERE student_id = $1`, [studentId]),
            pool.query(`SELECT level, school, awards, year FROM basic_ed_student_education WHERE student_id = $1`, [studentId]),
            pool.query(`SELECT year, organization, designation FROM basic_ed_student_organizations WHERE student_id = $1`, [studentId]),
            pool.query(`SELECT test, date, rating FROM basic_ed_student_test_results WHERE student_id = $1`, [studentId])
          ]);

          if (studentResult.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
          }

          const student = studentResult.rows[0];
          
          // Structure response data
          const response = {
            ...student,
            baptism: { received: false, date: '', church: '' },
            firstCommunion: { received: false, date: '', church: '' },
            confirmation: { received: false, date: '', church: '' },
            father: { lastName: '', firstName: '', middleName: '', occupation: '', location: '', employmentType: '', status: '', education: '', specialization: '' },
            mother: { lastName: '', firstName: '', middleName: '', occupation: '', location: '', employmentType: '', status: '', education: '', specialization: '' },
            siblingDetails: siblingBreakdownResult.rows[0] || { brothers: '', sisters: '', stepBrothers: '', stepSisters: '', adopted: '' },
            otherRelativesAtHome: otherRelativesResult.rows.map(r => r.relative_type),
            financialSupport: financialSupportResult.rows.map(r => r.support_type),
            leisureActivities: leisureActivitiesResult.rows.map(r => r.activity),
            siblings: siblingsResult.rows.map(s => ({
              name: s.name || '',
              age: s.age || '',
              school: s.school || '',
              status: s.status || '',
              occupation: s.occupation || ''
            })),
            preschool: { school: '', awards: '', year: '' },
            elementary: { school: '', awards: '', year: '' },
            highSchool: { school: '', awards: '', year: '' },
            organizations: organizationsResult.rows.map(o => ({
              year: o.year || '',
              organization: o.organization || '',
              designation: o.designation || ''
            })),
            testResults: testResultsResult.rows.map(t => ({
              test: t.test || '',
              date: t.date || '',
              rating: t.rating || ''
            }))
          };

          // Populate sacraments
          sacramentsResult.rows.forEach(row => {
            response[row.sacrament_type] = {
              received: row.received,
              date: row.date || '',
              church: row.church || ''
            };
          });

          // Populate parents
          parentsResult.rows.forEach(row => {
            response[row.parent_type] = {
              lastName: row.last_name || '',
              firstName: row.first_name || '',
              middleName: row.middle_name || '',
              occupation: row.occupation || '',
              location: row.location || '',
              employmentType: row.employment_type || '',
              status: row.status || '',
              education: row.education || '',
              specialization: row.specialization || ''
            };
          });

          // Populate education
          educationResult.rows.forEach(row => {
            response[row.level] = {
              school: row.school || '',
              awards: row.awards || '',
              year: row.year || ''
            };
          });

          return res.status(200).json(response);
        } else {
          // Fetch all students for user
          const result = await pool.query(
            `SELECT * FROM basic_ed_students WHERE user_id = $1 ORDER BY created_at DESC`,
            [userId]
          );
          return res.status(200).json(result.rows);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

    case 'POST':
      const client = await pool.connect();
      try {
        await client.query('BEGIN');

        // Destructure with defaults
        const {
          schoolYear, gradeYearLevel, studentType, lastName, firstName, middleName = null, suffix = null,
          gender, citizenship, contactNumber, address, birthDate, birthPlace = null, religion = null,
          baptism = {}, firstCommunion = {}, confirmation = {},
          emergencyContact = null, emergencyRelation = null, emergencyNumber = null,
          father = {}, mother = {},
          parentsMaritalStatus = null, childResidence = null, childResidenceOther = null,
          birthOrder = null, otherBirthOrder = null, siblingsCount = null,
          siblingDetails = {}, otherRelativesAtHome = [], familyMonthlyIncome = null,
          residenceType = null, languagesSpokenAtHome = null, financialSupport = [],
          leisureActivities = [], specialTalents = null, guardianName = null,
          guardianRelationship = null, otherGuardianRelationship = null, guardianAddress = null,
          siblings = [], preschool = {}, elementary = {}, highSchool = {},
          organizations = [], height = null, weight = null, physicalCondition = null,
          healthProblem = null, healthProblemDetails = null, lastDoctorVisit = null,
          lastDoctorVisitReason = null, generalCondition = null,
          signatureName, signatureDate, parentSignatureName = null, parentSignatureDate = null,
          studentPhotoUrl = null
        } = body;

        const userId = query.userId;

        // Validate required fields
        const requiredFields = {
          userId, schoolYear, gradeYearLevel, studentType, lastName, firstName,
          address, birthDate, signatureName, signatureDate
        };
        
        const missingFields = Object.entries(requiredFields)
          .filter(([_, value]) => !value)
          .map(([field]) => field);

        if (missingFields.length > 0) {
          return res.status(400).json({
            error: 'Missing required fields',
            missingFields
          });
        }

        // Prepare values for main student table
        const values = [
          userId,
          schoolYear,
          gradeYearLevel,
          studentType,
          lastName,
          firstName,
          middleName,
          suffix,
          gender,
          citizenship,
          contactNumber,
          address,
          new Date(birthDate).toISOString(),
          birthPlace,
          religion,
          emergencyContact,
          emergencyRelation,
          emergencyNumber,
          parentsMaritalStatus,
          childResidence,
          childResidenceOther,
          birthOrder,
          otherBirthOrder,
          siblingsCount ? parseInt(siblingsCount) : null,
          familyMonthlyIncome,
          residenceType,
          languagesSpokenAtHome,
          specialTalents,
          guardianName,
          guardianRelationship,
          otherGuardianRelationship,
          guardianAddress,
          height,
          weight,
          physicalCondition,
          healthProblem,
          healthProblemDetails,
          lastDoctorVisit ? new Date(lastDoctorVisit).toISOString() : null,
          lastDoctorVisitReason,
          generalCondition,
          signatureName,
          new Date(signatureDate).toISOString(),
          parentSignatureName,
          parentSignatureDate ? new Date(parentSignatureDate).toISOString() : null,
          studentPhotoUrl
        ];

        // Insert student
const studentResult = await client.query(
  `INSERT INTO basic_ed_students (
    user_id, school_year, grade_year_level, student_type, last_name, first_name, middle_name, suffix, gender,
    citizenship, contact_number, address, birth_date, birth_place, religion, emergency_contact,
    emergency_relation, emergency_number, parents_marital_status, child_residence, child_residence_other,
    birth_order, other_birth_order, siblings_count, family_monthly_income, residence_type,
    languages_spoken_at_home, special_talents, guardian_name, guardian_relationship, other_guardian_relationship,
    guardian_address, height, weight, physical_condition, health_problem, health_problem_details,
    last_doctor_visit, last_doctor_visit_reason, general_condition, signature_name, signature_date,
    parent_signature_name, parent_signature_date, student_photo_url
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
    $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38,
    $39, $40, $41, $42, $43, $44
  )
  RETURNING id`,
  values
);

        const studentId = studentResult.rows[0].id;

        // Insert related data
        await Promise.all([
          // Sacraments
          client.query(
            `INSERT INTO basic_ed_student_sacraments (student_id, sacrament_type, received, date, church)
             VALUES ($1, 'baptism', $2, $3, $4)`,
            [studentId, baptism.received || false, baptism.date || null, baptism.church || null]
          ),
          client.query(
            `INSERT INTO basic_ed_student_sacraments (student_id, sacrament_type, received, date, church)
             VALUES ($1, 'firstCommunion', $2, $3, $4)`,
            [studentId, firstCommunion.received || false, firstCommunion.date || null, firstCommunion.church || null]
          ),
          client.query(
            `INSERT INTO basic_ed_student_sacraments (student_id, sacrament_type, received, date, church)
             VALUES ($1, 'confirmation', $2, $3, $4)`,
            [studentId, confirmation.received || false, confirmation.date || null, confirmation.church || null]
          ),

          // Parents
          client.query(
            `INSERT INTO basic_ed_student_parents (
              student_id, parent_type, last_name, first_name, middle_name, occupation, location, 
              employment_type, status, education, specialization
            ) VALUES ($1, 'father', $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [
              studentId,
              father.lastName || null,
              father.firstName || null,
              father.middleName || null,
              father.occupation || null,
              father.location || null,
              father.employmentType || null,
              father.status || null,
              father.education || null,
              father.specialization || null
            ]
          ),
          client.query(
            `INSERT INTO basic_ed_student_parents (
              student_id, parent_type, last_name, first_name, middle_name, occupation, location, 
              employment_type, status, education, specialization
            ) VALUES ($1, 'mother', $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [
              studentId,
              mother.lastName || null,
              mother.firstName || null,
              mother.middleName || null,
              mother.occupation || null,
              mother.location || null,
              mother.employmentType || null,
              mother.status || null,
              mother.education || null,
              mother.specialization || null
            ]
          ),

          // Sibling breakdown
          client.query(
            `INSERT INTO basic_ed_student_sibling_breakdown (student_id, brothers, sisters, step_brothers, step_sisters, adopted)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              studentId,
              siblingDetails.brothers || 0,
              siblingDetails.sisters || 0,
              siblingDetails.stepBrothers || 0,
              siblingDetails.stepSisters || 0,
              siblingDetails.adopted || 0
            ]
          ),

          // Education
          client.query(
            `INSERT INTO basic_ed_student_education (student_id, level, school, awards, year)
             VALUES ($1, 'preschool', $2, $3, $4)`,
            [studentId, preschool.school || null, preschool.awards || null, preschool.year || null]
          ),
          client.query(
            `INSERT INTO basic_ed_student_education (student_id, level, school, awards, year)
             VALUES ($1, 'elementary', $2, $3, $4)`,
            [studentId, elementary.school || null, elementary.awards || null, elementary.year || null]
          ),
          client.query(
            `INSERT INTO basic_ed_student_education (student_id, level, school, awards, year)
             VALUES ($1, 'highSchool', $2, $3, $4)`,
            [studentId, highSchool.school || null, highSchool.awards || null, highSchool.year || null]
          )
        ]);

        // Insert array-based relationships
        await Promise.all([
          // Siblings
          ...siblings.map(sibling => 
            sibling.name ? client.query(
              `INSERT INTO basic_ed_student_siblings (student_id, name, age, school, status, occupation)
               VALUES ($1, $2, $3, $4, $5, $6)`,
              [
                studentId,
                sibling.name,
                sibling.age || null,
                sibling.school || null,
                sibling.status || null,
                sibling.occupation || null
              ]
            ) : Promise.resolve()
          ),

          // Other relatives
          ...otherRelativesAtHome.map(relative => 
            relative ? client.query(
              `INSERT INTO basic_ed_student_other_relatives (student_id, relative_type)
               VALUES ($1, $2)`,
              [studentId, relative]
            ) : Promise.resolve()
          ),

          // Financial support
          ...financialSupport.map(support => 
            support ? client.query(
              `INSERT INTO basic_ed_student_financial_support (student_id, support_type)
               VALUES ($1, $2)`,
              [studentId, support]
            ) : Promise.resolve()
          ),

          // Leisure activities
          ...leisureActivities.map(activity => 
            activity ? client.query(
              `INSERT INTO basic_ed_student_leisure_activities (student_id, activity)
               VALUES ($1, $2)`,
              [studentId, activity]
            ) : Promise.resolve()
          ),

          // Organizations
          ...organizations.map(org => 
            org.organization ? client.query(
              `INSERT INTO basic_ed_student_organizations (student_id, year, organization, designation)
               VALUES ($1, $2, $3, $4)`,
              [
                studentId,
                org.year || null,
                org.organization,
                org.designation || null
              ]
            ) : Promise.resolve()
          ),

          // Test results
          ...testResults.map(test => 
            test.test ? client.query(
              `INSERT INTO basic_ed_student_test_results (student_id, test, date, rating)
               VALUES ($1, $2, $3, $4)`,
              [
                studentId,
                test.test,
                test.date || null,
                test.rating || null
              ]
            ) : Promise.resolve()
          )
        ]);

        await client.query('COMMIT');
        return res.status(201).json({ id: studentId, message: 'Student created successfully' });
      } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating student:', error);
        return res.status(500).json({ 
          error: 'Internal server error',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      } finally {
        client.release();
      }

    case 'PUT':
      // [Implement PUT handler similarly with proper transaction handling]
      return res.status(501).json({ error: 'Not implemented yet' });

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}