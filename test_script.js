
$(loaded);

//画面が表示された実行される関数
function loaded(){
 var button = $(".formButton");
 var check = $(".checkButton");
 var deleted = $(".deleteButton");

 //ローカルストレージにあるデータを表示
 showText();

 //フォームのボタンが押されたらローカルストレージに保存して、データを表示
 button.click(function(){
  saveText();
  showText();
 });
 // チェックのボタンを押されたら全選択OR全解除
 check.click(function(){
  allCheckText();
 });
 // 削除ボタンが押されたらチェックされているテキストと該当のローカルストレージを削除
 deleted.click(function(){
  deleteText();
 });
}

//テキストとローカルストレージのデータを削除する関数
function deleteText(){
 var checked = $('.checkbox:checked'),
     key, value, tParent, t;
 
 //チェックがある要素ごとに削除するループ
 for(var i = 0; i < checked.length; i++){

  t = checked.eq(i);

  // 要素のname属性からローカルストレージのkeyを取得しデータを削除
  key = t.attr("name").match(/\d+$/);
  key = localStorage.key(key[0]);
  localStorage.removeItem(key);

  // 要素の削除
  t.parent().remove();

 }
}

// チェックボックス全選択OR全解除する関数
function allCheckText (){
 var checkboxs = $('.checkbox');

 //どれかしらチェックされている場合は全解除。そうでなければ全選択
 if(checkboxs.is(":checked")){
  checkboxs.prop("checked", false);
 }else{
  checkboxs.prop("checked", true);
 }
}

// テキストを表示する関数
function showText(){
 var todoList = $('.todoList'),
     len = localStorage.length,
     html = [],
     text, key, value, i;
 
 //一度.todoListの中身を削除
 todoList.children().remove();

 //ローカルストレージのデータを一つづつ取り出して.todoListにappend
 for(i = 0; i < len; i++){
  key = localStorage.key(i);
  value = localStorage.getItem(key);
  text = "<label style=\"display:block;\"><input type=\"checkbox\" class=\"checkbox\" name=\"name" + i + "\">" + value + "</label>";
  html.unshift(text);
 }
 todoList.append(html.join(""));
}

// テキストをローカルストレージに保存する関数
function saveText(){

 var inputText = $('.formText'),
     val = inputText.val(),
     date = new Date(),
     year = date.getFullYear(),
     month = date.getMonth() + 1,
     day = date.getDate(),
     minutes = date.getMinutes(),
     dot = ".";

 // テキストをエスケープ
 val = escape(val);
 
 //チェック機能に引っ掛からなかった場合はローカルストレージに保存
 if(checkText(val)){
  day = year + dot + month + dot + day +　dot + minutes + "minutes";
  localStorage.setItem(date, val);

  inputText.val("");
 }
}

//HTMLをエスケープしテキストとして表示する関数
function escape (text){
 return $('<div>').text(text).html();
}

// 文字数とテキストの重複をチェックする関数
function checkText(text){

 // 文字数が０か５０より大きいの場合はアラート
 if(text.length === 0 || text.length > 50){
  alert("文字数は１〜５０文字までにしてください。");
  return false;
 }

 // 内容が以前に入力したものと被る場合はアラート
 for(var i = 0, len = localStorage.length; i < len; i++){
  var key = localStorage.key(i);
  var value = localStorage.getItem(key);
  if(text === value){
   alert("以前登録したものに同じ内容があります。");
   return false;
  }
 }

 return true;
}
