var face_clr = "edc4b3-e6b8a2-deab90-d69f7e-cd9777-c38e70-b07d62".split("-").map(a=>"#"+a)
var ear_clr = "6f1d1b-bb9457-432818-99582a-ffe6a7".split("-").map(a=>"#"+a)
var hat_clr = "cdb4db-ffc8dd-ffafcc-bde0fe-a2d2ff".split("-").map(a=>"#"+a)
var eye_clr = "edede9-d6ccc2-f5ebe0-e3d5ca-d5bdaf".split("-").map(a=>"#"+a)
var eye_clr2 = "c2c5aa-a4ac86-656d4a-414833-333d29".split("-").map(a=>"#"+a)
var pos_x=[]
var pos_y=[]
var sizes=[]
var colors=[]
var v_y = [] //移動速度y軸
var v_x =[] //移動速度x軸
var txts = []
var sound1
var fc
var face_move_var = false //臉物件移動條件，如果為true臉就會移動，如果為false臉就不移動

//語音辨識
var lang = navigator.language || en-US 
var myRec = new p5.SpeechRec(lang)
var face_Rot_var = false

function preload() { 
  sound1 = loadSound("onlymp3.to - Wind flower Inst. Wind flower Inst. -7XSYZnqIiE8-192k-1703444502.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight); 
  analyzer = new p5.Amplitude();
  analyzer.setInput(sound1)

  //文字框的設定
  inputElement = createInput("我是酷狗!") //產生一個文字方塊，""內的文字為預設顯示的文字(可改)
  inputElement.position(10,10) //把文字方塊放到(10,10)
  inputElement.size(140,40) //寬高
  inputElement.style("font-size","20px") //文字大小
  inputElement.style("color","#c2c5aa") //文字顏色
  inputElement.style("background","#333d29") //框內的文字顏色
  inputElement.style("border","none") //文字框沒有框線
  //移動按鈕的設定
  btnMoveElement = createButton("移動")
  btnMoveElement.position(170,10)
  btnMoveElement.size(80,40) 
  btnMoveElement.style("font-size","20px") 
  btnMoveElement.style("color","#333d29") 
  btnMoveElement.style("background","#c2c5aa") 
  btnMoveElement.mousePressed(face_move)
  //暫停按鈕的設定
  btnMoveElement = createButton("暫停")
  btnMoveElement.position(270,10)
  btnMoveElement.size(80,40) 
  btnMoveElement.style("font-size","20px") 
  btnMoveElement.style("color","#333d29") 
  btnMoveElement.style("background","#c2c5aa") 
  btnMoveElement.mousePressed(face_stop)

  //radio是多個選項只能選一個(單選)
  radioElement = createRadio()
  radioElement.option("暫停")
  radioElement.option("旋轉")
  radioElement.option("移動")
  radioElement.position(370,10)//旋鈕的位置
  radioElement.size(200,40) 
  radioElement.style("font-size","20px") 
  radioElement.style("color","#333d29") 
  radioElement.style("background-color","#c2c5aa")  
  //語音按鈕的設定
  btnVoiceElement = createButton("語音")
  btnVoiceElement.position(600,10)//按鈕的位置
  btnVoiceElement.size(80,40) //文字方塊的寬高
  btnVoiceElement.style("font-size","20px") 
  btnVoiceElement.style("color","#333d29") 
  btnVoiceElement.style("background","#c2c5aa") 
  btnVoiceElement.mousePressed(voice_go)
}

function draw() {
  background("#eddea4");
  var mode = radioElement.value()
  if(sound1.isPlaying()){
    fc = map(analyzer.getLevel(),0,1,15,30)
  }
  else{
    fc = 15
  }

  for(var i=0;i<pos_x.length;i=i+1)
  {
    push()
      txts = inputElement.value(); //把文字框的文字內容，放入到txts變數內
      translate(pos_x[i],pos_y[i])
      
      if(mode=="旋轉" || face_Rot_var ){
        rotate(sin(frameCount/20)) //如果旋轉的角度一正一負，物件才會左右搖擺
      }
      //else
      //{
      //  if (mode=="移動"){
      //    face_move_var = true
      //  }
      //  else { //暫停
      //    face_move_var = false
      //  }
      //}

      //else後可以//掉 反正按鈕一定會有幾個不行
      drawdog(face_clr[i], ear_clr[i], hat_clr[i], eye_clr[i], eye_clr2[i],sizes[i])
      pop()
    if(face_move_var || mode=="移動" ){ //在face_move_var為true時，臉物件會移動，||是"或"
    pos_y[i] = pos_y[i] + v_y[i]//移動的指令
    pos_x[i] = pos_x[i] + v_x[i]
    if(pos_y[i]>height || pos_y[i]<0) //判斷有沒有碰到上下邊
      {
        pos_x.splice(i,1) //把碰到邊的陣列元素刪除
        pos_y.splice(i,1)
        sizes.splice(i,1)
        colors.splice(i,1)
        v_y.splice(i,1)
      }
    }
  }
}

function drawdog(face_clr=("#edc4b3"),ear_clr=("#99582a"),hat_clr=("#cdb4db"),eye_clr=("#f5ebe0"),eye_clr2=("#a4ac86"),size=1){ 
push()  
  //translate(random(width),random(height))//把座標原點(0,0)移動到(200,200)
  scale(size)
  //文字框的顯示格式
  fill("#333d29") 
  textSize(30)
  text(txts,-50,150) //顯示文字，文字內容為txts，放在位置座標為(-50,150)
  
  //臉
  fill(face_clr)
  ellipse(0,0,170,230)

  //耳朵
  fill(ear_clr)
  ellipse(-100,-90,130,45)
  ellipse(100,-90,130,45)

  //帽子
  rectMode(CENTER)
  fill(hat_clr)
  rect(0,-100,100,60,[35]);
  rect(0,-70,120,20,[20]);
  //[ ]里的则是每个角的圆角弧度，如果不傳這幾個參數，矩形的角默認是 90°直角
  //眼白
  fill(eye_clr)
  ellipse(-15,-20,30)
  ellipse(15,-20,30)
  //眼珠
  fill(eye_clr2)
  ellipse(-15,-20,15)
  ellipse(15,-20,15)
  //鼻子
  fill(eye_clr2)
  ellipse(0,40,40,40)
  //嘴巴
  ellipse(0,85,fc,fc)
pop() //把原本設定格式取消

}
function mousePressed(){
  if(sound1.isPlaying()){
    sound1.stop();
  } else{
    sound1.play();
  }
  if(mouseY>60){ //設定0-60間的座標值都不產生新的物件
    //產生一個新的物件
    pos_x.push(mouseX) //放一筆新的資料到pos_x陣列內，資料為按下滑鼠的x軸
    pos_y.push(mouseY)
    sizes.push(random(0.3,1.5)) //放一筆新的資料到size陣列內，資料為產生一個亂數作為物件的大小
    colors.push(face_clr[int(random(face_clr.length))],ear_clr[int(random(ear_clr.length))],hat_clr[int(random(hat_clr.length))],eye_clr[int(random(eye_clr.length))],eye_clr2[int(random(eye_clr2.length))]) //放一筆新的資料到colors陣列內，資料為顏色序列face_colors內亂數取顏色
    v_y.push(random(-1,1)) //
    v_x.push(random(-1,1))
  }
}

function face_move(){
  face_move_var = true
}

function face_stop(){
  face_move_var = false
}

function voice_go(){
  myRec.onResult = showResult //取得語音辨識後去執行 function showResult
  myRec.start() //開始辨識
}
function showResult(){
  if(myRec.resultValue == true)
  {
    print(myRec.resultString)
    //英文文字須注意:轉換成小寫放入lowStr變數中，mostrecentword為取得最後一個字
    let lowStr = myRec.resultString.toLowerCase(); //把英文文字轉為小寫
    let mostrecentword =lowStr.split('').pop(); //pop為刪除最後一個字串，放入mostrecentword
    if(myRec.resultString.indexOf("走") !== -1){ //!=指不等於，-1指無辨識到
      face_move_var = true
    }
    if(myRec.resultString.indexOf("停") !== -1){
      face_move_var = false
      face_Rot_var = false
    }
    if(myRec.resultString.indexOf("轉") !== -1){
      face_Rot_var  = true
    }
  }
}