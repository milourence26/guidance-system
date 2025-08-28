import pool from '@/lib/db';

function normalizeEmptyToNull(obj) {
  if (!obj) return obj;
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === "" || value === undefined) {
      result[key] = null;
    } else {
      result[key] = value;
    }
  }
  return result;
}

export default async function handler(req, res) {
  const client = await pool.connect();

  try {
    if (req.method === 'POST') {
      // Handle POST request - Create new student data
      const normalizedBody = normalizeEmptyToNull(req.body);
      const {
        educationLevel,
        schoolYear,
        semester,
        gradeLevel,
        strand,
        course,
        yearLevel,
        firstName,
        lastName,
        middleName,
        nickname,
        sex,
        civil_status,
        nationality,
        contact_number,
        email,
        address,
        city_address,
        birth_date,
        birth_place,
        age,
        religion,
        emergency_contact,
        emergency_relation,
        emergency_number,
        signature_name,
        signature_date,
        parent_signature_name,
        parent_signature_date,
        student_photo_url,
        residence_type,
        residence_owner,
        languages_spoken_at_home,
        special_talents,
        living_with_parents,
        studentType,
        parentsMaritalStatus,
        child_residing_with,
        child_residence_other,
        birth_order,
        siblings_count,
        brothers_count,
        sisters_count,
        step_brothers_count,
        step_sisters_count,
        adopted_count,
        family_monthly_income,
        financial_support,
        relatives_at_home,
        other_relatives,
        total_relatives,
        father,
        mother,
        baptism,
        firstCommunion,
        confirmation,
        leisureActivities,
        otherLeisureActivity,
        guardianName,
        guardianRelationship,
        guardianAddress,
        siblings,
        preschool,
        elementary,
        highSchool,
        seniorHigh,
        organizations,
        height,
        weight,
        physicalCondition,
        health_problem,
        health_problem_details,
        last_doctor_visit,
        last_doctor_visit_reason,
        general_condition,
        testResults
      } = normalizedBody;  

      // Get user ID from the request
      const userId = req.headers['user-id'] || req.body.userId;
      
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      await client.query('BEGIN');

      // 1. Insert into pds_students table
      const studentQuery = `
        INSERT INTO pds_students (
          user_id, education_level, school_year, semester, grade_level, strand, course,
          year_level, student_type, first_name, last_name, middle_name, nickname, sex, civil_status,
          nationality, contact_number, email, address, city_address, birth_date, birth_place,
          age, religion, emergency_contact, emergency_relation, emergency_number,
          signature_name, signature_date, parent_signature_name, parent_signature_date,
          student_photo_url, residence_type, residence_owner, languages_spoken_at_home,
          special_talents, living_with_parents
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37)
        RETURNING id
      `;

      const studentValues = [
        userId, educationLevel, schoolYear, semester, gradeLevel, strand, course,
        yearLevel, studentType, firstName, lastName, middleName, nickname, sex, civil_status,
        nationality, contact_number, email, address, city_address, birth_date, birth_place,
        age, religion, emergency_contact, emergency_relation, emergency_number,
        signature_name, signature_date, parent_signature_name, parent_signature_date,
        student_photo_url, residence_type, residence_owner, languages_spoken_at_home,
        special_talents, living_with_parents
      ];

      const studentResult = await client.query(studentQuery, studentValues);
      const studentId = studentResult.rows[0].id;

      // 2. Insert family information
      if (parentsMaritalStatus || birth_order || siblings_count) {
        const familyQuery = `
          INSERT INTO family_info (
            student_id, parents_marital_status, child_residing_with, child_residence_other,
            birth_order, siblings_count, brothers_count, sisters_count, step_brothers_count,
            step_sisters_count, adopted_count, family_monthly_income, relatives_at_home,
            other_relatives, total_relatives, financial_support
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        `;

        const familyValues = [
          studentId, parentsMaritalStatus, child_residing_with, child_residence_other,
          birth_order, siblings_count, brothers_count, sisters_count, step_brothers_count,
          step_sisters_count, adopted_count, family_monthly_income, 
          Array.isArray(relatives_at_home) ? relatives_at_home.join(',') : relatives_at_home,
          other_relatives, total_relatives, financial_support
        ];

        await client.query(familyQuery, familyValues);
      }

      // 3. Insert parent information
      if (father && (father.first_name || father.last_name)) {
        const fatherQuery = `
          INSERT INTO parents (
            student_id, parent_type, last_name, first_name, middle_name, occupation,
            location, employment_type, status, highest_educational_attainment,
            specialization, post_graduate_studies
          ) VALUES ($1, 'father', $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;

        const fatherValues = [
          studentId, father.last_name, father.first_name, father.middle_name, father.occupation,
          father.location, father.employment_type, father.status, father.highest_educational_attainment,
          father.specialization, father.post_graduate_studies
        ];

        await client.query(fatherQuery, fatherValues);
      }

      if (mother && (mother.first_name || mother.last_name)) {
        const motherQuery = `
          INSERT INTO parents (
            student_id, parent_type, last_name, first_name, middle_name, occupation,
            location, employment_type, status, highest_educational_attainment,
            specialization, post_graduate_studies
          ) VALUES ($1, 'mother', $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;

        const motherValues = [
          studentId, mother.last_name, mother.first_name, mother.middle_name, mother.occupation,
          mother.location, mother.employment_type, mother.status, mother.highest_educational_attainment,
          mother.specialization, mother.post_graduate_studies
        ];

        await client.query(motherQuery, motherValues);
      }

      // 4. Insert sacraments
      const sacramentRecords = [baptism, firstCommunion, confirmation];
      for (const sacrament of sacramentRecords) {
        if (sacrament && (sacrament.received || sacrament.date || sacrament.church)) {
          const sacramentQuery = `
            INSERT INTO sacraments (student_id, sacrament_type, received, date, church)
            VALUES ($1, $2, $3, $4, $5)
          `;
          
          await client.query(sacramentQuery, [
            studentId, 
            sacrament.sacrament_type, 
            sacrament.received, 
            sacrament.date, 
            sacrament.church
          ]);
        }
      }

      // 5. Insert leisure activities
      if (leisureActivities) {
        const leisureQuery = `
          INSERT INTO leisure_activities (student_id, activities, other_activity)
          VALUES ($1, $2, $3)
        `;
        
        await client.query(leisureQuery, [
          studentId, 
          Array.isArray(leisureActivities) ? leisureActivities.join(',') : leisureActivities,
          otherLeisureActivity
        ]);
      }

      // 6. Insert guardian information if not living with parents
      if (!living_with_parents && guardianName) {
        const guardianQuery = `
          INSERT INTO if_not_with_parents (student_id, guardian_name, relationship, address)
          VALUES ($1, $2, $3, $4)
        `;
        
        await client.query(guardianQuery, [
          studentId, guardianName, guardianRelationship, guardianAddress
        ]);
      }

      // 7. Insert siblings
      if (siblings && siblings.length > 0) {
        for (const sibling of siblings) {
          if (sibling.name) {
            const siblingQuery = `
              INSERT INTO siblings (student_id, name, age, school, status, occupation)
              VALUES ($1, $2, $3, $4, $5, $6)
            `;
            
            await client.query(siblingQuery, [
              studentId, sibling.name, sibling.age, sibling.school, sibling.status, sibling.occupation
            ]);
          }
        }
      }

      // 8. Insert educational background
      const educationLevels = [
        { level: 'Preschool', data: preschool },
        { level: 'Grade School', data: elementary },
        { level: 'High School', data: highSchool },
        { level: 'Senior High School', data: seniorHigh }
      ];

      for (const edu of educationLevels) {
        if (edu.data && (edu.data.school_attended_or_address || edu.data.awards_or_honors_received || edu.data.school_year_attended)) {
          const eduQuery = `
            INSERT INTO educational_background (student_id, level, school_attended_or_address, awards_or_honors_received, school_year_attended)
            VALUES ($1, $2, $3, $4, $5)
          `;
          
          await client.query(eduQuery, [
            studentId, 
            edu.level, 
            edu.data.school_attended_or_address, 
            edu.data.awards_or_honors_received, 
            edu.data.school_year_attended
          ]);
        }
      }

      // 9. Insert organizations
      if (organizations && organizations.length > 0) {
        for (const org of organizations) {
          if (org.organization_club || org.designation) {
            const orgQuery = `
              INSERT INTO organizations (student_id, school_year, organization_club, designation)
              VALUES ($1, $2, $3, $4)
            `;
            
            await client.query(orgQuery, [
              studentId, org.school_year, org.organization_club, org.designation
            ]);
          }
        }
      }

      // 10. Insert health information
      if (height || weight || physicalCondition || health_problem) {
        const healthQuery = `
          INSERT INTO health_info (
            student_id, height, weight, physical_condition, health_problem,
            health_problem_details, last_doctor_visit, last_doctor_visit_reason, general_condition
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;
        
        await client.query(healthQuery, [
          studentId, height, weight, physicalCondition, health_problem,
          health_problem_details, last_doctor_visit, last_doctor_visit_reason, general_condition
        ]);
      }

      // 11. Insert test results
      if (testResults && testResults.length > 0) {
        for (const test of testResults) {
          if (test.test_name || test.rating) {
            const testQuery = `
              INSERT INTO test_results (student_id, test_name, date_taken, rating)
              VALUES ($1, $2, $3, $4)
            `;
            
            await client.query(testQuery, [
              studentId, test.test_name, test.date_taken, test.rating
            ]);
          }
        }
      }

      await client.query('COMMIT');
      
      res.status(201).json({ 
        message: 'Student PDS created successfully', 
        studentId: studentId 
      });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error in student API:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  } finally {
    client.release();
  }
}