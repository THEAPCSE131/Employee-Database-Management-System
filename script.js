let db = null;

const dbName = "Employee_DataBase";
const dbVersion = 2;

// Connection Object
let request = indexedDB.open(dbName, dbVersion);

// on upgrade needed
request.onupgradeneeded = (event) => {
  db = event.target.result;
  let Employee_Table = db.createObjectStore("Employee_Table", {
    keyPath: "emp_Id",
  });
  alert("Upgrade Called!");
};

// on success of DB Load
request.onsuccess = (event) => {
  db = event.target.result;
  alert("On DB Load Success Called!");
};

// on error
request.onerror = (event) => {
  alert(`Error! ${event.target.error}`);
};

const btnAddEmp = document.getElementById("btnAddEmp");
btnAddEmp.addEventListener("click", (event) => addEmployee());

const btnViewAll = document.getElementById("btnViewAll");
btnViewAll.addEventListener("click", (event) => viewAllEmployee());

const btnClearAll = document.getElementById("btnClearAll");
btnClearAll.addEventListener("click", (event) => clearAllEmployee());

const btnSEmp = document.getElementById("btnSEmp");
btnSEmp.addEventListener("click", (event) => searchEmployee());

const btnDEmp = document.getElementById("btnDEmp");
btnDEmp.addEventListener("click", (event) => deleteEmployee());

const btnUEmp = document.getElementById("btnUEmp");
btnUEmp.addEventListener("click", (event) => updateEmployee());

//Input
let emp_id = document.getElementById("emp_id");
let emp_name = document.getElementById("emp_name");
let emp_des = document.getElementById("emp_des");
let emp_ava = document.getElementById("emp_ava");
let Semp_id = document.getElementById("Semp_id");

//Display
let mytable = document.getElementById("mytable");
let emp_id_dis = document.getElementById("emp_id_dis");
let emp_name_dis = document.getElementById("emp_name_dis");
let emp_des_dis = document.getElementById("emp_des_dis");
let emp_ava_dis = document.getElementById("emp_ava_dis");

function addEmployee() {
  let Employee = {
    emp_Id: emp_id.value,
    emp_Name: emp_name.value,
    emp_Des: emp_des.value,
    emp_Ava: emp_ava.value,
  };
  // Define read write transaction
  let tx = db.transaction("Employee_Table", "readwrite");

  // Listen to errors
  tx.onerror = (event) => alert(`Error :: ${event.target.error}`);
  // Get the table

  let emp_Table = tx.objectStore("Employee_Table");
  emp_Table.add(Employee);

  //================================================================================
  // Define request cursor object
  request = emp_Table.openCursor();
  // Get results
  request.onsuccess = (event) => {
    // Define each row (cursor)
    let cursor = event.target.result;

    // Continue to next row

    if (cursor) {
      if (cursor.value.emp_Id === Employee.emp_Id) {
        let row = mytable.insertRow(0);
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        let cell3 = row.insertCell(3);
        cell0.innerHTML = cursor.value.emp_Id;
        cell1.innerHTML = cursor.value.emp_Name;
        cell2.innerHTML = cursor.value.emp_Des;
        cell3.innerHTML = cursor.value.emp_Ava;
      }
      cursor.continue();
    }
  };
}

function viewAllEmployee() {
  // on success of DB Load
  // Define read write transaction
  let tx = db.transaction("Employee_Table", "readonly");
  let emp_Table = tx.objectStore("Employee_Table");
  //================================================================================
  // Define request cursor object
  request = emp_Table.openCursor();
  // Get results
  request.onsuccess = (event) => {
    // Define each row (cursor)
    let cursor = event.target.result;

    // Continue to next row
    let count = 0;
    if (cursor) {
      let row = mytable.insertRow(0);
      let cell0 = row.insertCell(0);
      let cell1 = row.insertCell(1);
      let cell2 = row.insertCell(2);
      let cell3 = row.insertCell(3);
      cell0.innerHTML = cursor.value.emp_Id;
      cell1.innerHTML = cursor.value.emp_Name;
      cell2.innerHTML = cursor.value.emp_Des;
      cell3.innerHTML = cursor.value.emp_Ava;

      cursor.continue();
    }
  };
}

function clearAllEmployee() {
  let tx = db.transaction("Employee_Table", "readwrite");

  // Listen to errors
  tx.onerror = (event) => alert(`Error :: ${event.target.error}`);
  // Get the table
  let objectStored = tx.objectStore("Employee_Table");
  request = objectStored.clear();
}

function searchEmployee() {
  let tx = db.transaction("Employee_Table", "readwrite");

  // Listen to errors
  tx.onerror = (event) => alert(`Error :: ${event.target.error}`);
  // Get the table

  let emp_Table = tx.objectStore("Employee_Table");
  //================================================================================
  // Define request cursor object
  request = emp_Table.openCursor();
  // Get results
  request.onsuccess = (event) => {
    // Define each row (cursor)
    let cursor = event.target.result;

    // Continue to next row

    if (cursor) {
      if (cursor.value.emp_Id === Semp_id.value) {
        let row = mytable.insertRow(0);
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        let cell3 = row.insertCell(3);
        cell0.innerHTML = cursor.value.emp_Id;
        cell1.innerHTML = cursor.value.emp_Name;
        cell2.innerHTML = cursor.value.emp_Des;
        cell3.innerHTML = cursor.value.emp_Ava;

        emp_id.value = cursor.value.emp_Id;
        emp_name.value = cursor.value.emp_Name;
        emp_des.value = cursor.value.emp_Des;
        emp_ava.value = cursor.value.emp_Ava;
      }
      cursor.continue();
    }
  };
}

function deleteEmployee() {
  let tx = db.transaction("Employee_Table", "readwrite");

  // Listen to errors
  tx.onerror = (event) => alert(`Error :: ${event.target.error}`);
  // Get the table

  let emp_Table = tx.objectStore("Employee_Table").delete(Semp_id.value);
  //================================================================================

  request.onsuccess = (event) => {
    alert("prasad entry has been removed from your database.");
  };
}

function updateEmployee() {
  let Employee = {
    emp_Id: emp_id.value,
    emp_Name: emp_name.value,
    emp_Des: emp_des.value,
    emp_Ava: emp_ava.value,
  };
  // Define read write transaction
  let tx = db.transaction("Employee_Table", "readwrite");

  // Listen to errors
  tx.onerror = (event) => alert(`Error :: ${event.target.error}`);
  // Get the table

  let emp_Table = tx.objectStore("Employee_Table");
  emp_Table.put(Employee);

  //================================================================================
  // Define request cursor object
  request = emp_Table.openCursor();
  // Get results
  request.onsuccess = (event) => {
    // Define each row (cursor)
    let cursor = event.target.result;

    // Continue to next row

    if (cursor) {
      if (cursor.value.emp_Id === Employee.emp_Id) {
        let row = mytable.insertRow(0);
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        let cell3 = row.insertCell(3);
        cell0.innerHTML = cursor.value.emp_Id;
        cell1.innerHTML = cursor.value.emp_Name;
        cell2.innerHTML = cursor.value.emp_Des;
        cell3.innerHTML = cursor.value.emp_Ava;
      }
      cursor.continue();
    }
  };
}
