let student = JSON.parse(localStorage.getItem('students')) || []

const sortStudents = () => {
  student.sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return b.grade - a.grade 
  })
}

const renderStudents = () => {
  document.getElementById('students-container').innerHTML = student.length > 0 ? `
    <table class="students-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Nota</th>
        </tr>
      </thead>
      <tbody>
        ${student.map(student => `
          <tr>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  ` : ''
}

const addStudent = (event) => {
  event.preventDefault()
  const name = document.getElementById('nombre').value 
  const age = document.getElementById('edad').value
  const grade = document.getElementById('nota').value
  student.push({ name, age, grade })
  sortStudents()
  localStorage.setItem('students', JSON.stringify(student))
  renderStudents()

  document.getElementById('nombre').value = ''
  document.getElementById('edad').value = ''
  document.getElementById('nota').value = ''
}

document.getElementById('add-student').addEventListener('submit', addStudent)

sortStudents()
renderStudents()