export default function createIteratorObject(reportObject) {
    return {
      *[Symbol.iterator]() {
        for (const departmentEmployees of Object.values(reportObject.allEmployees)) {
          for (const employeeName of departmentEmployees) {
            yield employeeName;
          }
        }
      }
    };
  }