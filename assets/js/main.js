import JustValidate from "just-validate";
import { formatMyDate } from "./utils"

const formEl = document.getElementById("bookingForm");
// console.log(formEl);



const localStorageKey = "bookingData";

const validator = new JustValidate(formEl, {
  validateBeforeSubmitting: true,
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

// Contact Number
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
  // console.log(existingBookingArray);

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

  } else {

    newBookingArrayObj.push(formValuObj);
    localStorage.setItem(localStorageKey, JSON.stringify(newBookingArrayObj));

  }

  formEl.reset();
  getAllDatasInTableForm()
});


function getAllDatasInTableForm() {
  // Get all the datas from localStorage
  const fetchedDatas = localStorage.getItem(localStorageKey);

  const fetchedDatasArr = JSON.parse(fetchedDatas);
  // console.log(fetchedDatasArr);

  // Show in Table UI
  const tableEl = document.querySelector("#table-result")
  const tblBody = document.querySelector("#tbl-body");

  if (fetchedDatasArr && fetchedDatasArr.length > 0) {
   
    tableEl.classList.remove("hidden")
    tblBody.innerHTML = ""

    const newFinalRow = []

    fetchedDatasArr.map((element) => {
      // Table Row Element
      const tblRowEl = document.createElement("tr");

      // Delete Button
      const deleteBtnEl = document.createElement("button")

      const firstNameCell = document.createElement("td")
      const lastNameCell = document.createElement("td")
      const contactNumCell = document.createElement("td")
      const stateCell = document.createElement("td")
      const provinceCell = document.createElement("td")
      const serviceCell = document.createElement("td")
      const dateCell = document.createElement("td")
      const deleteBtnCell = document.createElement("td")

      firstNameCell.classList.add("px-2", "py-1.5", "border");
      firstNameCell.textContent = element["first-name"]

      lastNameCell.classList.add("px-2", "py-1.5", "border");
      lastNameCell.textContent = element["last-name"];

      contactNumCell.classList.add("px-2", "py-1.5", "border");
      contactNumCell.textContent = element["contact-number"];
      
      stateCell.classList.add("px-2", "py-1.5", "border");
      stateCell.textContent = element["country-state"];
      
      provinceCell.classList.add("px-2", "py-1.5", "border");
      provinceCell.textContent = element["province-ist"];
      
      serviceCell.classList.add("px-2", "py-1.5", "border");
      serviceCell.textContent = element["service-list"];
      
      dateCell.classList.add("px-2", "py-1.5", "border");
      dateCell.textContent = formatMyDate(element["date-of-booking"]);

      
      deleteBtnEl.className = "bg-[#03312E] hover:bg-[#355A57] hover:transition 500 px-3 py-1.5 text-[#E5EAEA] rounded-md"
      deleteBtnEl.textContent = "Delete"

      deleteBtnEl.addEventListener("click", () => {
        deleteRecord(element)
      })

     
      deleteBtnCell.classList.add("px-2", "py-1.5", "border");

      deleteBtnCell.append(deleteBtnEl)
      tblRowEl.append(firstNameCell, lastNameCell, contactNumCell, stateCell, provinceCell, serviceCell, dateCell, deleteBtnCell)

      newFinalRow.push(tblRowEl)
    });

    newFinalRow.forEach((el) => tblBody.append(el))
  }
}

getAllDatasInTableForm()

function deleteRecord(formObjectJSONData) {

  const confirmDelete = confirm(`${formObjectJSONData["first-name"]}! Do you need to delete your request?`)

  if(confirmDelete) {

    const existingBookingDatas = localStorage.getItem(localStorageKey)

    let existingBookingArray = JSON.parse(existingBookingDatas)

    let filteredItem = existingBookingArray.filter((element) => {

     return element["contact-number"] != formObjectJSONData["contact-number"]

    })

    console.log(filteredItem);
    existingBookingArray = filteredItem
    localStorage.setItem(localStorageKey, JSON.stringify(existingBookingArray))

  }
  getAllDatasInTableForm()
}

getAllDatasInTableForm()