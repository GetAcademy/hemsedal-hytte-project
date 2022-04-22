
function updateAdminView(){

  document.getElementById("app").innerHTML=`
  <div class="container" >
  <div  class="alert-message">
  ${model.inputs.adminPage.isSubmitted && !checkAllRequiredFields(model.inputs.adminPage.happening)  ? createAlertMessage("error","Du bør sjekke inn på noen av disse feltene nedenfor.") : ""}
  ${model.inputs.adminPage.isSubmitted && checkAllRequiredFields(model.inputs.adminPage.happening) ? createAlertMessage("success","Innsendingproesess er vellykket") : ""}
  </div>
  <div class="header">
  
  <button  class="btnUserPage clean-btn" onclick="cleanInputFields(); updateView()" >Clean Form Fields</button>
  <button 
  class="btnUserPage "
  onclick="model.app.page='user'; updateView()"
  >  Tilbake til Bruker Side </button>
  </div>
  <div
  class="form-content">
<form id = "admin-form" class="admin-form"
onsubmit="handleSubmit(event)"
name="admin-form">
${createHappeningTitleHtml()}
${createHappeningDescHtml()}
${createHappeningImageHtml()}
${createMainCategoryHtml()}
${createPaymentCategoryHtml()}
${createHappeningDate()}
${createAnnouncementDate()}
${createWebUrlHtml()}
<div class="submitBtn">
<button
${model.inputs.adminPage.isSubmitted ? "disabled" : ""}
type="submit"  class="btn btn-primary ">Publiser happening</button>
</div>

</form>
</div>
</div>
`;

}

//form-element class
function createHappeningTitleHtml(){
let happeningTitle=``;
happeningTitle+=`
<div class="happeningformRow happeningTitle">
   <label for="title" class="formLabel"><span class="requiredStar">*</span><span class="titleText">Tittel på happening</span></label>
   <input
   autofocus

     class="form-element input-top-mrgn
      title  ${model.inputs.adminPage.isSubmitted ? showValidationStyle(model.inputs.adminPage.happening.title.isValidate,"errorStyle","successStyle"): "" } " type="text"
      name="title"
      id = "eventTitle"
      placeholder="Enter a happening title"
      oninput="model.inputs.adminPage.happening.title.name=this.value; "
      value="${model.inputs.adminPage.happening.title.name || ""}" />
      ${model.inputs.adminPage.isSubmitted ? showValidationMessage(model.inputs.adminPage.happening.title.isValidate,"Tittel på happening påkrevd") : ""}
   
 </div>
`;


return happeningTitle;
}

function createHappeningDescHtml(){
let happeningDesc=``;
happeningDesc+=`
<div class="happeningformRow happeningDescription">
<label for="title" class="formLabel labelText "> Beskrivelse av happening</label>   
<textarea class="form-element description input-top-mrgn "
name="description"
 id = "description" 
 placeholder="Describe your happening here..."
 value="${model.inputs.adminPage.happening.description.name}"
 oninput="model.inputs.adminPage.happening.description.name=this.value; "
>${model.inputs.adminPage.happening.description.name}</textarea>
</div>
`;

return happeningDesc;
}    


function createHappeningImageHtml(){
let happeningImageFile=``;
happeningImageFile+=`
<div class="happeningformRow happeningImage">
  <label for="image" class="formLabel labelText ">Legg til bilde</label>
   <input id="image" name="image" class="form-element input-top-mrgn image"   type="file"
   onchange="readFile(event)"
   value="${model.inputs.adminPage.happening.imageUrl.name}"
   >
</div>
`;

return happeningImageFile;
}


function readFile(event){
let imageUrl=URL.createObjectURL(event.target.files[0]);
console.log("imageUrl: ", imageUrl); 
// let newUrl=imageUrl.replace('blob:','');
// console.log("newUrl: ", newUrl);
model.inputs.adminPage.happening.imageUrl.name=imageUrl;
//imageFile a atadgiimz url i herhangi bir image in src sine atayarak onu gosterebiliriz...
let reader=new FileReader();
reader.addEventListener("load", ()=>{
  let uploaded_image=reader.result;
  console.log("uploaded_image: ", uploaded_image);
  model.inputs.adminPage.happening.imageUrl.name=uploaded_image;
  //Bunu ise background-image:url() icinde kullanabiliyoruz

})
reader.readAsDataURL(event.target.files[0]);

}

function createMainCategoryHtml(){
const {categories}=model.inputs.userPage;

if(model.inputs.adminPage.happening.categoryId.name){
  choosenCategory=findCategory(model.inputs.adminPage.happening.categoryId.name);
}


let happeningMainCategory=``;
happeningMainCategory+=`
<div class="happeningformRow happeningMainCategory">
<label for="mainCategory" class="formLabel "><span class="requiredStar">*</span><span class="tittelText">Velg kategori</span></label>
<select    class="form-element mainCategory  input-top-mrgn
${model.inputs.adminPage.isSubmitted ? showValidationStyle(model.inputs.adminPage.happening.categoryId.isValidate,"errorStyle","successStyle"): "" }
" name="mainCategory" id="mainCategory"
onchange="model.inputs.adminPage.happening.categoryId.name=this.value"
>

<option selected disabled hidden>${model.inputs.adminPage.happening.categoryId.name ? choosenCategory.title : 'Velg kategori'}</option>
`;

for(let i=0; i<categories.length; i++){
  const category=categories[i];
    happeningMainCategory+=`
    <option  value="${category.id}">${category.title}</option>
    `;

}
  happeningMainCategory+=`
  </select>
  ${model.inputs.adminPage.isSubmitted ? showValidationMessage(model.inputs.adminPage.happening.categoryId.isValidate,"Kategorifelt er påkrevd") : ""}
  </div>`;


return happeningMainCategory;
}

//Submit butonu tiklanmis ise ve radio buttonlar dan tiklanan yani isSelected true olan var ise o zaman sucess style ve icon mesaji ver....

function createPaymentCategoryHtml(){

 
let { paymentTypes}=model.data;
let paymentCategory=``;
paymentCategory+=`
<div class="happeningformRow 

">
<label for="paymentCategory" class="formLabel "><span class="requiredStar">*</span><span class="tittelText">Velg payment type</span></label>
<div class="paymentCategory  input-top-mrgn 

">
<div class="paymentTypeContainer  form-element 


${model.inputs.adminPage.isSubmitted ? showValidationStyle(model.inputs.adminPage.happening.paymentTypeId.isValidate,"errorStyle","successStyle"): "" }


">
`;

for(let i=0; i<paymentTypes.length; i++){
let paymentType=paymentTypes[i];
paymentCategory+=`
<div class="paymentType">

<input
${getChecked(paymentType.isChecked)}
type="radio" name="radio" class="payTypeInput"  id="${paymentType.id}" name="${paymentType.title}" 
onchange="choosePaymentType(${paymentType.id})"  />
</div>
<div>
<span class="spantext payment-margin" for="${paymentType.title}">${paymentType.title}</span>
</div>
`;
}
  paymentCategory+=` </div>  </div> 
  ${model.inputs.adminPage.isSubmitted ? showValidationMessage(model.inputs.adminPage.happening.paymentTypeId.isValidate,"Paymenttypefelt er påkrevd") : ""}  
  </div>
  `;

return paymentCategory;
}


function createHappeningDate(){
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
let happeningDate=``;
happeningDate+=`
<label  class="formLabel"><span class="requiredStar">*</span><span >Happening start-end dato og klokkaslett</span></label>
<div class="happeningformRow  happeningDate form-element input-top-mrgn">

<div class="happeningDateSection">
<input 
min="${now.toISOString().slice(0, 16)}"
class="form-date happeningDateInput

${model.inputs.adminPage.isSubmitted ? showValidationStyle(model.inputs.adminPage.happening.happeningStartDate.isValidate,"errorStyle","successStyle"): "" }"
 id="happeningStart"  type="datetime-local"

 value="${this.value=model.inputs.adminPage.happening.happeningStartDate.name ? (model.inputs.adminPage.happening.happeningStartDate.name+"T"+ model.inputs.adminPage.happening.happeningStartTime.name) :  now.toISOString().slice(0, 16)}"
onchange="getHappeningStartDate(this);"

/>
${model.inputs.adminPage.isSubmitted ? showValidationMessage(model.inputs.adminPage.happening.happeningStartDate.isValidate,"happeningStartDate er påkrevd") : ""}
</div>

<span class="spantext date-margin">to</span> 

<div class="happeningDateSection">
<input
min="${now.toISOString().slice(0, 16)}"
class="form-date happeningDateInput
${model.inputs.adminPage.isSubmitted ? showValidationStyle(model.inputs.adminPage.happening.happeningEndDate.isValidate,"errorStyle","successStyle"): "" }
" id="happeningEnd"  type="datetime-local"

value="${this.value=model.inputs.adminPage.happening.happeningEndDate.name ? (model.inputs.adminPage.happening.happeningEndDate.name +"T"+ model.inputs.adminPage.happening.happeningEndTime.name) : now.toISOString().slice(0, 16)}"
onchange="getHappeningEndDate(this)"
/>   
${model.inputs.adminPage.isSubmitted ? showValidationMessage(model.inputs.adminPage.happening.happeningEndDate.isValidate,"happeningEndDate er påkrevd") : ""}
</div> 
</div>

`;

return happeningDate;
}

function createAnnouncementDate(){
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
let announcementDate=``;
announcementDate+=`
<label  class="formLabelAnnounce"> <span >Annonsering start-end dato og klokkaslett</span></label>
<div class="happeningformRow  happeningDate form-element ">
<div class="happeningDateSection">
<input
min="${now.toISOString().slice(0, 16)}"
class="form-date happeningDateInput"
id="announcementStart" type="datetime-local" 
value="${this.value= now.toISOString().slice(0, 16)}"
onchange="getAnnouncementStartDate(this)"
/></div>
<span class="spantext date-margin">to</span> 
<div class="happeningDateSection">
<input
min="${now.toISOString().slice(0, 16)}"
class="form-date happeningDateInput"  id="announcementEnd" type="datetime-local"
value="${this.value= now.toISOString().slice(0, 16)}"
onchange="getAnnouncementEndDate(this)"
/>
</div>
</div>
`;
return announcementDate;
}



  function createWebUrlHtml(){
    let webUrlAdress=``;
    webUrlAdress+=`
    <div class="happeningformRow happeningTitle">
       <label for="title" class="formLabel labelText "><span class="tittelText">Webside-url adress</span></label>
       <input
         class="form-element   input-top-mrgn" type="text"
          name="title"
          id = "happeningUrl"
          placeholder="Happening webside-url adress"
          oninput="model.inputs.adminPage.happening.webSiteUrl.name=this.value"
          />
     </div>
    `;
   
    return webUrlAdress;
  }
   



  function createAlertMessage(result,message,){
    let alertMessage=``;
    alertMessage=`
    <div class="alert ${result}-alert">
    <h3>${message}</h3>
    <a onclick="alertHandle()" class="close">&times;</a>
  </div>
    `;
    return alertMessage;
  }











