import pool from '@/lib/db';

export default async function handler(req, res) {
  const { level } = req.query;

  if (!level) {
    return res.status(400).json({ error: 'Education level is required' });
  }

  const query = `
    SELECT 
      ps.id, ps.user_id, ps.school_year, ps.semester, ps.course, ps.year_level, 
      ps.grade_level, ps.strand, ps.student_type, ps.last_name, ps.first_name, 
      ps.middle_name, ps.nickname, ps.civil_status, ps.email, ps.sex, 
      ps.nationality, ps.contact_number, ps.address, ps.city_address, 
      ps.birth_date, ps.birth_place, ps.age, ps.religion, ps.emergency_contact, 
      ps.emergency_relation, ps.emergency_number, ps.signature_name, 
      ps.signature_date, ps.parent_signature_name, ps.parent_signature_date,
      jsonb_build_object(
        'family_info', COALESCE((
          SELECT jsonb_agg(
            jsonb_build_object(
              'id', fi.id,
              'parents_marital_status', fi.parents_marital_status,
              'child_residing_with', fi.child_residing_with,
              'child_residence_other', fi.child_residence_other,
              'birth_order', fi.birth_order,
              'siblings_count', fi.siblings_count,
              'brothers_count', fi.brothers_count,
              'sisters_count', fi.sisters_count,
              'step_brothers_count', fi.step_brothers_count,
              'step_sisters_count', fi.step_sisters_count,
              'adopted_count', fi.adopted_count,
              'family_monthly_income', fi.family_monthly_income,
              'relatives_at_home', fi.relatives_at_home,
              'other_relatives', fi.other_relatives,
              'total_relatives', fi.total_relatives,
              'financial_support', fi.financial_support
            )
          )
          FROM family_info fi WHERE fi.student_id = ps.id
        ), '[]'),
        'father', COALESCE((
          SELECT jsonb_build_object(
            'id', p.id,
            'parent_type', p.parent_type,
            'last_name', p.last_name,
            'first_name', p.first_name,
            'middle_name', p.middle_name,
            'occupation', p.occupation,
            'location', p.location,
            'employment_type', p.employment_type,
            'status', p.status,
            'highest_educational_attainment', p.highest_educational_attainment,
            'specialization', p.specialization,
            'post_graduate_studies', p.post_graduate_studies
          )
          FROM parents p WHERE p.student_id = ps.id AND LOWER(p.parent_type) = 'father'
          LIMIT 1
        ), '{}'),
        'mother', COALESCE((
          SELECT jsonb_build_object(
            'id', p.id,
            'parent_type', p.parent_type,
            'last_name', p.last_name,
            'first_name', p.first_name,
            'middle_name', p.middle_name,
            'occupation', p.occupation,
            'location', p.location,
            'employment_type', p.employment_type,
            'status', p.status,
            'highest_educational_attainment', p.highest_educational_attainment,
            'specialization', p.specialization,
            'post_graduate_studies', p.post_graduate_studies
          )
          FROM parents p WHERE p.student_id = ps.id AND LOWER(p.parent_type) = 'mother'
          LIMIT 1
        ), '{}'),
        'baptism', COALESCE((
          SELECT jsonb_build_object(
            'id', s.id,
            'sacrament_type', s.sacrament_type,
            'received', s.received,
            'date', s.date,
            'church', s.church
          )
          FROM sacraments s WHERE s.student_id = ps.id AND LOWER(s.sacrament_type) = 'baptism'
          LIMIT 1
        ), '{}'),
        'firstCommunion', COALESCE((
          SELECT jsonb_build_object(
            'id', s.id,
            'sacrament_type', s.sacrament_type,
            'received', s.received,
            'date', s.date,
            'church', s.church
          )
          FROM sacraments s WHERE s.student_id = ps.id AND LOWER(s.sacrament_type) = 'first communion'
          LIMIT 1
        ), '{}'),
        'confirmation', COALESCE((
          SELECT jsonb_build_object(
            'id', s.id,
            'sacrament_type', s.sacrament_type,
            'received', s.received,
            'date', s.date,
            'church', s.church
          )
          FROM sacraments s WHERE s.student_id = ps.id AND LOWER(s.sacrament_type) = 'confirmation'
          LIMIT 1
        ), '{}'),
        'leisure_activities', COALESCE((
          SELECT jsonb_agg(
            jsonb_build_object(
              'id', la.id,
              'activities', la.activities,
              'other_activity', la.other_activity
            )
          )
          FROM leisure_activities la WHERE la.student_id = ps.id
        ), '[]'),
        'guardian', COALESCE((
          SELECT jsonb_agg(
            jsonb_build_object(
              'id', g.id,
              'guardian_name', g.guardian_name,
              'relationship', g.relationship,
              'address', g.address
            )
          )
          FROM if_not_with_parents g WHERE g.student_id = ps.id
        ), '[]'),
        'siblings', COALESCE((
          SELECT jsonb_agg(
            jsonb_build_object(
              'id', s.id,
              'name', s.name,
              'age', s.age,
              'school', s.school,
              'status', s.status,
              'occupation', s.occupation
            )
          )
          FROM siblings s WHERE s.student_id = ps.id
        ), '[]'),
        'preschool', COALESCE((
          SELECT jsonb_build_object(
            'id', eb.id,
            'level', eb.level,
            'school_attended_or_address', eb.school_attended_or_address,
            'awards_or_honors_received', eb.awards_or_honors_received,
            'school_year_attended', eb.school_year_attended
          )
          FROM educational_background eb WHERE eb.student_id = ps.id AND LOWER(eb.level) = 'preschool'
          LIMIT 1
        ), '{}'),
        'elementary', COALESCE((
          SELECT jsonb_build_object(
            'id', eb.id,
            'level', eb.level,
            'school_attended_or_address', eb.school_attended_or_address,
            'awards_or_honors_received', eb.awards_or_honors_received,
            'school_year_attended', eb.school_year_attended
          )
          FROM educational_background eb WHERE eb.student_id = ps.id AND LOWER(eb.level) = 'grade school'
          LIMIT 1
        ), '{}'),
        'highSchool', COALESCE((
          SELECT jsonb_build_object(
            'id', eb.id,
            'level', eb.level,
            'school_attended_or_address', eb.school_attended_or_address,
            'awards_or_honors_received', eb.awards_or_honors_received,
            'school_year_attended', eb.school_year_attended
          )
          FROM educational_background eb WHERE eb.student_id = ps.id AND LOWER(eb.level) = 'high school'
          LIMIT 1
        ), '{}'),
        'seniorHigh', COALESCE((
          SELECT jsonb_build_object(
            'id', eb.id,
            'level', eb.level,
            'school_attended_or_address', eb.school_attended_or_address,
            'awards_or_honors_received', eb.awards_or_honors_received,
            'school_year_attended', eb.school_year_attended
          )
          FROM educational_background eb WHERE eb.student_id = ps.id AND LOWER(eb.level) = 'senior high school'
          LIMIT 1
        ), '{}'),
        'organizations', COALESCE((
          SELECT jsonb_agg(
            jsonb_build_object(
              'id', o.id,
              'school_year', o.school_year,
              'organization_club', o.organization_club,
              'designation', o.designation
            )
          )
          FROM organizations o WHERE o.student_id = ps.id
        ), '[]'),
        'health_info', COALESCE((
          SELECT jsonb_agg(
            jsonb_build_object(
              'id', hi.id,
              'height', hi.height,
              'weight', hi.weight,
              'physical_condition', hi.physical_condition,
              'health_problem', hi.health_problem,
              'health_problem_details', hi.health_problem_details,
              'last_doctor_visit', hi.last_doctor_visit,
              'last_doctor_visit_reason', hi.last_doctor_visit_reason,
              'general_condition', hi.general_condition
            )
          )
          FROM health_info hi WHERE hi.student_id = ps.id
        ), '[]'),
        'test_results', COALESCE((
          SELECT jsonb_agg(
            jsonb_build_object(
              'id', tr.id,
              'test_name', tr.test_name,
              'date_taken', tr.date_taken,
              'rating', tr.rating
            )
          )
          FROM test_results tr WHERE tr.student_id = ps.id
        ), '[]')
      ) AS related_data
    FROM pds_students ps
    WHERE ps.education_level = $1
    ORDER BY ps.last_name, ps.first_name;
  `;

  try {
    const { rows } = await pool.query(query, [level]);
    // Transform the response to match the expected structure
    const transformedRows = rows.map(row => {
      const transformed = { ...row, ...row.related_data };
      delete transformed.related_data;
      console.log(`Student ${row.id} data:`, transformed); // Debug log
      return transformed;
    });
    res.status(200).json(transformedRows);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}