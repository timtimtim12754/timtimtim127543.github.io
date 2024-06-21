var NowTestItemName;
var NowTestItemWordsArray;
var NowTestItemID;
var NowTestItem;
var NowTestItemLanguage;
var idList;
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function GetNowItem(id = document.getElementById("TestSwitch").value) {
  var NowTestItem = localStorage.getItem(id);
  NowTestItem = JSON.parse(NowTestItem);
  NowTestItem = JSON.parse(NowTestItem);
  NowTestItemName = NowTestItem.TestName;
  NowTestItemWordsArray = NowTestItem.words;
  NowTestItemID = id;
  NowTestItemLanguage = NowTestItem.language;
}
function GetIdList() {
  idList = localStorage.getItem("idList");
  if (idList === null) {
    idList = [];
  } else {
    idList = idList.split(",");
  }
}
var TestSwitch;
function SetTestSwitch() {
  TestSwitch = document.getElementById("TestSwitch");
  var runTime = 0;
  while (TestSwitch.options.length > 0) {
    TestSwitch.remove(0);
  }
  GetIdList();
  if (idList[0] == null) {
    document.getElementById("goTest").hidden = true;
    return 0;
  } else {
    document.getElementById("goTest").hidden = false;
    while (runTime < idList.length) {
      var item = idList[runTime];
      GetNowItem(item);
      var option = document.createElement("option");
      option.value = item;
      option.text = NowTestItemName;
      TestSwitch.add(option);
      runTime++;
    }
  }
}
function Delete() {
  GetNowItem();
  GetIdList();
  var Delete_NowTestItemName = NowTestItemName;
  Swal.fire({
    icon: "warning",
    title: "確定刪除?",
    text: '確定刪除"' + NowTestItemName + '"?',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      if (idList.length <= 1) {
        localStorage.removeItem("idList");
      } else {
        while (idList.indexOf(NowTestItemID) !== -1) {
          idList.splice(idList.indexOf(NowTestItemID), 1); // 使用splice從數組中刪除該元素
        }
        localStorage.setItem("idList", idList);
      }

      localStorage.removeItem(TestSwitch.value);
      SetTestSwitch();
      Swal.fire({
        icon: "success",
        title: "刪除成功!",
        text: '成功刪除"' + Delete_NowTestItemName + '"!',
      });
    }
  });
}
function closeTestNow() {
  Swal.fire({
    icon: "question",
    title: "確定關閉?",
    text: "關閉了就要重來喔!",
    showCancelButton: true,
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      TestNowModal.hidden = true;
      document.getElementById("TestNow_Words").value = NowTestItemWordsArray;
      clearInterval(sayTheTestWord_all);
      sayTime = 0;
    }
  });
}
var ifEdit;
function edit() {
  ifEdit = 100;
  GetNowItem();
  openInputWordsModal(NowTestItemID);
  testName.value = NowTestItemName;
  all_words.value = NowTestItemWordsArray;
  document.getElementById("splitWord").value = ",";
  document.getElementById("language").value = NowTestItemLanguage;
}
function fix() {
  Swal.fire({
    icon: "warning",
    title: "確定進行超級修復?",
    text: "超級修復會將所有資料刪除",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      SetTestSwitch();
      Swal.fire({
        icon: "success",
        title: "修復成功!",
        text: "所有資料以被刪除",
      });
    }
  });
}
function CloseInputWordsModal() {
  inputWordsModal.hidden = true;
  testName.value = "";
  all_words.value = "";
  language.value = "zh";
  document.getElementById("all_words_see").value = "";
  all_words.style.border = "";
  all_words.style.outline = "auto";
  testName.style.border = "none";
  testName.style.outline = "auto";
  document.getElementById("errorText").innerText = "";
}
