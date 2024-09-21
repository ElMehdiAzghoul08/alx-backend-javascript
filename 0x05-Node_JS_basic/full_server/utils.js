import fs from 'fs/promises';

const readDatabase = (filePath) => new Promise(async (resolve, reject) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1);

    const fields = {};
    students.forEach((student) => {
      const [firstName, , , field] = student.split(',');
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstName);
    });

    resolve(fields);
  } catch (error) {
    reject(new Error('Cannot load the database'));
  }
});

export default readDatabase;
