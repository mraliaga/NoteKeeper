//! Ay dizisi
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//! Htmlden gelen elemanlar

const addBox = document.querySelector(".add-box");
const popupBoxContainer = document.querySelector(".popup-box");
const popupBox = document.querySelector(".popup");
const closeBtn = document.querySelector("header i");
const form = document.querySelector("form");
const wrapper = document.querySelector(".wrapper");

//! Localstrogeden notlari al ve eger localde not yoksa bos dizi donder.
let notes = JSON.parse(localStorage.getItem("notes")) || [];

console.log(notes);

//! Fonsiyonlar ve olay izleyicileri
//AddBoxa tiklaninca 1 fonksiyon tetikle.
addBox.addEventListener("click", () => {
  // Popupbox ve popupbox a 1 class ekle.
  popupBoxContainer.classList.add("show");
  popupBox.classList.add("show");
  //Arkaplandaki sayfa kaydirilmasini engelle
  document.querySelector("body").style.overflow = "hidden";
});

// CloseBtne tiklayinca popupBox Container ve popupa eklenen klaslari kaldir.

closeBtn.addEventListener("click", () => {
  popupBoxContainer.classList.remove("show");
  popupBox.classList.remove("show");
  //Arkaplandaki sayfa kaydirilmasini tekrardan aktifet
  document.querySelector("body").style.overflow = "auto";
});

//Menu kismini ayarlayan fonksiyon

function showMenu(elem) {
  //parent element bir elemanin kapsam elemanina erismek icin kullanilir.
  console.log(elem.parentElement);
}

//wrapper kismindaki tiklanmalari izle
wrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("bx-dots-horizontal-rounded")) {
    showMenu(e.target);
  }
});

// forma olay izleyicisi ekle ve form icerisindeki verilere eris

form.addEventListener("submit", (event) => {
  // Form gonderildiginde sayfa yenilemesine engelle
  event.preventDefault();

  // Form gonderildiginde form icerisindeki verilere eris

  //Form gonderildiginde verilere eris
  let titleInput = event.target[0];
  let descriptionInput = event.target[1];

  // Form elemanlarinin icersindeki degerlere eris
  let title = titleInput.value; //!Trim Calismadi
  let description = descriptionInput.value; //!Trim Calismadi

  //eger title ve desc degeri yoksa uyari ver

  if (!title && !description) {
    alert("Lutfen formdaki gerekli kisimlari doldurunuz!");
  }
  // Eger title desc varsa gerekli bilgileri olustur
  const date = new Date();

  let day = date.getDate();
  let year = date.getFullYear();
  let month = months[date.getMonth()];

  // Elde edilen verileri 1 not objesi altinda topla .

  let noteInfo = {
    title,
    description,
    date: `${month} ${day},${year}`,
  };

  // NoteInfo objesini notes dizisine ekle

  notes.push(noteInfo);

  // Notes dizisini localstorage a ekle
  localStorage.setItem("notes", JSON.stringify(notes));

  // Popupi kapat
  titleInput.value = "";
  descriptionInput.value = "";
  //Formu icersindeki elemanlari temizle
  popupBoxContainer.classList.remove("show");
  popupBox.classList.remove("show");

  // Arkaplandaki sayfa kaydirilmasini tekrardan aktifet
  document.querySelector("body").style.overflow = "auto";

  //Note eklendikten sonra notes render et
  renderNotes();
});

// ! Localstrogedeki verilere gore tekrardan note cartlari render ene fonksiyon

function renderNotes() {
  // Eger not localstoragede yoksa fonk durdur

  if (!notes) return;

  // Once mevcut notlari kaldir

  document.querySelectorAll(".note").forEach((li) => li.remove());

  // note dizisindeki her bir eleman icin bir note karti render et

  notes.forEach((note) => {
    let liTag = ` <li class="note">
   
    <div class="details">
      <p class="title">${note.title}</p>
      <p class="description">${note.description}</p>
    </div>
    <div class="bottom-content">
      <span>${note.date}</span>
      <div class="settings show">
        <i class="bx bx-dots-horizontal-rounded"></i>
        <ul class="menu">
          <li><i class="bx bx-edit"></i> Düzenle</li>
          <li><i class="bx bx-trash"></i> Sil</li>
        </ul>
      </div>
    </div>
  </li>`;
    // iah belirli ogeyi bir HTML elemanina gore sirali bir sekilde eklemek icin kullanilir.
    //Bu method hangi konuma once vew sonrasinami ve hangi eleman bunu belirmesini ister

    addBox.insertAdjacentHTML("afterend", liTag);
  });
}

//Sayfa yanilendiginde renderNote() fonk calistir
document.addEventListener("DOMContentLoaded", () => renderNotes());
