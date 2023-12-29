import JustValidate from "just-validate";

const formEl = document.getElementById("bookingForm");
// console.log(formEl);

const localStorageKey = "bookingData";

const validator = new JustValidate(formEl, {
  validateBeforeSubmtting: true,
});

// First Name Validation
validator.addField(
  "#first-name",
  [
    {
      rule: "required",
    },
    {
      rule: "minLength",
      value: 3,
    },
    {
      rule: "maxLength",
      value: 15,
    },
  ],
  {
    errorLabelStyle: {
      color: "#e34444",
    },
  }
);

// Last Name validation
validator.addField(
  "#last-name",
  [
    {
      rule: "required",
    },
    {
      rule: "minLength",
      value: 3,
    },
    {
      rule: "maxLength",
      value: 15,
    },
  ],
  {
    errorLabelStyle: {
      color: "#e34444",
    },
  }
);

// COntact Number
validator.addField(
  "#contact-number",
  [
    {
      rule: "required",
    },
    {
      rule: "number",
    },
    {
      rule: "minLength",
      value: 10,
    },
    {
      rule: "maxLength",
      value: 10,
    },
  ],
  {
    errorLabelStyle: {
      color: "#e34444",
    },
  }
);

validator.addField(
  "#country-state",
  [
    {
      rule: "required",
    },
  ],
  {
    errorLabelStyle: {
      color: "#e34444",
    },
  }
);

validator.addField(
  "#province-list",
  [
    {
      rule: "required",
    },
  ],
  {
    errorLabelStyle: {
      color: "#e34444",
    },
  }
);

validator.addField(
  "#service-list",
  [
    {
      rule: "required",
    },
  ],
  {
    errorLabelStyle: {
      color: "#e34444",
    },
  }
);

validator.addField(
  "#date-of-booking",
  [
    {
      rule: "required",
    },
  ],
  {
    errorLabelStyle: {
      color: "#e34444",
    },
  }
);

validator.onSuccess(() => {
  // !Need to get all form data
  const formData = new FormData(formEl);
  const formValuObj = Object.fromEntries(formData.entries());

  const newBookingArrayObj = [];

  // Get existing data from localStorage, if exist!
  const existingBookingData = localStorage.getItem(localStorageKey);
  // console.log(existingBookingData);

  // Parse into JSON file
  const existingBookingArray = JSON.parse(existingBookingData);
  console.log(existingBookingArray);

  /* 
      If data already exists in localStorage; the new data which is entered by user (formValueObj) need to store with
      existing data in localStorage. If there is no any data in localStorage, at that time the user entering data (formValuObj)
      need to store as fresh entry. 
    */

  if (existingBookingArray) {
    existingBookingArray.push(formValuObj);
    // console.log(existingBookingArray);
    localStorage.setItem(localStorageKey, JSON.stringify(existingBookingArray));

    // window.open("./all_details.html", "_self")
    // getAllDatasInTableForm()

  } else {

    newBookingArrayObj.push(formValuObj);
    localStorage.setItem(localStorageKey, JSON.stringify(newBookingArrayObj));

  }

  formEl.reset();
});

function getAllDatasInTableForm() {
  // Get all the datas from localStorage
  const fetchedDatas = localStorage.getItem(localStorageKey);
  const fetchedDatasArr = JSON.parse(fetchedDatas);
  console.log(fetchedDatasArr);

  // Show in Table UI
  const tblBody = document.querySelector("#tbl-body");

  if (fetchedDatasArr) {
    const tableEl = document.querySelector("#table-result")

    tableEl.classList.replace("hidden", "visible")

    fetchedDatasArr.forEach((element) => {
      // Table Row Element
      const tblRowEl = document.createElement("tr");

      // Delete Button
      const deleteBtnEl = document.createElement("button")

      const firstNameCell = document.createElement("td");
      firstNameCell.classList.add("px-2", "py-1.5", "border");
      firstNameCell.textContent = element["first-name"];
      tblRowEl.append(firstNameCell);

      const lastNameCell = document.createElement("td");
      lastNameCell.classList.add("px-2", "py-1.5", "border");
      lastNameCell.textContent = element["last-name"];
      tblRowEl.append(lastNameCell);

      const contactNumCell = document.createElement("td");
      contactNumCell.classList.add("px-2", "py-1.5", "border");
      contactNumCell.textContent = element["contact-number"];
      tblRowEl.append(contactNumCell);

      const stateCell = document.createElement("td");
      stateCell.classList.add("px-2", "py-1.5", "border");
      stateCell.textContent = element["country-state"];
      tblRowEl.append(stateCell);

      const provinceCell = document.createElement("td");
      provinceCell.classList.add("px-2", "py-1.5", "border");
      provinceCell.textContent = element["province-ist"];
      tblRowEl.append(provinceCell);

      const serviceCell = document.createElement("td");
      serviceCell.classList.add("px-2", "py-1.5", "border");
      serviceCell.textContent = element["service-list"];
      tblRowEl.append(serviceCell);

      const dateCell = document.createElement("td");
      dateCell.classList.add("px-2", "py-1.5", "border");
      dateCell.textContent = element["date-of-booking"];
      tblRowEl.append(dateCell);

      
      deleteBtnEl.className = "bg-[#03312E] hover:bg-[#355A57] hover:transition 500 px-3 py-1.5 text-[#E5EAEA] rounded-md"
      deleteBtnEl.textContent = "Delete"

      const deleteBtnCell = document.createElement("td")
      deleteBtnCell.classList.add("px-2", "py-1.5", "border");


      deleteBtnCell.append(deleteBtnEl)
      tblRowEl.append(deleteBtnCell)

      tblBody.append(tblRowEl);
    });

  }
}

getAllDatasInTableForm()