var addValue = document.querySelector("#addValue") // 用来添加的input
var searchValue = document.querySelector("#searchValue") // 用来查询的input
var add_btn = document.querySelector("#add_btn"); //添加按钮
var deleteAll_btn = document.querySelector("#deleteAll_btn"); // 全部删除按钮
var todo_list = document.querySelector("#todo_list"); // 用来放所有待办的区域
var todo_li = document.getElementsByClassName("todo_l") // 待办
// 用数组来保存已添加的待办
var todo_value = [];

// 用来创建待办元素的方法
function todo_create(Value) {
    // 待办
    var div_todo = document.createElement("div");
    // 待办的文字
    var span_text = document.createElement("span");
    // 待办的删除标志
    var span_del = document.createElement("span");
    span_text.innerHTML = Value
    span_del.innerHTML = "x"
    div_todo.className = "todo_l"
    span_del.className = "todo_del"
    todo_list.appendChild(div_todo) // 把待办放到 用来放所有待办的区域
    div_todo.appendChild(span_text)
    div_todo.appendChild(span_del)
    span_del.onclick = del; // 给每个待办的删除标志加上点击事件 （删除）
    span_text.ondblclick = update; // 给每个待办的文字加上双击事件 （修改）
}

//将数组已有的待办全部显示
function showAll(arr) {
    todo_list.innerHTML = "";
    // 便利待办数组
    // 把待办展示到页面
    for (i = 0; i < arr.length; i++) {
        // 创建待办的方法        
        todo_create(arr[i]);
    }
}

//将已有的待办全部隐藏
function hideAll() {
    // 将页面上的待办清空
    todo_list.innerHTML = "";
}

// 添加待办方法
function add() {
    if (addValue.value !== "") {
        // 把每个输入到input的值加到待办数组中保存
        todo_value.push(addValue.value);
        // 清空input框
        addValue.value = "";
        // 将已添加的待办全部展示
        showAll(todo_value);
    } else {
        alert("不能提交空白内容！")
    } 
}

// 删除待办方法
function del() {
    for(i=0;i<todo_li.length;i++){
        if(this.parentNode == todo_li[i]){
            // 把要删除的待办从待办数组删除
            todo_value.splice(i,1);
            // 把剩下的待办显示
            showAll(todo_value)
        }
    }
}

// 清空待办
function delAll() {
    // 把所以待办从待办数组删除
    todo_value = [];
    // 刷新页面（没有待办可以显示）
    showAll(todo_value);
}

// 修改选中的待办文本
function update() {
    var input = document.createElement('input') //用来修改待办的input
    input.type = 'text'
    input.className = "updInput";
    input.value = this.innerHTML   //将原来文本内容赋值给input标签
    this.innerHTML = ''             //清除原来的文字
    this.appendChild(input)         //然input代替原来的文字
    input.selectionEnd = this.innerHTML.length  //设置光标位置是最后一个文字后
    input.focus() // 让input是输入状态
    
    var thisLi = this.parentNode //得到被点击的待办 （this是待办的文本）

    //input失去焦点方法
    function blur() {
        // input新输入的值
        var newValue = this.value
        for(i=0;i<todo_li.length;i++){
            if(thisLi == todo_li[i]){
                // 更新待办数组 
                todo_value[i] = newValue
                // 重新将已有的待办全部显示
                showAll(todo_value)
            }
        }
        
    }    
    input.onblur = blur         //设置input失去焦点事件
    input.onkeyup = function (e) { //设置回车时执行失去焦点方法
        if (e.key == 'Enter') { input.blur() }
    }
}

function search() {
    if (searchValue.value !== "") {
        hideAll()
        var search_value = [] // 用来将符合条件的待办值提取出来的查询数组
        for (let i = 0; i < todo_value.length; i++) {
            if (todo_value[i].includes(searchValue.value)) {
                console.log(todo_value[i])
                search_value.push(todo_value[i])
            } 
        }
        showAll(search_value);
    } else {
        showAll(todo_value);
    }
}

searchValue.onkeyup = search;
add_btn.onclick = add;
deleteAll_btn.onclick = delAll;
