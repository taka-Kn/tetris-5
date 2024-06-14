let canvas =document.getElementById("canvas");
let canvasCT =canvas.getContext("2d"); 



const FIELD_COL=12;
const FIELD_ROW=25;

//gamespeed
let GS = 1000;

//one block size（px）
const blockSize=30;
//TETORO size
const tetroSize=5;



const canvas_W = blockSize*FIELD_COL;
const canvas_H = blockSize*FIELD_ROW;

canvas.width = 1024;
canvas.height = 768;
canvas.style.border = "4px solid #555" 
canvas.style.backgroundColor="black"

const  colorList = [
    "#000",
    "#ff0000",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#0000ff",
    "#ff00ff",
    "#ff0000",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#0000ff",
    "#ff00ff",
    "#ff0000",
    "#ffff00",
]

const tetroList = [
    [],
    [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,1,1,1,0],
        [0,0,1,1,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,1,1,0],
        [0,1,1,1,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
       
    ],
    [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [1,1,1,1,1],
        [0,0,0,0,0],
        [0,0,0,0,0]
       
    ],
    [
        [0,0,0,0,0],
        [0,1,0,0,0],
        [0,1,1,1,1],
        [0,0,0,0,0],
        [0,0,0,0,0]
        
    ],
    [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,1,1,1,1],
        [0,1,0,0,0], 
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,1,1,1,1],
        [0,0,1,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,1,1,1,1],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ],
    [   
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,1,1,1,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,1,1,1,0],
        [0,0,1,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,1,1,1,0],
        [0,1,0,1,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,1,1,1,0],
        [0,0,0,1,0],
        [0,0,0,1,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,1,1,1,0],
        [0,1,0,0,0],
        [0,1,0,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,1,1,1,0],
        [0,0,0,1,1],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,0,1,1],
        [0,1,1,1,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ]
];


//初期情報  
    let over = false;
    let tetro_x=Math.floor(FIELD_COL/2)-Math.floor(tetroSize/2);
    let tetro_y=0;
    let tetro_s;
    let tetro_n=Math.floor(Math.random()*14)+1;
    let score = 0;
    let lineCount = 0;
    
//tetroの形
    let tetro ;
//エリアの大きさ
let field = [];
function init(){
    for(y=0;y<FIELD_ROW;y++){
        field[y]=[];
        for(x=0;x<FIELD_COL;x++){
            field[y][x]=0;
        }
    }
    //field[5][8]=1;
    setTetro();
    drawAll();
    
    
    
    setInterval(naturalFall,GS);
}
  

init();


function  drawAll(){

    

    canvasCT.clearRect(0,0,canvas.width,canvas.height);
    canvasCT.strokeRect(0,0,canvas_W,canvas_H);
    canvasCT.strokeStyle="white";
    canvasCT.lineWidth=1;
    canvasCT.strokeRect(0,70,canvas_W,0.5);
    
    for(y=0;y<FIELD_ROW;y++){
        for(x=0;x<FIELD_COL;x++){
            if(field[y][x] ){
                drawBlock(x,y,field[y][x]);

            }
        }
    }

    let plus=0;
    while(checkMove(0,plus+1))plus++;

    for(y=0;y<tetroSize;y++){
        for(x=0;x<tetroSize;x++){
            if(tetro[y][x] != 0){
                dropBlock(tetro_x+x,tetro_y+y+plus);

                drawBlock(tetro_x+x,tetro_y+y,tetro_s);
                
            }
            if(tetroList[tetro_n][y][x]!=0){
                drawBlock(13+x,4+y,tetro_n);
            }
        }
    }

    info();
    
    if(over){
        overInfo("GAME OVER",0)
        overInfo("Restart　Press [R]",40)
        

    }
}


function dropBlock(x,y){
    let px = x* blockSize;
    let py = y* blockSize;
    canvasCT.strokeStyle="white";
    canvasCT.lineWidth=1;
    canvasCT.strokeRect(px,py,blockSize,blockSize);

}


function drawBlock(x,y,c){
    let px = x* blockSize;
    let py = y* blockSize;
    canvasCT.fillStyle=colorList[c];
    canvasCT.fillRect(px,py,blockSize,blockSize);
    canvasCT.strokeStyle="white";
    canvasCT.lineWidth=4;
    canvasCT.strokeRect(px,py,blockSize,blockSize);

}


function naturalFall(){
    if(over) return ;
    if(checkMove(0,1))tetro_y ++;
    else {
        fixed();
        checkLine();
        setTetro();
        reset();
        if(!checkMove(0,0))over = true ;
    }
    
    drawAll();
}

function fixed(){
    for(y=0;y<tetroSize;y++){
        for(x=0;x<tetroSize;x++){
            if(tetro[y][x] != 0){

                field[tetro_y+y][tetro_x+x]=tetro_s;

            }
        }
    }
    score += 20;
    
}

function checkLine(){
    
    for(y=0;y<FIELD_ROW;y++){
        let flag = true;
        for(x=0;x<FIELD_COL;x++){
            if(!field[y][x] ){
                flag = false;
                break;
                

            }
        }
    
        if(flag){
            lineCount ++ ;
            for(ny= y ;ny>0;ny--){
                for(nx=0;nx<FIELD_COL;nx++){
                    field[ny][nx]= field[ny-1][nx];
                }
            }
        }
    }
    score += 100*(lineCount*5);
    lineCount = 0;
   
}

document.onkeydown = function(e) {
    if(over && e.key == "r")restart();
    if(over)return
        switch(e.key){
            case "a": // A
                if(checkMove(-1,0))tetro_x --;
                break;
            case "w": // W
                while(checkMove(0,1))tetro_y ++;
                break;
            case "d": // D
                if(checkMove(1,0))tetro_x ++;
                break;
            case "s": // S
                if(checkMove(0,1))tetro_y ++;
                break;
            case "q": //Q
                if(checkMove(0,0,Spin("L")))tetro = Spin("L")

                break;
            case "e": //E
                
                if(checkMove(0,0,Spin("R")))tetro = Spin("R")
                break;     
        }
        drawAll();
        
}

//当たり判定
function checkMove(mx,my,ntetro){
    if(ntetro == undefined)ntetro = tetro;
        for(y=0;y<tetroSize;y++){
            for(x=0;x<tetroSize;x++){
                if(ntetro[y][x] != 0){
                    let nx = tetro_x + mx +x;
                    let ny = tetro_y + my +y;

                    if( ny < 0 || nx < 0 || ny >= FIELD_ROW || nx >= FIELD_COL || field[ny][nx]  ){
                        return false;
                    }

                }
            }
        }
    return true ;
}

//回転
function Spin(str){
    
    let sp = str
    let ntetro = [];
    for(y=0;y<tetroSize;y++){
        ntetro[y] = [];
        for(x=0;x<tetroSize;x++){
            
            if(sp == "R")ntetro[y][x] = tetro[tetroSize-x-1][y];
            else ntetro[y][x] = tetro[x][tetroSize-y-1];
        }
    }
   
    return ntetro;
}

function reset(){
    
    tetro_x=Math.floor(FIELD_COL/2)-Math.floor(tetroSize/2);
    tetro_y=0;
    
    
}

function overInfo(s,b){
    let str = s;
    canvasCT.font="40px 'MS Pゴシック' ";
    let w = canvasCT.measureText(str).width;
    let x = canvas_W/2-w/2;
    let y = canvas_H/2-20+b;
    canvasCT.lineWidth=4;
    canvasCT.strokeStyle="white";
    canvasCT.strokeText(str,x,y);
    canvasCT.fillStyle="black";
    canvasCT.fillText(str,x,y);

}

function restart(){
    init();
    drawAll();
    over = false;
}

function setTetro(){
    tetro_s = tetro_n
    tetro =tetroList[tetro_s]; 

    tetro_n=Math.floor(Math.random()*14)+1;

}

function info(){
    canvasCT.font="40px 'MS Pゴシック' ";
    canvasCT.fillStyle="white";
    canvasCT.fillText("NEXT",420,100);
    canvasCT.fillText("SCORE",420,400);
    canvasCT.fillText(score,420,440);
    
    //操作説明
    canvasCT.font="24px 'MS Pゴシック' ";
    canvasCT.fillText("操作説明",600,100);
    canvasCT.fillText("W：一番下へ落下",600,130);
    canvasCT.fillText("A：左へ移動",600,160);
    canvasCT.fillText("S：右へ移動",600,190);
    canvasCT.fillText("D：早い速度で落下",600,220);
    canvasCT.fillText("Q：右回転",600,250);
    canvasCT.fillText("E：左回転",600,280);

    //乱数確認用
    //canvasCT.fillText(tetro_n,420,600);
    //canvasCT.fillText(tetro_s,520,600);
    



}