function updateUserView() {
   //onclick="model.inputs.userPage.isCategoryBtnClicked=false; updateView() 
  document.getElementById("app").innerHTML = `  
  <div onclick="closetoggleCategoryBox(event)" >
    ${createHeaderTopHtml()}
    ${createEkstraPaidSlider()}
    ${createSearchHappeningBar()}
    ${
      model.inputs.userPage.isCategoryBtnClicked
        ? createMultipleChoiceCategory()
        : ""
    }
    ${createFilterButtons()}
    ${createHappeningList()}
</div>

    `;
  runSlider();
}


function createLogo(){
  return `
      <figure class="nav__list">
          <a href="" class="nav__list-item"> Hemsedal-logo</a>
      </figure>
  `;
}

function navMenu(){
  return `
    <ul class="nav__list nav-menu  
    ${model.inputs.userPage.isMobilToggleMenu ? 'responsive' : ''}
    ">
      <li><a class="nav__list-item" href="">Hjem</a></li>
      <li>
        <a class="nav__list-item create-happening-btn " href="#adminPage"
        onclick="model.app.page='admin'; updateView()">
        <span class="icon-plus"> </span>
        <span>Oprett ny happening</span></a>
      </li>
      <li><a class="nav__list-item" href="">Logg in</a></li>
    </ul>
  
  `;
}

function createMobilMenu(){
  return `
    <a class="nav-mobil-icon" onclick="showMobilMenu()">
    ${model.inputs.userPage.isMobilToggleMenu ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>'}
    </a> 
  `;
}


function createHeaderTopHtml() {
 return `
    <header class="fullscreen-header">
      <nav class="nav nav-top">
        ${createLogo()}
        ${navMenu()}
        ${createMobilMenu()}
      </nav>
        <h1 class="header__title">HVA SKJER I HEMSEDAL!</h1>
    </header>
     `; 
}





function createIconOnCartImage(icon="fa-solid fa-bullhorn"){
  return `
  <div class="icon-container">
    <i class="${icon}"></i>
  </div>

  `;
}

function createEkstraPaidDayAndMonthField(timeUnitName,timeUnitValue){
      return `
          <span class="cart-calender-${timeUnitName}  ">${
            timeUnitValue}
          </span> 
      `;       
}


function getCalenderDateField(icon,title){
  return `
  <div class="cart-calender-text">
      <i class="fa-solid calender-icon fa-${icon}"></i>
      <span class="cart-calender-location-dot">
      ${title}
      </span>
  </div>
  
  `;
}

function createMoveIcon(icon){
  return ` <span class="span">${icon};</span>`;
}

function createEkstraPaidSlider() {
  let ekstraPaidSlider = `
    <div class="slider-title main-title">
       <h1>Ekstrabetalte Aktiviteter</h1>
    </div>
<section class="happenings happenings-ekstraPaid">
  <p class="moveIcons">
  ${createMoveIcon('&#139')}
  ${createMoveIcon('&#155')}
  </p>    
  <section class="extraPaid-container">
    ${createReadMoreModal() }
    `;
  let result=getHappeningsFromStorage().sort((a,b)=>{
      return new Date(a.happeningStartDate)-new Date(b.happeningStartDate)
    });
  let item = ``;
  let extraPaidHappenings = getHappeningByPaymentType(result, 3);
  for (let i = 0; i < extraPaidHappenings.length; i++) {
    let extraPaidHappening = extraPaidHappenings[i];
    let category = getCategoryById(
      model.inputs.userPage.categories,
      extraPaidHappening.categoryId
    );
    let categoryTitleInEnglish = translateCategoryTitleToEnglish(
      category.title
    );
    let startDate = extraPaidHappening.happeningStartDate;
    let endDate = extraPaidHappening.happeningEndDate;
    let startTime = extraPaidHappening.happeningStartTime;
    let endTime = extraPaidHappening.happeningEndTime;
    let startDateAllFormats = getMyAllDateFormats(startDate);
    let endDateAllFormats = getMyAllDateFormats(endDate);
    //Bunlarin aynisini asagida HappeningsListte de kullandik bir kontrol edelim kod tekrari yapmamak icin
    let startEndTime=`${startTime}  - ${endTime}`;
    let startEndDays=`
    ${startDateAllFormats.monthByLongText} ${
      startDateAllFormats.dayByOneDigit
    }, ${startDateAllFormats.year} - ${endDateAllFormats.monthByLongText} ${
      endDateAllFormats.dayByOneDigit
    }, ${endDateAllFormats.year}
    
    `;
    item += `
        <div 
          id="${extraPaidHappening.id}"
          class=" extraPaid-container-cart ">
          <div class="cart-image"
          style="
          background-image: url(
            ${
              extraPaidHappening.imageUrl ||
              `https://source.unsplash.com/random/?${categoryTitleInEnglish}`
            })"
         >
           ${createIconOnCartImage()}
           ${createIconOnCartImage(category.icon)}
        </div>
          <div class="cart-calender">
            <div class="cart-calender-date">
            ${createEkstraPaidDayAndMonthField('day',startDateAllFormats.day)}
            ${createEkstraPaidDayAndMonthField('month',startDateAllFormats.monthByShortText.toUpperCase())}
            </div>
              <div class="cart-calender-content">
                <h3>${extraPaidHappening.title}</h3>
              <div>
             ${getCalenderDateField('calendar-days',startEndDays)}
             ${getCalenderDateField('clock',startEndTime)}
             ${getCalenderDateField('location-dot','Hemsedal')}
          </div>
        </div>

      </div>
        ${readMoreBtn(extraPaidHappening.id)}
   </div>
    `;
  }
  ekstraPaidSlider +=
    item +
    `
  </section>
</section>
       `;
  return ekstraPaidSlider;
}


function createDatePicker(startOrEnd,StartOrEndValue){
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return `
  <div class="filterBar-container__item ${startOrEnd}-date-item">
    <div class="${startOrEnd}-date-title date-title">
      <span>${startOrEnd=='start' ? 'Start' : 'Slutt'} dato</span>
    </div>
    <div class="ui calendar ${startOrEnd}-date" id="${startOrEnd}-date">
        <div class="ui">
          <i class="calendar icon"></i>
          <input 
          min="${now.toISOString().slice(0, 16)}"
          value="${
            StartOrEndValue
              ? StartOrEndValue
              : (this.value = now.toISOString().slice(0, 16))
          }"
          onchange="StartOrEndValue=this.value;
          "
          class="input date-field" type="datetime-local" placeholder="${startOrEnd} dato"
          >
        </div>
    </div>
 </div>
  
  
  `;
}


function createSearchHappeningBar() {
  getStartEndDateCurrentValue();
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  let searchHappeningBar = ``;
  searchHappeningBar += `
<div class="filterBar-title"><h2>Søk Happening</h2></div>
<section class="filterBar-container">
  <div class="filterBar-subcontainer">
    <div class="filterBar-container-div">
  

   
    <div class="filterBar-container__item start-date-item">
    <div class="start-date-title date-title">
      <span>Start dato</span>
    </div>
    <div class="ui calendar start-date" id="start-date">
        <div class="ui">
          <i class="calendar icon"></i>
          <input 
          min="${now.toISOString().slice(0, 16)}"
          value="${
            model.inputs.userPage.chosenDateFrom
              ? model.inputs.userPage.chosenDateFrom
              : (this.value = now.toISOString().slice(0, 16))
          }"
          onchange="getStartDate(event)"
          onClick="stopPropagation(event)"
          class="input date-field" type="datetime-local" placeholder="start dato"
          >
        </div>
    </div>
 </div>
    
    <div class="filterBar-container__item end-date-item">
    <div class="end-date-title date-title">
      <span>Slutt dato</span>
    </div>
    <div class="ui calendar end-date" id="end-date">
        <div class="ui">
          <i class="calendar icon"></i>
          <input 
          min="${now.toISOString().slice(0, 16)}"
          value="${
            model.inputs.userPage.chosenDateTo
              ? model.inputs.userPage.chosenDateTo
              : (this.value = now.toISOString().slice(0, 16))
          }"
          onchange="getEndDate(event)"
          onClick="stopPropagation(event)"
          class="input date-field" type="datetime-local" placeholder="end dato"
          >
        </div>
    </div>
 </div>





    </div>
       `;
  searchHappeningBar +=
    `
    <div class="filterBar-container-div category-searhBtnDiv">
      <div class="category-container">
        <div class="filterBar-container__item  category_filter">
          <span class="category_label date-title"> Kategori</span>
        <div class="filterBar-container__item-category  category_field_selectBtn  calendar"  > `;
    let categoryIconBtn = `
    <a id="category-toggle" for="kategori" onclick="toggleCategory(event)">
      <input
      class="category-input"
      value="Kategori"
      style="border:none; outline:none " id="kategori" type="text" >
      <i class="fa-solid category-up-down fa-angle-${
      model.inputs.userPage.isCategoryBtnClicked ? "up" : "down"
      }"></i>
    </a>
    `;
  searchHappeningBar +=
    categoryIconBtn +
    `  <span>
    ${
      getselectedCategoryCountNumber(model.inputs.userPage.categories) == 0
        ? ""
        : getselectedCategoryCountNumber(model.inputs.userPage.categories)
    }
        </span>
      </div>
    </div>
  </div>
  <div class="search-happening-btn filterBar-container__item ">
  <div class="end-date-title date-title">
    <span></span>
  </div>
    <button
    onclick="
    searchHappenings(
        getHappeningAsideFromExtraPaid(model.data.happenings),
        model.inputs.userPage.categories,
        model.inputs.userPage.chosenDateFrom,
        model.inputs.userPage.chosenDateTo
    ); 
    model.inputs.userPage.filterBtnState='';
    updateView()"
    class="search-btn   ">Søk Happening &nbsp &nbsp<i class="fa-solid fa-play"></i></button>
  </div>
 </div>
</section>
      `;
  return searchHappeningBar;
}

function createMultipleChoiceCategory() {
  let multipleCoiceCategory = ``;
  multipleCoiceCategory += `
  <section class="category-container__item   category_list">
       <div class="category_list__item  " >
          <input ${getChecked(model.inputs.userPage.isSelectedAll)} 
           type="checkbox"
           onclick="selectAllOrNone(this.checked); stopPropagation(event);" >
          <label> Select All</label>
          </div>   `;

      let categories = model.inputs.userPage.categories;
      let categoryCheckBox = ``;
      for (let i = 0; i < categories.length; i++) {
        let category = categories[i];

     categoryCheckBox += `
      <div class="category_list__item  " >
        <input ${getChecked(
          category.isSelected
        )}  onclick="toggleCategorySelected(${category.id});stopPropagation(event);" type="checkbox" >
        <label> ${category.title}</label>
      </div> 
   `;
  }
  multipleCoiceCategory += categoryCheckBox + `</section>`;
  return multipleCoiceCategory;
}


//Refactoring
function getFilterBtn(state,btnValue){
  return `
  <div>
    <button
    class="filter-btn ${getFilterBtnState(state)}"
    onclick="model.inputs.userPage.filterBtnState='${state}';
    updateView()">${btnValue}
    </button>   
  </div>
  `;
}

function getFilterBtnState(state){
  return model.inputs.userPage.filterBtnState==state ? 'active' : '';
}

function createFilterButtons() {
  let filterButtons = ``;
  filterButtons += `
    <div class="filterBtns-wrapper" >
        <div   class="happenings-title main-title">
            <h1>Happenings</h1>
        </div>
        <div class="filterBtns-container">
          ${getFilterBtn('tomorrow','I morgen')}
          ${getFilterBtn('this-week','Denne uka')}
          ${getFilterBtn('this-month','Denne måneden')}
       </div>
    </div>
`;
 return filterButtons;
}

function createNonExtraPaidDayMonthField(timeUnitName,timeUnitValue){
  return `
    <span class="cart-calender-${timeUnitName} nonExtraPaid-${timeUnitName} ">${timeUnitValue}
    </span>
  `;
}



function createHappeningList() {
  let { categories } = model.inputs.userPage;
  let { chosenDateFrom, chosenDateTo } = model.inputs.userPage;
  let result=getHappeningsFromStorage().sort((a,b)=>{
    return new Date(a.happeningStartDate)-new Date(b.happeningStartDate)
  });
  let happeningsWithoutExtraPaid = getHappeningAsideFromExtraPaid(
    result
  );
  let getFilteredData = searchHappenings(
    happeningsWithoutExtraPaid,
    categories,
    chosenDateFrom,
    chosenDateTo
  );
  let happeningList = ``;
  happeningList += `
<section class="happenings">
    <div class="container1 slider-container nonExtraPaidContainer ">
    ${createReadMoreModal() }    
`;
  let happeningsDiv = ``;

  for (let i = 0; i < getFilteredData.length; i++) {
    let happening = getFilteredData[i];
    let category = getCategoryById(
      model.inputs.userPage.categories,
      happening.categoryId
    );
    let categoryTitleInEnglish = translateCategoryTitleToEnglish(
      category.title
    );
    let startDate = happening.happeningStartDate;
    let endDate = happening.happeningEndDate;
    let startTime = happening.happeningStartTime;
    let endTime = happening.happeningEndTime;
    let startEndTime=`${startTime}  - ${endTime}`;
    let startDateAllFormats = getMyAllDateFormats(startDate);
    let endDateAllFormats = getMyAllDateFormats(endDate);
    let startEndDays=`
    ${startDateAllFormats.monthByLongText} ${
      startDateAllFormats.dayByOneDigit
    }, ${startDateAllFormats.year} - ${endDateAllFormats.monthByLongText} ${
      endDateAllFormats.dayByOneDigit
    }, ${endDateAllFormats.year}
    
    `;
    happeningsDiv += `
        <div id="${happening.id}" class="cart-container">
          <div class="cart-image"
          style="
          background-image: url(
          ${
            happening.imageUrl ||
            `https://source.unsplash.com/random/?${categoryTitleInEnglish}`
          }
          )
          ">
          ${createIconOnCartImage(category.icon)}

         </div>
          <div class="cart-calender">
             <div class="cart-calender-date nonExtraPaid">
                ${createNonExtraPaidDayMonthField('day', startDateAllFormats.day)}
                ${createNonExtraPaidDayMonthField('month', startDateAllFormats.monthByShortText.toUpperCase())}
             </div>
             <div class="cart-calender-content">
                <h3>${happening.title}</h3>
             <div>
             ${getCalenderDateField('calendar-days',startEndDays)}
             ${getCalenderDateField('clock',startEndTime)}
             ${getCalenderDateField('location-dot','Hemsedal')}
           </div>  
          </div>
        </div>
         ${readMoreBtn(happening.id)}
      </div>
             
              `;
               }

  happeningList += happeningsDiv + `</div></section> `;
  return happeningList;
}

function readMoreBtn(id){
return `
        <div class="read-more">
          <a onclick="readMore('${id}')">
            <span>Les mer</span>
            <i class="fa-solid fa-right-long"></i>
          </a>
        </div>
`;
}

function createReadMoreText(title,value){
  return `
        <div> 
          <span> ${title}:${value}</span>
        </div>
  `;
}

function createReadMoreModal() {
    let readMoreModal = ``;
if(!model.inputs.userPage.clickedHappeningId)  return readMoreModal;  

  let happeningId=model.inputs.userPage.clickedHappeningId;
  let happening = findElementById(
    model.data.happenings,
    parseInt(happeningId)
  );

  let category = getCategoryById(
    model.inputs.userPage.categories,
    happening.categoryId
  );
  let categoryTitleInEnglish = translateCategoryTitleToEnglish(category.title);

  let {
    monthByToDigit,
    monthByShortText,
    year,
    day
  } = getMyAllDateFormats(happening.happeningStartDate);
  let {
    monthByToDigit:monthEndToDigit,
    monthByShortText:monthEndShortText,
    year:yearEndDate,
    day:endDay
  } = getMyAllDateFormats(happening.happeningEndDate);
  let monthStartDate=doFirstLetterUpper(monthByShortText);
  let monthEndDate=doFirstLetterUpper(monthEndShortText);

  let startDate=`${day}  ${monthStartDate}  ${year}   ${happening.happeningStartTime}`;
  let endDate=`${endDay}  ${monthEndDate}  ${yearEndDate}  ${happening.happeningEndTime}`;      
  readMoreModal += `
  <section
    onclick="cancelModal()"
    class="modal
    ${ model.inputs.userPage.isReadMoreNoneExtraPaidBtnClicked || model.inputs.userPage.isReadMoreExtraPaidBtnClicked? 'modal2' : ''}
    ">
    <div class="modal-wrapper">
       <div class="modal-image"
       style="
        background-image: url(
          ${
            happening.imageUrl ||
            `https://source.unsplash.com/random/?${categoryTitleInEnglish}`
          }
        )

        "
        >
          <section class="modal-date"> 
            <div class="modal-date__day">${day}</div>
            <div class="modal-date__mon-year">
            ${monthStartDate} ${year}
            </div>
          </section>
       </div>
        <div class="modal-description">
          <div class="cancel-icon">
            <a   onclick="cancelModal()"> 
              <span class="icon-cross"></span>
            </a>
          </div>
          <div class="modal-description__title">
            <h1>
            ${happening.title}
            </h1>
          </div>
          <div class="small-info">
              ${createReadMoreText('Type',category.title)}
              ${createReadMoreText('Start dato',startDate)}
              ${createReadMoreText('Slutt dato',endDate)}
              <div>
                  <span>
                    Sted: Hemsedal
                  </span>
              </div>
          </div>
          <div class="modal-description__text">${happening.description} 
          </div>
      </div>
    </div>
  </section>
  
  `;
  return readMoreModal;
}



function cancelModal() {
  console.log("Cancel Modal");
  model.inputs.userPage.isReadMoreExtraPaidBtnClicked = false;
  model.inputs.userPage.isReadMoreNoneExtraPaidBtnClicked = false;
  updateView();
  
}



function readMore(happeningId) {
  let happening=findElementById(model.data.happenings,happeningId);
  let {paymentTypeId}=happening;
  console.log("paymetnTypeId: ", paymentTypeId);
  if(paymentTypeId===3){
    model.inputs.userPage.isReadMoreExtraPaidBtnClicked = true;

  }else{
    model.inputs.userPage.isReadMoreNoneExtraPaidBtnClicked = true;

  }
  model.inputs.userPage.clickedHappeningId = happeningId;
  updateView();

}
