function getHappeningByPaymentType(happenings, paymentTypeId) {
  let happeningsByPayment = happenings.filter(
    (happening) => happening.paymentTypeId == paymentTypeId
  );
  return happeningsByPayment;
}

function getCategoryById(categories, id) {
  let category = categories.filter((category) => category.id == id);
  return category[0];
}

function getMyAllDateFormats(date) {
  //month-04
  let monthByToDigit = new Date(date).toISOString().slice(5, 7);
  //month-4
  let monthByOneDigit = new Date(date).getMonth() + 1;
  //month-April-long
  let monthByLongText = new Date(date).toLocaleString("no-no", {
    month: "long",
  });
  let monthByShortText = new Date(date).toLocaleString("no-no", {
    month: "short",
  });
  //day-9
  let day = new Date(date).toISOString().slice(8, 10);
  //let day2=new Date(date).toISOString().slice(8,10);

  let dayByOneDigit =
    day.length == 2 && parseInt(day) < 10 ? day.slice(1, 2) : day;
  //year.
  // let getYear=new Date(date).getFullYear();
  let year = new Date(date).toISOString().slice(0, 4);

  return {
    monthByToDigit,
    monthByOneDigit,
    monthByLongText,
    monthByShortText,
    day,
    dayByOneDigit,
    year,
  };
}

function doFirstLetterUpper(text) {
  let firstLetter = text[0].toUpperCase();
  let restOfText = text.slice(1);
  let result = firstLetter + restOfText;
  return result;
}


function translateCategoryTitleToEnglish(title = "event") {
  switch (title) {
    case "Familie og moro":
      return "family,fun,happy";
    case "Barn og familie":
      return "child,familiy,kid";
    case "Festival":
      return "festival";
    case "Sports":
      return "sport";
    case "Konsert":
      return "concert";
    case "Teater":
      return "theater";
    case "Utstilling":
      return "exhibition";
    default:
      break;
  }
}

//selectAll=this.checked olarak veriliyor input icinden...
//for dongusu disinda var olan selectAll checkboximizin checked durumun diger tum check box lara baglamak, daha dogrusu diger tum checkbox lari selectAll un check durumuna baglamak
function selectAllOrNone(selectAll) {
  model.inputs.userPage.isSelectedAll = selectAll;
  for (let i = 0; i < model.inputs.userPage.categories.length; i++) {
    let category = model.inputs.userPage.categories[i];
    category.isSelected = selectAll; //Bu sekilde baglamis oluyoruz
  }
  updateView();
}

function findCategory(id) {
  return model.inputs.userPage.categories.find(
    (category) => category.id === parseInt(id)
  );
}
//for dongusu ile dondurdugumuz her bir checkbox
function toggleCategorySelected(id) {
  let category = findCategory(id);
  category.isSelected = !category.isSelected;

  updateView();
}

function findElementById(array, id) {
  let element = array.find((item) => item.id === parseInt(id));
  return element;
}

function getChecked(isSelected) {
  return isSelected ? "checked" : "";
}

function getselectedCategoryCountNumber(categories) {
  let selectedCategories = categories.filter((category) => category.isSelected);
  return selectedCategories.length;
}

function compareYearMonthDay(date1, date2) {				
   let date1Year = date1.slice(0, 4);				
   let date1Month = date1.slice(5, 7);				
   let date1Day = date1.slice(8, 10);				
   let date2Year = date2.slice(0, 4);				
   let date2Month = date2.slice(5, 7);				
  let date2Day = date2.slice(8, 10);				
          
   if (date1Year < date2Year) {				
   //Eger yil kucuk ise digerlerine bakmaya gerek yok				
  return true;				
  } else if (date1Year == date2Year && date1Month < date2Month) {				
 return true;				
   } else if (				
   date1Year == date2Year &&				
   date1Month == date2Month &&				
  date1Day <= date2Day				
  ) {				
     return true;				
   } else {				
   return false;				
   }				
  }				

function compareTwoDates(date1,date2){
  if(new Date(date1).getTime() <= new Date(date2).getTime()){
    return true;
  }else {
    return false;
  }
}


function getDateFromStartDate(happenings, startDate) {
  let result = happenings.filter((happening) =>
  compareYearMonthDay(startDate, happening.happeningStartDate)
  );
  return result;
}

function getDateToEndDate(happenings, endDate) {
  let result = happenings.filter((happening) =>
  compareYearMonthDay(happening.happeningStartDate, endDate)
  );
  return result;
}

function getDateBetweenTwoDates(happenings, startDate, endDate) {
  let result = happenings.filter((happening) => {
    return (
      compareYearMonthDay(startDate, happening.happeningStartDate) &&
      compareYearMonthDay(happening.happeningStartDate, endDate)
    );
  });

  return result;
}

//Vi lister opp extrapid happening øverst
function getHappeningAsideFromExtraPaid(happenings) {
  let result = happenings.filter((happening) => happening.paymentTypeId !== 3);
  return result;
}
//Vi skal liste opp en månedslig happeningsdate som default

function getCurrentAndOneMonthLaterDates() {
  let myNowDate = new Date();

  let currentDateInputFormat = myNowDate.toISOString().slice(0, 16);
  let currentDate = myNowDate.toISOString().slice(0, 10);
  let myFutureDate = myNowDate.setMonth(myNowDate.getMonth() + 1);
  let oneMonthLaterDate = new Date(myFutureDate).toISOString().slice(0, 10);
  let oneMonthLaterDateInputFormat = new Date(myFutureDate)
    .toISOString()
    .slice(0, 16);

  return {
    currentDate,
    oneMonthLaterDate,
    currentDateInputFormat,
    oneMonthLaterDateInputFormat,
  };
}

function getDateSomeDaysLater(dayNumber) {
  let now = new Date();
  let nowDateInputFormat = now.toISOString().slice(0, 16);

  let currentDate = now.toISOString().slice(0, 10);
  console.log("Cekk et..currentDAte; ",currentDate);
  let myFutureDate = now.setDate(now.getDate() + dayNumber);
  let futureDate = new Date(myFutureDate).toISOString().slice(0, 10);
  let futureDateInputFormat = new Date(myFutureDate).toISOString().slice(0, 16);
 
  return {
    currentDate,
    futureDate,
    nowDateInputFormat,
    futureDateInputFormat,
  };
}

//Filtreleme durumlarini ayri ayri pratik fonksiyonlara donusturelim
function filterByStartEndDatoAndCategory(
  happenings,
  categories,
  startDate,
  endDate
) {
  let filteredArray = getDateBetweenTwoDates(happenings, startDate, endDate);
  //Filtered data blir filtrering etter category..

  return getHappeningsByCheckedCategory(filteredArray, categories);
}

function filterByStartDateAndCategory(happenings, categories, startDate) {
  let filteredArray = getDateFromStartDate(happenings, startDate);
  return getHappeningsByCheckedCategory(filteredArray, categories);
}

function filterByEndDateAndCategory(happenings, categories, endDate) {
  let filteredArray = getDateToEndDate(happenings, endDate);
  return getHappeningsByCheckedCategory(filteredArray, categories);
}

function getStartEndDateCurrentValue() {
    let chosenDateFrom;
    let chosenDateTo;
  switch (model.inputs.userPage.filterBtnState) {
    case "this-month":

      let { currentDateInputFormat, oneMonthLaterDateInputFormat } =
        getCurrentAndOneMonthLaterDates();
      model.inputs.userPage.chosenDateFrom = currentDateInputFormat;
      model.inputs.userPage.chosenDateTo = oneMonthLaterDateInputFormat;
      chosenDateFrom= model.inputs.userPage.chosenDateFrom;
      chosenDateTo=model.inputs.userPage.chosenDateTo;

      return {
        chosenDateFrom,
        chosenDateTo
      }
 
    case "this-week":
      let { nowDateInputFormat, futureDateInputFormat } =
        getDateSomeDaysLater(7);
      model.inputs.userPage.chosenDateFrom = nowDateInputFormat;
      model.inputs.userPage.chosenDateTo = futureDateInputFormat;
      break;

    case "tomorrow":
        let { nowDateInputFormat:nowDate, futureDateInputFormat:futureDate } =
        getDateSomeDaysLater(1);
      model.inputs.userPage.chosenDateFrom = nowDate;
      model.inputs.userPage.chosenDateTo = futureDate;
      break;
     

    default:
      break;
  }
}


//happenings som vi bruker i parameter er at de som er borsett fra ekstrabetalte happenings
function searchHappenings(happenings, categories, startDate, endDate) {

  if (model.inputs.userPage.filterBtnState == "this-month") {
    let { currentDate, oneMonthLaterDate } = getCurrentAndOneMonthLaterDates();

    return getDateBetweenTwoDates(happenings, currentDate, oneMonthLaterDate);
  } else if (model.inputs.userPage.filterBtnState == "this-week") {
    let { currentDate, futureDate } = getDateSomeDaysLater(7);
    console.log("currentDate: ",currentDate);
    console.log("futureDate: ",futureDate);
    return getDateBetweenTwoDates(happenings, currentDate, futureDate);
  } else if (model.inputs.userPage.filterBtnState == "tomorrow") {
    let { currentDate, futureDate } = getDateSomeDaysLater(1);
    //Som default får vi en date en måneds videre
    console.log("currentDate: ",currentDate);
    console.log("futureDate: ",futureDate);
    console.log("tomorrow-data: ",getDateBetweenTwoDates(happenings, currentDate, futureDate))
    return getDateBetweenTwoDates(happenings, currentDate, futureDate);
  }

  if (startDate !== "" && endDate !== "" && isAnyCategoryChecked(categories)) {
    return filterByStartEndDatoAndCategory(
      happenings,
      categories,
      startDate,
      endDate
    );
  } else if (startDate !== "" && endDate !== "") {
    return getDateBetweenTwoDates(happenings, startDate, endDate);
  } else if (startDate !== "" && isAnyCategoryChecked(categories)) {
    return filterByStartDateAndCategory(happenings, categories, startDate);
  } else if (endDate !== "" && isAnyCategoryChecked(categories)) {
    return filterByEndDateAndCategory(happenings, categories, endDate);
  } else if (startDate !== "") {
     
    return getDateFromStartDate(happenings, startDate);
  } else if (endDate !== "") {
    return getDateToEndDate(happenings, endDate);
  } else if (isAnyCategoryChecked(categories)) {
    return getHappeningsByCheckedCategory(happenings, categories);
  } else {
    let { currentDate, oneMonthLaterDate } = getCurrentAndOneMonthLaterDates();
    //Som default får vi en date en måneds videre
    return getDateBetweenTwoDates(happenings, currentDate, oneMonthLaterDate);
  }
}

//hvis ingen kategori som er valgt,kommer alle kategorier som selectedAll..
function isAnyCategoryChecked(categories) {
  let result = categories.some((category) => category.isSelected);
  return result;
}

//Hvis i det minste blir valgt en category, denne funksjonen skal kjøres...
function getHappeningsByCheckedCategory(happenings, categories) {
  //Once isSelected i true olanlarin id sini bul... sonra da o id lerden happenings icinde categoryId sine bu id ler olanlari getir...
  let getCheckedCategories = categories.filter(
    (category) => category.isSelected
  );
  let result = happenings.filter((happening) => {
    return getCheckedCategories.find((category) => {
      return happening.categoryId == category.id;
    });
  });

  return result;
}


function showMobilMenu(){
  model.inputs.userPage.isMobilToggleMenu=!model.inputs.userPage.isMobilToggleMenu;
  updateView();
}


function toggleCategory(event){
  model.inputs.userPage.isCategoryBtnClicked=!model.inputs.userPage.isCategoryBtnClicked; 
  event.stopPropagation();
   updateView() 
}



function getStartDate(event){
  model.inputs.userPage.chosenDateFrom=event.target.value;
}

function getEndDate(event){
  model.inputs.userPage.chosenDateTo=event.target.value;
}

function closetoggleCategoryBox(event){
  if(!model.inputs.userPage.isCategoryBtnClicked){
         return;
  }
  model.inputs.userPage.isCategoryBtnClicked=false;
  updateView()
}

function stopPropagation(event){
  event.stopPropagation();
}