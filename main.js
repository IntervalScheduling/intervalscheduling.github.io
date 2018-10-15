var list = document.getElementById("list");
var listt = document.getElementById("listt")
var starTime = document.getElementById("start");
var endTime = document.getElementById("end");
var taskNam = document.getElementById("name");
var bton = document.getElementById("btn");
var solve = document.getElementById("solve");
var solvetrue = document.getElementById("solvetrue");


var tasks =  []

var sortedTasks = []

function createCanvas(){

list.innerHTML= '';

   for (let index = 0; index < tasks.length; index++){
        var titl = document.createElement('h4');
        var name = document.createTextNode(tasks[index].name);
        var container = document.createElement('div');
        var br = document.createElement('br')
        var lis = document.createElement('li');
        var canvas = document.createElement('canvas');
        canvas.width = tasks[index].end - tasks[index].start;
        canvas.height = 20;
        canvas.style.left = tasks[index].start+"px";
        canvas.style.position = "absolute";
        canvas.style.border = "1px solid";
        canvas.style.backgroundColor = tasks[index].taskColour;
        titl.appendChild(name);
        container.appendChild(titl);
        container.appendChild(canvas);
        lis.appendChild(container);
        list.appendChild(br);
        list.appendChild(lis);
        list.appendChild(br);
    };
};

function addTask() {
    var taskStartTime = starTime.value;
    var taskEndTime = endTime.value;
    var taskName = taskNam.value;
    var taskColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    
    tasks.push({
        name: taskName,
        start: 100 * taskStartTime,
        end: 100 * taskEndTime,
        taskColour: taskColor,
    });

    starTime.value = '';
    endTime.value = '';
    taskNam.value = '';
    
    createCanvas();
}

createCanvas();

bton.onclick = addTask;

function sortTasks(arr) {
    var len = arr.length;
    for (var i = len-1; i>=0; i--){
      for(var j = 1; j<=i; j++){
        if(arr[j-1].end>arr[j].end){
            var temp = arr[j-1];
            arr[j-1] = arr[j];
            arr[j] = temp;
         }
      }
    }
    return arr;
 }

function startSolve(){
    tasks = sortTasks(tasks);
    createCanvas();
}

solve.onclick = startSolve;

function compatible(tasks){
   var newTasks =  []
   newTasks.push(tasks[0]);
   var comparation = tasks[0].end;
   for (let index = 1; index < tasks.length; index++) {
       if (tasks[index].start >= comparation) {
            newTasks.push(tasks[index]);
            comparation = tasks[index].end;
       } 
   }
   return newTasks;
}
function agoravai(){
    tasks = compatible(tasks);
    createCanvas();
}

solvetrue.onclick = agoravai;