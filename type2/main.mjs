    let students = []

    const renderStudents = () => {
      document.getElementById('students-container').innerHTML = students.length > 0 ? `
        <table class="students-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            ${students.map(student => `
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

    const loadStudents = async () => {
      const response = await fetch('/api/students')
      students = await response.json()
      renderStudents()
    }

    const addStudent = async (event) => {
      event.preventDefault()
      const name = document.getElementById('nombre').value
      const age = document.getElementById('edad').value
      const grade = document.getElementById('nota').value

      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, grade })
      })

      students = await response.json()
      renderStudents()

      // Limpiar los campos
      document.getElementById('nombre').value = ''
      document.getElementById('edad').value = ''
      document.getElementById('nota').value = ''
    }

    document.getElementById('add-student').addEventListener('submit', addStudent)

    loadStudents()