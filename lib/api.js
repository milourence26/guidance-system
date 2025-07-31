export async function getBasicEdStudents(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`/api/students?${queryString}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }
  
  return response.json();
}

export async function getBasicEdStudentById(id) {
  const response = await fetch(`/api/students?id=${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch student');
  }
  
  return response.json();
}

export async function createBasicEdStudent(studentData) {
  const response = await fetch('/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create student');
  }
  
  return response.json();
}

export async function updateBasicEdStudent(id, studentData) {
  const response = await fetch(`/api/students?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update student');
  }
  
  return response.json();
}